"use client";
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const INCOMEAPI = "api/v1/order/check/income"
const token = Cookies.get("token");

async function fetchIncome() {
  const response = await axios.get(INCOMEAPI, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


export default function Chart() {
  const [incomesData, setIncomesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const incomeData = await fetchIncome();
        setIncomesData(incomeData);
        // console.log(incomeData)
      } catch (error) {
        console.error("獲取收入資料錯誤:", error);
      }
    }
    fetchData();
  }, []);

  const convertedData = [];
  // useEffect(() => {
    const today = new Date();
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const addZero = (num) => (num < 10 ? `0${num}` : num);
      const formattedDate = `${addZero(date.getMonth() + 1)}/${addZero(date.getDate())}`;
      const income = incomesData[i];
      convertedData.push({
        date: formattedDate,
        收入: income
      });
    }
    // console.log(convertedData);
  // }, [incomesData]);

  return (
    <React.Fragment>
        <Title><strong>本週收入</strong></Title>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={convertedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="收入"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
  );
}