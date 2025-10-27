import React from 'react';
import { StudentsTable } from './StudentsTable'; // Import the StudentsTable component
import { Layout } from '@/Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const StudentsList: React.FC = () => {
    const navigate = useNavigate();
    const handleStudentAction = (studentId: string, action: string) => {
        console.log(`Student action: ${action} for student ${studentId}`);
        // Implement logic for edit/view/delete actions here
        if (action === 'edit') {
            // Open an edit modal or navigate to an edit page
            console.log(`Editing student ${studentId}`);
        } else if (action === 'view') {
            // Navigate to student details page
            console.log(`Viewing student ${studentId}`);
        }
    };

    const handleStudentClick = (studentId: string) => {
        navigate(`/student/${studentId}`);
    };

    const handleAddStudent = () => {
        console.log('Add new student clicked');
        // Open a modal for adding a new student
    };

    return (
        <Layout>
            <StudentsTable
                onStudentAction={handleStudentAction}
                onStudentClick={handleStudentClick}
                onAddStudent={handleAddStudent}
            />
        </Layout>
    );
};

export default StudentsList;