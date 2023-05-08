import React from 'react';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../../../styles/theme/utils';
import AvatarPlaceholder from '../../../../../assets/images/person-placeholder.png';
import { TeacherAssignmentForClass } from '../../../../../types/TeacherAssignment';
import { NewConversationPayload } from '../../../../../types/Conversation';
import { mapStringRoleToNumber } from '../../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { getUser } from 'store/selectors/session';
import { useSelector } from 'react-redux';

interface Props {
  data: TeacherAssignmentForClass | null;
  onSendMessageToTeacher?: (newConversationPayload: NewConversationPayload) => void;
}
const Container = styled.div`
  height: 90vh;
  width: 50vw;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  color: ${(p) => p.theme.background};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(p) => p.theme.backgroundVariant};
`;
const InfoSection = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;
const InfoLabel = styled.div`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: ${pxToRem(5)}rem;
  color: ${(p) => p.theme.placeholder};
`;
const InfoText = styled.div`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.backgroundVariant};
`;
const AvatarBadge = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const ActionGroup = styled.div`
  ${tw`w-full`}
  text-align: center;
`;
const ActionItem = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
`;
const InfoContainer = styled.div`
  color: ${(p) => p.theme.text};
  padding: ${pxToRem(20)}rem;
  overflow: auto;
`;
const SectionContainer = styled.div`
  padding: ${pxToRem(20)}rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const TeacherDetailModal: React.FC<Props> = ({ data, onSendMessageToTeacher }) => {
  const { t } = useTranslation();
  const currentUser = useSelector(getUser);
  return (
    <Container>
      <AvatarSection>
        <SectionContainer>
          <AvatarBadge src={data?.teacher?.userId?.avatar} />
          <ActionGroup>
            {currentUser?._id !== data?.teacher?.userId?._id && (
              <ActionItem
                onClick={() => {
                  onSendMessageToTeacher &&
                    onSendMessageToTeacher({
                      _id: data?.teacher?.userId?._id || '',
                      mobilePhone: data?.teacher?.userId?.mobilePhone || '',
                      roleId: mapStringRoleToNumber(data?.teacher?.userId?.roleId).toString(),
                    });
                }}
              >
                {t('common.messageToTeacher')}
              </ActionItem>
            )}
          </ActionGroup>
        </SectionContainer>
      </AvatarSection>
      <InfoContainer>
        <InfoSection>
          <InfoLabel>{t('table.teacherName')}</InfoLabel>
          <InfoText>{data?.teacher?.userId?.fullname}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.age')}</InfoLabel>
          <InfoText>{data?.teacher?.age}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.gender')}</InfoLabel>
          <InfoText>{t(`common.${data?.teacher?.gender}`)}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.address')}</InfoLabel>
          <InfoText>{data?.teacher?.address}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.email')}</InfoLabel>
          <InfoText>{data?.teacher?.userId?.email}</InfoText>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t('table.phoneNumber')}</InfoLabel>
          <InfoText>{data?.teacher?.userId?.mobilePhone}</InfoText>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t('table.degree')}</InfoLabel>
          <InfoText>{data?.teacher?.degree}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('form.subject')}</InfoLabel>
          <InfoText>{data?.subject?.name}</InfoText>
        </InfoSection>
      </InfoContainer>
    </Container>
  );
};

export default React.memo(TeacherDetailModal);
