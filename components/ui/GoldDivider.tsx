export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-8 ${className}`}>
      <div className="gold-divider w-full" />
    </div>
  );
}
