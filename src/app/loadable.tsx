/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const App = lazyLoad(
  () => import('./index'),
  (module) => module.App,
  {
    fallback: <></>,
  }
);
