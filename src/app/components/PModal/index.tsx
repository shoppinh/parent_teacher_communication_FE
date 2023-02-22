import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled } from 'twin.macro';
import BackdropLoader from '../PBackdrop';
import { Fade } from '../Transition/Fade';
import { zIndex } from '../../../styles/constants/style';

interface Props {
  open?: boolean;
  children?: React.ReactElement;
  onClose?: () => void;
}

const Modal = styled(ModalUnstyled)<Props>`
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

export const PModal: React.FC<Props> = ({ open = false, children, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{
        backdrop: BackdropLoader,
      }}
    >
      <Fade in={open}>{children ? children : <></>}</Fade>
    </Modal>
  );
};
