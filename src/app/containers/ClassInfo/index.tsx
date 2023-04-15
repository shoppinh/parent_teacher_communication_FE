import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassLoading, getCurrentClass } from '../../../store/selectors/class';
import { useQuery } from '../../../utils/hook';
import { queryString } from '../../../utils/constants';
import { useClassSlice } from '../../../store/slices/class';
import { styled } from 'twin.macro';
import StudentAndParentTableInfo from './components/StudentAndParentTableInfo';
import TeacherAssignmentTableInfo from './components/TeacherAssignmentTableInfo';
import { pxToRem } from '../../../styles/theme/utils';
import { useTranslation } from 'react-i18next';
import { useConversation } from '../../../utils/hook/useConversation';
import { Conversation } from '../../pages/Conversation';
import { mapStringRoleToNumber } from '../../../utils/helpers';
import { PModal } from '../../components/PModal';

const Container = styled.div``;
const Section = styled.div`
  margin-bottom: ${pxToRem(12)}rem;
`;
const SectionTitle = styled.p`
  font: 700 ${pxToRem(17)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: ${pxToRem(12)}rem;
`;
const HeaderTitle = styled(SectionTitle)`
  font: 700 ${pxToRem(20)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
`;
const SectionContent = styled.div``;
const ClassInfo = () => {
  const {
    handleOpenNewConversation,
    showConversation,
    handleCloseConversation,
    currentRefreshToken,
    currentUser,
    currentAccessToken,
    setShowConversation,
    conversationToUserData,
    currentRoomId,
  } = useConversation();
  const currentClass = useSelector(getCurrentClass);
  const isFetchingClassDetail = useSelector(getClassLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classId = useQuery().get(queryString.classId);
  const { actions: classActions } = useClassSlice();
  const handleFetchClassDetail = useCallback(() => {
    if (currentAccessToken && classId) {
      dispatch(
        classActions.loadClassDetail({
          classId,
          token: currentAccessToken,
        })
      );
    }
  }, [classActions, classId, currentAccessToken, dispatch]);

  useEffect(() => {
    handleFetchClassDetail();
  }, [handleFetchClassDetail]);

  return (
    <Container>
      <Section>
        <HeaderTitle>
          {t('classInfo.title', { className: currentClass?.classInfo?.name })}
        </HeaderTitle>
      </Section>
      <Section>
        <SectionTitle>{t('classInfo.parentAndChildrenInfo')}</SectionTitle>
        <SectionContent>
          <StudentAndParentTableInfo
            data={currentClass?.students}
            loading={isFetchingClassDetail}
            handleOpenNewConversation={handleOpenNewConversation}
          />
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>{t('classInfo.teacherInfo')}</SectionTitle>
        <SectionContent>
          <TeacherAssignmentTableInfo
            data={currentClass?.teacherAssignments}
            loading={isFetchingClassDetail}
            handleOpenNewConversation={handleOpenNewConversation}
          />
        </SectionContent>
      </Section>
      <PModal open={showConversation} onClose={handleCloseConversation}>
        <Conversation
          roomId={currentRoomId}
          token={currentAccessToken}
          refreshToken={currentRefreshToken}
          fromUserPhone={currentUser?.mobilePhone || ''}
          fromUserName={currentUser?.fullname || currentUser?.username}
          toUserPhone={conversationToUserData?.mobilePhone || '0397273869'}
          fromUserRole={mapStringRoleToNumber(currentUser?.roleId)}
          toUserRole={
            conversationToUserData?.roleId ? parseInt(conversationToUserData?.roleId.toString()) : 1
          }
          onClose={() => {
            setShowConversation(false);
          }}
        />
      </PModal>
    </Container>
  );
};

export default ClassInfo;
