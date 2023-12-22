"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Typography, CircularProgress, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";

const token = Cookies.get("token");

async function fetchUserInfo() {
  const response = await axios.get(
    "http://localhost:8080/api/v1/account/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("獲取帳號資料錯誤:", error);
      }
    }
    fetchData();
  }, []);

  /* 登出 */
  const [loggedIn, setLoggedIn] = React.useState(!!user); // 假設 user 是您從某處獲得的使用者資訊
  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false); // 將使用者設定為未登入狀態
    location.reload();
  };

  return (
    <div>
      {user ? (
        <Card variant="outlined" style={{ marginTop: "60px" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              帳號資料
            </Typography>
            <Typography variant="subtitle1">
              使用者暱稱: {user?.name}
            </Typography>
            <Typography variant="subtitle1">
              使用者帳號: {user?.username}
            </Typography>
            <Typography variant="subtitle1">
              電子信箱: {user?.email}
            </Typography>
            <hr/>
            <Button onClick={handleLogout} variant="contained" style={{ fontSize: "15px" }}>
              登出
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <CircularProgress />
          <Card variant="outlined" style={{ marginTop: "60px" }}>
            <Typography variant="h4" gutterBottom>
              請先登入
            </Typography>
          </Card>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
