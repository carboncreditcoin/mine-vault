import Search from '@/app/components/search/Search';
import DropdownFilter from '@/app/components/filters/DropdownFilter';

const FiltersContainer = ({
    search,
    onSearchChange,
    filters,
    selectedFilters,
    onFilterChange,
}) => {
    // Get active filters including search
    const getActiveFilters = () => {
        // Include search in active filters if it exists
        const filterEntries = Object.entries(selectedFilters)
            .reduce((acc, [category, values]) => [
                ...acc,
                ...values.map(value => ({ category, value }))
            ], []);

        // Add search to active filters if it exists
        if (search) {
            filterEntries.push({ category: 'search', value: search });
        }

        return filterEntries;
    };

    const handleRemoveFilter = (category, value) => {
        if (category === 'search') {
            onSearchChange('');
        } else {
            const newFilters = [...selectedFilters[category]];
            const index = newFilters.indexOf(value);
            if (index !== -1) {
                newFilters.splice(index, 1);
                onFilterChange(category, newFilters);
            }
        }
    };

    // Reset all filters and search
    const handleResetFilters = () => {
        onSearchChange('');
        Object.keys(selectedFilters).forEach(category => onFilterChange(category, []));
    };

    // Check if there are any active filters or search
    const hasActiveFiltersOrSearch = getActiveFilters().length > 0;

    return (
        <div className="mb-6 mt-16 hidden md:block">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    {Object.entries(filters).map(([category, options]) => (
                        <DropdownFilter
                            key={category}
                            type="single"
                            title={category}
                            options={options}
                            value={selectedFilters[category]}
                            onChange={(newValue) => onFilterChange(category, newValue)}
                        />
                    ))}
                </div>

                {/* Search */}
                <div className='flex flex-col md:flex-row md:items-center justify-start gap-8'>
                    <div className='md:w-[20%]'>
                        <Search
                            value={search}
                            onChange={onSearchChange}
                            placeholder="Search projects..."
                        />
                    </div>

                    {hasActiveFiltersOrSearch ? (
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="flex flex-wrap gap-2">
                                {getActiveFilters().map(({ category, value }) => (
                                    <span
                                        key={`${category}-${value}`}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                    >
                                        {category === 'search' ? `Search: ${value}` : value}
                                        <button
                                            onClick={() => handleRemoveFilter(category, value)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={handleResetFilters}
                                className="ml-4 px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <h1 className='text-gray-400'>No Filter Added</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FiltersContainer;