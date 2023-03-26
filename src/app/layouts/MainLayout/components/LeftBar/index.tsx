import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { media } from '../../../../../styles';
import Logo from '../../../../../assets/images/app-logo.png';
import { PIcon } from '../../../../components/PIcon';
import { PButton } from '../../../../components/PButton';
import { PModal } from '../../../../components/PModal';
import { useDispatch, useSelector } from 'react-redux';
import { useSessionSlice } from '../../../../../store/slices/session';
import { getAccessToken, getUser } from '../../../../../store/selectors/session';
import { AuthPayLoad } from '../../../../../types/Session';
import { PREVIOUS_STORAGE_KEY, queryString } from '../../../../../utils/constants';
import { useClassSlice } from '../../../../../store/slices/class';
import { getClassList } from '../../../../../store/selectors/class';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getSystemSettings } from '../../../../../store/selectors/config';
import { useTranslation } from 'react-i18next';
import ProfileRow from './ProfileRow';

interface ClassRowProps {
  isActive: boolean;
}

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.contrastBackground};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  height: calc(100vh - ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem);
`;
const BottomMenu = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  background-color: ${(p) => p.theme.contrastBackground};
  box-shadow: -2px -2px 4px rgba(37, 37, 37, 0.1);
`;
const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;
const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ActionTitle = styled.p`
  font-size: ${pxToRem(12)}rem;
  color: ${(p) => p.theme.text};
  text-align: center;
`;
const ActionIcon = styled(PIcon)`
  font-size: ${pxToRem(20)}rem;
`;
const ActionButton = styled(PButton)`
  && {
    background-color: ${(p) => p.theme.contrastBackground};
  }

  color: ${(p) => p.theme.text};
`;

const ClassListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassRowItem = styled.div<ClassRowProps>`
  padding: 6px 15px;
  text-align: start;
  ${(p) => p.isActive && `background-color: ${p.theme.backgroundSelected};`}
  cursor: pointer;
  margin: 5px;
  font: 700 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  border-left: 4px solid ${(p) => p.theme.backgroundVariant};
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;
const SchoolRowItem = styled(ClassRowItem)`
  border-left: 4px solid ${(p) => p.theme.danger};
`;
const SettingModal = styled.div`
  width: 50vw;
  height: 70vh;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  padding: ${pxToRem(15)}rem;
`;
const SettingModalHeader = styled.div`
  margin-bottom: ${pxToRem(20)}rem;
  text-align: center;
  font-size: ${pxToRem(22)}rem;
  font-weight: 700;
`;
const SettingModalBody = styled.div``;
const SettingModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;
const ClassListLabel = styled.div`
  padding: 0 15px 0 25px;
  color: ${(p) => p.theme.textContrast};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${pxToRem(8)}rem;
`;
const ClassListText = styled.p`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
`;
const StyledIcon = styled(PIcon)`
  font-size: ${pxToRem(20)}rem;
  cursor: pointer;
`;
const CategorizedSection = styled.div`
  margin-bottom: ${pxToRem(15)}rem;
