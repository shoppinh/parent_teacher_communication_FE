import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';

const TeacherManagement = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('teacher.home.title')} headerTitle={t('teacher.home.title')}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dignissimos expedita
      explicabo fugit ipsam reprehenderit sed. Aliquam aliquid amet atque beatae consectetur
      corporis dolor dolore dolorem, dolorum ducimus eius eveniet fuga fugiat illo ipsam ipsum iste
      iure iusto minima modi, molestiae nesciunt nobis nulla obcaecati odit perspiciatis praesentium
      quae qui reiciendis rerum suscipit totam vitae voluptas. Ad adipisci animi assumenda, autem
      beatae corporis debitis ducimus inventore magnam molestias nemo placeat quia repellat sed sunt
      voluptate voluptatem? Asperiores at blanditiis consectetur consequuntur, cumque cupiditate
      earum exercitationem expedita fugiat, harum laborum laudantium magnam necessitatibus nihil
      odio officia rem repudiandae temporibus, velit voluptate. Deleniti deserunt ducimus esse
    </MainLayout>
  );
};

export default TeacherManagement;
