"use client";
import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import axios from "axios";
import Cookies from "js-cookie";

const INCOMEAPI = "api/v1/order/check/income";
const token = Cookies.get("token");

async function fetchIncome() {
  const response = await axios.get(INCOMEAPI, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default function Deposits() {
  const [incomesData, setIncomesData] = useState([]);
  const total = incomesData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const formattedTotal = "NT$" + total.toLocaleString("zh-TW");
  useEffect(() => {
    async function fetchData() {
      try {
        const incomeData = await fetchIncome();
        setIncomesData(incomeData);
        console.log(incomeData)
      } catch (error) {
        console.error("獲取收入資料錯誤:", error);
      }
    }
    fetchData();
  }, []);

  const today = new Date(); // 獲取當前日期
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);
  const year = oneWeekAgo.getFullYear(); // 取得年份
  const month = oneWeekAgo.getMonth() + 1; // 取得月份
  const day = oneWeekAgo.getDate(); // 取得日期
  const addZero = (num) => (num < 10 ? `0${num}` : num);
  const formattedDate = `${year}-${addZero(month)}-${addZero(day)}`;
  
  return (
    <React.Fragment>
      <Title>
        <strong>最近的總收入</strong>
      </Title>
      <Typography component="p" variant="h4">
        {formattedTotal}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        從 {formattedDate} 至今
      </Typography>
    </React.Fragment>
  );
}