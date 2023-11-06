"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// use for login
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// alert
import { Alert } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NTOU AUCTION
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function setupAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        //console.log(config)
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const data = JSON.stringify({
    "username": username,
    "password": password
  });
  const headers = {
    "Content-Type": "application/json;charset=UTF-8"
  }

  useEffect(() => {
    setupAxiosInterceptors();
  }, []); 

  // const [token, setToken] = useState(null);
  // console.log(username);
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/log-in', data, {
        headers: headers
      });
      // console.log(error)
      // console.log(username,password)
      if (response.status === 200) {
        //登入成功，將從後端拿到的token存在 Cookie 中
        const { token } = response.data;
        Cookies.set('token', token);
        window.location.href = '/'; // 登入成功 導向主頁面
        // setToken(token);
        
      } else {
        window.alert("登入失敗");
        console.error('登入失敗');
      }
    } catch (error) {
      // window.alert("登入失敗");
      <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
      </Alert>
    }
  };

  // const handleLogout = () => {
  // 清除 Cookie 中的token
  //   Cookies.remove('token');
  //   setToken(null);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required  /*必要輸入*/
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
              <Link href="#" variant="body2">
                忘記密碼?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {/* // TODO */}
                {"尚未註冊帳號? 按此註冊"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}