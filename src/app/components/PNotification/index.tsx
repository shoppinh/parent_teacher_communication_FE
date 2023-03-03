import React from 'react';
import { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';

const Content = styled.p`
  font: 400 ${pxToRem(15)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: 6px;
  text-align: center;
`;

interface Props {
  type: string;
  body: string;
  mobilePhone: string;
  fromUserId: string;
  roleId: string;
  userName: string;
  roomId: number;
}

const PNotification: React.FC<Props> = ({ body }) => {
  return (
    <div>
      <Content>{body}</Content>
    </div>
  );
};

export default PNotification;
