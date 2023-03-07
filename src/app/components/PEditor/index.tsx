import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const PEditor = () => {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setState({ ...state, content: editorRef.current.getContent(), saved: true });
    }
  };
  const [state, setState] = React.useState({
    content: '',
    saved: false,
    post: {
      description: '',
    },
    urlImage: '',
    loading: false,
  });
  const _handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  };
  const example_image_upload_handler = (blobInfo, progress) =>
    new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', `${process.env.REACT_APP_API_URL}/file/upload`);

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
        console.log('🚀 ~ file: index.tsx:46 ~ PEditor ~ xhr.responseText:', xhr.responseText);

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
  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
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
        onChange={_handleEditorChange}
        value={state.saved ? '' : state.content}
      />
      <button onClick={log}>Save</button>
    </>
  );
};

export default PEditor;
