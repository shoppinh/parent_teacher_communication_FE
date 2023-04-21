import {
  MenuItemUnstyled,
  MenuUnstyled,
  MenuUnstyledActions,
  PopperUnstyled,
  TabPanelUnstyled,
  TabUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  menuItemUnstyledClasses,
  tabUnstyledClasses,
} from '@mui/base';
import { PButton } from 'app/components/PButton';
import AssignmentManagement from 'app/containers/AdminManagement/AssignmentManagement';
import ClassManagement from 'app/containers/AdminManagement/ClassManagement';
import ParentManagement from 'app/containers/AdminManagement/ParentManagement';
import StudentManagement from 'app/containers/AdminManagement/StudentManagement';
import SubjectManagement from 'app/containers/AdminManagement/SubjectManagement';
import TeacherManagement from 'app/containers/AdminManagement/TeacherManagement';
import MainLayout from 'app/layouts/MainLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw from 'twin.macro';
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
  font-size: 14px;
  font-weight: 400;

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
const AdminManagement = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const preventReopen = React.useRef(false);
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
  const createHandleMenuClick = (menuItem: string) => {
    // if (menuItem === 'leaveForm') {
    //   return () => {
    //     setIsLeaveFormModalOpen(true);
    //     close();
    //   };
    // }
    return () => close();
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
    buttonRef.current?.focus();
  };
  return (
    <MainLayout
      title={t('admin.management.title')}
      headerTitle={t('admin.management.title')}
      isShowSchoolAndClassList={false}
    >
      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.class')}</StyledTab>
            <StyledTab>{t('tab.teacher')}</StyledTab>
            <StyledTab>{t('tab.parent')}</StyledTab>
            <StyledTab>{t('tab.student')}</StyledTab>
            <StyledTab>{t('tab.assignment')}</StyledTab>
            <StyledTab>{t('tab.subject')}</StyledTab>
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
            <ClassManagement />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <TeacherManagement />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>
            <ParentManagement />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={3}>
            <StudentManagement />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={4}>
            <AssignmentManagement />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={5}>
            <SubjectManagement />
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
        <StyledMenuItem onClick={createHandleMenuClick('leaveForm')}>
          {t('menu.leaveForm')}
        </StyledMenuItem>
      </MenuUnstyled>
    </MainLayout>
  );
};

export default AdminManagement;
