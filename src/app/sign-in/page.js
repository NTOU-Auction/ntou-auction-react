"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// use for login
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// sign in error display
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/NTOU-Auction/ntou-auction-react"
      >
        NTOU AUCTION
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/*透過cookie進行認證*/
function setupAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        //console.log(config)
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarErrror, setOpenSnackbarErrror] = useState(false); // 設定提示訊息開關
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const data = JSON.stringify({
    username: username,
    password  : password,
  });
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/log-in",
        data,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        //登入成功，將從後端拿到的token存在 Cookie 中
        const { token } = response.data;
        Cookies.set("token", token);
        setOpenSnackbar(true);
        window.location.href = "/"; // 登入成功 導向主頁面
      } else {
        setError("登入失敗");
        setOpenSnackbarErrror(true); // 顯示 Snackbar
        console.error("登入失敗");
      }
    } catch (error) {
      setError("登入失敗，請檢查帳號密碼");
      setOpenSnackbarErrror(true); // 顯示 Snackbar
      console.error("發生錯誤:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbarErrror(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required /*必要輸入*/
            fullWidth
            id="username"
            label="使用者帳號" /*提示字*/
            // name="username"
            autoComplete="name" /*自動填入*/
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            // name="password"
            label="使用者密碼"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                忘記密碼?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="sign-up" variant="body2">
                {/* // TODO */}
                {"尚未註冊帳號? 按此註冊"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* 顯示錯誤訊息 */}
      <Snackbar
        open={openSnackbarErrror}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          登入成功
        </MuiAlert>
      </Snackbar>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}