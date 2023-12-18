"use client";
import * as React from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "@/components/Title";
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';

export default function Orders() {

  //token
  const token = Cookies.get('token');
  //API
  const CheckOrderAPI = "http://localhost:8080/api/v1/order/check";
  //OrderList
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    fetch(CheckOrderAPI, {
        headers: {
          "Authorization": `Bearer ${token}` // Bearer 跟 token 中間有一個空格
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setorderlist(data);
      })
      .catch((error) => {
        console.error('獲取訂單資料錯誤:', error);
      });
  }, []);

  var len = orderlist ? Object.keys(orderlist).length : 0;

  return (
    <Box style={{ display: 'block', marginTop: "60px" }}>
      <Title>
        <strong>近期訂單</strong>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>賣家</TableCell>
            <TableCell>交易商品</TableCell>
            <TableCell>付款金額</TableCell>
            <TableCell align="right">購買數量</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderlist ? function () {
              let show = []
              //console.log(orderlist);
              for (let i = 0; i < len; i++) {
                show.push(<TableRow key={orderlist[i].orderid}>
                            <TableCell>{orderlist[i].updateTime}</TableCell>
                            <TableCell>{orderlist[i].productAddAmountList[0].product.sellerName}</TableCell>
                            <TableCell>{orderlist[i].productAddAmountList[0].product.productName}</TableCell>
                            <TableCell>{`$${orderlist[i].productAddAmountList[0].product.currentPrice}`}</TableCell>
                            <TableCell align="right">{orderlist[i].productAddAmountList[0].amount}</TableCell>
                          </TableRow>)
              }
              return show
            }() : <p></p>}
        </TableBody>
      </Table>
    </Box>
  );
}
