// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations

import { Direction } from 'types/Layout';

export enum StyleConstants {
  HEADER_HEIGHT = 70,
  FONT_FAMILY = "'Roboto', Helvetica, Arial, sans-serif",
  BASE_FONT_SIZE = 14,
  BASE_LINE_HEIGHT = 24,
  LEFT_BAR_WIDTH = 300,
  TAB_HEIGHT = 50,
}

export const position = {
  sidebar: 'right' as Direction,
  cart: 'left' as Direction,
};

// to learn when use what timing
export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

export const zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1000,
  header: 1111,
  catBar: 1110,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
  warningBar: 1250,
  conversation: 2050,
};
