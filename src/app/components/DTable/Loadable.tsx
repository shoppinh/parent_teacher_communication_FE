/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react';
import { lazyLoad } from '../../../utils/loadable';

export const PTable = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: <></>,
  }
);
