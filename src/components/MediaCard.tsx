import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TpModal from "@/components/TpModal";
import styled from "styled-components";
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
  currentPrice?: number;
  productImage?: string;
  productName?: string;
  isFixedPrice?: boolean;
  productAmount?: number;
  upsetPrice?: number;
  productDescription?: string;
  bidIncrement?: number;
  productType?: string;
  sellerid?: number;
}

export default function MediaCard({ commodity }: { commodity: Commodity }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible);
  };

  const [commodityTMP, setCommodityTMP] = useState<number | undefined>(
    commodity.currentPrice
  );
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
    <Card variant="outlined" sx={{ width: "200px", height: "350px" }}>
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
          {commodity.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.isFixedPrice
            ? "不二價：" + commodity.currentPrice
            : "競標價：" + commodity.currentPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">加入購物車</Button>
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
                    起標價：${commodity.upsetPrice}
                  </p>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    競標價：${commodity.currentPrice}{" "}
                  </span>
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: productDescriptionHtml }}
              ></div>
              <p style={{ color: "black" }}>
                賣家：<a>{commodity.sellerid}</a>
              </p>
              <p style={{ color: "black" }}>
                分類：
                <a href={"/" + commodity.productType}>
                  {commodity.productType}
                </a>
              </p>
              <ModalFooter>
                {commodity.isFixedPrice ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggleModalShowUp}
                  >
                    加入購物車
                  </Button>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleToggleModalShowUp}
                    >
                      加注
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