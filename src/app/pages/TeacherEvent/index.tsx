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
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { PModal } from 'app/components/PModal';
import EventModal from 'app/containers/TeacherEvent/EventModal';
import { CustomDateInfo } from 'types/Event';

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

const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const INITIAL_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: '2',
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
];

const TeacherEvent = () => {
  const { t } = useTranslation();
  const [currentEvents, setCurrentEvents] = React.useState<EventInput[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = React.useState<CustomDateInfo>();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setIsEventModalOpen(true);
    setSelectedDateInfo({
      startStr: selectInfo.startStr,
      endStr: selectInfo.endStr,
      title: '',
      allDay: selectInfo.allDay,
      view: selectInfo.view,
    });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedDateInfo({
      startStr: clickInfo.event.startStr,
      endStr: clickInfo.event.endStr,
      title: clickInfo.event.title,
      allDay: clickInfo.event.allDay,
      view: clickInfo.view,
      event: clickInfo.event,
    });

    setIsEventModalOpen(true);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

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
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </CalendarContainer>
      {selectedDateInfo && (
        <PModal open={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
          <EventModal onClose={() => setIsEventModalOpen(false)} dateInfo={selectedDateInfo} />
        </PModal>
      )}
    </MainLayout>
  );
};

export default TeacherEvent;
