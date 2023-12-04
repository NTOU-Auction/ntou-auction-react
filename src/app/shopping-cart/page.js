"use client";
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import './cart.css';
import { backdropClasses } from "@mui/material";

export default function ShoppingCart() {

  //token
  const token = Cookies.get('token');
  //購物車資料
  const [shoppingcart, setshoppingcart] = useState(new Map());
  //加入購物車的數量
  const [productAmountTMP, setproductAmountTMP] = useState([]);
  //加入購物車的總額
  const [productCountTMP, setproductCountTMP] = useState([]);
  //總金額
  const [cost, setcost] = useState(0);
  //總數量
  const [total, settotal] = useState(0);

  useEffect(() => {
    async function fetchShoppingcart() {
      try {
        const view = await axios.get("http://localhost:8080/api/v1/shoppingcart/shoppingcart", {
          headers: {
            "Authorization": `Bearer ${token}` // Bearer 跟 token 中間有一個空格
          }
        });
        console.log(view.data.productShowBySeller);
        setshoppingcart(view.data.productShowBySeller);
        console.log(shoppingcart);
        let totalTMP = 0;
        let costTMP = 0;
        {
          Object.keys(view.data.productShowBySeller).map((key, index) => {
            for (let i = 0; i < view.data.productShowBySeller[key].length; i++) {
              productAmountTMP.push(view.data.productShowBySeller[key][i].amount);
              totalTMP += view.data.productShowBySeller[key][i].amount;
              productCountTMP.push(view.data.productShowBySeller[key][i].product.currentPrice * view.data.productShowBySeller[key][i].amount);
              costTMP += (view.data.productShowBySeller[key][i].product.currentPrice * view.data.productShowBySeller[key][i].amount);
            }
          })
          setcost(costTMP);
          settotal(totalTMP);
        }
        console.log(productAmountTMP);
      }
      catch (error) {
        console.error('獲取購物車資料錯誤:', error);
      }
    }
    fetchShoppingcart();
  }, []);

  //商品數量++
  function handleIncrementClick(productID, index, price) {
    const nextAmount = productAmountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextAmount);
    setproductAmountTMP(nextAmount);
    settotal(total + 1);

    const nextCount = productCountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + price;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextCount);
    setproductCountTMP(nextCount);
    setcost(cost + price);

    AddProductAmount(productID);
  }

  const AddProductAmount = async (productID) => {

    const adddata = JSON.stringify({
      productId: productID,
      amount: 1,
    });

    console.log(adddata);
    try {
      let requestData = adddata;
      let API = "http://localhost:8080/api/v1/shoppingcart/increase";
      const response = await axios.post(API, requestData, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("增加成功:", response.data);
        //window.location.href = "/shopping-cart"; 
      }
    }
    catch (error) {
      console.error("新增錯誤:", error);
    }
  };

  //商品數量--
  const DecreaseProductAmount = async (productID) => {

    const decreasedata = JSON.stringify({
      productId: productID,
      amount: 1,
    });

    console.log(decreasedata);
    try {
      let requestData = decreasedata;
      let API = "http://localhost:8080/api/v1/shoppingcart/decrease";
      const response = await axios.delete(API, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        },
        data: requestData,
      });
      if (response.status === 200) {
        console.log("減少成功:", response.data);
        //window.location.href = "/shopping-cart"; 
      }
    }
    catch (error) {
      console.error("減少錯誤:", error);
    }
  };

  function handleDecrementClick(productID, index, price) {
    const nextAmount = productAmountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c - 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextAmount);
    setproductAmountTMP(nextAmount);
    settotal(total - 1);

    const nextCount = productCountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c - price;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextCount);
    setproductCountTMP(nextCount);
    setcost(cost - price);

    DecreaseProductAmount(productID);
  }

  //商品byebye
  const DeleteProductAmount = async (productID) => {

    const deletedata = JSON.stringify({
      productId: productID,
      amount: 0,
    });

    console.log(deletedata);
    try {
      let requestData = deletedata;
      let API = "http://localhost:8080/api/v1/shoppingcart/delete";
      const response = await axios.delete(API, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        },
        data: requestData,
      });
      if (response.status === 200) {
        console.log("刪除成功:", response.data);
        window.location.href = "/shopping-cart";
      }
    }
    catch (error) {
      console.error("刪除錯誤:", error);
    }
  };

  function handleDeleteClick(productID, index) {
    const nextAmount = productAmountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return 0;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextAmount);
    setproductAmountTMP(nextAmount);
    settotal(total - productAmountTMP[index]);

    const nextCount = productCountTMP.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return 0;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    console.log(nextCount);
    setproductCountTMP(nextCount);
    setcost(cost - productCountTMP[index]);

    DeleteProductAmount(productID);
  }

  var count = 0;

  return (
    <Box style={{ display: 'block'  , marginTop: "60px"  }}>
      {shoppingcart ?
        <div>
          {Object.keys(shoppingcart).map((key, index) => {
            return (
              <div key={index} style={{ padding: 5, marginBottom: "20px" }}>
                <hr />
                <div className="container" >
                  <div className="item_header">
                    <div className="item_detail">賣家：{key}</div>
                    <div className="price">單價</div>
                    <div className="count">數量</div>
                    <div className="amount">總計</div>
                    <div className="operate">操作</div>
                  </div>
                  {function () {
                    let show = [];
                    for (let i = 0; i < shoppingcart[key].length; i++) {
                      let countnow = count;
                      show.push(
                        <div>
                          <div className="item_header item_body">
                            <div className="item_detail">
                              <img src={shoppingcart[key][i].product.productImage} alt="Image" />
                              <div className="name" style={{ WebkitLineClamp: 1, overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", boxSizing: "border-box" }}>{shoppingcart[key][i].product.productName}</div>
                            </div>
                            <div className="price"><span>$</span>{shoppingcart[key][i].product.currentPrice}</div>
                            <div className="count">
                              <button onClick={() => productAmountTMP[countnow] > 1 ? handleDecrementClick(shoppingcart[key][i].product.id, countnow, shoppingcart[key][i].product.currentPrice) : setproductAmountTMP(productAmountTMP)}>
                                -
                              </button>
                              <span> {productAmountTMP[countnow]} </span>
                              <button onClick={() => productAmountTMP[countnow] < shoppingcart[key][i].product.productAmount ? handleIncrementClick(shoppingcart[key][i].product.id, countnow, shoppingcart[key][i].product.currentPrice) : setproductAmountTMP(productAmountTMP)}>
                                +
                              </button>
                            </div>
                            <div className="amount"><span>$</span>{productCountTMP[countnow]}</div>
                            <div className="operate">
                              <IconButton aria-label="delete" onClick={() => handleDeleteClick(shoppingcart[key][i].product.id, countnow)}>
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      )
                      count += 1;
                    }
                    return show
                  }()}
                </div>
                <hr />
              </div>
            );
          })}
          <div className="container" >
            <div className="item_header" style={{ height: "40px" }}>
              <div className="item_detail" style={{ display: "flex", alignItems: "center" }}>總計：</div>
              <div className="price"></div>
              <div className="count" >{total}</div>
              <div className="amount">${cost}</div>
              <div className="operate">
                <Button variant="contained" size="small" color="success" endIcon={<AddShoppingCartIcon />}>
                  下單
                </Button>
              </div>
            </div>
          </div>
        </div>
        :
        <p>NO Item In Your ShoppingCart</p>
      }
    </Box >
  );
}