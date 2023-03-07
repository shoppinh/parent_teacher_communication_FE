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
import { PButton } from '../../components/PButton';
import { pxToRem } from '../../../styles/theme/utils';
import { StyleConstants } from '../../../styles/constants/style';
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
const StyledButton = styled(PButton)`
  ${tw`rounded-full`}
  font-weight: bold;
  font-size: ${pxToRem(16)}rem;
  padding: 0 ${pxToRem(25)}rem;
`;
const TabPaneContent = styled.div`
  ${tw`p-3`}
`;
const ParentHomePage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={t('parent.home.title')} headerTitle={t('parent.home.title')}>
      <TabsUnstyled defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>Feed</StyledTab>
            <StyledTab>Interactions</StyledTab>
            <StyledTab>Assignments</StyledTab>
            <StyledTab>Portfolios</StyledTab>
            <StyledTab>Signups</StyledTab>
            <StyledTab>Reports</StyledTab>
          </StyledTabsList>
          <StyledButton variant='primary'>Create</StyledButton>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>
            <FeedList />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>2 page</TabPanelUnstyled>
          <TabPanelUnstyled value={2}>3 page</TabPanelUnstyled>
          <TabPanelUnstyled value={3}>4 page</TabPanelUnstyled>
          <TabPanelUnstyled value={4}>5 page</TabPanelUnstyled>
          <TabPanelUnstyled value={5}>6 page</TabPanelUnstyled>
        </TabPaneContent>
      </TabsUnstyled>
    </MainLayout>
  );
};

export default ParentHomePage;