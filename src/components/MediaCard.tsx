import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TpModal from '@/components/TpModal'
import styled from 'styled-components'
import axios from 'axios';
import Cookies from 'js-cookie';
import './ScrollBar.css';
import { AnyComponent } from 'styled-components/dist/types';

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
const ModalContent = styled.div`
  margin-bottom: 15px;
`

export default function MediaCard({ commodity }: { commodity: object }) {

  //詳細資料
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  //加入購物車的數量
  const [productAmountTMP, setproductAmountTMP] = useState(1)
  //加注的錢
  const [currentPriceTMP, setcurrentPriceTMP] = useState(commodity.currentPrice)
  //token
  const token = Cookies.get('token');
  const productID = commodity.id;
  const auctionType = commodity.isFixedPrice;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const buydata = JSON.stringify({
      productID: productID,
      productAmount: productAmountTMP,
    });

    const biddata = JSON.stringify({
      productID: productID,
      bid: currentPriceTMP,
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
    }
  };

  return (
    <Card variant="outlined" sx={{ width: '200px', height: '350px' }}>
      <Image
        alt="Image"
        src={"" + commodity.productImage}
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <CardContent >
        <Typography gutterBottom variant="h6" component="div">
          <p style={{ WebkitLineClamp: 1, width: '100%', overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", boxSizing: "border-box" }}>
            {commodity.productName}
          </p>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.isFixedPrice ? "不二價：" + commodity.currentPrice : "競標價：" + commodity.currentPrice}
        </Typography>
      </CardContent>
      <CardActions>
        {commodity.isFixedPrice ?
          <form onSubmit={handleSubmit}>
            <Button size="small" type="submit">加入購物車</Button>
          </form>
          :
          <Button size="small" type="submit" onClick={handleToggleModalShowUp}>加注</Button>
        }
        <Button size="small" onClick={handleToggleModalShowUp}>
          更多資訊
        </Button>
      </CardActions>

      {/*詳細資料*/}
      <TpModal title={commodity.productName} isVisible={isVisible} onClose={handleToggleModalShowUp}>

        <ModalContent>
          <div>
            <img
              alt="Image"
              src={"" + commodity.productImage}
              width="50%"
              style={{ float: "left", padding: "0px 20px 20px 0px", top: 0, position: "sticky" }}
            />
            <div style={{ overflowY: "scroll", scrollbarWidth: "none" }}>
              {commodity.isFixedPrice ?
                (<div>
                  <p style={{ color: "black", fontWeight: 'bold' }}>價格：${commodity.currentPrice}</p>
                  <p style={{ color: "black", fontWeight: 'bold' }}>數量：{commodity.productAmount}個</p>
                </div>
                ) :
                (<div>
                  <p style={{ color: "black", fontWeight: 'bold' }}>起標價：${commodity.upsetPrice}</p>
                  <p style={{ color: "black", fontWeight: 'bold' }}>競標價：${commodity.currentPrice}  </p>
                  <p style={{ color: "black", fontWeight: 'bold' }}>截標時間：{commodity.finishTime}  </p>
                </div>
                )
              }
              <div dangerouslySetInnerHTML={{ __html: commodity.productDescription }}></div>
              <p style={{ color: "black" }}>賣家：{commodity.sellerid}</p>
              <p style={{ color: "black" }}>分類：<a href={"/" + commodity.productType}>{commodity.productType}</a></p>
              <ModalFooter>
                {commodity.isFixedPrice ?
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <form onSubmit={handleSubmit}>
                      <Button type="submit" variant="contained" color="error">加入購物車</Button>
                    </form>
                    <div style={{ padding: 5 }}>
                      <button onClick={() => productAmountTMP > 1 ? setproductAmountTMP(productAmountTMP - 1) : setproductAmountTMP(productAmountTMP)}>
                        -
                      </button>
                      <span> {productAmountTMP}個 </span>
                      <button onClick={() => productAmountTMP < commodity.productAmount ? setproductAmountTMP(productAmountTMP + 1) : setproductAmountTMP(productAmountTMP)}>
                        +
                      </button>
                    </div>
                  </div>
                  :
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <form onSubmit={handleSubmit}>
                      <Button type="submit" variant="contained" color="error">加注</Button>
                    </form>
                    <div style={{ padding: 5 }}>
                      <button onClick={() => currentPriceTMP > commodity.currentPrice ? setcurrentPriceTMP(currentPriceTMP - commodity.bidIncrement) : setcurrentPriceTMP(currentPriceTMP)}>
                        -
                      </button>
                      <span> {currentPriceTMP}$ </span>
                      <button onClick={() => setcurrentPriceTMP(currentPriceTMP + commodity.bidIncrement)}>
                        +
                      </button>
                    </div>
                  </div>
                }
              </ModalFooter>
            </div>
          </div>
        </ModalContent>

      </TpModal>

    </Card>
  );
}