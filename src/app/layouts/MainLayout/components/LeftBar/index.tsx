import React from 'react';
import { styled } from 'twin.macro';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { media } from '../../../../../styles';
import Logo from '../../../../../assets/images/app-logo.png';
import { PIcon } from '../../../../components/PIcon';
import { PButton } from '../../../../components/PButton';

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.contrastBackground};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  height: calc(100vh - ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem);
`;
const BottomMenu = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  background-color: ${(p) => p.theme.contrastBackground};
  box-shadow: -2px -2px 4px rgba(37, 37, 37, 0.1);
`;
const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;
const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ActionTitle = styled.p`
  font-size: ${pxToRem(12)}rem;
  color: ${(p) => p.theme.text};
  text-align: center;
`;
const ActionIcon = styled(PIcon)`
  font-size: ${pxToRem(20)}rem;
`;
const ActionButton = styled(PButton)`
  && {
    background-color: ${(p) => p.theme.contrastBackground};
  }
  color: ${(p) => p.theme.text};
`;
const LeftBar = () => {
  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <img src={Logo} alt='Logo' width='50%' />
        </ImageWrapper>
      </ContentWrapper>
      <BottomMenu>
        <ActionGroup>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-user-plus' />
            </ActionButton>
            <ActionTitle>Invite Member</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-users' />
            </ActionButton>
            <ActionTitle>Class/Group</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-cog' />
            </ActionButton>
            <ActionTitle>Settings</ActionTitle>
          </ActionItem>
          <ActionItem>
            <ActionButton>
              <ActionIcon className='partei-question' />
            </ActionButton>
            <ActionTitle>Support</ActionTitle>
          </ActionItem>
        </ActionGroup>
      </BottomMenu>
    </Container>
  );
};

export default LeftBar;
