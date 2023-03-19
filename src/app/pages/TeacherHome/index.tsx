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
import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';

import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import { PButton } from '../../components/PButton';
import FeedList from '../../containers/TeacherHomePage/FeedList';
import { PEditor } from 'app/components/PEditor/loadable';
import { PModal } from 'app/components/PModal';
import { getUser } from 'store/selectors/session';
import { useSelector } from 'react-redux';
import InteractionList from '../../containers/TeacherHomePage/InteractionsList';
import AssignMarkModal from '../../containers/TeacherHomePage/InteractionsList/AssignMarkModal';

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
const TabPaneContent = styled.div`
  ${tw`p-3`}
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
  overflow: auto;
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
    color: ${theme.text};
  }
  `
);

const Popper = styled(PopperUnstyled)`
  z-index: 3;
`;

const TeacherHomePage = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const preventReopen = React.useRef(false);
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [isAssignMarkModalOpen, setIsAssignMarkModalOpen] = React.useState(false);
  const [isRefreshFeedList, setIsRefreshFeedList] = React.useState(false);
  const [isRefreshProgressList, setIsRefreshProgressList] = React.useState(false);
  const currentUser = useSelector(getUser);
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };
  const handleCloseAssignMarkModal = () => {
    setIsAssignMarkModalOpen(false);
  };

  const handleTriggerRefreshFeedList = () => {
    setIsRefreshFeedList(true);
  };
  const handleTriggerRefreshProgressList = () => {
    setIsRefreshProgressList(true);
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

  const createHandleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case 'post':
        return () => {
          setIsPostModalOpen(true);
          close();
        };

      case 'progress':
        return () => {
          setIsAssignMarkModalOpen(true);
          close();
        };

      default:
        return () => close();
    }
  };
  return (
    <MainLayout title={t('teacher.home.title')} headerTitle={t('teacher.home.title')}>
      <TabsUnstyled defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.welcome')}</StyledTab>
            <StyledTab>{t('tab.newsFeed')}</StyledTab>
            <StyledTab>{t('tab.trackingAndAssessment')}</StyledTab>
            <StyledTab>{t('tab.assignments')}</StyledTab>
            <StyledTab>{t('tab.portfolios')}</StyledTab>
            <StyledTab>{t('tab.reports')}</StyledTab>
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
            Create
          </StyledButton>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>Welcome {currentUser?.username}</TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <FeedList
              setIsRefreshFeedList={setIsRefreshFeedList}
              isRefresh={isRefreshFeedList}
              triggerRefreshFeedList={handleTriggerRefreshFeedList}
            />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>
            <InteractionList
              isRefresh={isRefreshProgressList}
              triggerRefreshProgressList={handleTriggerRefreshProgressList}
              setIsRefreshProgressList={setIsRefreshProgressList}
            />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={3}>3 page</TabPanelUnstyled>
          <TabPanelUnstyled value={4}>4 page</TabPanelUnstyled>
        </TabPaneContent>
      </TabsUnstyled>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <StyledMenuItem onClick={createHandleMenuClick('post')}>{t('menu.post')}</StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('progress')}>
          {t('menu.markAndAssessment')}
        </StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('timesheet')}>Time Sheet</StyledMenuItem>
      </MenuUnstyled>
      <PModal open={isPostModalOpen} onClose={handleClosePostModal}>
        <PEditor
          handleClose={handleClosePostModal}
          triggerRefreshFeedList={handleTriggerRefreshFeedList}
          type='create'
        />
      </PModal>
      <PModal open={isAssignMarkModalOpen} onClose={handleCloseAssignMarkModal}>
        <AssignMarkModal
          value={null}
          type='assign'
          handleClose={handleCloseAssignMarkModal}
          triggerRefreshProgressList={handleTriggerRefreshProgressList}
        />
      </PModal>
    </MainLayout>
  );
};

export default TeacherHomePage;
