"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import dynamic from 'next/dynamic';
import { Grid } from "@mui/material";
const htmlString = "";
const theObj = { __html: htmlString };

const CustomEditor = dynamic(
  () => {
    return import("../../components/custom-editor");
  },
  { ssr: false }
);

const UploadProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDeadline, setProductDeadline] = useState("");

  const handleDateTimeChange = (date) => {
    date = new Date(date.toISOString());
    const formattedDateTime = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    // console.log(typeof formattedDateTime);
    setProductDeadline(formattedDateTime);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = JSON.stringify({
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
    });

    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      // 發送POST請求到後端API端點
      const response = await axios.post(
        "http://localhost:8080/api/v1/product/products",
        productData,
        { headers: headers }
      );
      console.log("商品上傳成功:", response.data);
      // 在這裡可以處理上傳成功後的其他邏輯或重新導向
    } catch (error) {
      console.error("商品上傳失敗:", error);
      // 在這裡可以處理上傳失敗後的錯誤狀況
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="商品名稱"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Grid>
        <div dangerouslySetInnerHTML={theObj} />
      </Grid>
      <TextField
        label="商品描述"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="商品類別"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="商品價格"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        type="number"
        fullWidth
        required
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="選擇日期"
          value={productDeadline}
          onChange={handleDateTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <CustomEditor initialData="<h1>...!</h1>" />
      <br></br>
      <br></br>
      <Button type="submit" variant="contained" color="primary">
        上傳商品
      </Button>
    </form>
  );
  //productName, isFixedPrice(0:競標 1:不二價), productImage(base64), productDescription(CK5), price, 商品截止time(for競標)
};

// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import axios from 'axios';

// const UploadProductForm = () => {
//   const [productDescription, setProductDescription] = useState('');

//   const handleProductDescriptionChange = (event, editor) => {
//     const data = editor.getData();
//     setProductDescription(data);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const productData = {
//       description: productDescription,
//       // other product data...
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/product/products', productData);
//       console.log('商品上傳成功:', response.data);
//       // 在這裡可以處理上傳成功後的其他邏輯或重新導向
//     } catch (error) {
//       console.error('商品上傳失敗:', error);
//       // 在這裡可以處理上傳失敗後的錯誤狀況
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CKEditor
//         editor={ClassicEditor}
//         config={{
//           // plugins: [Base64UploadAdapter],
//           image: {
//             upload: {
//               types: ['png', 'jpeg'] // 設置允許上傳的圖片類型
//               // 其他圖片上傳配置
//             }
//           }
//           // 其他編輯器設定
//         }}
//         onChange={handleProductDescriptionChange}
//       />
//       <TextField
//         label="商品描述"
//         value={productDescription}
//         multiline
//         rows={4}
//         fullWidth
//         required
//         margin="normal"
//       />
//       <Button type="submit" variant="contained" color="primary">
//         上傳商品
//       </Button>
//     </form>
//   );
// };

export default UploadProductForm;

// import React from 'react';
// // import React, { useState } from 'react';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import Editor from 'ckeditor5-custom-build/build/ckeditor';
// // import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react'

// const MyCkeditor = () => {
//     const API_URl = "https://noteyard-backend.herokuapp.com"
//     const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

//     function uploadAdapter(loader) {
//         return {
//             upload: () => {
//                 return new Promise((resolve, reject) => {
//                     const body = new FormData();
//                     loader.file.then((file) => {
//                         body.append("uploadImg", file);
//                         fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
//                             method: "post",
//                             body: body
//                         })
//                             .then((res => res.json()))
//                             .then((res) => {
//                                 resolve({ default: `${API_URl}/${res.url}` })
//                             })
//                             .catch((err) => {
//                                 reject(err);
//                             })
//                     })
//                 })
//             }
//         }
//     }

//     function uploadPlugin(editor) {
//         editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//             return uploadAdapter(loader);
//         }
//     }
//     return (
//         <div>
//             <div className="App">
//                 {/* <h2>Using CKEditor 5 from online builder in React</h2> */}
//                 <CKEditor
//                     config={{
//                         extraPlugins: [uploadPlugin]
//                     }}
//                     editor={ClassicEditor}
//                     data="<p>Hello from CKEditor 5!</p>"
//                     onReady={editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log('Editor is ready to use!', editor);
//                     }}
//                     onChange={(event, editor) => {
//                         const data = editor.getData();
//                         console.log({ event, editor, data });
//                     }}
//                     onBlur={(event, editor) => {
//                         console.log('Blur.', editor);
//                     }}
//                     onFocus={(event, editor) => {
//                         console.log('Focus.', editor);
//                     }}
//                 />
//             </div>
//         </div>
//     )
// }

// export default MyCkeditor;
