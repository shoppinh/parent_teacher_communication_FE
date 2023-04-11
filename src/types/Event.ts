import { ViewApi } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';

export interface Event {
  _id: string;
  title: string;
  content: string;
  start: string;
  end: string;
  allDay: boolean;
  participants: string[];
}

export type EventRequestForm = Omit<Event, '_id'>;

export interface CustomDateInfo {
  _id: string;
  startStr: string;
  endStr: string;
  allDay: boolean;
  title: string;
  content: string;
  participants: string[];
  view: ViewApi;
  event?: EventImpl;
}

export interface EventState {
  data: EventListResponse;
  error: EventError | null;
  loading: boolean;
  actionLoading: boolean;
}

export interface EventError {
  code: EventErrorType | null;
  message?: string;
}

export enum EventErrorType {
  RESPONSE_ERROR = 400,
}

export interface EventListQuery {
  token: string;
  sort?: string;
  skip?: number;
  limit?: number;
  search?: string;
}

export interface EventDetailQuery {
  token: string;
  eventId: string;
}

export interface EventListResponse {
  data: Event[];
  total: number;
}

export type AddEventQuery = EventRequestForm & {
  token: string;
};
