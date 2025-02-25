import React, { useState } from 'react';
import { MapPin, Activity, Box, Layers } from 'lucide-react';
import ProjectDetailsModal from './ProjectDetailsModal';

const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        'Project Name': projectName,
        Commodity,
        Secondary_Commodity,
        Tertiary_Commodity,
        Country,
        'Tenement Area': tenementArea,
        Status,
        'Most Advanced Tool': mostAdvancedTool,
        'Deal Sought by Owner': dealSought
    } = project;

    const initials = projectName
        ? projectName
            .split(' ')
            .slice(0, 2)
            .map(word => word[0])
            .join('')
            .toUpperCase()
        : '';

    const bgColors = [
        'from-blue-400',
        'from-purple-400',
        'from-pink-400',
        'from-indigo-400',
        'from-teal-400',
        'from-emerald-400',
        'from-orange-400',
        'from-rose-400'
    ];

    const randomColor = bgColors[projectName ? projectName.length % bgColors.length : 0];

    return (
        <>
            <div className="relative h-[340px] rounded-lg shadow-lg overflow-hidden">
                {/* Background with deeper gradient */}
                <div className={`absolute inset-0 bg-gradient-to-tl ${randomColor} to-gray-900 opacity-90`}>
                    {/* Large Initials as background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <span className="text-white text-9xl font-bold">
                            {initials}
                        </span>
                    </div>
                </div>

                {/* Content overlay */}
                <div className="relative h-full p-3.5 flex flex-col text-white capitalize">
                    {/* Status Badge */}
                    {Status && (
                        <span className="self-end px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            {Status}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mt-1 mb-2 line-clamp-2">
                        {projectName}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center mb-4">
                        <MapPin size={16} className="mr-1.5" />
                        <span className="text-base text-white/90">{Country}</span>
                    </div>

                    {/* Commodities */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {[Commodity, Secondary_Commodity, Tertiary_Commodity].filter(Boolean).map((commodity, index) => (
                            <span key={index} className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm">
                                {commodity}
                            </span>
                        ))}
                    </div>

                    {/* Area and Tool */}
                    <div className="space-y-4 mb-4 text-white/85">
                        {tenementArea && (
                            <div className="flex items-center text-sm">
                                <Box size={15} className="mr-1.5" />
                                <span>Area: {tenementArea}</span>
                            </div>
                        )}
                        {mostAdvancedTool && (
                            <div className="flex items-center text-sm">
                                <Activity size={15} className="mr-1.5" />
                                <span>Tool: {mostAdvancedTool}</span>
                            </div>
                        )}
                    </div>

                    {/* Deal Type */}
                    {dealSought && (
                        <div className="flex items-center text-sm text-white/85 mb-4">
                            <Layers size={15} className="mr-1.5" />
                            <span>{dealSought}</span>
                        </div>
                    )}

                    {/* Button */}
                    <div className="mt-auto self-end">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            <ProjectDetailsModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ProjectCard;