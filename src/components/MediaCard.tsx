import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TpModal from "@/components/TpModal";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import "./ScrollBar.css";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const ModalContent = styled.div`
  margin-bottom: 15px;
`;

interface Commodity {
  id?: number;
  currentPrice?: number;
  productImage?: string;
  productName?: string;
  isFixedPrice?: boolean;
  productAmount?: number;
  upsetPrice?: number;
  productDescription?: string;
  finishTime?: string;
  bidIncrement?: number;
  productType?: string;
  sellerID?: number;
  sellerName?: string;
}

export default function MediaCard({ commodity }: { commodity: Commodity }) {
  //詳細資料
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible);
  };

  //加入購物車的數量
  const [productAmountTMP, setproductAmountTMP] = useState(1);
  //加注的錢
  const [commodityTMP, setCommodityTMP] = useState<number | undefined>(
    commodity.currentPrice
  );
  //token
  const token = Cookies.get("token");
  const productID = commodity.id;
  const auctionType = commodity.isFixedPrice;
  
  const handleButtonClick = () => {
    // 從本地端存儲讀取已有的使用者資訊陣列，如果沒有就創建一個新陣列
    localStorage.removeItem("usersReceiver");
    const users: { id: string; name: string }[] = JSON.parse(
      localStorage.getItem("usersReceiver") ?? "[]"
    );
    const sellerIDToAdd: string = String(commodity.sellerID);
    const sellerNameToAdd: string = String(commodity.sellerName);

    const isSellerIDExists = users.some(
      (user: { id: string }) => user.id === sellerIDToAdd
    );

    if (!isSellerIDExists) {
      // 將新的 sellerID 添加到 users 陣列
      users.push({ id: sellerIDToAdd, name: sellerNameToAdd });
      // 存回 localStorage
      localStorage.setItem("usersReceiver", JSON.stringify(users));
    }
    window.location.href = '../chat'
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const buydata = JSON.stringify({
      productID: productID,
      productAmount: productAmountTMP,
    });

    const biddata = JSON.stringify({
      productID: productID,
      bid: commodityTMP,
    });

    try {
      let requestData = {};
      let API = "";
      if (auctionType === true) {
        requestData = buydata;
        API = "http://localhost:8080/api/v1/product/buy";
        const response = await axios.post(API, requestData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("新增成功:", response.data);
          window.location.href = "/shopping-cart";
        }
      } else {
        requestData = biddata;
        API = "http://localhost:8080/api/v1/product/bid";
        const response = await axios.patch(API, requestData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("新增成功:", response.data);
          //window.location.href = "/shopping-cart";
        }
      }
    } catch (error) {
      console.error("新增錯誤:", error);
      window.location.href = "/shopping-cart";
    }
  };

  const productDescriptionHtml = commodity.productDescription
    ? commodity.productDescription
    : "";

  const handleMinusClick = () => {
    if (
      commodityTMP !== undefined &&
      commodity.currentPrice !== undefined &&
      commodity.bidIncrement !== undefined
    ) {
      const newCommodityTMP =
        commodityTMP > commodity.currentPrice
          ? commodityTMP - commodity.bidIncrement
          : commodityTMP;

      setCommodityTMP(newCommodityTMP);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "200px", height: "400px" }}>
      <Image
        alt="Image"
        src={"" + commodity.productImage}
        width={640}
        height={480}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <p
            style={{
              WebkitLineClamp: 1,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              boxSizing: "border-box",
            }}
          >
            {commodity.productName}
          </p>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.isFixedPrice
            ? "不二價：" + commodity.currentPrice
            : "競標價：" + commodity.currentPrice}
        </Typography>
      </CardContent>
      <CardActions>
        {commodity.isFixedPrice ? (
          <form onSubmit={handleSubmit}>
            <Button size="small" type="submit">
              加入購物車
            </Button>
          </form>
        ) : (
          <Button size="small" type="submit" onClick={handleToggleModalShowUp}>
            加注
          </Button>
        )}
        <Button size="small" onClick={handleToggleModalShowUp}>
          更多資訊
        </Button>
      </CardActions>

      {/*詳細資料*/}
      <TpModal
        title={commodity.productName}
        isVisible={isVisible}
        onClose={handleToggleModalShowUp}
      >
        <ModalContent>
          <div>
            <img
              alt="Image"
              src={"" + commodity.productImage}
              width="50%"
              style={{
                float: "left",
                padding: "0px 20px 20px 0px",
                top: 0,
                position: "sticky",
              }}
            />
            <div style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
              {commodity.isFixedPrice ? (
                <div>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    價格：${commodity.currentPrice}
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    數量：{commodity.productAmount}個
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    底價：${commodity.upsetPrice}
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    競標價：${commodity.currentPrice}{" "}
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    每次增加金額：${commodity.bidIncrement}{" "}
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    截標時間：{commodity.finishTime}{" "}
                  </p>
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: productDescriptionHtml }} />
              <p style={{ color: "black" }}>
          賣家：<a>{commodity.sellerName}</a>
              </p>
              <p style={{ color: "black" }}>
                分類：
                <a href={"/" + ( ()=>{
                    switch(commodity.productType){
                      case "日用品":return "daily";
                      case "3C產品":return "electronic";
                      case "文具類":return "Stationary";
                      case "其它":return "other";
                    }
                  }
                  )()}>
                  {commodity.productType}
                </a>
              </p>
              <ModalFooter>
                {commodity.isFixedPrice ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      style={{ marginRight: '10px' }} 
                      onClick={handleButtonClick}
                    >
                      與賣家聯繫
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleSubmit}
                    >
                      加入購物車
                    </Button>
                    <div style={{ padding: 5 }}>
                      <button
                        onClick={() =>
                          setproductAmountTMP((prevproductAmountTMP) => {
                            if (
                              typeof prevproductAmountTMP === "number" &&
                              commodity?.productAmount &&
                              productAmountTMP > 1
                            ) {
                              return prevproductAmountTMP - 1;
                            }
                            return prevproductAmountTMP;
                          })
                        }
                      >
                        -
                      </button>
                      <span> {productAmountTMP}個 </span>
                      <button
                        onClick={() =>
                          setproductAmountTMP((prevproductAmountTMP) => {
                            if (
                              typeof prevproductAmountTMP === "number" &&
                              commodity?.productAmount &&
                              productAmountTMP < commodity?.productAmount
                            ) {
                              return prevproductAmountTMP + 1;
                            }
                            return prevproductAmountTMP;
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button
                      variant="contained"
                      style={{ marginRight: '10px' }} 
                      onClick={handleButtonClick}
                    >
                      與賣家聯繫
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleSubmit}
                    >
                      出價
                    </Button>
                    <div style={{ padding: 5 }}>
                      <button onClick={handleMinusClick}>-</button>
                      <span> {commodityTMP}$ </span>
                      <button
                        onClick={() =>
                          setCommodityTMP((prevCommodityTMP) => {
                            if (
                              typeof prevCommodityTMP === "number" &&
                              commodity?.bidIncrement
                            ) {
                              return prevCommodityTMP + commodity.bidIncrement;
                            }
                            return prevCommodityTMP;
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </ModalFooter>
            </div>
          </div>
        </ModalContent>
      </TpModal>
    </Card>
  );
}
