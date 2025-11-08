import React from 'react';
import { X, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import MUIDialog, { MUIDialogTitle, MUIDialogContent, MUIDialogActions } from '@/Components/mui/Dialog';
import Button from '@/Components/mui/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface EditCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (courseData: CourseFormData) => void;
    initialData: CourseFormData;
}

interface CourseFormData {
    name: string;
    schedule: string;
    faculty: string;
    students: string;
    startTime: string;
    endTime: string;
    totalHours: number;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = React.useState<CourseFormData>(initialData);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    // Update form data when initialData changes
    React.useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleInputChange = (field: keyof CourseFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleHoursChange = (increment: boolean) => {
        const newValue = increment ? formData.totalHours + 1 : Math.max(1, formData.totalHours - 1);
        handleInputChange('totalHours', newValue);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Course name is required';
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
        setFormData(initialData);
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <MUIDialog open={isOpen} onClose={handleClose} maxWidth="lg">
            <MUIDialogTitle>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Course</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </MUIDialogTitle>

            <MUIDialogContent dividers>
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-0 space-y-8">
                    {/* Course Details Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Course Name */}
                            <div>
                                <TextField
                                    label="Course Name*"
                                    placeholder="Enter course name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
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
                                    <MenuItem value="Mon, Tue, Thu">Mon, Tue, Thu</MenuItem>
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
                                    <MenuItem value="Williamson">Williamson</MenuItem>
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
                            <div>
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
                                    <MenuItem value="Harry (+2 more)">Harry (+2 more)</MenuItem>
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
                                <TextField
                                    label="Start Time"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <Clock className="w-5 h-5 text-gray-400 pointer-events-none" />
                                        ),
                                    }}
                                />
                            </div>

                            {/* "to" text */}
                            <div className="flex justify-center">
                                <span className="text-gray-500 font-medium">to</span>
                            </div>

                            {/* End Time */}
                            <div>
                                <TextField
                                    label="End Time"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <Clock className="w-5 h-5 text-gray-400 pointer-events-none" />
                                        ),
                                    }}
                                />
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
                                InputProps={{
                                    endAdornment: (
                                        <div className="flex flex-col">
                                            <button
                                                type="button"
                                                onClick={() => handleHoursChange(true)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                            >
                                                <ChevronUp className="w-3 h-3 text-gray-500" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleHoursChange(false)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                            >
                                                <ChevronDown className="w-3 h-3 text-gray-500" />
                                            </button>
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="default">
                            Update
                        </Button>
                    </div>
                </form>
            </MUIDialogContent>
        </MUIDialog>
    );
};

export default EditCourseModal;