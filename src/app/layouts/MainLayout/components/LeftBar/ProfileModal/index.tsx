import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAccessToken, getAuthError, getAuthLoading, getUser } from 'store/selectors/session';
import { useSessionSlice } from 'store/slices/session';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { UserPayload } from 'types/User';
import AvatarPlaceholder from '../../../../../../assets/images/person-placeholder.png';
import { uploadFile } from 'services/api/config';

const Container = styled.div`
  width: 50vw;
  height: 90vh;
  overflow: auto;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  padding: ${pxToRem(15)}rem;
`;
const ProfileModalHeader = styled.div`
  margin-bottom: ${pxToRem(20)}rem;
  text-align: center;
  font-size: ${pxToRem(22)}rem;
  font-weight: 700;
`;
const ProfileModalBody = styled.div``;
const ProfileModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
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
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;
const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${pxToRem(20)}rem;
`;
const Avatar = styled.img<AvatarProps>`
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center center;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-left: ${pxToRem(10)}rem;
  cursor: pointer;
`;

interface Props {
  onClose: () => void;
}
interface AvatarProps {
  src: string;
}
const ProfileModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { actions: sessionActions } = useSessionSlice();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(getAccessToken);
  const authError = useSelector(getAuthError);
  const authLoading = useSelector(getAuthLoading);
  const userInfo = useSelector(getUser);
  const [logoUrl, setLogoUrl] = useState(userInfo?.avatar || '');
  const onSubmit = useCallback(
    (data: UserPayload) => {
      if (currentAccessToken) {
        dispatch(
          sessionActions.updateUserInfo({
            token: currentAccessToken,
            mobilePhone: data.mobilePhone,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            ...(data.password && { password: data.password }),
            roleId: data.roleId,
            fullname: data.fullname,
            username: data.username,
            avatar: data.avatar,
          })
        );
      }

      setIsFormSent(true);
    },
    [currentAccessToken, dispatch, sessionActions]
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UserPayload>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef?.current?.click();
  };

  const handleLogoChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      // Upload file and set logoUrl
      try {
        const response = await uploadFile({ file });
        if (response.data && response.data.status !== 400) {
          setLogoUrl(response.data.url);
          setValue('avatar', response.data.url, {
            shouldDirty: true,
          });
        }
      } catch (e) {
        console.log('🚀 ~ file: index.tsx:197 ~ handleLogoChange: ~ e', e);
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [reset, userInfo]);

  useEffect(() => {
    if (isFormSent && !authLoading && !authError) {
      setIsFormSent(false);
      toast.success('Thành công');
      onClose();
    } else if (isFormSent && !authLoading && authError) {
      toast.error(authError.message);
      setIsFormSent(false);
    }
  }, [isFormSent, onClose, authError, authLoading]);

  return (
    <Container>
      <ProfileModalContainer>
        <ProfileModalHeader>{t('common.profile')}</ProfileModalHeader>
        <ProfileModalBody>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <AvatarSection>
              <Avatar src={logoUrl ? logoUrl : AvatarPlaceholder} onClick={handleLogoClick} />
              <input
                id='logo-input'
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleLogoChange}
                style={{ display: 'none' }}
              />
            </AvatarSection>
            <InputContainer>
              <InputLabel>{t('form.email')}</InputLabel>
              <StyledInput {...register('email')} required />
              {errors.email && <Required>{errors.email.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.firstName')}</InputLabel>
              <StyledInput {...register('firstname')} required />
              {errors.firstname && <Required>{errors.firstname.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.lastName')}</InputLabel>
              <StyledInput {...register('lastname')} required />
              {errors.lastname && <Required>{errors.lastname.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.fullName')}</InputLabel>
              <StyledInput {...register('fullname')} required />
              {errors.fullname && <Required>{errors.fullname.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.username')}</InputLabel>
              <StyledInput {...register('username')} required />
              {errors.username && <Required>{errors.username.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('table.phoneNumber')}</InputLabel>
              <StyledInput {...register('mobilePhone')} required />
              {errors.mobilePhone && <Required>{errors.mobilePhone.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.role')}</InputLabel>
              <StyledInput {...register('roleId')} required />
              {errors.roleId && <Required>{errors.roleId.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.password')}</InputLabel>
              <StyledInput {...register('password')} type='password' />
              {errors.password && <Required>{errors.password.message}</Required>}
            </InputContainer>
            <ActionGroup>
              <StyledButton type='submit' disabled={!isDirty} variant='primary'>
                {t('form.save')}
              </StyledButton>
            </ActionGroup>
          </FormContainer>
        </ProfileModalBody>
      </ProfileModalContainer>
      <PBackdropLoading isShow={authLoading || false} />
    </Container>
  );
};

export default ProfileModal;
