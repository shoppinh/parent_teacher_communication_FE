import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { AddEventQuery, EventDetailQuery, EventListQuery } from 'types/Event';

export const getEventList = async (query: EventListQuery) => {
  const { token, ...paginationPayload } = query;
  return new apiClient(token || '').post(APIs.event.getEventList, paginationPayload);
};

export const getEventDetail = async (query: EventDetailQuery) => {
  const { token, eventId } = query;
  const endPoint = APIs.event.getEventDetail.replace('{eventId}', eventId);
  return new apiClient(token || '').get(endPoint);
};

export const createEvent = async (query: AddEventQuery) => {
  const { token, ...eventPayload } = query;

  return new apiClient(token || '').post(APIs.event.addEvent, eventPayload);
};

export const removeEvent = async (query: EventDetailQuery) => {
  const { token, eventId } = query;
  const endPoint = APIs.event.deleteEvent.replace('{eventId}', eventId);
  return new apiClient(token || '').delete(endPoint);
};
