import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import { useTranslation } from 'react-i18next';
import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import MainLayout from '../../layouts/MainLayout';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEventList, getEventLoading } from 'store/selectors/event';
import { getAccessToken } from 'store/selectors/session';
import { useEventSlice } from 'store/slices/event';
import { CustomDateInfo } from 'types/Event';
import { PModal } from 'app/components/PModal';
import EventModal from 'app/containers/TeacherEvent/EventModal';
import viLocale from '@fullcalendar/core/locales/vi';
import enLocale from '@fullcalendar/core/locales/en-gb';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
const TabsWrapper = styled.div`
  display: flex;
  ${tw`p-2`}
  justify-content: space-between;
  height: ${pxToRem(StyleConstants.TAB_HEIGHT)}rem;
  background-color: ${(p) => p.theme.background};
`;

const StyledTabs = styled(TabsUnstyled)`
  height: 100%;
`;
const CalendarContainer = styled.div`
  height: calc(100% - ${pxToRem(StyleConstants.TAB_HEIGHT)}rem);
  overflow: auto;
  padding: ${pxToRem(20)}rem;
`;

const ParentEvent = () => {
  const { t } = useTranslation();
  const [currentEvents, setCurrentEvents] = React.useState<EventInput[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = React.useState<CustomDateInfo>();
  const { actions: eventActions } = useEventSlice();
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const eventList = useSelector(getEventList);
  const eventLoading = useSelector(getEventLoading);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedDateInfo({
      startStr: clickInfo.event.startStr,
      endStr: clickInfo.event.endStr,
      title: clickInfo.event.title,
      allDay: clickInfo.event.allDay,
      participants: clickInfo.event.extendedProps.participants,
      view: clickInfo.view,
      event: clickInfo.event,
      _id: clickInfo.event.extendedProps._id,
      content: clickInfo.event.extendedProps.content,
    });

    setIsEventModalOpen(true);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(eventActions.loadEventList({ token: accessToken }));
    }
  }, [accessToken, dispatch, eventActions]);
  return (
    <MainLayout
      title={t('parent.home.title')}
      headerTitle={t('parent.home.title')}
      isShowSchoolAndClassList={false}
    >
      <StyledTabs defaultValue={0}>
        <TabsWrapper></TabsWrapper>
        {!eventLoading ? (
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
              events={eventList.data}
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
        ) : (
          <PLoadingIndicator />
        )}
      </StyledTabs>
      {selectedDateInfo && (
        <PModal open={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
          <EventModal onClose={() => setIsEventModalOpen(false)} dateInfo={selectedDateInfo} />
        </PModal>
      )}
    </MainLayout>
  );
};

export default ParentEvent;
