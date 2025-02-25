'use client';

import { useState, useEffect, useCallback } from 'react';
import { FILTERS } from '@/public/data/filtersData';
import FiltersContainer from '@/app/components/filters/FiltersContainer';
import Pagination from '@/app/components/pagination/Pagination';
import ProjectCard from '@/app/components/Projects/ProjectCard';
import ProjectLoading from '../loading/ProjectLoading';
import { RefreshCw } from 'lucide-react';

const Projects = ({ projects: initialProjects }) => {
    const [projectsData, setProjectsData] = useState(initialProjects);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        countries: [],
        primaryCommodity: [],
        secondaryCommodity: [],
        tertiaryCommodity: [],
        status: [],
        dealType: [],
        tool: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        const startTime = Date.now();

        const queryParams = new URLSearchParams({
            page: currentPage,
            limit: initialProjects.pagination.limit,
        });

        if (search.trim()) {
            queryParams.set('search', search);
        }

        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                queryParams.set(key, values.join(','));
            }
        });

        try {
            const response = await fetch(`/api/projects?${queryParams}`);
            const data = await response.json();

            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1000) {
                await new Promise(resolve => setTimeout(resolve, 1000 - elapsedTime));
            }

            setProjectsData(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        setIsLoading(false);
    }, [currentPage, search, filters, initialProjects.pagination.limit]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const shouldUseInitialData =
                currentPage === 1 &&
                !search.trim() &&
                Object.values(filters).every(arr => arr.length === 0);

            if (shouldUseInitialData) {
                setProjectsData(initialProjects);
            } else {
                fetchProjects();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [currentPage, search, filters, fetchProjects, initialProjects]);

    const handleFilterChange = (category, newValue) => {
        setFilters(prev => ({
            ...prev,
            [category]: newValue
        }));
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        // Set loading state immediately
        setIsLoading(true);

        // Reset all states at once
        setFilters({
            countries: [],
            primaryCommodity: [],
            secondaryCommodity: [],
            tertiaryCommodity: [],
            status: [],
            dealType: [],
            tool: []
        });
        setSearch('');
        setCurrentPage(1);

        // Directly set the initial data
        setProjectsData(initialProjects);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <FiltersContainer
                search={search}
                onSearchChange={handleSearchChange}
                filters={FILTERS}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
            />

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:mt-0">
                    {[...Array(6)].map((_, index) => (
                        <ProjectLoading key={index} />
                    ))}
                </div>
            ) : (
                <div>
                    {projectsData?.projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:mt-0">
                            {projectsData?.projects?.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className='min-h-96 flex flex-col items-center justify-center space-y-4'>
                            <h1 className='text-2xl font-semibold text-center'>
                                No Projects Found
                            </h1>
                            <button
                                onClick={handleRefresh}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" />
                                <span>Refresh</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            <Pagination
                currentPage={projectsData.pagination.page}
                totalPages={projectsData.pagination.pages}
                itemsPerPage={projectsData.pagination.limit}
                totalItems={projectsData.pagination.total}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Projects;