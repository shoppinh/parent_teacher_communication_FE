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
        return tw`bg-white text-blue-500`;
      case 'danger':
        return tw`bg-red-500 text-white`;
      default:
        return `background-color: ${p.theme.background}; color: ${p.theme.text};`;
    }
  }}
  ${(p) => p.isHidden && tw`hidden`}
`;
