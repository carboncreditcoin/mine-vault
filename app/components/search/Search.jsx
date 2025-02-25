const Search = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative flex-1">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-3 pr-4 py-2 border rounded-md focus:outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <svg
                className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
};

export default Search;