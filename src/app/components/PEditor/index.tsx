import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tw, { styled } from 'twin.macro';
import { PButton } from '../PButton';
import { PIcon } from '../PIcon';
import { Post, PostQuery, PostTokenQuery, UpdatePostTokenQuery } from 'types/Post';
import { useForm } from 'react-hook-form';
import { pxToRem } from 'styles/theme/utils';
import { useTranslation } from 'react-i18next';
import PInput from '../PInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'store/selectors/session';
import { usePostSlice } from '../../../store/slices/post';
import { useQuery } from '../../../utils/hook';
import { ConstantPostType, queryString } from '../../../utils/constants';
import { getPostUpdateOrAddError, getPostUpdateOrAddLoading } from '../../../store/selectors/post';
import { toast } from 'react-toastify';
import { PSelection } from '../PSelection';

const Wrapper = styled.div`
  padding: 20px;
  background-color: ${(p) => p.theme.background};
  max-height: 100vh;
  overflow-y: auto;
  width: 80vw;
`;

const StyledButton = styled(PButton)`
  ${tw`rounded-full w-full`}
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 10px;
`;

const ActionGroup = styled.div`
  ${tw`flex justify-between`};
  margin-bottom: 20px;
`;

const StyledIcon = styled(PIcon)`
  font-size: 20px;
`;

const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
`;
const InputContainer = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;

const InputLabel = styled.div`
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
`;
const Required = styled.span`
  color: ${(p) => p.theme.danger};
`;
const StyledInput = styled(PInput)`
  background: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem ${pxToRem(20)}rem;
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  width: 100%;
`;
const ModalTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  handleClose: () => void;
  postData?: Post;
  triggerRefreshFeedList: () => void;
  type: 'edit' | 'create';
}

const schema = yup.object({
  title: yup.string().required('Title cannot be empty').strict(true),
});

const PEditor: React.FC<Props> = ({
  handleClose,
  postData,
  triggerRefreshFeedList,
  type = 'edit',
}) => {
  const editorRef = useRef<any>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostQuery>({
    defaultValues: {
      type: ConstantPostType.PUBLIC,
      title: postData?.title || '',
      description: postData?.description || '',
    },
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const currentAccessToken = useSelector(getAccessToken);
  const postLoading = useSelector(getPostUpdateOrAddLoading);
  const postError = useSelector(getPostUpdateOrAddError);
  const dispatch = useDispatch();
  const { actions: postActions } = usePostSlice();
  const classId = useQuery().get(queryString.classId);
  const [isFormSent, setIsFormSent] = useState(false);

  const handleSubmitPost = useCallback(
    (value: PostQuery) => {
      if (currentAccessToken) {
        if (type === 'edit' && postData) {
          const payload: UpdatePostTokenQuery = {
            ...value,
            content: editorRef.current.getContent(),
            token: currentAccessToken,
            postId: postData._id,
          };
          dispatch(postActions.updatePost(payload));
        } else if (type === 'create' && classId) {
          const payload: PostTokenQuery = {
            ...value,
            content: editorRef.current.getContent(),
            token: currentAccessToken,
            classId,
          };
          dispatch(postActions.addPost(payload));
        }
        setIsFormSent(true);
      }
    },
    [classId, currentAccessToken, dispatch, postActions, postData, type]
  );

  useEffect(() => {
    if (isFormSent && !postLoading && !postError) {
      toast(t('post.createSuccess'));
      triggerRefreshFeedList();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && postError) {
      toast.error(postError.message);
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, postError, postLoading, t, triggerRefreshFeedList]);

  const example_image_upload_handler = (blobInfo, progress) =>
    new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', `${process.env.REACT_APP_API_URL}/api/file/upload`);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.url != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(json.url);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  useEffect(() => {
    if (postData) editorRef?.current?.setContent(postData.content || '');
  }, [postData]);

  return (
    <Wrapper>
      <ActionGroup>
        <ModalTitle>
          {type === 'edit' ? t('post.editPost.title') : t('post.addPost.title')}
        </ModalTitle>
        <PButton onClick={() => handleClose()}>
          <StyledIcon className='partei-cross' />
        </PButton>
        {/* <PButton>
          <PIcon />
        </PButton> */}
      </ActionGroup>

      <FormContainer onSubmit={handleSubmit(handleSubmitPost)}>
        <InputContainer>
          <InputLabel>{t('form.title')}</InputLabel>
          <StyledInput {...register('title')} />
          {errors.title && <Required>{errors.title.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.description')}</InputLabel>
          <StyledInput {...register('description')} />
          {errors.description && <Required>{errors.description.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.type')}</InputLabel>

          <PSelection {...register('type')}>
            {Object.values(ConstantPostType).map((type) => (
              <option key={type} value={type}>
                {t(`common.${type}`)}
              </option>
            ))}
          </PSelection>
          {errors.type && <Required>{errors.type.message}</Required>}
        </InputContainer>
        <Editor
          apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={postData?.content || t('post.initialContent') || ''}
          init={{
            height: 600,
            menubar: true,
            config: {},
            skin: 'oxide-dark',
            content_css: 'dark',
            images_upload_base_path: `${process.env.REACT_APP_API_URL}/file/upload`,
            images_upload_credentials: true,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar: `undo redo | image link code | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help`,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',

            filePickerCallback: (callback) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*,video/*');
              input.onchange = () => {
                const file = input.files?.[0];
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  callback(e.target.result, { title: file?.name });
                };
                reader.readAsDataURL(file as Blob);
              };
              input.click();
            },
            images_upload_handler: example_image_upload_handler,
          }}
          // value={postData && postData.content}
        />
        <StyledButton type='submit' variant={'primary'}>
          {t('form.save')}
        </StyledButton>
      </FormContainer>
    </Wrapper>
  );
};

export default PEditor;
