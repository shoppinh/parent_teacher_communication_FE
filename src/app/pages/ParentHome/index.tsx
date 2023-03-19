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
import FeedList from '../../containers/TeacherHomePage/FeedList';

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
`;

const ParentHomePage = () => {
  const { t } = useTranslation();
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const isOpen = Boolean(anchorEl);
  // const buttonRef = React.useRef<HTMLButtonElement>(null);
  // const menuActions = React.useRef<MenuUnstyledActions>(null);
  // const preventReopen = React.useRef(false);
  // const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [isRefreshFeedList, setIsRefreshFeedList] = React.useState(false);
  // const handleClosePostModal = () => {
  //   setIsPostModalOpen(false);
  // };
  //
  const handleTriggerRefreshFeedList = () => {
    setIsRefreshFeedList(true);
  };
  //
  // const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   if (preventReopen.current) {
  //     event.preventDefault();
  //     preventReopen.current = false;
  //     return;
  //   }
  //
  //   if (isOpen) {
  //     setAnchorEl(null);
  //   } else {
  //     setAnchorEl(event.currentTarget);
  //   }
  // };
  //
  // const handleButtonMouseDown = () => {
  //   if (isOpen) {
  //     // Prevents the menu from reopening right after closing
  //     // when clicking the button.
  //     preventReopen.current = true;
  //   }
  // };
  //
  // const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
  //   if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
  //     event.preventDefault();
  //     setAnchorEl(event.currentTarget);
  //     if (event.key === 'ArrowUp') {
  //       menuActions.current?.highlightLastItem();
  //     }
  //   }
  // };
  // const close = () => {
  //   setAnchorEl(null);
  //   buttonRef.current!.focus();
  // };

  // const createHandleMenuClick = (menuItem: string) => {
  //   switch (menuItem) {
  //     case 'post':
  //       return () => {
  //         setIsPostModalOpen(true);
  //         console.log('post is activated');
  //         close();
  //       };
  //       break;
  //     case 'event':
  //       return () => {
  //         close();
  //         console.log('event is activated');
  //       };
  //       break;
  //     default:
  //       return () => close();
  //       break;
  //   }
  // };
  return (
    <MainLayout title={t('parent.home.title')} headerTitle={t('parent.home.title')}>
      <TabsUnstyled defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.welcome')}</StyledTab>
            <StyledTab>{t('tab.newsFeed')}</StyledTab>
            <StyledTab>{t('tab.results')}</StyledTab>
            <StyledTab>{t('tab.assignments')}</StyledTab>
            <StyledTab>{t('tab.portfolios')}</StyledTab>
          </StyledTabsList>
          {/*<StyledButton*/}
          {/*  type='button'*/}
          {/*  variant='primary'*/}
          {/*  onClick={handleButtonClick}*/}
          {/*  onKeyDown={handleButtonKeyDown}*/}
          {/*  onMouseDown={handleButtonMouseDown}*/}
          {/*  ref={buttonRef}*/}
          {/*  aria-controls={isOpen ? 'simple-menu' : undefined}*/}
          {/*  aria-expanded={isOpen || undefined}*/}
          {/*  aria-haspopup='menu'*/}
          {/*>*/}
          {/*  Create*/}
          {/*</StyledButton>*/}
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>Welcome to ParTe</TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <FeedList setIsRefreshFeedList={setIsRefreshFeedList} isRefresh={isRefreshFeedList} triggerRefreshFeedList={handleTriggerRefreshFeedList} />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>2 page</TabPanelUnstyled>
          <TabPanelUnstyled value={3}>3 page</TabPanelUnstyled>
          <TabPanelUnstyled value={4}>4 page</TabPanelUnstyled>
          <TabPanelUnstyled value={5}>5 page</TabPanelUnstyled>
        </TabPaneContent>
      </TabsUnstyled>
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
