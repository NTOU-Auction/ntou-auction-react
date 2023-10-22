"use client"
import { useEffect, useState } from 'react';

async function fetchUserInfo() {
  const response = await fetch('http://localhost:8080/api/v1/test/hello');
  if (!response.ok) {
    throw new Error('API請求失敗');
  }
  return response.json();
}

function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserInfo();
        setUser(data);
      } catch (error) {
        console.error('獲取帳號資料錯誤:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>帳號資料</h1>
          <p>使用者名稱: {user.username}</p>
          <p>姓名: {user.name}</p>
          <p>電子信箱: {user.email}</p>
          <p>角色: {user.roles.join(', ')}</p>

        </div>
      ) : (
        <p>正在載入帳號資料...</p>
      )}
    </div>
  );
}

export default UserInfo;