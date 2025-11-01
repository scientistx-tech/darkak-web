// app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
      <p className="font-medium text-blue-500">Loading..!</p>
    </div>
  );
}
