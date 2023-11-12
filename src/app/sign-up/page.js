import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 基本的資料檢查
    if (!username || !email || !password) {
      setErrorMessage('所有欄位都是必填的');
      return;
    }

    // 檢查密碼長度
    if (password.length < 8) {
      setErrorMessage('密碼長度至少要 8 個字元');
      return;
    }

    // 檢查 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('請輸入有效的電子信箱');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        console.log('註冊成功！');
        // 在這裡可以進行一些轉導或其他操作
      } else {
        console.error('註冊失敗');
      }
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  };

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
          註冊
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="username"
                label="使用者帳號"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="使用者信箱"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="使用者密碼"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            註冊
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="sign-in" variant="body2">
                已經有帳戶了嗎? 按此登入
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
