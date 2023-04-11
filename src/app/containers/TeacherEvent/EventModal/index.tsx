import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'store/selectors/config';
import styled from 'styled-components';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw from 'twin.macro';
import { CustomDateInfo, EventRequestForm } from 'types/Event';
import Select from 'react-select';
import { useEventSlice } from 'store/slices/event';
import { getAccessToken, getUser } from 'store/selectors/session';
import PBackdropLoading from 'app/components/PBackdropLoading';
import { getEventActionLoading, getEventLoading } from 'store/selectors/event';
import { ConstantRoles } from 'utils/constants';

interface Props {
  onClose: () => void;
  dateInfo: CustomDateInfo;
}

const Container = styled.div`
  height: 90vh;
  width: 50vw;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.background};
  padding: ${pxToRem(20)}rem;
`;
const FormTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
  margin-bottom: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
`;
const InputContainer = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;
const InputLabel = styled.div`
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
  margin-bottom: ${pxToRem(5)}rem;
`;
const Required = styled.span`
  color: ${(p) => p.theme.danger};
`;
const StyledInput = styled(PInput)`
  background: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem ${pxToRem(20)}rem;
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  width: 100%;
`;
const EventModal: React.FC<Props> = ({ onClose, dateInfo }) => {
  const { t } = useTranslation();
  const userList = useSelector(getUserList);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventRequestForm>({
    defaultValues: {
      title: '',
      participants: [],
    },
  });

  const selectedParticipants = watch('participants');
  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();
  const { actions: eventActions } = useEventSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const eventActionLoading = useSelector(getEventActionLoading);
  const userOptions = React.useMemo(() => {
    return userList
      ? userList.map((user) => ({
          value: user._id,
          label: user.fullname,
        }))
      : [];
  }, [userList]);
  const isEditView = useMemo(() => {
    return !!dateInfo?.title;
  }, [dateInfo]);

  const onSubmit = useCallback(
    (data: EventRequestForm) => {
      // const calendarApi = dateInfo.view.calendar;
      // calendarApi.unselect(); //        clear date selection

      if (currentAccessToken) {
        if (dateInfo.title) {
          if (dateInfo._id) {
            // dateInfo?.event?.remove();
            dispatch(
              eventActions.deleteEvent({ eventId: dateInfo._id, token: currentAccessToken })
            );
          }
        } else {
          // calendarApi.addEvent({
          //   id: Math.random().toString(36).substring(7),
          //   title: data.title,
          //   start: data?.start || dateInfo.startStr,
          //   end: data?.end || dateInfo.endStr,
          //   allDay: data?.allDay || dateInfo.allDay,
          //   participants: data.participants,
          // });
          dispatch(
            eventActions.addEvent({
              title: data.title,
              start: data?.start || dateInfo.startStr,
              end: data?.end || dateInfo.endStr,
              allDay: data?.allDay || dateInfo.allDay,
              participants: data.participants,
              token: currentAccessToken,
              content: data.content,
            })
          );
        }
      }

      onClose();
    },
    [currentAccessToken, dateInfo, dispatch, eventActions, onClose]
  );

  useEffect(() => {
    if (dateInfo) {
      reset({
        title: dateInfo.title,
        participants: dateInfo.participants,
        start: dateInfo.allDay
          ? dateInfo.startStr
          : dateInfo.startStr.substring(0, dateInfo.startStr.length - 6),
        end: dateInfo.allDay
          ? dateInfo.endStr
          : dateInfo.endStr.substring(0, dateInfo.endStr.length - 6),
        content: dateInfo.content,
      });
    }
  }, [reset, dateInfo]);
  return (
    <Container>
      <FormTitle>{isEditView ? 'Event Detail' : 'Create Event'}</FormTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputLabel>{t('form.title')}</InputLabel>
          <StyledInput {...register('title')} disabled={isEditView} />
          {errors.title && <Required>{errors.title.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.content')}</InputLabel>
          <StyledInput {...register('content')} disabled={isEditView} />
          {errors.content && <Required>{errors.content.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.start')}</InputLabel>
          <StyledInput
            {...register('start')}
            type={dateInfo.allDay ? 'date' : 'datetime-local'}
            disabled={isEditView}
          />
          {errors.start && <Required>{errors.start.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.end')}</InputLabel>
          <StyledInput
            {...register('end')}
            type={dateInfo.allDay ? 'date' : 'datetime-local'}
            disabled={isEditView}
          />
          {errors.end && <Required>{errors.end.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.participants')}</InputLabel>
          <Select
            isMulti
            name='colors'
            options={userOptions}
            onChange={(users) =>
              setValue(
                'participants',
                users.map((user) => user.value)
              )
            }
            value={userOptions.filter((user) => selectedParticipants?.includes(user.value))}
            isDisabled={isEditView}
          />

          {errors.participants && <Required>{errors.participants.message}</Required>}
        </InputContainer>
        {currentUser?.roleId !== ConstantRoles.PARENT && (
          <>
            {isEditView ? (
              <StyledButton type='submit' variant='danger'>
                Remove event
              </StyledButton>
            ) : (
              <StyledButton type='submit' variant='primary'>
                Add event
              </StyledButton>
            )}
          </>
        )}
      </FormContainer>
      <PBackdropLoading isShow={eventActionLoading} />
    </Container>
  );
};

export default EventModal;
