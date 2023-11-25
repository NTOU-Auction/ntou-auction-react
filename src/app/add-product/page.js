"use client";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import dynamic from "next/dynamic";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";


// const theObj = { __html: productDescription };
const CustomEditor = dynamic(
  () => {
    return import("../../components/custom-editor");
  },
  { ssr: false }
);

const UploadProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] =
    useState("請輸入商品詳情");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDeadline, setProductDeadline] = useState("");
  const [auctionType, setAuctionType] = useState("0"); // default為競標
  const [productIncPrice, setProductIncPrice] = useState("");
  const [productAmount, setProductAmount] = useState("1");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  // 上傳商品縮圖
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);
  const token = Cookies.get("token");
  const onFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setImageSelected(true);
    setFile(e.target.files[0]);
  };
  const onClick = (e) => {
    e.currentTarget.value = "";
  };

  // 設定時間格式
  const handleDateTimeChange = (dateObject) => {
    const year = dateObject.$y;
    const month = `0${dateObject.$M + 1}`.slice(-2);
    const day = `0${dateObject.$D}`.slice(-2);
    const hours = `0${dateObject.$H}`.slice(-2);
    const minutes = `0${dateObject.$m}`.slice(-2);
    const seconds = `0${dateObject.$s}`.slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDateTime);
    setProductDeadline(formattedDateTime);
  };

  // 設定CustomEditor訊息傳遞
  const editorRef = useRef();
  const handleEditorChange = (data) => {
    setProductDescription(data);
  };

  useEffect(() => {
    // 調用 ref.current.editor.getData() 來獲取editor的data
    if (editorRef.current && editorRef.current.editor) {
      const editorData = editorRef.current.editor.getData();
      console.log("Editor Data:", editorData);
    }
  }, []);

  const headers = {
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 設定縮圖
    const base64 = await toBase64(file);
    setBase64(base64);
    const productDataFixed = JSON.stringify({
      productName: productName,
      currentPrice: productPrice,
      productType: productCategory,
      productDescription: productDescription,
      productImage: base64,
      productAmount: productAmount,
    });

    const productDataAuction = JSON.stringify({
      productName: productName,
      upsetPrice: productPrice,
      bidIncrement: productIncPrice,
      productAmount: productAmount,
      finishTime: productDeadline,
      productType: productCategory,
      productDescription: productDescription,
      productImage: base64,
    });

    try {
      let requestData = {};
      let endpoint = "";
      if (auctionType === "0") {
        requestData = productDataAuction;
        endpoint = "http://localhost:8080/api/v1/product/nonfixedproduct";
      } else if (auctionType === "1") {
        requestData = productDataFixed;
        endpoint = "http://localhost:8080/api/v1/product/fixedproduct";
      } else {
        throw new Error("Invalid auctionType value");
      }
      const response = await axios.post(endpoint, productDataAuction, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        console.log("商品上傳成功:", response.data);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("商品上傳失敗:", error);
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      {successMessage && (
        <Alert severity="success" sx={{ whiteSpace: "pre-line" }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
          {errorMessage}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={6} style={{ padding: "20px" }}>
            <Typography variant="h5" style={{ color: "#0476D9" }}>
              請填寫商品上架資訊
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    請選擇拍賣種類
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={auctionType}
                    // onChange={(e) => setAuctionType(e.target.value)}
                    onChange={(e) => {
                      setAuctionType(e.target.value);
                      if (e.target.value === "1") {
                        setProductDeadline(""); // 在選擇不二價時將 productDeadline 設為空字串
                      } else if (e.target.value === "0") {
                        setProductAmount("1"); // 在選擇拍賣時將 ProductAmount 設為1
                      }
                    }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="競標"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="不二價"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <br></br>
              <Grid item xs={3}>
                <InputLabel id="demo-simple-select-required-label">
                  請出入商品名稱
                </InputLabel>
                <TextField
                  label="商品名稱"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
              <br></br>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-required-label">
                  選擇商品縮圖
                </InputLabel>
                {!imageSelected ? (
                  <p style={{ color: "red" }}>請上傳圖片</p>
                ): <p style={{ color: "green" }}>圖片以上傳</p>}
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    上傳圖片
                    <input
                      style={{ display: "none" }}
                      required
                      id="contained-button-file"
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      onClick={onClick}
                    />
                  </Button>
                </label>  
              </Grid>
              <br></br>
              <br></br>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-required-label">
                  請選擇商品的種類
                </InputLabel>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-required-label">
                    商品種類
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={productCategory}
                    label="商品種類 *"
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <MenuItem value={"electronic"}>3C產品</MenuItem>
                    <MenuItem value={"Daily need"}>日常用品</MenuItem>
                    <MenuItem value={"Stationary"}>文具類</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <br></br>
              <Grid item xs={3}>
                <InputLabel id="demo-simple-select-required-label">
                  請輸入商品價格
                </InputLabel>
                <TextField
                  label="商品價格"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              {auctionType === "1" && (
                <Grid item xs={3}>
                  <InputLabel id="demo-simple-select-required-label">
                    請輸入商品數量
                  </InputLabel>
                  <TextField
                    label="商品數量"
                    value={productAmount}
                    onChange={(e) => setProductAmount(e.target.value)}
                    type="number"
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              )}
              <br></br>

              {auctionType === "0" && (
                <Grid item xs={3}>
                  <InputLabel id="demo-simple-select-required-label">
                    請輸入每口叫價
                  </InputLabel>
                  <TextField
                    label="每口叫價"
                    value={productIncPrice}
                    onChange={(e) => setProductIncPrice(e.target.value)}
                    type="number"
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              )}

              {auctionType === "0" && (
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-required-label">
                    請選擇拍賣截止日期
                  </InputLabel>
                  <p></p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="選擇拍賣截止日期"
                      value={productDeadline}
                      onChange={handleDateTimeChange}
                      renderInput={(params) => <TextField {...params} />}
                      minDateTime={dayjs(new Date())}
                    />
                    <br></br>
                    <br></br>
                  </LocalizationProvider>
                </Grid>
              )}

              <InputLabel id="demo-simple-select-required-label">
                請輸入商品描述
              </InputLabel>
              <Grid item xs={8}>
                <CustomEditor
                  onChange={handleEditorChange}
                  ref={editorRef} // 將 ref 绑定到 CustomEditor 组件
                  // value={productDescription}
                  initialData="請輸入商品描述"
                />
              </Grid>
              <br></br>
              <br></br>

              <Button type="submit" variant="contained" color="primary">
                上傳商品
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UploadProductForm;