`;
const LeftBar = () => {
  const [isShowOptionModal, setIsShowOptionModal] = useState(false);
  const [isShowClassList, setIsShowClassList] = useState(true);
  const [isShowSchoolList, setIsShowSchoolList] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get(queryString.classId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions: sessionActions } = useSessionSlice();
  const { actions: classActions } = useClassSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const currentUser = useSelector(getUser);
  const systemSettings = useSelector(getSystemSettings);
  const previousAuthStorage = localStorage.getItem(PREVIOUS_STORAGE_KEY);
  const previousAuth = JSON.parse(
    previousAuthStorage && previousAuthStorage !== '' ? previousAuthStorage : '{}'
  ) as AuthPayLoad;
  const handleCloseModal = () => {
    setIsShowOptionModal(false);
  };
  const toggleShowClassList = () => {
    setIsShowClassList((prev) => !prev);
  };
  const toggleShowSchoolList = () => {
    setIsShowSchoolList((prev) => !prev);
  };
  const { t } = useTranslation();
  const classList = useSelector(getClassList);
  useEffect(() => {
    if (currentAccessToken && currentUser?.roleId) {
      dispatch(classActions.loadClassList({ token: currentAccessToken, role: currentUser.roleId }));
    }
  }, [classActions, currentAccessToken, currentUser?.roleId, dispatch]);

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <img src={Logo} alt='Logo' width='70%' />
        </ImageWrapper>
        <ProfileRow data={currentUser} />

        <CategorizedSection>
          <ClassListLabel>
            <ClassListText>{t('common.schools')}</ClassListText>
            <StyledIcon
              className={`partei-circle-${isShowSchoolList ? 'down' : 'up'}`}
              onClick={toggleShowSchoolList}
            />
          </ClassListLabel>
          {isShowSchoolList && (
            <ClassListContainer>
              <SchoolRowItem
                isActive={classId ? classId === systemSettings?.schoolInfo?._id : false}
                onClick={() =>
                  navigate({
                    pathname: location.pathname,
                    search: `?${queryString.classId}=${systemSettings?.schoolInfo?._id}`,
                  })
                }
                key={systemSettings?.schoolInfo?._id}
              >
                {systemSettings?.schoolInfo?.name}
              </SchoolRowItem>
            </ClassListContainer>
          )}
        </CategorizedSection>
        <CategorizedSection>
          <ClassListLabel>
            <ClassListText>{t('common.classes')}</ClassListText>
            <StyledIcon
              className={`partei-circle-${isShowClassList ? 'down' : 'up'}`}
              onClick={toggleShowClassList}
            />
          </ClassListLabel>
          {isShowClassList && (
            <ClassListContainer>
              {classList?.data?.map((item) => {
                return (
                  <ClassRowItem
                    isActive={classId ? item._id === classId : false}
                    onClick={() =>
                      navigate({
                        pathname: location.pathname,
                        search: `?${queryString.classId}=${item._id}`,
                      })
                    }
                    key={item._id}
                  >
                    {item.name}
                  </ClassRowItem>
                );
              })}
            </ClassListContainer>
          )}
        </CategorizedSection>
      </ContentWrapper>
      <BottomMenu>
        <ActionGroup>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-user-plus' />
            </ActionButton>
            <ActionTitle>{t('common.inviteMember')}</ActionTitle>
          </ActionItem>
          {/*<ActionItem>*/}
          {/*  <ActionButton>*/}
          {/*    <ActionIcon className='partei-users' />*/}
          {/*  </ActionButton>*/}
          {/*  <ActionTitle>{t('common.classGroup')}</ActionTitle>*/}
          {/*</ActionItem>*/}
          <ActionItem>
            <ActionButton onClick={() => setIsShowOptionModal(true)}>
              <ActionIcon className='partei-cog' />
            </ActionButton>
            <ActionTitle>{t('common.settings')}</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-question' />
            </ActionButton>
            <ActionTitle>{t('common.support')}</ActionTitle>
          </ActionItem>
        </ActionGroup>
      </BottomMenu>
      <PModal open={isShowOptionModal} onClose={handleCloseModal}>
        <SettingModal>
          <SettingModalContainer>
            <SettingModalHeader>{t('common.settings')}</SettingModalHeader>
            <SettingModalBody>
              <StyledButton
                variant='primary'
                onClick={() => {
                  if (previousAuth.accessToken && previousAuth.accessToken !== '') {
                    dispatch(
                      sessionActions.doLogout({
                        userId: previousAuth.user?.data?._id,
                        fcmToken: previousAuth.fcmToken,
                        token: previousAuth.accessToken,
                      })
                    );
                  }
                }}
              >
                {t('common.logout')}
              </StyledButton>
            </SettingModalBody>
          </SettingModalContainer>
        </SettingModal>
      </PModal>
    </Container>
  );
};

export default LeftBar;
