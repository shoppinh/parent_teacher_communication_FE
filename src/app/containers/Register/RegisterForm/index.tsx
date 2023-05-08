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
import { ConstantRoles, GENDERS, queryString } from '../../../../utils/constants';
import { getSystemSettings } from '../../../../store/selectors/config';
import { ParentPayload } from 'types/Parent';
import PCheckbox from 'app/components/PCheckbox';
import { PSelection } from 'app/components/PSelection';

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
  margin-bottom: ${pxToRem(5)}rem;
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
const RegisterFormContainer = styled.div`
  ${tw`w-full`}
`;
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const schema = yup.object({
  username: yup
    .string()
    .required('Name cannot be empty')
    .trim('The name cannot include leading and trailing spaces')
    .strict(true),
  password: yup.string().required('Password cannot be empty'),
});

const RegisterForm = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ParentPayload>({
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
    (data: ParentPayload) => {
      dispatch(sessionActions.doRegister(data));
      setIsFormSent(true);
    },
    [dispatch, sessionActions]
  );
  const systemSettings = useSelector(getSystemSettings);

  useEffect(() => {
    if (isFormSent && !authLoading) {
      setIsFormSent(false);
      if (authError) {
        alert('Login failed');
      } else {
        navigate(sitemap.login.link);
      }
    }
  }, [authError, authLoading, isFormSent, navigate, systemSettings?.schoolInfo?._id, user?.roleId]);
  return (
    <RegisterFormContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputLabel>{t('form.username')}</InputLabel>
          <StyledInput {...register('username')} />
          {errors.username && <Required>{errors.username.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.email')}</InputLabel>
          <StyledInput {...register('email')} />
          {errors.email && <Required>{errors.email.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.firstName')}</InputLabel>
          <StyledInput {...register('firstName')} />
          {errors.firstName && <Required>{errors.firstName.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.lastName')}</InputLabel>
          <StyledInput {...register('lastName')} />
          {errors.lastName && <Required>{errors.lastName.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.fullName')}</InputLabel>
          <StyledInput {...register('fullName')} />
          {errors.fullName && <Required>{errors.fullName.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.phoneNumber')}</InputLabel>
          <StyledInput {...register('mobilePhone')} />
          {errors.mobilePhone && <Required>{errors.mobilePhone.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.age')}</InputLabel>
          <StyledInput {...register('age', { valueAsNumber: true })} />
          {errors.age && <Required>{errors.age.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.gender')}</InputLabel>
          <PSelection {...register('gender')}>
            {GENDERS.map((gender) => (
              <option value={gender} key={gender}>
                {t(`common.${gender}`)}
              </option>
            ))}
          </PSelection>
          {errors.gender && <Required>{errors.gender.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.address')}</InputLabel>
          <StyledInput {...register('address')} />
          {errors.address && <Required>{errors.address.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.password')}</InputLabel>
          <StyledInput {...register('password')} type='password' />
          {errors.password && <Required>{errors.password.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.job')}</InputLabel>
          <StyledInput {...register('job')} />
          {errors.job && <Required>{errors.job.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.isActive')}</InputLabel>
          <PCheckbox {...register('isActive')} />
          {errors.isActive && <Required>{errors.isActive.message}</Required>}
        </InputContainer>
        <ActionGroup>
          <StyledButton type='submit' disabled={!isDirty} variant='primary'>
            {t('register.register')}
          </StyledButton>
        </ActionGroup>
      </FormContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
