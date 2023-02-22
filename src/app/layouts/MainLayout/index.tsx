import React, { useCallback } from 'react';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import tw, { styled } from 'twin.macro';
import Header from './components/Header';
import LeftBarDrawer from './components/LeftBar/LeftBarDrawer';
import RightBarDrawer from './components/RightBar/RightBarDrawer';
import { PModal } from '../../components/PModal';
import { PDrawer } from '../../components/PDrawer';
import { StyleConstants } from '../../../styles/constants/style';

const Center = styled.div`
  ${tw`flex-1`}
`;
const MainContent = styled.div`
  ${tw`flex flex-col flex-1`}
`;
const CenterWrapper = styled.div`
  ${tw`flex flex-row flex-1`}
`;

const Container = styled.div`
  ${tw`flex flex-row h-screen`}
`;
const MobileLeftBar = styled(LeftBar)`
  display: block !important;
`;

interface Props {
  children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [leftBarOpen, setLeftBarOpen] = React.useState(false);
  const [rightBarOpen, setRightBarOpen] = React.useState(false);
  const onLeftBarClick = useCallback(() => {
    setLeftBarOpen(!leftBarOpen);
  }, [leftBarOpen]);
  const onRightBarClick = useCallback(() => {
    setRightBarOpen(!rightBarOpen);
  }, [rightBarOpen]);
  return (
    <Container>
      <LeftBar />
      <MainContent>
        <Header onLeftBarClick={onLeftBarClick} onRightBarClick={onRightBarClick} />
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
  );
};

export default MainLayout;
