import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

function CustomEditor(props, ref) {
    return (
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={props.initialData}
        onChange={(event, editor) => {
          const data = editor.getData();
        //   console.log({ data });
          if (props.onChange) {
            props.onChange(data); // 將獲取的資料傳給父元件的onChange方法 
          }
        }}
        ref={ref} // 傳遞 ref 給 CKEditor
      />
    );
  }
  
  export default React.forwardRef(CustomEditor);