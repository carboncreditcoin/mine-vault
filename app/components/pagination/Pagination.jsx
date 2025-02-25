import React from 'react';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }) => {
    // Function to generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 7; // Total visible page numbers including ellipsis

        if (totalPages <= maxVisiblePages) {
            // If total pages are less than max visible, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            if (currentPage <= 3) {
                // If current page is near the start
                for (let i = 2; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // If current page is near the end
                pageNumbers.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // If current page is in the middle
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-col-reverse justify-center items-center gap-6 my-8">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'}`}
                >
                    <CircleChevronLeft />
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => (
                        pageNum === '...' ? (
                            <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-gray-600">
                                ...
                            </span>
                        ) : (
                            <button
                                key={`page-${pageNum}`}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 rounded-full ${currentPage === pageNum
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'}`}
                >
                    <CircleChevronRight />
                </button>
            </div>

            <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} projects
            </div>
        </div>
    );
};

export default Pagination;