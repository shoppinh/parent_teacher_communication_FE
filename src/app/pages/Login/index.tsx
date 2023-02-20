import React from 'react';
import Logo from 'assets/images/app-logo.png';
import tw, { styled } from 'twin.macro';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { pxToRem } from '../../../styles/theme/utils';
import { media } from '../../../styles';

const Wrapper = styled.div`
  ${tw`mx-auto flex flex-col items-center h-full`}
  ${media.md`
    max-width: ${pxToRem(800)}rem;
  `}
  background-color: ${(p) => p.theme.danger};
  width: 100%;
`;
const StyledButton = styled(ButtonUnstyled)`
  ${tw`bg-blue-500 text-white p-2 rounded-full`}
`;

const Login = () => {
  return (
    <Wrapper>
      <img src={Logo} alt='Logo' />
      <div>Login Page</div>
      <StyledButton>Click me</StyledButton>
    </Wrapper>
  );
};

export default Login;
