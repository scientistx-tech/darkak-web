
export default function Loading() {
    return (
        <div>
            <div className="w-full overflow-hidden bg-primaryBlue text-white">
                <div className="w-full md:h-[calc(100vh-150px)]">
                    <div className="h-[2px] w-full bg-primary" />
                    <div className="relative flex h-full flex-col items-center justify-center lg:flex-row">
                        {/* Left skeleton (offer name & title) */}
                        <div className="absolute z-30 hidden w-[80%] items-center justify-between lg:flex">
                            <div className="flex h-[500px] w-1/4 flex-col gap-4 border-b-2 border-l-2 border-white px-6 py-6">
                                <div className="mb-5 h-8 w-3/4 animate-pulse rounded bg-white/30" />
                                <div className="h-24 w-2/3 animate-pulse rounded bg-white/20" />
                                <div className="h-24 w-1/2 animate-pulse rounded bg-white/10" />
                            </div>
                            {/* Center skeleton (image) */}
                            <div className="flex h-[500px] w-2/4 items-start justify-end">
                                <div className="mr-[17%] h-[80px] w-[80px] animate-pulse rounded-full bg-white/30" />
                            </div>
                            {/* Right skeleton (details & button) */}
                            <div className="flex h-[500px] w-1/4 flex-col items-end justify-center gap-4 border-r-2 border-t-2 border-white py-6 pr-6">
                                <div className="h-16 w-5/6 animate-pulse rounded bg-white/20" />
                                <div className="h-10 w-1/2 animate-pulse rounded bg-white/30" />
                            </div>
                        </div>
                        {/* Mobile skeleton */}
                        <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-6 lg:hidden">
                            <div className="mb-3 h-6 w-1/2 animate-pulse rounded bg-white/30" />
                            <div className="h-12 w-2/3 animate-pulse rounded bg-white/20" />
                            <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
                            <div className="mb-5 mt-5 h-8 w-1/2 animate-pulse rounded bg-white/20" />
                            <div className="h-10 w-1/3 animate-pulse rounded bg-white/30" />
                        </div>
                    </div>
                    {/* Dots skeleton */}
                    <div className="flex w-full items-center justify-center gap-3 py-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[8px] w-[30px] animate-pulse rounded bg-white/30"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center pb-6 md:mt-4"></div>
            </div>
            <div className="mt-16 px-8 md:px-12">
                <h2 className="mb-10 text-center text-3xl font-medium text-primaryDarkBlue">
                    Shop by Categories
                </h2>

                <div className="relative w-full">
                    <div className="no-scrollbar flex h-[210px] w-full items-center gap-4 overflow-x-auto px-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex h-[140px] w-[150px] flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md md:h-[180px] md:w-[200px]"
                            >
                                <div className="mb-3 h-16 w-16 rounded-full bg-gray-200 shimmer" />
                                <div className="h-4 w-20 rounded bg-gray-200 shimmer" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
