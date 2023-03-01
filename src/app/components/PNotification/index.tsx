import React from 'react';
interface Props {
  content?: string;
}
const PNotification: React.FC<Props> = ({ content }) => {
  return <div>{content && content}</div>;
};

export default PNotification;
