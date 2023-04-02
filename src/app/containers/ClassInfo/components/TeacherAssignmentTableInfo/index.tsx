import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'twin.macro';
import AvatarPlaceholder from '../../../../../assets/images/person-placeholder.png';
import { pxToRem } from '../../../../../styles/theme/utils';
import { PLoadingIndicator } from '../../../../components/PLoadingIndicatior';
import { TeacherAssignmentForClass } from '../../../../../types/TeacherAssignment';
import { PModal } from '../../../../components/PModal';
import TeacherDetailModal from '../TeacherDetailModal';
import { NewConversationPayload } from '../../../../../types/Conversation';

interface Props {
  data: TeacherAssignmentForClass[];
  loading: boolean;
  handleOpenNewConversation: (newConversationPayload: NewConversationPayload) => void;
}

const Container = styled.div``;
const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;
const ItemRow = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem;
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
  &:hover {
    background-color: ${(p) => p.theme.contrastBackground};
    cursor: pointer;
  }
`;
const AvatarBadge = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const InfoContent = styled.div``;
const InfoTitle = styled.h3`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
`;

const TeacherAssignmentTableInfo: React.FC<Props> = ({
  data,
  loading,
  handleOpenNewConversation,
}) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = React.useState<TeacherAssignmentForClass | null>(null);
  const [detailModalOpen, setDetailModalOpen] = React.useState<boolean>(false);
  const handleOpenDetailModal = (item: TeacherAssignmentForClass) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };
  const onSendMessageToTeacher = (newConversationPayload: NewConversationPayload) => {
    setDetailModalOpen(false);
    handleOpenNewConversation(newConversationPayload);
  };
  return loading ? (
    <PLoadingIndicator />
  ) : (
    <Container>
      <ItemList>
        {data?.map((item, index) => {
          return (
            <ItemRow key={index} onClick={() => handleOpenDetailModal(item)}>
              <AvatarBadge />
              <InfoContent>
                <InfoTitle>{item?.teacher?.userId?.fullname}</InfoTitle>
                <InfoTitle>{item?.subject?.name}</InfoTitle>
              </InfoContent>
            </ItemRow>
          );
        })}
      </ItemList>
      <PModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
        <TeacherDetailModal data={selectedItem} onSendMessageToTeacher={onSendMessageToTeacher} />
      </PModal>
    </Container>
  );
};

export default React.memo(TeacherAssignmentTableInfo);
