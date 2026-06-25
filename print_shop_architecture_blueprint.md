# Blueprint: Event-Driven WhatsApp Print Shop Management System

## 1. Project Overview & Core Philosophy
**Objective:** Build an event-driven, decoupled print shop management system.
**Core Rule:** The customer *never* leaves WhatsApp, and the shop admin *never* leaves the web dashboard. All WhatsApp messages are routed into the dashboard, and all dashboard replies are routed back to WhatsApp.

---

## 2. The Tech Stack (What to Build)

* **Frontend (Admin Dashboard):** Next.js (App Router) using TailwindCSS and Shadcn/UI for rapid UI development.
* **Backend (API & Webhooks):** Node.js with Express. This acts as the API gateway, handles user authentication, and catches all incoming WhatsApp webhooks.
* **Database:** PostgreSQL, as the data is highly relational.
* **ORM:** Prisma or Drizzle ORM for type-safe database interactions.
* **Object Storage:** AWS S3 or Cloudflare R2 (zero egress fees) for storing massive raw customer files (e.g., CorelDraw, heavy PDFs). Cloudinary can be used strictly for generating lightweight thumbnail previews.
* **Background Worker:** Redis paired with BullMQ. Heavy files must be processed asynchronously to prevent webhook timeouts.
* **Real-Time Updates:** WebSockets via Socket.io (or Server-Sent Events) to push live updates to the Next.js dashboard without requiring page refreshes.
* **WhatsApp API:** Start with Twilio (BSP) for the MVP ($0 monthly fixed fees), but implement a generic notification wrapper (Strategy Pattern) to swap to Interakt or Meta Direct Cloud API later without rewriting core logic.
* **Payment Gateway:** Razorpay, Cashfree, or PhonePe for generating dynamic UPI payment links.

---

## 3. The Database State Machine (PostgreSQL Schema Concept)

The database must track the "State" of the user to handle asynchronous WhatsApp conversations. The primary entities are:
* **Users:** Phone number (normalized to handle +91, 09, etc., identically), Name.
* **Orders:** Linked to Users. Must contain state fields (e.g., Pending, Approved, Printing, Completed).
* **Proofs:** Linked to Orders. Tracks file URLs and version numbers (V1, V2).
* **Comments/Messages:** Linked to Orders or Proofs to log the chat history directly into the system.
* **Payments:** Linked to Orders to track transaction status securely.

---

## 4. The Unified Workflow (How it Works)

The following sequential logic maps the exact data flow:

### Phase A: Order Intake (WhatsApp -> Backend)
1. **Trigger:** Customer texts the WhatsApp number. 
2. **Auto-Menu:** Express webhook catches the message and replies with WhatsApp Interactive Buttons (e.g., [Order], [Status], [Talk to Human]).
3. **File Upload:** Customer uploads a file. The backend receives the media URL, passes it to the BullMQ background queue, downloads it, and uploads it to S3 safely.
4. **Live Sync:** The backend fires a Socket.io event, flashing a "New Order" notification on the Next.js Admin Dashboard.

### Phase B: Digital Proofing (Admin Dashboard -> WhatsApp)
1. **Admin Review:** Admin views the order on Next.js, downloads the raw file, edits it, and uploads a `Proof_V1.pdf`. 
2. **Side-by-Side UI:** The Next.js dashboard features a split-screen view: a PDF viewer on the left, and a chat/comment thread on the right.
3. **Customer Approval:** The backend texts the proof to the customer with [Approve & Pay] and [Request Changes] buttons. If they request changes and type a note, it routes directly into the dashboard comment thread.

### Phase C: Payments & Fulfillment
1. **UPI Link:** Upon clicking [Approve & Pay], the backend generates a dynamic Razorpay UPI link and texts it to the user.
2. **Webhook Confirmation:** The payment gateway sends a secure POST to Express confirming success, updating the DB to "In Production", and visually shifting the order on the Next.js board.
3. **Completion:** Admin clicks [Mark as Ready], triggering a final WhatsApp pickup alert.

---

## 5. The AI & Bot Strategy (The Traffic Controller)

To prevent chaotic WhatsApp threads from breaking the system, build a hybrid routing logic:
* **Strict UI Rules:** Rely heavily on WhatsApp Interactive Buttons for standard orders to force structured data. Do not try to parse complex orders from free text.
* **AI Intent Routing:** Use an LLM as a router for incoming unstructured text. If a user types "What are the new rates?", the AI categorizes it as a "Pricing Query" and automatically sends a rate card PDF.
* **Seamless Human Handoff:** If the customer asks for complex custom work or clicks [Talk to Human], the bot automatically replies, "I'm passing this to our team. We'll reply shortly!" and flags the chat for the admin on the Next.js dashboard.

---

## 6. Essential Test Cases & Error Handling Matrices

Implement fail-safes for these specific edge cases:
* **File Size Limits:** If a customer sends a massive file over WhatsApp, gracefully terminate the download, reject the file, and auto-reply asking for a compressed version or a Google Drive link.
* **Webhook Storms:** Implement `express-rate-limit` middleware. If Meta/Twilio spams the webhook, queue the requests safely so the server doesn't crash.
* **Outdated Triggers:** If a user clicks an old interactive button from days ago, check the session timestamp, ignore the trigger, and send the main menu.
* **Database Concurrency:** Use Prisma's optimistic concurrency control (or row-level locking) so if two admins try to change an order status at the exact same time, the DB doesn't duplicate the state.
* **Abandoned Payments:** Rely entirely on server-to-server payment gateway webhooks to verify payment, ensuring no orders are missed if a user closes their browser early.
