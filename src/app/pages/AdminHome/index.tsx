import {
  MenuItemUnstyled,
  menuItemUnstyledClasses,
  MenuUnstyled,
  MenuUnstyledActions,
  PopperUnstyled,
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';

import { PEditor } from 'app/components/PEditor/loadable';
import { PModal } from 'app/components/PModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentClass } from 'store/selectors/class';
import { getAccessToken, getUser } from 'store/selectors/session';
import { useClassSlice } from 'store/slices/class';
import tw, { styled } from 'twin.macro';
import { queryString } from 'utils/constants';
import { useQuery } from 'utils/hook';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import { PButton } from '../../components/PButton';
import FeedList from '../../containers/TeacherHomePage/FeedList';
import ClassInfo from 'app/containers/ClassInfo';
import { getSchoolInfo } from 'store/selectors/config';
import { useNavigate } from 'react-router-dom';
import AdminWelcome from 'app/containers/Welcome/Admin';

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
const StyledButton = styled(PButton)`
  ${tw`rounded-full`}
  font-weight: bold;
  font-size: ${pxToRem(16)}rem;
  padding: 0 ${pxToRem(25)}rem;
`;

const StyledListbox = styled.ul(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  outline: 0px;
  background: #fff;
  border: 1px solid ${theme.borderLight};
  color: ${theme.text};
  box-shadow: 0px 4px 30px ${theme.text};
  `
);

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.backgroundVariant};
    background-color: ${theme.background};
    color: ${theme.text};
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.text};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.backgroundVariant};
    color: ${theme.background};
  }
  `
);

const Popper = styled(PopperUnstyled)`
  z-index: 3;
`;
const TabPaneContent = styled.div`
  ${tw`p-3`}
  overflow: auto;
  height: calc(100% - ${pxToRem(StyleConstants.TAB_HEIGHT)}rem);
`;
const StyledTabs = styled(TabsUnstyled)`
  height: 100%;
`;

const AdminHome = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const preventReopen = React.useRef(false);
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [isRefreshFeedList, setIsRefreshFeedList] = React.useState(false);
  const currentUser = useSelector(getUser);
  const currentClass = useSelector(getCurrentClass);
  const { actions: classActions } = useClassSlice();
  const classId = useQuery().get(queryString.classId);
  const schoolInfo = useSelector(getSchoolInfo);
  const currentAccessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleTriggerRefreshFeedList = () => {
    setIsRefreshFeedList(true);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      // Prevents the menu from reopening right after closing
      // when clicking the button.
      preventReopen.current = true;
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };
  const close = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };
  const navigate = useNavigate();

  const createHandleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case 'post':
        return () => {
          setIsPostModalOpen(true);
          console.log('post is activated');
          close();
        };

      case 'event':
        return () => {
          close();
          console.log('event is activated');
        };

      default:
        return () => close();
    }
  };
  useEffect(() => {
    if (classId && currentAccessToken) {
      dispatch(
        classActions.loadClassDetail({
          classId,
          token: currentAccessToken,
        })
      );
    }
  }, [classActions, classId, currentAccessToken, dispatch]);
  // Redirect to school class if user is not in any class
  useEffect(() => {
    if (!classId) {
      navigate({
        pathname: location.pathname,
        search: `?${queryString.classId}=${schoolInfo?._id}`,
      });
    }
  }, [classId, navigate, schoolInfo?._id]);
  return (
    <MainLayout title={t('admin.home.title')} headerTitle={t('admin.home.title')}>
      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.welcome')}</StyledTab>
            <StyledTab>{t('tab.newsFeed')}</StyledTab>
            {!currentClass?.classInfo?.isSchoolClass && <StyledTab>{t('tab.classInfo')}</StyledTab>}
          </StyledTabsList>
          <StyledButton
            type='button'
            variant='primary'
            onClick={handleButtonClick}
            onKeyDown={handleButtonKeyDown}
            onMouseDown={handleButtonMouseDown}
            ref={buttonRef}
            aria-controls={isOpen ? 'simple-menu' : undefined}
            aria-expanded={isOpen || undefined}
            aria-haspopup='menu'
          >
            {t('common.create')}
          </StyledButton>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>
            <AdminWelcome />
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
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <StyledMenuItem onClick={createHandleMenuClick('post')}>Post</StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('event')}>Event</StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('timesheet')}>Time Sheet</StyledMenuItem>
      </MenuUnstyled>
      <PModal open={isPostModalOpen} onClose={handleClosePostModal}>
        <PEditor
          handleClose={handleClosePostModal}
          triggerRefreshFeedList={handleTriggerRefreshFeedList}
          type='create'
        />
      </PModal>
    </MainLayout>
  );
};

export default AdminHome;
