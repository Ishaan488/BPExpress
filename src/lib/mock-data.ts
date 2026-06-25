// ============================================================
// BPExpress — Mock Data
// Realistic sample data for the admin dashboard
// ============================================================

export type OrderStatus = "pending" | "approved" | "printing" | "completed" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type MessageSender = "customer" | "admin" | "bot";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  lastOrderAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  title: string;
  description: string;
  status: OrderStatus;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  proofVersions: ProofVersion[];
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
}

export interface ProofVersion {
  id: string;
  version: number;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
  comments: string[];
}

export interface Payment {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  transactionId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachmentUrl?: string;
  attachmentType?: "image" | "pdf" | "file";
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

// ---- Customers ----
export const customers: Customer[] = [
  {
    id: "cust-001", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@example.com",
    avatar: "RK", totalOrders: 12, totalSpent: 45600, joinedAt: "2025-08-15", lastOrderAt: "2026-06-20",
  },
  {
    id: "cust-002", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@example.com",
    avatar: "PS", totalOrders: 8, totalSpent: 28900, joinedAt: "2025-10-02", lastOrderAt: "2026-06-22",
  },
  {
    id: "cust-003", name: "Amit Patel", phone: "+91 76543 21098", email: "amit@example.com",
    avatar: "AP", totalOrders: 23, totalSpent: 89200, joinedAt: "2025-06-10", lastOrderAt: "2026-06-24",
  },
  {
    id: "cust-004", name: "Sneha Gupta", phone: "+91 65432 10987", email: "sneha@example.com",
    avatar: "SG", totalOrders: 5, totalSpent: 15400, joinedAt: "2026-01-20", lastOrderAt: "2026-06-18",
  },
  {
    id: "cust-005", name: "Vikram Singh", phone: "+91 54321 09876", email: "vikram@example.com",
    avatar: "VS", totalOrders: 15, totalSpent: 62300, joinedAt: "2025-07-05", lastOrderAt: "2026-06-23",
  },
  {
    id: "cust-006", name: "Meera Nair", phone: "+91 43210 98765", email: "meera@example.com",
    avatar: "MN", totalOrders: 3, totalSpent: 8700, joinedAt: "2026-03-11", lastOrderAt: "2026-06-15",
  },
  {
    id: "cust-007", name: "Karthik Reddy", phone: "+91 32109 87654", email: "karthik@example.com",
    avatar: "KR", totalOrders: 19, totalSpent: 74500, joinedAt: "2025-05-22", lastOrderAt: "2026-06-25",
  },
  {
    id: "cust-008", name: "Anjali Desai", phone: "+91 21098 76543", email: "anjali@example.com",
    avatar: "AD", totalOrders: 7, totalSpent: 21800, joinedAt: "2025-11-30", lastOrderAt: "2026-06-21",
  },
  {
    id: "cust-009", name: "Rohan Mehta", phone: "+91 10987 65432", email: "rohan@example.com",
    avatar: "RM", totalOrders: 11, totalSpent: 38900, joinedAt: "2025-09-14", lastOrderAt: "2026-06-19",
  },
  {
    id: "cust-010", name: "Divya Iyer", phone: "+91 99887 76655", email: "divya@example.com",
    avatar: "DI", totalOrders: 6, totalSpent: 19200, joinedAt: "2026-02-28", lastOrderAt: "2026-06-24",
  },
];

// ---- Orders ----
export const orders: Order[] = [
  {
    id: "ord-001", orderNumber: "BPX-2026-001", customerId: "cust-003", customerName: "Amit Patel",
    customerPhone: "+91 76543 21098", title: "Wedding Invitation Cards", description: "500 premium wedding invitation cards with gold foil embossing. Design provided in CorelDraw format.",
    status: "printing", fileUrl: "/files/wedding-invite.cdr", fileName: "wedding-invite.cdr", fileSize: "24.5 MB",
    proofVersions: [
      { id: "pv-001", version: 1, fileUrl: "/proofs/invite-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-20T10:30:00", status: "rejected", comments: ["Change the font to something more elegant", "Gold color needs to be warmer"] },
      { id: "pv-002", version: 2, fileUrl: "/proofs/invite-v2.pdf", fileName: "Proof_V2.pdf", uploadedAt: "2026-06-21T14:15:00", status: "approved", comments: ["Looks perfect! Proceed with printing."] },
    ],
    totalAmount: 12500, paidAmount: 12500, paymentStatus: "paid",
    createdAt: "2026-06-19T08:00:00", updatedAt: "2026-06-22T09:00:00", dueDate: "2026-06-28",
    priority: "high", category: "Wedding",
  },
  {
    id: "ord-002", orderNumber: "BPX-2026-002", customerId: "cust-001", customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210", title: "Business Cards — 1000 pcs", description: "Standard matte-finish business cards with QR code on back.",
    status: "pending", fileUrl: "/files/bcard-design.pdf", fileName: "bcard-design.pdf", fileSize: "3.2 MB",
    proofVersions: [],
    totalAmount: 2500, paidAmount: 0, paymentStatus: "pending",
    createdAt: "2026-06-24T11:30:00", updatedAt: "2026-06-24T11:30:00", dueDate: "2026-06-30",
    priority: "medium", category: "Business Cards",
  },
  {
    id: "ord-003", orderNumber: "BPX-2026-003", customerId: "cust-005", customerName: "Vikram Singh",
    customerPhone: "+91 54321 09876", title: "Event Banners (3x6 ft)", description: "2 flex banners for corporate product launch event. High resolution artwork needed.",
    status: "approved", fileUrl: "/files/banner-artwork.ai", fileName: "banner-artwork.ai", fileSize: "48.1 MB",
    proofVersions: [
      { id: "pv-003", version: 1, fileUrl: "/proofs/banner-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-23T16:00:00", status: "approved", comments: ["Approved. Please proceed."] },
    ],
    totalAmount: 3800, paidAmount: 3800, paymentStatus: "paid",
    createdAt: "2026-06-22T09:15:00", updatedAt: "2026-06-23T17:00:00", dueDate: "2026-06-27",
    priority: "high", category: "Banners",
  },
  {
    id: "ord-004", orderNumber: "BPX-2026-004", customerId: "cust-002", customerName: "Priya Sharma",
    customerPhone: "+91 87654 32109", title: "Brochure Design & Print", description: "Tri-fold brochure for real estate project. 200 copies on glossy paper.",
    status: "pending", fileUrl: "/files/brochure-content.docx", fileName: "brochure-content.docx", fileSize: "8.7 MB",
    proofVersions: [],
    totalAmount: 6200, paidAmount: 0, paymentStatus: "pending",
    createdAt: "2026-06-24T15:45:00", updatedAt: "2026-06-24T15:45:00", dueDate: "2026-07-02",
    priority: "medium", category: "Brochures",
  },
  {
    id: "ord-005", orderNumber: "BPX-2026-005", customerId: "cust-007", customerName: "Karthik Reddy",
    customerPhone: "+91 32109 87654", title: "Letterheads — 500 pcs", description: "Company letterheads with watermark and new brand guidelines.",
    status: "completed", fileUrl: "/files/letterhead.cdr", fileName: "letterhead.cdr", fileSize: "5.6 MB",
    proofVersions: [
      { id: "pv-004", version: 1, fileUrl: "/proofs/letterhead-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-15T11:00:00", status: "approved", comments: ["Approved!"] },
    ],
    totalAmount: 3500, paidAmount: 3500, paymentStatus: "paid",
    createdAt: "2026-06-13T10:00:00", updatedAt: "2026-06-18T12:00:00", dueDate: "2026-06-20",
    priority: "low", category: "Stationery",
  },
  {
    id: "ord-006", orderNumber: "BPX-2026-006", customerId: "cust-010", customerName: "Divya Iyer",
    customerPhone: "+91 99887 76655", title: "Menu Cards — Restaurant", description: "Laminated A4 menu cards, 50 copies. Double-sided color print.",
    status: "printing", fileUrl: "/files/menu-design.pdf", fileName: "menu-design.pdf", fileSize: "12.3 MB",
    proofVersions: [
      { id: "pv-005", version: 1, fileUrl: "/proofs/menu-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-22T09:30:00", status: "rejected", comments: ["The desserts section has a typo — 'Gulab Jamum'"] },
      { id: "pv-006", version: 2, fileUrl: "/proofs/menu-v2.pdf", fileName: "Proof_V2.pdf", uploadedAt: "2026-06-23T10:00:00", status: "approved", comments: ["Perfect now. Go ahead."] },
    ],
    totalAmount: 4500, paidAmount: 4500, paymentStatus: "paid",
    createdAt: "2026-06-20T14:00:00", updatedAt: "2026-06-24T08:00:00", dueDate: "2026-06-26",
    priority: "medium", category: "Menu Cards",
  },
  {
    id: "ord-007", orderNumber: "BPX-2026-007", customerId: "cust-004", customerName: "Sneha Gupta",
    customerPhone: "+91 65432 10987", title: "Packaging Box Labels", description: "Custom adhesive labels for cosmetics packaging. 2000 pieces.",
    status: "pending", fileUrl: "/files/label-artwork.ai", fileName: "label-artwork.ai", fileSize: "15.8 MB",
    proofVersions: [],
    totalAmount: 8900, paidAmount: 0, paymentStatus: "pending",
    createdAt: "2026-06-25T07:30:00", updatedAt: "2026-06-25T07:30:00", dueDate: "2026-07-05",
    priority: "low", category: "Labels",
  },
  {
    id: "ord-008", orderNumber: "BPX-2026-008", customerId: "cust-009", customerName: "Rohan Mehta",
    customerPhone: "+91 10987 65432", title: "Annual Report Printing", description: "50 copies of 120-page annual report. Perfect binding, matte cover.",
    status: "approved", fileUrl: "/files/annual-report.pdf", fileName: "annual-report.pdf", fileSize: "85.2 MB",
    proofVersions: [
      { id: "pv-007", version: 1, fileUrl: "/proofs/report-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-24T11:00:00", status: "approved", comments: ["Looks great. Approved."] },
    ],
    totalAmount: 22000, paidAmount: 11000, paymentStatus: "pending",
    createdAt: "2026-06-21T16:00:00", updatedAt: "2026-06-24T12:00:00", dueDate: "2026-07-01",
    priority: "urgent", category: "Reports",
  },
  {
    id: "ord-009", orderNumber: "BPX-2026-009", customerId: "cust-006", customerName: "Meera Nair",
    customerPhone: "+91 43210 98765", title: "Visiting Cards — Personal", description: "200 premium visiting cards with embossed text.",
    status: "completed", fileUrl: "/files/vcard.cdr", fileName: "vcard.cdr", fileSize: "2.1 MB",
    proofVersions: [
      { id: "pv-008", version: 1, fileUrl: "/proofs/vcard-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-10T09:00:00", status: "approved", comments: ["Approved."] },
    ],
    totalAmount: 1800, paidAmount: 1800, paymentStatus: "paid",
    createdAt: "2026-06-08T12:00:00", updatedAt: "2026-06-14T10:00:00", dueDate: "2026-06-15",
    priority: "low", category: "Visiting Cards",
  },
  {
    id: "ord-010", orderNumber: "BPX-2026-010", customerId: "cust-008", customerName: "Anjali Desai",
    customerPhone: "+91 21098 76543", title: "Flyers — 1000 A5", description: "Promotional flyers for new bakery opening. Vibrant colors, double-sided.",
    status: "pending", fileUrl: "/files/flyer-design.pdf", fileName: "flyer-design.pdf", fileSize: "6.4 MB",
    proofVersions: [],
    totalAmount: 3200, paidAmount: 0, paymentStatus: "pending",
    createdAt: "2026-06-25T09:00:00", updatedAt: "2026-06-25T09:00:00", dueDate: "2026-07-03",
    priority: "medium", category: "Flyers",
  },
  {
    id: "ord-011", orderNumber: "BPX-2026-011", customerId: "cust-003", customerName: "Amit Patel",
    customerPhone: "+91 76543 21098", title: "Thank You Cards — Wedding", description: "300 matching thank you cards to go with the wedding invites.",
    status: "approved", fileUrl: "/files/thankyou-card.cdr", fileName: "thankyou-card.cdr", fileSize: "4.2 MB",
    proofVersions: [
      { id: "pv-009", version: 1, fileUrl: "/proofs/thankyou-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-24T14:30:00", status: "approved", comments: ["Matches the invite. Go ahead."] },
    ],
    totalAmount: 4500, paidAmount: 4500, paymentStatus: "paid",
    createdAt: "2026-06-23T13:00:00", updatedAt: "2026-06-24T15:00:00", dueDate: "2026-06-28",
    priority: "high", category: "Wedding",
  },
  {
    id: "ord-012", orderNumber: "BPX-2026-012", customerId: "cust-007", customerName: "Karthik Reddy",
    customerPhone: "+91 32109 87654", title: "Envelope Printing — 500 pcs", description: "DL envelopes with company logo and address.",
    status: "completed", fileUrl: "/files/envelope.pdf", fileName: "envelope.pdf", fileSize: "1.8 MB",
    proofVersions: [
      { id: "pv-010", version: 1, fileUrl: "/proofs/envelope-v1.pdf", fileName: "Proof_V1.pdf", uploadedAt: "2026-06-17T10:00:00", status: "approved", comments: ["OK"] },
    ],
    totalAmount: 2200, paidAmount: 2200, paymentStatus: "paid",
    createdAt: "2026-06-15T08:30:00", updatedAt: "2026-06-19T11:00:00", dueDate: "2026-06-20",
    priority: "low", category: "Stationery",
  },
];

// ---- Payments ----
export const payments: Payment[] = [
  { id: "pay-001", orderId: "ord-001", orderNumber: "BPX-2026-001", customerName: "Amit Patel", amount: 12500, status: "paid", method: "UPI", transactionId: "TXN20260620A1", createdAt: "2026-06-20T12:00:00" },
  { id: "pay-002", orderId: "ord-003", orderNumber: "BPX-2026-003", customerName: "Vikram Singh", amount: 3800, status: "paid", method: "UPI", transactionId: "TXN20260623B2", createdAt: "2026-06-23T18:00:00" },
  { id: "pay-003", orderId: "ord-005", orderNumber: "BPX-2026-005", customerName: "Karthik Reddy", amount: 3500, status: "paid", method: "Bank Transfer", transactionId: "TXN20260616C3", createdAt: "2026-06-16T09:30:00" },
  { id: "pay-004", orderId: "ord-006", orderNumber: "BPX-2026-006", customerName: "Divya Iyer", amount: 4500, status: "paid", method: "UPI", transactionId: "TXN20260623D4", createdAt: "2026-06-23T11:00:00" },
  { id: "pay-005", orderId: "ord-008", orderNumber: "BPX-2026-008", customerName: "Rohan Mehta", amount: 11000, status: "paid", method: "UPI", transactionId: "TXN20260624E5", createdAt: "2026-06-24T13:00:00" },
  { id: "pay-006", orderId: "ord-008", orderNumber: "BPX-2026-008", customerName: "Rohan Mehta", amount: 11000, status: "pending", method: "UPI", transactionId: "", createdAt: "2026-06-25T08:00:00" },
  { id: "pay-007", orderId: "ord-009", orderNumber: "BPX-2026-009", customerName: "Meera Nair", amount: 1800, status: "paid", method: "Cash", transactionId: "CASH20260612F6", createdAt: "2026-06-12T15:00:00" },
  { id: "pay-008", orderId: "ord-011", orderNumber: "BPX-2026-011", customerName: "Amit Patel", amount: 4500, status: "paid", method: "UPI", transactionId: "TXN20260624G7", createdAt: "2026-06-24T16:00:00" },
  { id: "pay-009", orderId: "ord-012", orderNumber: "BPX-2026-012", customerName: "Karthik Reddy", amount: 2200, status: "paid", method: "UPI", transactionId: "TXN20260618H8", createdAt: "2026-06-18T10:30:00" },
  { id: "pay-010", orderId: "ord-002", orderNumber: "BPX-2026-002", customerName: "Rajesh Kumar", amount: 2500, status: "pending", method: "", transactionId: "", createdAt: "2026-06-24T11:30:00" },
  { id: "pay-011", orderId: "ord-004", orderNumber: "BPX-2026-004", customerName: "Priya Sharma", amount: 6200, status: "pending", method: "", transactionId: "", createdAt: "2026-06-24T15:45:00" },
];

// ---- Conversations ----
export const conversations: Conversation[] = [
  {
    id: "conv-001", customerId: "cust-001", customerName: "Rajesh Kumar", customerPhone: "+91 98765 43210",
    customerAvatar: "RK", lastMessage: "Can you send me the business card proof?", lastMessageAt: "2026-06-25T09:10:00",
    unreadCount: 2, isOnline: true,
    messages: [
      { id: "msg-001", conversationId: "conv-001", sender: "customer", senderName: "Rajesh Kumar", content: "Hi, I want to order 1000 business cards", timestamp: "2026-06-24T11:00:00", isRead: true },
      { id: "msg-002", conversationId: "conv-001", sender: "bot", senderName: "BPX Bot", content: "Hello Rajesh! 👋 Welcome to BPExpress. How can I help you today?", timestamp: "2026-06-24T11:00:05", isRead: true },
      { id: "msg-003", conversationId: "conv-001", sender: "customer", senderName: "Rajesh Kumar", content: "I need business cards with my new company details", timestamp: "2026-06-24T11:01:00", isRead: true },
      { id: "msg-004", conversationId: "conv-001", sender: "bot", senderName: "BPX Bot", content: "Sure! Please upload your design file (PDF, CDR, or AI format). You can also share a Google Drive link for large files.", timestamp: "2026-06-24T11:01:05", isRead: true },
      { id: "msg-005", conversationId: "conv-001", sender: "customer", senderName: "Rajesh Kumar", content: "📎 bcard-design.pdf (3.2 MB)", timestamp: "2026-06-24T11:30:00", isRead: true, attachmentUrl: "/files/bcard-design.pdf", attachmentType: "pdf" },
      { id: "msg-006", conversationId: "conv-001", sender: "bot", senderName: "BPX Bot", content: "File received! ✅ Your order #BPX-2026-002 has been created. Our team will review and send you a proof shortly.", timestamp: "2026-06-24T11:30:10", isRead: true },
      { id: "msg-007", conversationId: "conv-001", sender: "customer", senderName: "Rajesh Kumar", content: "Can you send me the business card proof?", timestamp: "2026-06-25T09:10:00", isRead: false },
    ],
  },
  {
    id: "conv-002", customerId: "cust-003", customerName: "Amit Patel", customerPhone: "+91 76543 21098",
    customerAvatar: "AP", lastMessage: "Thank you! The wedding cards look amazing 🎉", lastMessageAt: "2026-06-24T18:30:00",
    unreadCount: 0, isOnline: false,
    messages: [
      { id: "msg-008", conversationId: "conv-002", sender: "admin", senderName: "Admin", content: "Hi Amit, your wedding cards are now in printing. Expected completion: June 28.", timestamp: "2026-06-22T09:00:00", isRead: true },
      { id: "msg-009", conversationId: "conv-002", sender: "customer", senderName: "Amit Patel", content: "Great! Can't wait to see them!", timestamp: "2026-06-22T09:15:00", isRead: true },
      { id: "msg-010", conversationId: "conv-002", sender: "admin", senderName: "Admin", content: "Also, we've started on the thank you cards. Proof is ready for your review.", timestamp: "2026-06-24T14:30:00", isRead: true },
      { id: "msg-011", conversationId: "conv-002", sender: "customer", senderName: "Amit Patel", content: "Thank you! The wedding cards look amazing 🎉", timestamp: "2026-06-24T18:30:00", isRead: true },
    ],
  },
  {
    id: "conv-003", customerId: "cust-005", customerName: "Vikram Singh", customerPhone: "+91 54321 09876",
    customerAvatar: "VS", lastMessage: "When will the banners be ready?", lastMessageAt: "2026-06-25T08:45:00",
    unreadCount: 1, isOnline: true,
    messages: [
      { id: "msg-012", conversationId: "conv-003", sender: "customer", senderName: "Vikram Singh", content: "I need 2 banners for our product launch", timestamp: "2026-06-22T09:00:00", isRead: true },
      { id: "msg-013", conversationId: "conv-003", sender: "admin", senderName: "Admin", content: "Sure Vikram! What size do you need?", timestamp: "2026-06-22T09:05:00", isRead: true },
      { id: "msg-014", conversationId: "conv-003", sender: "customer", senderName: "Vikram Singh", content: "3x6 feet flex banners", timestamp: "2026-06-22T09:10:00", isRead: true },
      { id: "msg-015", conversationId: "conv-003", sender: "customer", senderName: "Vikram Singh", content: "When will the banners be ready?", timestamp: "2026-06-25T08:45:00", isRead: false },
    ],
  },
  {
    id: "conv-004", customerId: "cust-010", customerName: "Divya Iyer", customerPhone: "+91 99887 76655",
    customerAvatar: "DI", lastMessage: "Payment done via UPI ✅", lastMessageAt: "2026-06-23T11:05:00",
    unreadCount: 0, isOnline: false,
    messages: [
      { id: "msg-016", conversationId: "conv-004", sender: "bot", senderName: "BPX Bot", content: "Hi Divya! Your proof for the restaurant menu cards is ready. Please review: [Proof_V2.pdf]", timestamp: "2026-06-23T10:00:00", isRead: true },
      { id: "msg-017", conversationId: "conv-004", sender: "customer", senderName: "Divya Iyer", content: "Perfect now. Go ahead.", timestamp: "2026-06-23T10:30:00", isRead: true },
      { id: "msg-018", conversationId: "conv-004", sender: "bot", senderName: "BPX Bot", content: "Great! Please complete the payment of ₹4,500 using this UPI link: [Pay Now]", timestamp: "2026-06-23T10:30:10", isRead: true },
      { id: "msg-019", conversationId: "conv-004", sender: "customer", senderName: "Divya Iyer", content: "Payment done via UPI ✅", timestamp: "2026-06-23T11:05:00", isRead: true },
    ],
  },
  {
    id: "conv-005", customerId: "cust-004", customerName: "Sneha Gupta", customerPhone: "+91 65432 10987",
    customerAvatar: "SG", lastMessage: "I've uploaded the label artwork", lastMessageAt: "2026-06-25T07:35:00",
    unreadCount: 1, isOnline: false,
    messages: [
      { id: "msg-020", conversationId: "conv-005", sender: "customer", senderName: "Sneha Gupta", content: "Hi, I need adhesive labels for my cosmetics packaging", timestamp: "2026-06-25T07:30:00", isRead: true },
      { id: "msg-021", conversationId: "conv-005", sender: "bot", senderName: "BPX Bot", content: "Hello Sneha! Please upload your design file and we'll get started.", timestamp: "2026-06-25T07:30:05", isRead: true },
      { id: "msg-022", conversationId: "conv-005", sender: "customer", senderName: "Sneha Gupta", content: "I've uploaded the label artwork", timestamp: "2026-06-25T07:35:00", isRead: false, attachmentUrl: "/files/label-artwork.ai", attachmentType: "file" },
    ],
  },
];

// ---- Dashboard Stats ----
export const dashboardStats = {
  totalOrders: 156,
  activeOrders: 12,
  revenue: 245800,
  revenueGrowth: 12.5,
  totalCustomers: 48,
  newCustomersThisMonth: 6,
  pendingApprovals: 4,
  completedThisWeek: 8,
};

export const weeklyOrderData = [
  { day: "Mon", orders: 5, revenue: 12500 },
  { day: "Tue", orders: 8, revenue: 19800 },
  { day: "Wed", orders: 6, revenue: 15200 },
  { day: "Thu", orders: 10, revenue: 28400 },
  { day: "Fri", orders: 12, revenue: 34600 },
  { day: "Sat", orders: 7, revenue: 18900 },
  { day: "Sun", orders: 3, revenue: 8200 },
];

export const ordersByStatus = [
  { status: "Pending", count: 4, color: "#f59e0b" },
  { status: "Approved", count: 3, color: "#3b82f6" },
  { status: "Printing", count: 2, color: "#8b5cf6" },
  { status: "Completed", count: 3, color: "#10b981" },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38500 },
  { month: "Mar", revenue: 51200 },
  { month: "Apr", revenue: 46800 },
  { month: "May", revenue: 55400 },
  { month: "Jun", revenue: 62300 },
];
