const ProjectLoading = () => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-white p-4">
            {/* Project Title Skeleton */}
            <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse" />

            {/* Location Skeleton */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-1/3 animate-pulse" />
            </div>

            {/* Commodities Skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
            </div>

            {/* Area and Tool Skeleton */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-md w-2/3 animate-pulse" />
                </div>
            </div>

            {/* View Details Button Skeleton */}
            <div className="h-9 bg-gray-200 rounded-md w-28 animate-pulse mt-auto" />
        </div>
    );
};

export default ProjectLoading;