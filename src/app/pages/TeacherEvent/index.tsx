import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import enLocale from '@fullcalendar/core/locales/en-gb';
import tw, { styled } from 'twin.macro';
import { pxToRem } from 'styles/theme/utils';
import { StyleConstants } from 'styles/constants/style';

const CalendarContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding: ${pxToRem(20)}rem;
`;
const TabsWrapper = styled.div`
  display: flex;
  ${tw`p-2`}
  justify-content: space-between;
  height: ${pxToRem(StyleConstants.TAB_HEIGHT)}rem;
  background-color: ${(p) => p.theme.background};
`;

const TeacherEvent = () => {
  const { t } = useTranslation();
  return (
    <MainLayout
      title={t('teacher.event.title')}
      headerTitle={t('teacher.event.title')}
      isShowSchoolAndClassList={false}
    >
      <TabsWrapper></TabsWrapper>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          locales={[viLocale, enLocale]}
          locale='vi'
        />
      </CalendarContainer>
    </MainLayout>
  );
};

export default TeacherEvent;
