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
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        //登入成功，將從後端拿到的token存在 Cookie 中
        const { token } = response.data;
        Cookies.set('token', token);
        setToken(token);
      } else {
        console.error('登入失敗');
      }
    } catch (error) {
      console.error('發生錯誤:', error);
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
              label="使用者姓名" /*提示字*/
              name="username" 
              autoComplete="name" /*自動填入*/ 
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required  
              fullWidth
              id="password"
              name="password"
              label="使用者密碼"
              type="password"            
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="記住密碼"
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