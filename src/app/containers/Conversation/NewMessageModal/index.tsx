import React from 'react';
import { useSelector } from 'react-redux';
import { getUserList } from '../../../../store/selectors/config';
import {styled} from "twin.macro";


const Container = styled.div`
  width: 50vw;
  height: 100%;
  background-color: ${(p) => p.theme.background};
`
const NewMessageModal = ({ onClose }: { onClose: () => void }) => {
  return <Container>


  </Container>;
};

export default NewMessageModal;
