import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';

const TeacherManagement = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('teacher.home.title')} headerTitle={t('teacher.home.title')}>
      IN PROGRESS
    </MainLayout>
  );
};

export default TeacherManagement;
