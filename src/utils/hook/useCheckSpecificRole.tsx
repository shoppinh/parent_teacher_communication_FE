import { useSelector } from 'react-redux';
import { getAccessToken, getUser } from 'store/selectors/session';
import { ConstantRoles } from '../constants';

export const useCheckSpecificRole = (role: ConstantRoles) => {
  const currentAccessToken = useSelector(getAccessToken);
  const currentUser = useSelector(getUser);
  const isLoggedIn = !!(currentAccessToken && currentAccessToken !== '');
  const isValidRole = isLoggedIn && currentUser?.roleId === role;

  return {
    isValidRole,
    isLoggedIn,
  };
};
