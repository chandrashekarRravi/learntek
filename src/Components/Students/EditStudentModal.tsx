import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/Components/global/button';

interface Student {
  id: string;
  name: string;
  grade: string;
  dateOfBirth: string;
  email: string;
  mobile: string;
  parentName: string;
  parentEmail: string;
  parentMobile: string;
}

interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (studentData: Student) => void;
    student: Student;
}

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
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

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, onSubmit, student }) => {
    const [formData, setFormData] = useState<Student>(student);

    React.useEffect(() => {
        setFormData(student);
    }, [student, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as { name: keyof Student, value: string };
        setFormData(prev => ({ ...prev, [name]: value }));
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
                    <h2 className="text-base font-medium text-gray-900">
                        Edit student - <span className="font-mono">{student.id}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                            <div className="relative">
                                <select
                                    id="grade"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleInputChange}
                                    className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {['9', '10', '11', '12'].map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
                        <InputField label="Student Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                        <InputField label="Student Mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                        <InputField label="Parent Name" name="parentName" value={formData.parentName} onChange={handleInputChange} />
                        <InputField label="Parent Email" name="parentEmail" type="email" value={formData.parentEmail} onChange={handleInputChange} />
                        <InputField label="Parent Mobile" name="parentMobile" value={formData.parentMobile} onChange={handleInputChange} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Update</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudentModal;