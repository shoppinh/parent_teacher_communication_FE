import { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './constants/style';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    max-width: 100vw !important;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    font-size: ${StyleConstants.BASE_FONT_SIZE}px;
    background-color: ${p => p.theme.background};
  }

  html {
    height: 100vh;
    height: var(--window-height);
  }

  body {
    color: ${p => p.theme.text} !important;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT}px;
    display: flex;
    flex-direction: column;
  }

  body.fontLoaded {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  input::-ms-reveal, input::-ms-clear {
    display: none;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    --bs-gutter-x: 1rem !important;
  }

  .row {
    --bs-gutter-x: ${StyleConstants.BS_GUTTER_X_OVERRIDE}rem !important;
  }

  #root {
    flex: 1 1 auto;
  }

`;
