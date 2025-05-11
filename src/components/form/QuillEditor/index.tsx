import dynamic from 'next/dynamic';
import { ReactQuillProps } from 'react-quill';
import { FormikProps, FormWrapperProps } from 'types';

import { cn } from 'utils';

import styles from './styles.module.scss';
import FormWrapper from '../FormWrapper';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditorBase = ({ className, ...props }: ReactQuillProps & FormWrapperProps & FormikProps) => {
  return (
    <ReactQuill
      className={cn(styles.container, className)}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link'],
          ['image'],
          ['video'],
          ['clean'],
          [{ direction: 'rtl' }],
          [{ lineheight: [] }]
        ],
        clipboard: {
          matchVisual: false
        }
      }}
      {...props}
    />
  );
};

const QuillEditor = (props: ReactQuillProps & FormWrapperProps) => {
  return (
    <FormWrapper column {...props}>
      <QuillEditorBase {...props} />
    </FormWrapper>
  );
};

export default QuillEditor;
