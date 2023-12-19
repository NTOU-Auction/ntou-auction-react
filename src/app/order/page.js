"use client";
import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "@/components/Title";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Cookies from "js-cookie";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CHECKORDER = "http://localhost:8080/api/v1/order/check"; // 賣家查看待確認訂單
const MAKESUBMIT = "http://localhost:8080/api/v1/order/makesubmit"; //賣家同意訂單
const MAKEDONE = "http://localhost:8080/api/v1/order/makedone"; //買家付款後，賣家結束訂單
const MAKEREJECT = "http://localhost:8080/api/v1/order/makereject"; //買家不同意訂單
const token = Cookies.get("token");
const mockOrders = [
  {
    orderid: 3,
    buyerid: 1,
    sellerid: 1,
    productAddAmountList: [
      {
        product: {
          id: 1,
          version: 3,
          productName: "IPhone10",
          productType: "electronic",
          isFixedPrice: true,
          productDescription: "ggggg",
          sellerID: 1,
          sellerName: null,
          productAmount: 1,
          bidInfo: {},
          upsetPrice: null,
          currentPrice: 1500,
          bidIncrement: null,
          isAuction: null,
          updateTime: "2023-11-04 19:45:00",
          finishTime: null,
          productImage: null,
          expired: false,
        },
        amount: 1,
      },
      {
        product: {
          id: 2,
          version: 3,
          productName: "IPhone11",
          productType: "electronic",
          isFixedPrice: true,
          productDescription: "ggggg",
          sellerID: 1,
          sellerName: null,
          productAmount: 1,
          bidInfo: {},
          upsetPrice: null,
          currentPrice: 1500,
          bidIncrement: null,
          isAuction: null,
          updateTime: "2023-11-04 19:45:00",
          finishTime: null,
          productImage: null,
          expired: false,
        },
        amount: 1,
      },
    ],
    status: 1,
    updateTime: "2023-12-18 23:52:15",
  },
  {
    orderid: 4,
    buyerid: 1,
    sellerid: 1,
    productAddAmountList: [
      {
        product: {
          id: 1,
          version: 3,
          productName: "IPhone12",
          productType: "electronic",
          isFixedPrice: true,
          productDescription: "ggggg",
          sellerID: 1,
          sellerName: null,
          productAmount: 1,
          bidInfo: {},
          upsetPrice: null,
          currentPrice: 1500,
          bidIncrement: null,
          isAuction: null,
          updateTime: "2023-11-04 19:45:00",
          finishTime: null,
          productImage: null,
          expired: false,
        },
        amount: 1,
      },
    ],
    status: 1,
    updateTime: "2023-12-18 23:52:16",
  },
];

async function fetchOrderInfo() {
  const response = await axios.get(CHECKORDER, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}



export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});
  const [error, setError] = useState(null); // 設定錯誤訊息
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarErrror, setOpenSnackbarErrror] = useState(false); // 設定提示訊息開關
 
  async function makeSubmitOrder(orderId) {
    console.log(orderId);
    const ORDER = JSON.stringify({
      orderId: orderId,
    });
    try {
      const response = await axios.post(MAKESUBMIT, ORDER, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("賣家同意訂單成功:", response.data);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("同意訂單時出現錯誤: " + error.response.data.message);
      setOpenSnackbarErrror(true);
      console.error("賣家同意訂單時出現錯誤:", error);
    }
  }
  
  async function makeDoneOrder(orderId) {
    console.log(orderId);
    const ORDER = JSON.stringify({
      orderId: orderId,
    });
    try {
      const response = await axios.post(MAKEDONE, ORDER, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("賣家結束訂單成功:", response.data);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("結束訂單時出現錯誤: " + error.response.data.message);
      setOpenSnackbarErrror(true);
      console.error("賣家結束訂單時出現錯誤:", error);
    }
  }
  
  async function makeRejectOrder(orderId) {
    console.log(orderId);
    const ORDER = JSON.stringify({
      orderId: orderId,
    });
    try {
      const response = await axios.post(MAKEREJECT, ORDER, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("賣家不同意訂單成功:", response.data);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("不同意訂單時出現錯誤: " + error.response.data.message);
      setOpenSnackbarErrror(true);
      console.error("賣家不同意訂單時出現錯誤:", error);
    }
  }
  
  const handleActionChange = (event, orderId) => {
    const { value } = event.target;
    setSelectedActions({ ...selectedActions, [orderId]: value });
  };

  const handleExecuteAction = async (orderId) => {
    const selectedAction = selectedActions[orderId];
    switch (selectedAction) {
      case `makesubmit_${orderId}`:
        await makeSubmitOrder(orderId);
        break;
      case `makedone_${orderId}`:
        await makeDoneOrder(orderId);
        break;
      case `makereject_${orderId}`:
        await makeRejectOrder(orderId);
        break;
      default:
        break;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbarErrror(false);
  };

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
        const orderData = await fetchOrderInfo();
        console.log(orderData);
        // setOrdersData(orderData);
        setOrdersData(mockOrders); // 假測資
      } catch (error) {
        console.error("獲取訂單資料錯誤:", error);
      }
    }
    fetchOrder();
  }, []);

  return (
    <Paper
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
      style={{ marginTop: "60px" }}
    >
      <React.Fragment>
        <Title>
          <strong>訂單管理</strong>
        </Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>訂單編號</TableCell>
              <TableCell>日期</TableCell>
              <TableCell>商品名稱</TableCell>
              <TableCell>付款金額</TableCell>
              <TableCell>購買數量</TableCell>
              <TableCell>訂單狀態</TableCell>
              <TableCell>管理訂單狀態</TableCell>
              <TableCell align="right">更改訂單狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
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
                    <div key={index}>{productItem.product.currentPrice}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.productAddAmountList.map((productItem, index) => (
                    <div key={index}>{productItem.product.productAmount}</div>
                  ))}
                </TableCell>
                <TableCell>{getStatusText(order.status)}</TableCell>
                <TableCell>
                  <Select
                    value={selectedActions[order.orderid] || ""}
                    onChange={(e) => handleActionChange(e, order.orderid)}
                  >
                    <MenuItem value="">請選擇訂單</MenuItem>
                    <MenuItem value={`makesubmit_${order.orderid}`}>
                      同意訂單
                    </MenuItem>
                    <MenuItem value={`makereject_${order.orderid}`}>
                      拒絕訂單
                    </MenuItem>
                    <MenuItem value={`makedone_${order.orderid}`}>
                      結束訂單
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedActions[order.orderid]} // 禁用按钮，如果未選擇操作
                    onClick={() => handleExecuteAction(order.orderid)}
                  >
                    執行
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
      <Snackbar
        open={openSnackbarErrror}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          更新狀態成功
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
}
