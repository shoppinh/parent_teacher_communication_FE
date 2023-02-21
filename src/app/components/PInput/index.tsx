import React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import tw, { styled } from 'twin.macro';
import { colors } from '../../../styles/constants/colors';
import { pxToRem } from '../../../styles/theme/utils';

export const Input = styled(InputUnstyled)`
  padding: ${pxToRem(10)}rem ${pxToRem(10)}rem;
  border: ${pxToRem(1)}rem solid ${colors.MERCURY};
  border-radius: ${pxToRem(10)}rem;
  outline: none;
  font: 400 ${pxToRem(15)}rem / ${pxToRem(18)}rem ${(p) => p.theme.fontFamily};

  & input:focus-visible {
    outline: none;
  }

  ${tw`w-full`}
`;

const PInput = React.forwardRef<any, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ disabled, className, ...rest }, ref) => {
    return <Input ref={ref} className={className} disabled={disabled} {...rest} />;
  }
);

export default React.memo(PInput);
