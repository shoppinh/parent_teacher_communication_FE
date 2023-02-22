import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled } from 'twin.macro';
import PBackdrop from '../PBackdrop';
import { Slide } from '../Transition/Slide';
import { Direction } from '../../../types/Layout';
import { zIndex } from '../../../styles/constants/style';

interface Props {
  open?: boolean;
  direction?: Direction;
  children?: React.ReactElement;
  className?: string;
  width?: string;
  onClose?: () => void;
}

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: ${zIndex.modal};
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StylingSlide = styled(Slide)`
  position: fixed;
  background-color: ${(p) => p.theme.background};
`;

export const PDrawer: React.FC<Props> = ({
  open = false,
  direction = 'left',
  width = '450px',
  children,
  className = '',
  onClose = () => {
    console.log('close Drawer');
  },
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{
        backdrop: PBackdrop,
      }}
    >
      <StylingSlide className={className} width={width} in={open} direction={direction}>
        {children}
      </StylingSlide>
    </Modal>
  );
};
