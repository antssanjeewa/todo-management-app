export default function UserSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-slate-700" />
      <div className="hidden sm:block space-y-1">
        <div className="h-3 w-24 bg-slate-700 rounded" />
        <div className="h-2 w-32 bg-slate-700/60 rounded" />
      </div>
    </div>
  )
}