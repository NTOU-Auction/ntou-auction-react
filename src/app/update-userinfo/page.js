"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";

const token = Cookies.get("token");

function UpdateUserInfo() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let storedObject = localStorage.getItem("userInfo");
    if (storedObject) {
      let parsedObject = JSON.parse(storedObject);
      setName(parsedObject.name);
      setUsername(parsedObject.username);
      setEmail(parsedObject.email);
    }
  }, []);

  const data = JSON.stringify({
    username: username,
    name: name,
    password: password,
    avatarImage: "",
    email: email,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch("/api/v1/account/users", data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(name.length);
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        Cookies.remove('token');
        localStorage.removeItem("userInfo");
        window.location.href = "/sign-up";
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error("發生錯誤:", error);
    }
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
          更新帳號資料
        </Typography>
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                // required
                value={name}
                fullWidth
                id="name"
                label="使用者暱稱"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                value={username}
                required
                fullWidth
                id="username"
                label="使用者帳號"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                value={email}
                required
                fullWidth
                id="email"
                label="使用者信箱"
                // autoComplete="email"
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
                // autoComplete="new-password"
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
            更新資訊
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UpdateUserInfo;
