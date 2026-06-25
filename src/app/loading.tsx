export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="loading-spinner" />
        <p className="text-sm text-surface-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
