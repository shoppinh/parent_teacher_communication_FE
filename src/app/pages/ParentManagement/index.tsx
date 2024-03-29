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
import { PButton } from 'app/components/PButton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../styles/constants/style';
import { pxToRem } from '../../../styles/theme/utils';
import InteractionList from '../../containers/ParentManagement/InteractionList';
import Portfolios from '../../containers/ParentManagement/Portfolios';
import MainLayout from '../../layouts/MainLayout';

import LeaveFormList from 'app/containers/ParentManagement/LeaveFormList';

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

const TabPaneContent = styled.div`
  ${tw`p-3`}
  overflow: auto;
  height: calc(100% - ${pxToRem(StyleConstants.TAB_HEIGHT)}rem);
`;
const StyledTabs = styled(TabsUnstyled)`
  height: 100%;
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
const ParentManagement = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isLeaveFormModalOpen, setIsLeaveFormModalOpen] = React.useState(false);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);

  const createHandleMenuClick = (menuItem: string) => {
    if (menuItem === 'leaveForm') {
      return () => {
        setIsLeaveFormModalOpen(true);
        close();
      };
    }
    return () => close();
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current?.focus();
  };
  return (
    <MainLayout
      title={t('parent.management.title')}
      headerTitle={t('parent.management.title')}
      isShowSchoolAndClassList={false}
    >
      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.results')}</StyledTab>
            <StyledTab>{t('tab.portfolios')}</StyledTab>
            <StyledTab>{t('tab.leaveForm')}</StyledTab>
          </StyledTabsList>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>
            <InteractionList />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <Portfolios />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={2}>
            <LeaveFormList />
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

export default ParentManagement;
