"use client"
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
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const data = JSON.stringify({
    "username": username,
    "name": name,
    "password": password,
    "avatarImage": "",
    "email": email
  });

  const headers = {
    "Content-Type": "application/json;charset=UTF-8"
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/sign-up', data, {
        headers: headers
      });
      console.log(name.length)
      if (response.status === 200) {
        // console.log('註冊成功！');
        // console.log(response.data.message)
        setSuccessMessage(response.data.message);
        // 清除錯誤訊息
        setErrorMessage('');
      } //else {
      //   console.log(error.response.data.message)
      //   console.error('註冊失敗');
      // }
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
        {successMessage && <Alert severity="success" sx={{ whiteSpace: 'pre-line' }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{errorMessage}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                // autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="使用者暱稱"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
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