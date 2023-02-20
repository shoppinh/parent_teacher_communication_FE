import React, { useLayoutEffect } from 'react';
import { sizes } from 'styles/media';

import { currencyList, DEFAULT_LOCALE } from './localization/config';

/**
 * Get query string
 *
 * @param   {*}   query   query object (any object that Object.entries() can handle)
 * @returns {string}      query string
 */
export function qsBuilder(query: Record<string | number, any> = {}) {
  // get array of key value pairs ([[k1, v1], [k2, v2]])
  const qs = Object.entries(query)
    // filter pairs with undefined value
    .filter((pair) => pair[1] !== undefined)
    // encode keys and values, remove the value if it is null, but leave the key
    .map((pair) =>
      pair
        .filter((i) => i !== null)
        .map(encodeURIComponent)
        .join('=')
    )
    .join('&');

  return qs && '?' + qs;
}

export function setRef<T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef<Instance>(
  refA: React.Ref<Instance> | null | undefined,
  refB: React.Ref<Instance> | null | undefined
): React.Ref<Instance> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

// import * as React from 'react';
// import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return React.useCallback(
    (...args: Args) =>
      // @ts-expect-error hide `this`
      // tslint:disable-next-line:ban-comma-operator
      (0, ref.current!)(...args),
    []
  );
}

export default function debounce(func, wait = 166) {
  let timeout;

  function debounced(...args) {
    const later = () => {
      func.apply(debounced, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

export const reflow = (node: Element) => node.scrollTop;

export function getScrollbarSize(doc: Document): number {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

export function capitalizeFirstLetter(string: string | undefined | null) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

export function isStringEmpty(string: string | undefined | null) {
  return !string || string === '';
}

export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function numberFormat(num: number | string) {
  if (typeof num === 'string') {
    return parseInt(num).toLocaleString(DEFAULT_LOCALE);
  }
  return num.toLocaleString(DEFAULT_LOCALE);
}

export function currencyMapper(currency: string) {
  return currencyList[currency] ? currencyList[currency] : currency;
}

// Alt just use for checking is rendering what image
export function isElementInView(el: Element | null, isOutofView = false, alt = '') {
  if (el) {
    const rect = el.getBoundingClientRect();
    return !isOutofView
      ? rect.top >= 0 &&
          rect.left >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)
      : rect.height - rect.top >= 0 &&
          rect.width - rect.left >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }
  return false;
}

export function isMobileView(width: number | undefined | null) {
  if (width) {
    return width < parseInt(sizes.md.slice(0, -2));
  }
  return window.innerWidth < parseInt(sizes.md.slice(0, -2));
}

export function isTabletView(width: number | undefined | null) {
  if (width) {
    return width < parseInt(sizes.lg.slice(0, -2));
  }
  return window.innerWidth < parseInt(sizes.lg.slice(0, -2));
}

export function objectToQueryString(obj: any = {}) {
  const str: string[] = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
}

export function correctValid24h(time: string) {
  const hour = Number(time.split(':')[0]);
  return hour >= 24 ? '23:59:59' : time;
}

export function calculateDiscount(checkoutTotal: number, discountRate: number) {
  return checkoutTotal > 0 ? Math.round((checkoutTotal * discountRate) / 100) : 0;
}

export function isiOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export const checkiOSVersion = () => {
  const agent = window.navigator.userAgent,
    start = agent.indexOf('OS ');
  if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
    return window.Number(agent.substr(start + 3, 3).replace('_', '.'));
  }
  return 0;
};

export const isMatchPerformanceToolUserAgent = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const rgx = new RegExp(
    /lighthouse|speedcurve|page speed|headless|webpagetest|screaming frog|addthis|PTST|googlebot|adsbot|feedfetcher|mediapartners|spider|bingbot|apica/g
  );
  return !!(userAgent != null && rgx.exec(userAgent));
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
