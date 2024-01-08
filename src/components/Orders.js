"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "@/components/Title";
import axios from "axios";
import Cookies from "js-cookie";

const CHECK_ORDER_ALL = "/api/v1/order/check/all"; // 查看所有訂單
const token = Cookies.get("token");

async function fetchOrderAll() {
  const response = await axios.get(CHECK_ORDER_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default function Orders() {
  const [ordersDataAll, setOrdersDataAll] = useState([]); // 所有訂單
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "拒絕";
      case 1:
        return "等待提交";
      case 2:
        return "已提交但未付款";
      case 3:
        return "訂單完成";
      default:
        return "未知狀態";
    }
  };

  useEffect(() => {
    async function fetchOrder() {
      try {
        const orderDataAll = await fetchOrderAll();
        setOrdersDataAll(orderDataAll);
      } catch (error) {
        console.error("獲取訂單資料錯誤:", error);
      }
    }
    fetchOrder();
  }, []);

  return (
    <React.Fragment>
      <Title>
        <strong>近期訂單</strong>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>訂單編號</TableCell>
            <TableCell>日期</TableCell>
            <TableCell>商品名稱</TableCell>
            <TableCell>付款金額</TableCell>
            <TableCell>購買數量</TableCell>
            <TableCell align="right">訂單狀態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersDataAll.slice(0, 5).map((order) => (
            <TableRow key={order.orderid}>
              <TableCell>{order.orderid}</TableCell>
              <TableCell>{order.updateTime}</TableCell>
              <TableCell>
                {order.productAddAmountList.map((productItem, index) => (
                  <div key={index}>{productItem.product.productName}</div>
                ))}
              </TableCell>
              <TableCell>
                {order.productAddAmountList.map((productItem, index) => (
                  <div key={index}>{productItem.product.currentPrice * productItem.amount}</div>
                ))}
              </TableCell>
              <TableCell>
                    {order.productAddAmountList.map((productItem, index) => (
                      <div key={index}>{productItem.amount}</div>
                    ))}
                  </TableCell>
              <TableCell align="right">{getStatusText(order.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}