import React, { useEffect, useState } from 'react';
import { styled } from 'twin.macro';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { media } from '../../../../../styles';
import Logo from '../../../../../assets/images/app-logo.png';
import { PIcon } from '../../../../components/PIcon';
import { PButton } from '../../../../components/PButton';
import { PModal } from '../../../../components/PModal';
import { useDispatch, useSelector } from 'react-redux';
import { useSessionSlice } from '../../../../../store/slices/session';
import { getAccessToken } from '../../../../../store/selectors/session';
import { AuthPayLoad } from '../../../../../types/Session';
import { PREVIOUS_STORAGE_KEY, queryString } from '../../../../../utils/constants';
import { useClassSlice } from '../../../../../store/slices/class';
import { getClassList } from '../../../../../store/selectors/class';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

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
  ${(p) =>
    p.isActive &&
    `border-left: 4px solid ${p.theme.backgroundVariant}; background-color: ${p.theme.backgroundSelected};`}
  cursor: pointer;
  margin: 5px;
  font: 700 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
`;

const schoolId = '5f9f1b0b0b9d2c0017b0f1a1';
const LeftBar = () => {
  const [isShowOptionModal, setIsShowOptionModal] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get(queryString.classId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions: sessionActions } = useSessionSlice();
  const { actions: classActions } = useClassSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const previousAuthStorage = localStorage.getItem(PREVIOUS_STORAGE_KEY);
  const previousAuth = JSON.parse(
    previousAuthStorage && previousAuthStorage !== '' ? previousAuthStorage : '{}'
  ) as AuthPayLoad;
  const handleCloseModal = () => {
    setIsShowOptionModal(false);
  };

  const classList = useSelector(getClassList);

  useEffect(() => {
    if (currentAccessToken) {
      dispatch(classActions.loadClassList({ token: currentAccessToken }));
    }
  }, [classActions, currentAccessToken, dispatch]);

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <img src={Logo} alt='Logo' width='50%' />
        </ImageWrapper>
        <ClassListContainer>
          <ClassRowItem
            isActive={classId ? classId === schoolId : false}
            onClick={() =>
              navigate({
                pathname: location.pathname,
                search: `?${queryString.classId}=${schoolId}`,
              })
            }
            key={schoolId}
          >
            General
          </ClassRowItem>
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
      </ContentWrapper>
      <BottomMenu>
        <ActionGroup>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-user-plus' />
            </ActionButton>
            <ActionTitle>Invite Member</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-users' />
            </ActionButton>
            <ActionTitle>Class/Group</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton onClick={() => setIsShowOptionModal(true)}>
              <ActionIcon className='partei-cog' />
            </ActionButton>
            <ActionTitle>Settings</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-question' />
            </ActionButton>
            <ActionTitle>Support</ActionTitle>
          </ActionItem>
        </ActionGroup>
      </BottomMenu>
      <PModal open={isShowOptionModal} onClose={handleCloseModal}>
        <PButton
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
          Click here to logout
        </PButton>
      </PModal>
    </Container>
  );
};

export default LeftBar;
