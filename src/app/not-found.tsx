import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-surface-100 flex items-center justify-center">
          <FileQuestion size={36} className="text-surface-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-surface-800">Page not found</h2>
          <p className="text-sm text-surface-400 mt-1">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
