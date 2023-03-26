import React, { useCallback, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { StyleConstants } from '../../../styles/constants/style';
import { PDrawer } from '../../components/PDrawer';
import Header from './components/Header';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import { media } from '../../../styles';
import { pxToRem } from '../../../styles/theme/utils';
import BaseLayout from '../BaseLayout';
import { useConfigSlice } from '../../../store/slices/config';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../store/selectors/session';

interface Props {
  children?: React.ReactNode;
  headerTitle: string;
  title: string;
  description?: string;
}

const Center = styled.div`
  ${tw`flex-1`}
  height: 100%;
  background-color: ${(p) => p.theme.backBackground};
`;
const MainContent = styled.div`
  ${tw`flex-1`}
`;
const CenterWrapper = styled.div`
  ${tw`flex flex-row flex-1`}
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT * 2 + 5}px);
  ${media.md`
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT}px);
  `}
`;

const Container = styled.div`
  ${tw`flex flex-row`}
  height: calc(100vh - ${StyleConstants.HEADER_HEIGHT}px);
  ${media.md`
    height: 100vh;
  `}
  width: 100%;
`;
const MobileLeftBar = styled(LeftBar)`
  display: block !important;
`;
const NavigationBottomBar = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  width: 100%;
  background-color: red;
  ${media.md`
    display: none;
  `}
`;

const MainLayout: React.FC<Props> = ({ children, headerTitle, title }) => {
  const [leftBarOpen, setLeftBarOpen] = React.useState(false);
  const [rightBarOpen, setRightBarOpen] = React.useState(false);
  const onLeftBarClick = useCallback(() => {
    setLeftBarOpen(!leftBarOpen);
  }, [leftBarOpen]);
  const onRightBarClick = useCallback(() => {
    setRightBarOpen(!rightBarOpen);
  }, [rightBarOpen]);

  return (
    <BaseLayout title={title}>
      <Container>
        <LeftBar />
        <MainContent>
          <Header
            onLeftBarClick={onLeftBarClick}
            onRightBarClick={onRightBarClick}
            headerTitle={headerTitle}
          />
          <CenterWrapper>
            <Center>{!!children && children}</Center>
            <RightBar />
          </CenterWrapper>
        </MainContent>

        {leftBarOpen && (
          <PDrawer
            width={`${StyleConstants.LEFT_BAR_WIDTH}px`}
            direction={'right'}
            open={leftBarOpen}
            onClose={() => setLeftBarOpen(false)}
          >
            <MobileLeftBar />
          </PDrawer>
        )}
        {rightBarOpen && (
          <PDrawer
            width={`${StyleConstants.LEFT_BAR_WIDTH}px`}
            direction={'left'}
            open={rightBarOpen}
            onClose={() => setRightBarOpen(false)}
          >
            <MobileLeftBar />
          </PDrawer>
        )}
      </Container>
      <NavigationBottomBar />
    </BaseLayout>
  );
};

export default MainLayout;
