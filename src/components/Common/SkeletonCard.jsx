export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="w-full aspect-video rounded-xl bg-white/[0.05]" />
      <div className="flex items-start gap-3 mt-1">
        <div className="w-10 h-10 rounded-full bg-white/[0.05] shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-white/[0.05] rounded w-[85%]" />
          <div className="h-3 bg-white/[0.05] rounded w-[60%]" />
        </div>
      </div>
    </div>
  );
}
