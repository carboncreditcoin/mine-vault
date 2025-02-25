import { formatText } from '@/app/lib/formatText';
import { useState, useEffect, useRef } from 'react';
import { FilterX, Check, Filter } from 'lucide-react';

const DropdownFilter = ({
    type = 'multiple',
    title,
    options,
    value,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        if (type === 'multiple') {
            const newValue = Array.isArray(value) ? [...value] : [];
            const index = newValue.indexOf(option);

            if (index === -1) {
                newValue.push(option);
            } else {
                newValue.splice(index, 1);
            }

            onChange(newValue);
        } else {
            if (option === 'None') {
                onChange([]);
            } else {
                onChange([option]);
            }
            setIsOpen(false);
        }
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 border rounded-md flex items-center justify-between gap-2 capitalize w-full
                    ${(Array.isArray(value) && value.length > 0) ? 'bg-black text-white' : 'bg-white'}`}
            >
                <div className="flex items-center gap-2">
                    {formatText(title)}
                    {/* <span className="ml-2">
                        {Array.isArray(value) && value.length > 0 ? `(${value[0]})` : '\u00A0'}
                    </span> */}
                </div>
                {
                    isOpen ?
                        <FilterX className="w-4 h-4" />
                        :
                        <Filter className="w-4 h-4" />
                }
            </button>

            {isOpen && (
                <div className="absolute z-40 w-64 max-h-96 overflow-y-auto mt-1 bg-white border rounded-md shadow-lg">
                    <div className="py-1">
                        {type === 'single' && (
                            <div
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect('None')}
                            >
                                <div className="w-4 h-4 border border-gray-300 rounded-full mr-2 flex items-center justify-center">
                                    {value?.length === 0 && (
                                        <div className="w-2 h-2 bg-black rounded-full" />
                                    )}
                                </div>
                                <span>None</span>
                            </div>
                        )}
                        {options?.map(option => (
                            <div
                                key={option}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                {type === 'single' ? (
                                    <div className="w-4 h-4 border border-gray-300 rounded-full mr-2 flex items-center justify-center">
                                        {value?.includes(option) && (
                                            <div className="w-2 h-2 bg-black rounded-full" />
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-4 h-4 border border-gray-300 rounded mr-2 flex items-center justify-center">
                                        {value.includes(option) && (
                                            <Check className="w-3 h-3" />
                                        )}
                                    </div>
                                )}
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownFilter;