import React from 'react';
interface Props {
  isOpen: boolean;
}
const RightBarDrawer: React.FC<Props> = ({ isOpen }) => {
  return isOpen ? <div></div> : null;
};

export default RightBarDrawer;
