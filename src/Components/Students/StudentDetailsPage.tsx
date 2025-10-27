import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/Components/Layout/Layout';
import StudentDetails from '@/Components/Students/StudentDetails';

const StudentDetailsPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/students');
  };

  return (
    <Layout>
      <StudentDetails studentId={studentId || ''} onBack={handleBack} />
    </Layout>
  );
};

export default StudentDetailsPage;