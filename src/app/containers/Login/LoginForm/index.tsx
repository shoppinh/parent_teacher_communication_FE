import React, { useCallback, useEffect } from 'react';
import { PButton } from '../../../components/PButton';
import { pxToRem } from '../../../../styles/theme/utils';
import { StyleConstants } from '../../../../styles/constants/style';
import tw, { styled } from 'twin.macro';
import { useTranslation } from 'react-i18next';
import PInput from '../../../components/PInput';
import { useForm } from 'react-hook-form';
import { AuthQuery } from '../../../../types/Session';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSessionSlice } from '../../../../store/slices/session';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, getAuthLoading, getUser } from '../../../../store/selectors/session';
import { useNavigate } from 'react-router-dom';
import sitemap from '../../../../utils/sitemap';
import {ConstantRoles, queryString} from '../../../../utils/constants';

const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;

const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
`;
const InputContainer = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;

const InputLabel = styled.div`
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
`;
const Required = styled.span`
  color: ${(p) => p.theme.danger};
`;
const StyledInput = styled(PInput)`
  background: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem ${pxToRem(20)}rem;
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  width: 100%;
`;
const LoginFormContainer = styled.div`
  ${tw`w-full`}
`;
const schema = yup.object({
  username: yup
    .string()
    .required('Name cannot be empty')
    .trim('The name cannot include leading and trailing spaces')
    .strict(true),
  password: yup.string().required('Password cannot be empty'),
});
const schoolId = '5f9f1b0b0b9d2c0017b0f1a1';

const LoginForm = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isDirty },
  } = useForm<AuthQuery>({
    defaultValues: {
      username: '',
    },
    resolver: yupResolver(schema),
  });
  const { actions: sessionActions } = useSessionSlice();
  const dispatch = useDispatch();
  const authLoading = useSelector(getAuthLoading);
  const authError = useSelector(getAuthError);
  const user = useSelector(getUser);
  const [isFormSent, setIsFormSent] = React.useState(false);
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: AuthQuery) => {
      dispatch(sessionActions.doLogin(data));
      setIsFormSent(true);
    },
    [dispatch, sessionActions]
  );
  useEffect(() => {
    if (isFormSent && !authLoading) {
      setIsFormSent(false);
      if (authError) {
        alert('Login failed');
      } else {
        if (user?.roleId === ConstantRoles.TEACHER) {
          navigate({
            pathname: sitemap.teacherHome.link,
            search: `?${queryString.classId}=${schoolId}`,
          });
        } else if (user?.roleId === ConstantRoles.PARENT) {
          navigate({
            pathname: sitemap.parentHome.link,
            search: `?${queryString.classId}=${schoolId}`,
          });
        } else {
          navigate(sitemap.adminHome.link);
        }
      }
    }
  }, [authError, authLoading, isFormSent, navigate, user?.roleId]);
  return (
    <LoginFormContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputLabel>{t('form.emailOrPhone')}</InputLabel>
          <StyledInput {...register('username')} />
          {errors.username && <Required>{errors.username.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.password')}</InputLabel>
          <StyledInput {...register('password')} type='password' />
          {errors.password && <Required>{errors.password.message}</Required>}
        </InputContainer>
        <StyledButton type='submit' disabled={!isDirty} variant='primary'>
          {t('login.login')}
        </StyledButton>
        <StyledButton variant='secondary'>{t('login.forgotPassword')}</StyledButton>
      </FormContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
