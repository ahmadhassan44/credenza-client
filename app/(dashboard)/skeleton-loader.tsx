export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4 p-8 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/2" />
      <div className="h-6 bg-gray-800 rounded w-1/3" />
      <div className="h-40 bg-gray-900 rounded w-full" />
      <div className="h-6 bg-gray-800 rounded w-2/3" />
    </div>
  );
}
