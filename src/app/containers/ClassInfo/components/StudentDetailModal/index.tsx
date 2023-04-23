import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUser } from 'store/selectors/session';
import tw, { styled } from 'twin.macro';
import AvatarPlaceholder from '../../../../../assets/images/person-placeholder.png';
import { pxToRem } from '../../../../../styles/theme/utils';
import { NewConversationPayload } from '../../../../../types/Conversation';
import { StudentParentIncludedInfo } from '../../../../../types/Student';
import { mapStringRoleToNumber } from '../../../../../utils/helpers';
interface Props {
  data: StudentParentIncludedInfo | null;
  onSendMessageToParent?: (newConversationPayload: NewConversationPayload) => void;
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
  margin-bottom: ${pxToRem(10)}rem;
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
const StudentDetailModal: React.FC<Props> = ({ data, onSendMessageToParent }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <AvatarSection>
        <SectionContainer>
          <AvatarBadge />
          <ActionGroup>
            <ActionItem
              onClick={() =>
                onSendMessageToParent &&
                onSendMessageToParent({
                  _id: data?.parentId?.userId?._id || '',
                  mobilePhone: data?.parentId?.userId?.mobilePhone || '',
                  roleId: mapStringRoleToNumber(data?.parentId?.userId?.roleId).toString(),
                })
              }
            >
              {t('common.messageToParent')}
            </ActionItem>
          </ActionGroup>
        </SectionContainer>
      </AvatarSection>
      <InfoContainer>
        <InfoSection>
          <InfoLabel>{t('table.studentName')}</InfoLabel>
          <InfoText>{data?.name}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.studentAge')}</InfoLabel>
          <InfoText>{data?.age}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.studentGender')}</InfoLabel>
          <InfoText>{data?.gender}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.parentName')}</InfoLabel>
          <InfoText>{data?.parentId?.userId?.fullname}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.parentAge')}</InfoLabel>
          <InfoText>{data?.parentId?.age}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.email')}</InfoLabel>
          <InfoText>{data?.parentId?.userId?.email}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.phoneNumber')}</InfoLabel>
          <InfoText>{data?.parentId?.userId?.mobilePhone}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.relationship')}</InfoLabel>
          <InfoText>{data?.relationship}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.address')}</InfoLabel>
          <InfoText>{data?.parentId?.address}</InfoText>
        </InfoSection>
        <InfoSection>
          <InfoLabel>{t('table.parentJob')}</InfoLabel>
          <InfoText>{data?.parentId?.job}</InfoText>
        </InfoSection>
      </InfoContainer>
    </Container>
  );
};

export default React.memo(StudentDetailModal);
