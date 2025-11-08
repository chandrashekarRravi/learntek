import React from 'react';
import { X, ChevronDown, Clock } from 'lucide-react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (courseData: CourseFormData) => void;
}

interface CourseFormData {
    courseName: string;
    schedule: string;
    faculty: string;
    students: string;
    startTime: string;
    endTime: string;
    totalHours: number;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState<CourseFormData>({
        courseName: '',
        schedule: '',
        faculty: '',
        students: '',
        startTime: '',
        endTime: '',
        totalHours: 0,
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleInputChange = (field: keyof CourseFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.courseName.trim()) {
            newErrors.courseName = 'Course name is required';
        }
        if (!formData.totalHours || formData.totalHours <= 0) {
            newErrors.totalHours = 'Total class hours must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            courseName: '',
            schedule: '',
            faculty: '',
            students: '',
            startTime: '',
            endTime: '',
            totalHours: 0,
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;
//add the comments every time. 
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create Course</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Course Details Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Course Name */}
                            <div className="md:col-span-2">
                                <TextField
                                    label="Course Name*"
                                    placeholder="Enter course name"
                                    value={formData.courseName}
                                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                                    error={!!errors.courseName}
                                    helperText={errors.courseName}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                />
                            </div>

                            {/* Schedule */}
                            <div>
                                <Select
                                    value={formData.schedule}
                                    onChange={(e) => handleInputChange('schedule', e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    sx={{ minHeight: '40px' }}
                                >
                                    <MenuItem value="">
                                        <em>Select days</em>
                                    </MenuItem>
                                    <MenuItem value="Mon, Wed, Fri">Mon, Wed, Fri</MenuItem>
                                    <MenuItem value="Tue, Thu">Tue, Thu</MenuItem>
                                    <MenuItem value="Mon, Tue, Wed">Mon, Tue, Wed</MenuItem>
                                    <MenuItem value="Wed, Fri">Wed, Fri</MenuItem>
                                    <MenuItem value="Mon, Thu">Mon, Thu</MenuItem>
                                </Select>
                            </div>

                            {/* Assign Faculty */}
                            <div>
                                <Select
                                    value={formData.faculty}
                                    onChange={(e) => handleInputChange('faculty', e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    sx={{ minHeight: '40px' }}
                                >
                                    <MenuItem value="">
                                        <em>Select faculty</em>
                                    </MenuItem>
                                    <MenuItem value="Michael Jones">Michael Jones</MenuItem>
                                    <MenuItem value="Sarah Smith">Sarah Smith</MenuItem>
                                    <MenuItem value="Emily Davis">Emily Davis</MenuItem>
                                    <MenuItem value="David Wilson">David Wilson</MenuItem>
                                    <MenuItem value="Jessica Lee">Jessica Lee</MenuItem>
                                    <MenuItem value="Chris Taylor">Chris Taylor</MenuItem>
                                    <MenuItem value="Alex Morgan">Alex Morgan</MenuItem>
                                </Select>
                            </div>

                            {/* Assign Students */}
                            <div className="md:col-span-2">
                                <Select
                                    value={formData.students}
                                    onChange={(e) => handleInputChange('students', e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    sx={{ minHeight: '40px' }}
                                >
                                    <MenuItem value="">
                                        <em>Select students</em>
                                    </MenuItem>
                                    <MenuItem value="John Doe">John Doe</MenuItem>
                                    <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                                    <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                                    <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                                    <MenuItem value="David Brown">David Brown</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Class Duration Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Class Duration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            {/* Start Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* "to" text */}
                            <div className="flex justify-center">
                                <span className="text-gray-500 font-medium">to</span>
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Total Class Hours */}
                        <div className="mt-4">
                            <TextField
                                label="Total Class Hours*"
                                type="number"
                                placeholder="Enter hours"
                                value={formData.totalHours || ''}
                                onChange={(e) => handleInputChange('totalHours', parseInt(e.target.value) || 0)}
                                error={!!errors.totalHours}
                                helperText={errors.totalHours}
                                fullWidth
                                variant="outlined"
                                size="small"
                                inputProps={{ min: 1 }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourseModal;
