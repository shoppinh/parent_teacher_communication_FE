import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import tw, { styled } from 'twin.macro';

interface ButtonProp {
  variant?: 'primary' | 'secondary' | 'danger';
  isHidden?: boolean;
}

//test
export const PButton = styled(ButtonUnstyled)<ButtonProp>`
  ${(p) => {
    switch (p.variant) {
      case 'primary':
        return tw`bg-blue-500 text-white`;
      case 'secondary':
        return `background-color: ${p.theme.background}; color: ${p.theme.backgroundVariant}; border: 1px solid ${p.theme.backgroundVariant}`;
      case 'danger':
        return tw`bg-red-500 text-white`;
      default:
        return `background-color: ${p.theme.background}; color: ${p.theme.text};`;
    }
  }}
  ${(p) => p.isHidden && tw`hidden`}
  ${(p) => p.disabled && `opacity: 0.5; cursor: not-allowed;`}
`;
