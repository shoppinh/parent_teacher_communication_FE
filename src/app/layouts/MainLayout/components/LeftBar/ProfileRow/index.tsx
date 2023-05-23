import React from 'react';
import { pxToRem } from '../../../../../../styles/theme/utils';
import AvatarPlaceholder from '../../../../../../assets/images/person-placeholder.png';
import { styled } from 'twin.macro';
import { User } from '../../../../../../types/User';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: ${pxToRem(15)}rem;
  display: flex;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: ${(p) => p.theme.backgroundSelected};
  }
  align-items: center;
  margin-bottom: ${pxToRem(20)}rem;
`;
const Avatar = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const Title = styled.span`
  font-size: ${pxToRem(14)}rem;
  font-weight: bold;
`;
const MessageContentWrapper = styled.div``;

interface Props {
  data?: User;
  onClick?: () => void;
}

const ProfileRow: React.FC<Props> = ({ data, onClick }) => {
  const { t } = useTranslation();
  return (
    <Container onClick={onClick}>
      <Avatar src={data?.avatar || AvatarPlaceholder} />
      <Title>
        {data?.fullname
          ? `${data.fullname} (${t(`role.${data?.roleId}`)}) `
          : `${data?.username} (${t(`role.${data?.roleId}`)})`}
      </Title>
    </Container>
  );
};

export default React.memo(ProfileRow);
