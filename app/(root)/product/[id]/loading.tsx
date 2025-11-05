// app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="ml-[5%] mt-8 w-[90%] animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="mb-4 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
      {/* ProductShow skeleton */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="h-[400px] w-full rounded bg-gray-300 lg:w-[45%]" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="h-10 w-1/3 rounded bg-gray-200" />
          <div className="h-12 w-full rounded bg-gray-200" />
          <div className="h-8 w-1/4 rounded bg-gray-200" />
          <div className="h-10 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
      {/* Related products skeleton */}
      <div className="mt-10 h-8 w-1/4 rounded bg-gray-200" />
      <div className="mt-4 flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 w-32 rounded bg-gray-200" />
        ))}
      </div>
      {/* Tabs and reviews skeleton */}
      <div className="w-[100%] gap-6 px-2 py-10 lg:flex">
        <div className="w-full space-y-4 lg:w-[65%]">
          <div className="h-10 w-1/2 rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
        </div>
        <div className="w-full py-10 lg:w-[35%] lg:py-0">
          <div className="mb-4 h-10 w-1/2 rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
