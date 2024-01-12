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
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import IconButton from '@mui/material/IconButton';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const CHECK_ORDER_WAITING = "/api/v1/order/check/waiting"; // 查看待確認訂單
const CHECK_ORDER_ALL = "/api/v1/order/check/all"; // 查看所有訂單
const CHECK_ORDER_REJECT = "/api/v1/order/check/reject"; // 查看已被拒絕的訂單
const CHECK_ORDER_ACCEPT = "/api/v1/order/check/submitted" // 查看已同意的訂單
const CHECK_ORDER_DONE = "/api/v1/order/check/done"; // 查看已完成的訂單
const MAKESUBMIT = "/api/v1/order/makesubmit"; //賣家同意訂單
const MAKEDONE = "/api/v1/order/makedone"; //買家付款後，賣家結束訂單
const MAKEREJECT = "/api/v1/order/makereject"; //買家不同意訂單
const token = Cookies.get("token");

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}><strong>{children}</strong></Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

async function fetchOrderInfo() {
  const response = await axios.get(CHECK_ORDER_WAITING, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function fetchOrderAll() {
  const response = await axios.get(CHECK_ORDER_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function fetchOrderReject() {
  const response = await axios.get(CHECK_ORDER_REJECT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function fetchOrderAccept() {
  const response = await axios.get(CHECK_ORDER_ACCEPT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function fetchOrderDone() {
  const response = await axios.get(CHECK_ORDER_DONE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]); // 待確認
  const [ordersDataAll, setOrdersDataAll] = useState([]); // 所有
  const [ordersDataReject, setOrdersDataReject] = useState([]); // 拒絕
  const [ordersDataAccept, setOrdersDataAccept] = useState([]); // 接受
  const [ordersDataDone, setOrdersDataDone] = useState([]); // 完成
  const [selectedActions, setSelectedActions] = useState({});
  const [error, setError] = useState(null); // 設定錯誤訊息
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarErrror, setOpenSnackbarErrror] = useState(false); // 設定提示訊息開關
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        location.reload();
        break;
      case `makereject_${orderId}`:
        await makeRejectOrder(orderId);
        location.reload();
        break;
      default:
        break;
    }
  };

  const handleOrderDoneClick = async (orderId) => {
    await makeDoneOrder(orderId);
    location.reload();
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
        const orderDataAll = await fetchOrderAll();
        const orderDataReject = await fetchOrderReject();
        const orderDataAccept = await fetchOrderAccept();
        const orderDataDone = await fetchOrderDone();
        // console.log(orderData);
        setOrdersData(orderData);
        setOrdersDataAll(orderDataAll);
        setOrdersDataReject(orderDataReject);
        setOrdersDataAccept(orderDataAccept);
        setOrdersDataDone(orderDataDone);
        console.log(orderDataAll);
        // setOrdersData(mockOrders); // 假測資
      } catch (error) {
        console.error("獲取訂單資料錯誤:", error);
      }
    }
    fetchOrder();
  }, []);

  const handleButtonClick = (order) => {
    localStorage.removeItem("usersReceiver");
    const users = JSON.parse(
      localStorage.getItem("usersReceiver") ?? "[]"
    );
    const buyerIDToAdd = (order.buyerid);
    var buyerNameToAdd = "";
    buyerNameToAdd = order.buyername
    const isSellerIDExists = users.some(
      (user) => user.id === buyerIDToAdd
    );

    if (!isSellerIDExists) {
      // 將新的 sellerID 添加到 users 陣列
      users.push({ id: buyerIDToAdd, name: buyerNameToAdd });
      // 存回 localStorage
      localStorage.setItem("usersReceiver", JSON.stringify(users));
    }
    window.location.href = '../chat'
  };

  return (
    <Paper
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
      style={{ marginTop: "60px", overflowX: "scroll" }} 
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="待審核訂單" {...a11yProps(0)} />
          <Tab label="全部訂單" {...a11yProps(1)} />
          <Tab label="已拒絕訂單" {...a11yProps(2)} />
          <Tab label="已接受訂單" {...a11yProps(3)} />
          <Tab label="已完成訂單" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <React.Fragment>
          {/* <Title>
            <strong>訂單管理</strong>
          </Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>買家名稱</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>付款金額</TableCell>
                <TableCell>購買數量</TableCell>
                <TableCell>訂單狀態</TableCell>
                <TableCell>管理訂單狀態</TableCell>
                <TableCell>更改訂單狀態</TableCell>
                <TableCell>聯絡買家</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.updateTime}</TableCell>
                  <TableCell>{order.buyername}</TableCell>
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
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!selectedActions[order.orderid]} // 禁用按钮，如果未選擇操作
                      onClick={() => handleExecuteAction(order.orderid)}
                    >
                      執行
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleButtonClick(order)}>
                      <QuestionAnswerIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <React.Fragment>
          {/* <Title>
            <strong>訂單管理</strong>
          </Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>買家名稱</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>付款金額</TableCell>
                <TableCell>購買數量</TableCell>
                <TableCell>訂單狀態</TableCell>
                <TableCell>聯絡買家</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersDataAll.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.updateTime}</TableCell>
                  <TableCell>{order.buyername}</TableCell>
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
                  <TableCell>{getStatusText(order.status)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleButtonClick(order)}>
                      <QuestionAnswerIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <React.Fragment>
          {/* <Title>
            <strong>訂單管理</strong>
          </Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>買家名稱</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>付款金額</TableCell>
                <TableCell>購買數量</TableCell>
                <TableCell>訂單狀態</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersDataReject.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.updateTime}</TableCell>
                  <TableCell>{order.buyername}</TableCell>
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
                  <TableCell>{getStatusText(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <React.Fragment>
          {/* <Title>
            <strong>訂單管理</strong>
          </Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>買家名稱</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>付款金額</TableCell>
                <TableCell>購買數量</TableCell>
                <TableCell>訂單狀態</TableCell>
                <TableCell>更改訂單狀態</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersDataAccept.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.updateTime}</TableCell>
                  <TableCell>{order.buyername}</TableCell>
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
                  <TableCell>{getStatusText(order.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOrderDoneClick(order.orderid)}
                    >
                      完成訂單
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <React.Fragment>
          {/* <Title>
            <strong>訂單管理</strong>
          </Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>買家名稱</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>付款金額</TableCell>
                <TableCell>購買數量</TableCell>
                <TableCell>訂單狀態</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersDataDone.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.updateTime}</TableCell>
                  <TableCell>{order.buyername}</TableCell>
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
                  <TableCell>{getStatusText(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </CustomTabPanel>
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