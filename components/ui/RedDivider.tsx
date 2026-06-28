export function RedDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-8 ${className}`}>
      <div className="red-divider w-full" />
    </div>
  );
}
