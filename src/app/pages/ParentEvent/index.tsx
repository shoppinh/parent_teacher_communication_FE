import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';
import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';
import { StyleConstants } from '../../../styles/constants/style';
import InteractionList from '../../containers/ParentHome/InteractionList';
import Porfolios from '../../containers/ParentHome/Porfolios';

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
const ParentEvent = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('parent.home.title')} headerTitle={t('parent.home.title')}>
      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.calendar')}</StyledTab>
          </StyledTabsList>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>calendar</TabPanelUnstyled>
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

export default ParentEvent;
