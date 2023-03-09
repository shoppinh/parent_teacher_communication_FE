import { useScrollPosition } from './useScrollPosition';
import { useWindowSize } from './useWindowSize';
import { useLocation } from 'react-router-dom';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export {
  useScrollPosition,
  useQuery,
  useWindowSize,
  // useCart
};
