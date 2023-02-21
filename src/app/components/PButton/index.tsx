import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import tw, { styled } from 'twin.macro';

interface ButtonProp {
  variant?: 'primary' | 'secondary';
}

export const PButton = styled(ButtonUnstyled)<ButtonProp>`
  ${tw`p-3 rounded-full w-full `}
  ${(p) => {
    switch (p.variant) {
      case 'primary':
        return tw`bg-blue-500 text-white`;
      case 'secondary':
        return tw`bg-white text-blue-500`;
      default:
        return tw`bg-blue-500 text-white`;
    }
  }}
`;
