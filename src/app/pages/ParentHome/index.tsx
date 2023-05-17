import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';

import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import FeedList from '../../containers/TeacherHomePage/FeedList';
import WelcomePage from '../../containers/Welcome/Parent';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../store/selectors/session';
import { useStudentSlice } from '../../../store/slices/student';
import ClassInfo from '../../containers/ClassInfo';
import { useQuery } from '../../../utils/hook';
import { queryString } from '../../../utils/constants';
import { useClassSlice } from '../../../store/slices/class';
import { getCurrentClass } from '../../../store/selectors/class';
import { getSchoolInfo } from '../../../store/selectors/config';
import { useNavigate } from 'react-router-dom';

const TabsWrapper = styled.div`
  display: flex;
  ${tw`p-2`}
  justify-content: space-between;
  height: ${pxToRem(StyleConstants.TAB_HEIGHT)}rem;
  background-color: ${(p) => p.theme.background};
`;
const StyledTabsList = styled(TabsListUnstyled)``;
const StyledTab = styled(TabUnstyled)`
  ${tw`p-2`}
  color: ${(p) => p.theme.placeholder};
  font-weight: bold;
  font-size: ${pxToRem(16)}rem;

  &.${tabUnstyledClasses.selected} {
    color: ${(p) => p.theme.text};
    border-bottom: 3px solid ${(p) => p.theme.backgroundVariant};
  }
`;
// const StyledButton = styled(PButton)`
//   ${tw`rounded-full`}
//   font-weight: bold;
//   font-size: ${pxToRem(16)}rem;
//   padding: 0 ${pxToRem(25)}rem;
// `;
const TabPaneContent = styled.div`
  ${tw`p-3`}
  overflow: auto;
  height: calc(100% - ${pxToRem(StyleConstants.TAB_HEIGHT)}rem);
`;
const StyledTabs = styled(TabsUnstyled)`
  height: 100%;
`;

const ParentHomePage = () => {
  const { t } = useTranslation();
  const [isRefreshFeedList, setIsRefreshFeedList] = React.useState(false);
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(getAccessToken);
  const { actions: studentActions } = useStudentSlice();
  const { actions: classActions } = useClassSlice();
  const classId = useQuery().get(queryString.classId);
  const currentClass = useSelector(getCurrentClass);
  const schoolInfo = useSelector(getSchoolInfo);
  const handleFetchStudentList = useCallback(() => {
    if (currentAccessToken) {
      dispatch(studentActions.loadStudentListForParent({ token: currentAccessToken }));
    }
  }, [currentAccessToken, dispatch, studentActions]);

  useEffect(() => {
    handleFetchStudentList();
  }, [handleFetchStudentList]);
  // get current class info

  useEffect(() => {
    if (classId && currentAccessToken) {
      dispatch(
        classActions.loadClassDetail({
          classId,
          token: currentAccessToken,
        })
      );
    }
  }, [classActions, classId, currentAccessToken, dispatch, studentActions]);

  const handleTriggerRefreshFeedList = () => {
    setIsRefreshFeedList(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!classId) {
      navigate({
        pathname: location.pathname,
        search: `?${queryString.classId}=${schoolInfo?._id}`,
      });
    }
  }, [classId, navigate, schoolInfo?._id]);

  return (
    <MainLayout title={t('parent.home.title')} headerTitle={t('parent.home.title')}>
      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.welcome')}</StyledTab>
            <StyledTab>{t('tab.newsFeed')}</StyledTab>
            {!currentClass?.classInfo?.isSchoolClass && <StyledTab>{t('tab.classInfo')}</StyledTab>}
          </StyledTabsList>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>
            <WelcomePage />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <FeedList
              setIsRefreshFeedList={setIsRefreshFeedList}
              isRefresh={isRefreshFeedList}
              triggerRefreshFeedList={handleTriggerRefreshFeedList}
            />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>
            <ClassInfo />
          </TabPanelUnstyled>
        </TabPaneContent>
      </StyledTabs>
      {/*<MenuUnstyled*/}
      {/*  actions={menuActions}*/}
      {/*  open={isOpen}*/}
      {/*  onClose={close}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  slots={{ root: Popper, listbox: StyledListbox }}*/}
      {/*  slotProps={{ listbox: { id: 'simple-menu' } }}*/}
      {/*>*/}
      {/*  <StyledMenuItem onClick={createHandleMenuClick('post')}>Post</StyledMenuItem>*/}
      {/*  <StyledMenuItem onClick={createHandleMenuClick('event')}>Event</StyledMenuItem>*/}
      {/*  <StyledMenuItem onClick={createHandleMenuClick('timesheet')}>Time Sheet</StyledMenuItem>*/}
      {/*</MenuUnstyled>*/}
    </MainLayout>
  );
};

export default ParentHomePage;
