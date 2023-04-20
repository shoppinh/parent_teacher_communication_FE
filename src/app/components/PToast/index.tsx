import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_DEFAULT_TIME } from 'utils/constants';

interface Props {
  limit?: number;
  containerId?: string;
  newestOnTop?: boolean;
}

const ToastOverrider = styled(ToastContainer)`
  .Toastify__toast {
    background-color: ${(p) => p.theme.backgroundVariant};
    color: ${(p) => p.theme.textOpposition};
    padding: 14px;
  }

  .Toastify__toast--error {
    background-color: ${(p) => p.theme.danger} !important;
    color: ${(p) => p.theme.textOpposition} !important;
  }

  .Toastify__toast--info {
    background-color: ${(p) => p.theme.background} !important;
    color: ${(p) => p.theme.text} !important;
    border-radius: 10px;
  }
`;

const PToast: React.FC<Props> = ({ limit, containerId, newestOnTop = false }) => {
  const containerIdObj = containerId ? { containerId: containerId } : {};
  return (
    <ToastOverrider
      enableMultiContainer
      position='top-center'
      icon={false}
      autoClose={TOAST_DEFAULT_TIME}
      hideProgressBar
      closeOnClick
      rtl={false}
      newestOnTop={newestOnTop}
      pauseOnFocusLoss
      closeButton={false}
      {...containerIdObj}
      limit={limit}
    />
  );
};

export default React.memo(PToast);
