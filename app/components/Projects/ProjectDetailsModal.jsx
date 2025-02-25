import React from 'react';
import { X, MapPin, Activity, Box, Layers, Link as Url, FileText } from 'lucide-react';
import Link from 'next/link';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
        'Project Name': projectName,
        Commodity,
        Secondary_Commodity,
        Tertiary_Commodity,
        Country,
        'Tenement Area': tenementArea,
        Status,
        'Most Advanced Tool': mostAdvancedTool,
        'Deal Sought by Owner': dealSought,
        Notes,
        'Data Room link': dataRoomLink
    } = project;

    // Close on outside click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 rounded-xl bg-white text-white shadow-2xl capitalize">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-gray-400">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-700">{projectName}</h2>
                        {Status && (
                            <span className="px-3 py-1 mr-10 font-semibold bg-gray-100 text-gray-800 rounded-full text-sm">
                                {Status}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="mr-2" />
                        <span className="text-lg">{Country}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Commodities */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Commodities</h3>
                        <div className="flex flex-wrap gap-2 font-semibold">
                            {[Commodity, Secondary_Commodity, Tertiary_Commodity].filter(Boolean).map((commodity, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full"
                                >
                                    {commodity}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Details */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold">
                            {tenementArea && (
                                <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
                                    <Box size={18} className="mr-2" />
                                    <span>Area: {tenementArea}</span>
                                </div>
                            )}
                            {mostAdvancedTool && (
                                <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
                                    <Activity size={18} className="mr-2" />
                                    <span>Tool: {mostAdvancedTool}</span>
                                </div>
                            )}
                            {dealSought && (
                                <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
                                    <Layers size={18} className="mr-2" />
                                    <span>Deal Type: {dealSought}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    {Notes && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Notes</h3>
                            <div className="bg-gray-100 text-gray-800 text-justify p-4 rounded-lg flex gap-2">
                                <FileText size={18} className="flex-shrink-0 mt-1" />
                                <p className="">{Notes}</p>
                            </div>
                        </div>
                    )}

                    {/* Data Room Link */}
                    {dataRoomLink && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Data Room</h3>
                            <Link
                                href={dataRoomLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center bg-gray-100 text-gray-800 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <Url size={18} className="mr-2 text-blue-400" />
                                <span className="text-blue-400 hover:underline">Access Data Room</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;