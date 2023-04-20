import React from 'react';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Label = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 0.5rem;
  font-size: ${pxToRem(16)}rem;
  color: ${(p) => p.theme.textSecondary};
`;

export const Input = styled.input`
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  margin: 0;
  font: inherit;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.125rem solid ${(p) => p.theme.backgroundVariant};
  border-radius: 0.5rem;
  font-family: 'dsr-icon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  position: relative;

  &::before {
    content: '';
  }

  &:checked {
    background-color: ${(p) => p.theme.backgroundVariant};

    &::before {
      position: absolute;
      top: calc(50% - 0.375rem);
      left: calc(50% - 0.375rem);
      content: '\\2713';
      color: ${(p) => p.theme.background};
      font-size: 0.75rem;
    }
  }
`;

const PCheckbox = React.forwardRef<any, Props>(({ label = '', className, ...rest }, ref) => {
  return (
    <Label className={className}>
      <Input ref={ref} type='checkbox' {...rest} />
      <Text>{label}</Text>
    </Label>
  );
});

export default React.memo(PCheckbox);
