"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
async function fetchUserInfo() {
  const response = axios.get('http://localhost:8080/api/v1/account/users', {
    headers: {
      Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
    }
  })
  return response;
}

// function setupAxiosInterceptors() {
//   axios.interceptors.request.use(
//     (config) => {
//       const token = Cookies.get('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// }

function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserInfo();
        setUser(data.data);
      } catch (error) {
        console.error('獲取帳號資料錯誤:', error);
      }
    }
    fetchData();
    // setupAxiosInterceptors();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>帳號資料</h1>
          <p>使用者暱稱: {user.name}</p>
          <p>使用者帳號: {user.username}</p>
          <p>電子信箱: {user.email}</p>
          {/* <p>角色: {user.roles.join(', ')}</p> */}
        </div>
      ) : (
        <p>請先登入...</p>
      )}
    </div>
  );
}

export default UserInfo;