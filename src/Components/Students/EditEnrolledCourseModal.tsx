import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/Components/global/button';

interface Course {
    id: string;
    name: string;
    schedule: string;
    timeSlot: string;
    faculty: string;
    students: number;
    planned: number;
    completed: number;
    enrolledOn: string;
}

interface EditEnrolledCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (courseData: Course) => void;
    course: Course;
}

interface InputFieldProps {
    label: string;
    name: keyof Course;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const EditEnrolledCourseModal: React.FC<EditEnrolledCourseModalProps> = ({ isOpen, onClose, onSubmit, course }) => {
    const [formData, setFormData] = useState<Course>(course);

    useEffect(() => {
        setFormData(course);
    }, [course, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target as { name: keyof Course, value: string, type: string };
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value as any }));
    };

    const handleHoursChange = (increment: boolean) => {
        const newValue = increment ? formData.planned + 1 : Math.max(1, formData.planned - 1);
        setFormData(prev => ({ ...prev, planned: newValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Edit Course - <span className="font-medium">{course.name}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Course Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-800">Course Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Course Name" name="name" value={formData.name} onChange={handleInputChange as any} />
                            <div>
                                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                                <div className="relative">
                                    <select id="schedule" name="schedule" value={formData.schedule} onChange={handleInputChange as any} className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="Mon, Tue, Wed">Mon, Tue, Wed</option>
                                        <option value="Tue, Thu">Tue, Thu</option>
                                        <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
                                        <option value="Wed, Fri">Wed, Fri</option>
                                        <option value="Mon, Thu">Mon, Thu</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">Assigned Faculty (Optional)</label>
                                <div className="relative">
                                    <select id="faculty" name="faculty" value={formData.faculty} onChange={handleInputChange as any} className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="Michael Jones">Michael Jones</option>
                                        <option value="Sarah Smith">Sarah Smith</option>
                                        <option value="Emily Davis">Emily Davis</option>
                                        <option value="David Wilson">David Wilson</option>
                                        <option value="Jessica Lee">Jessica Lee</option>
                                        <option value="Chris Taylor">Chris Taylor</option>
                                        <option value="Alex Morgan">Alex Morgan</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">Assigned Students (Optional)</label>
                                <div className="relative">
                                    <select id="students" name="students" value={formData.students} onChange={handleInputChange as any} className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Class Duration Section */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-800">Class Duration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField label="Start Time" name="timeSlot" type="time" value={formData.timeSlot.split('-')[0] || ''} onChange={(e) => handleInputChange(e as any)} className="[appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden" />
                            <InputField label="End Time" name="timeSlot" type="time" value={formData.timeSlot.split('-')[1] || ''} className="[appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden" onChange={(e) => {
                                const startTime = formData.timeSlot.split('-')[0] || '';
                                handleInputChange({ target: { name: 'timeSlot', value: `${startTime}-${e.target.value}` } } as any);
                            }} />
                            <div>
                                <label htmlFor="planned" className="block text-sm font-medium text-gray-700 mb-1">Total Class Hours</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="planned"
                                        name="planned"
                                        value={formData.planned}
                                        onChange={handleInputChange as any}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                                        <button type="button" onClick={() => handleHoursChange(true)} className="p-0.5 hover:bg-gray-100 rounded">
                                            <ChevronUp className="w-3 h-3 text-gray-600" />
                                        </button>
                                        <button type="button" onClick={() => handleHoursChange(false)} className="p-0.5 hover:bg-gray-100 rounded">
                                            <ChevronDown className="w-3 h-3 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Update</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEnrolledCourseModal;