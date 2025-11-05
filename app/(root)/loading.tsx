
export default function Loading() {
    return (
        <div className="animate-pulse space-y-16 px-6 md:px-12">
            {/* 🌈 Slider Skeleton */}
            <section className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-center py-10 md:py-20 gap-8">
                    {/* Left Text */}
                    <div className="hidden lg:flex flex-col gap-4 w-1/4 border-l-2 border-b-2 border-white p-6">
                        <div className="h-8 w-2/3 bg-white/40 rounded"></div>
                        <div className="h-24 w-4/5 bg-white/20 rounded"></div>
                        <div className="h-24 w-3/4 bg-white/20 rounded"></div>
                    </div>

                    {/* Center Image */}
                    <div className="flex justify-center items-center w-full lg:w-2/4">
                        <div className="h-[300px] w-[400px] md:h-[400px] md:w-[500px] bg-white/20 rounded-lg"></div>
                    </div>

                    {/* Right Details */}
                    <div className="hidden lg:flex flex-col gap-4 w-1/4 border-r-2 border-t-2 border-white p-6">
                        <div className="h-4 w-full bg-white/30 rounded"></div>
                        <div className="h-4 w-5/6 bg-white/30 rounded"></div>
                        <div className="h-10 w-32 bg-white/40 rounded-full mt-4"></div>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 py-4">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="h-2 w-8 bg-white/30 rounded-full"></div>
                        ))}
                </div>
            </section>

            {/* 🧩 Categories Skeleton */}
            <section className="mt-16">
                <div className="h-8 w-60 bg-gray-200 mx-auto mb-10 rounded"></div>
                <div className="relative flex items-center justify-center">
                    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                        {Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[150px] h-[140px] md:w-[200px] md:h-[180px] rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-4 shadow-md"
                                >
                                    <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* 🧱 Banner Skeleton */}
            <section className="mt-10 flex flex-col md:flex-row gap-10">
                {Array(2)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 h-[250px] md:h-[300px] rounded-xl bg-gray-100 flex items-center justify-center"
                        >
                            <div className="h-32 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
            </section>

            {/* 🛒 Recommended Products Skeleton */}
            <section className="container mx-auto mt-16">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* Left Banner */}
                    <div className="hidden md:block h-[425px] w-[236px] rounded-xl bg-gray-100"></div>

                    {/* Product Cards */}
                    {Array(9)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl bg-gray-100 h-[250px] md:h-[300px] shadow-sm"
                            >
                                <div className="h-[180px] bg-gray-200 rounded-t-xl"></div>
                                <div className="p-3 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    )
}
