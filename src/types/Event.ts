import { ViewApi } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";

export interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  participants: string[];
}

export type EventRequestForm = Omit<Event, '_id'>;

export interface CustomDateInfo {
  startStr: string;
  endStr: string;
  allDay: boolean;
  title: string;
  view: ViewApi;
  event?: EventImpl;
}
