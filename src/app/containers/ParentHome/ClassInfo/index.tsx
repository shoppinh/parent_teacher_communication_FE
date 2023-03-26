import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassLoading, getCurrentClass } from '../../../../store/selectors/class';
import { useQuery } from '../../../../utils/hook';
import { queryString } from '../../../../utils/constants';
import { getAccessToken } from '../../../../store/selectors/session';
import { useClassSlice } from '../../../../store/slices/class';
import { styled } from 'twin.macro';
import StudentAndParentTableInfo from './components/StudentAndParentTableInfo';
import TeacherAssignmentTableInfo from './components/TeacherAssignmentTableInfo';

const Container = styled.div``;
const Section = styled.div``;
const SectionTitle = styled.p``;
const SectionContent = styled.div``;
const SectionLabel = styled.span``;
const ClassInfo = () => {
  const currentClass = useSelector(getCurrentClass);
  const isFetchingClassDetail = useSelector(getClassLoading);
  const dispatch = useDispatch();
  const classId = useQuery().get(queryString.classId);
  const currentAccessToken = useSelector(getAccessToken);
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
        <SectionTitle>Class Info</SectionTitle>
        <SectionContent>
          <SectionLabel>Tên lớp: </SectionLabel>
          {currentClass?.classInfo?.name}
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Parent & Children Info</SectionTitle>
        <SectionContent>
          <StudentAndParentTableInfo
            data={currentClass?.students}
            loading={isFetchingClassDetail}
          />
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Teacher Assignment Info</SectionTitle>
        <SectionContent>
          <TeacherAssignmentTableInfo
            data={currentClass?.teacherAssignments}
            loading={isFetchingClassDetail}
          />
        </SectionContent>
      </Section>
    </Container>
  );
};

export default ClassInfo;
