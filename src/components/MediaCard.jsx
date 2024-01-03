import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TpModal from "@/components/TpModal";
import styled from "styled-components";
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./ScrollBar.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { pink } from '@mui/material/colors';

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const ModalContent = styled.div`
  margin-bottom: 15px;
`;


export default function MediaCard({ commodity }) {

  //顯示訊息
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarErrror, setOpenSnackbarErrror] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbarErrror(false);
  };

  //詳細資料
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  //商品描述
  const productDescriptionHtml = commodity.productDescription
    ? commodity.productDescription
    : "";
  const parsedHtml = parseOembedString(productDescriptionHtml);
  function parseOembedString(oembedString) {
    const regex = /<oembed.*?url="(.*?)"><\/oembed>/;
    const match = oembedString.match(regex);
    if (match && match[1]) {
      const youtubeUrl = match[1];
      const tmp = /v=/;
      const cut = youtubeUrl.match(tmp);
      const videoId = !cut ? youtubeUrl.split('.be/')[1] : youtubeUrl.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return `<iframe width="100%" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      return '';
    }
  }


  //加入購物車的數量
  const [productAmountTMP, setproductAmountTMP] = useState(1);
  //加注的錢
  const [commodityTMP, setCommodityTMP] = useState(commodity.currentPrice);
  //token
  const token = Cookies.get('token');

  async function fetchUserInfo() {
    const response = axios.get("/api/v1/account/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
      },
    });
    return response;
  }
  const [user, setUser] = React.useState(null);

  const handleButtonClick = () => {
    // 從本地端存儲讀取已有的使用者資訊陣列，如果沒有就創建一個新陣列
    localStorage.removeItem("usersReceiver");
    const users = JSON.parse(
      localStorage.getItem("usersReceiver") ?? "[]"
    );
    const sellerIDToAdd = (commodity.sellerID);
    const sellerNameToAdd = (commodity.sellerName);

    const isSellerIDExists = users.some(
      (user) => user.id === sellerIDToAdd
    );

    if (!isSellerIDExists) {
      // 將新的 sellerID 添加到 users 陣列
      users.push({ id: sellerIDToAdd, name: sellerNameToAdd });
      // 存回 localStorage
      localStorage.setItem("usersReceiver", JSON.stringify(users));
    }
    window.location.href = '../chat'
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserInfo();
        setUser(data.data);
      } catch (error) {
        console.error("獲取帳號資料錯誤:", error);
      }
    }
    fetchData();
  }, []);

  const productID = commodity.id;
  const auctionType = commodity.isFixedPrice;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const buydata = JSON.stringify({
      productID: productID,
      productAmount: productAmountTMP,
    });

    const biddata = JSON.stringify({
      productID: productID,
      bid: commodityTMP,
    });

    if (user) {
      try {
        let requestData = {};
        let API = "";
        if (auctionType === true) {
          requestData = buydata;
          API = "/api/v1/product/buy";
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
        }
        else {
          requestData = biddata;
          API = "/api/v1/product/bid";
          const response = await axios.patch(API, requestData, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setOpenSnackbar(true);
            console.log("新增成功:", response.data);
          }
        }
      } catch (error) {
        if(error){
          setError(error.response.data.message);
          setOpenSnackbarErrror(true);
          console.error(error)
        }
        //window.location.href = "/shopping-cart";
      }
    }
    else {
      window.location.href = "/sign-in";
    }
  }

  const handleMinusClick = () => {
    if (
      commodityTMP !== undefined &&
      commodity.currentPrice !== undefined &&
      commodity.bidIncrement !== undefined
    ) {
      const newCommodityTMP =
        commodityTMP > commodity.currentPrice
          ? commodityTMP - 1
          : commodityTMP;

      setCommodityTMP(newCommodityTMP);
    }
  };

  //RWD
  const [margin, setMargin] = React.useState(0);
  const [br, setBr] = React.useState(false);

  React.useEffect(() => {
    window.innerWidth > 930 && localStorage.getItem("isDrawerOpen") == "1" ? setMargin(240) : setMargin(0);
    window.innerWidth < 880 ? setBr(true) : setBr(false);

    function handleWindowResize() {
      window.innerWidth > 930 && localStorage.getItem("isDrawerOpen") == "1" ? setMargin(240) : setMargin(0);
      window.innerWidth < 880 ? setBr(true) : setBr(false);
    }
    function handleWindowClick() {
      window.innerWidth > 930 && localStorage.getItem("isDrawerOpen") == "1" ? setMargin(240) : setMargin(0);
      window.innerWidth < 880 ? setBr(true) : setBr(false);
    }

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  //我的最愛
  const [love, setLove] = React.useState(false);
  const favoriteAPI = "/api/v1/account/favorite";

  React.useEffect(() => {
    async function fetchFavorite() {
      try {
        const view = await axios.get(favoriteAPI, {
          headers: {
            "Authorization": `Bearer ${token}` // Bearer 跟 token 中間有一個空格
          }
        });
        var len = view.data ? Object.keys(view.data).length : 0;
        {view.data ? function () {
          for (let i = 0; i < len; i++) {
            if(view.data[i].id == commodity.id){
              setLove(true);
              break;
            }
          }
        }() : null}
      }
      catch (error) {
        console.error('獲取購物車資料錯誤:', error);
      }
    }
    fetchFavorite();
  }, []);

  const Addfavorite = async () => {

    const favoritedata = JSON.stringify({
      productId: commodity.id,
    });

    try {
      let requestData = favoritedata;
      let API = favoriteAPI;
      const response = await axios.post(API, requestData,
        {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        console.log("我的最愛成功:", response.data);
      }
    }
    catch (error) {
      console.error("我的最愛錯誤:", error);
    }
  };

  const Deletefavorite = async () => {

    const favoritedata = JSON.stringify({
      productId: commodity.id,
    });

    try {
      let requestData = favoritedata;
      let API = favoriteAPI;
      const response = await axios.delete(API,
        {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        },
        data: requestData,
      });
      if (response.status === 200) {
        console.log("我的最愛成功:", response.data);
      }
    }
    catch (error) {
      console.error("我的最愛錯誤:", error);
    }
  };

  function handleChange (event) {
    if(user){
      setLove(event.target.checked);
      if(event.target.checked)
        Addfavorite();
      else
        Deletefavorite();
    }
    else{
      window.location.href = "/sign-in";
    }
  };  

  return (
    <Card variant="outlined" sx={{ width: "200px", height: "355px" }}>
      <Image
        alt="Image"
        src={"" + commodity.productImage}
        width={640}
        height={200}
        style={{
          maxWidth: "100%",
          width: "200px",
          height: "200px",
          objectFit: "cover",
          padding: "10px 10px 0px 10px"
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <span style={{ WebkitLineClamp: 1, width: '100%', overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", boxSizing: "border-box" }}>
            {commodity.productName}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.isFixedPrice
            ? "不二價：" + commodity.currentPrice
            : "競標價：" + commodity.currentPrice}
        </Typography >
      </CardContent >
      <CardActions>
        {commodity.isFixedPrice ?
          <form onSubmit={handleSubmit}>
            <Button size="small" type="submit">加入購物車</Button>
          </form>
          :
          <Button size="small" type="submit" onClick={handleToggleModalShowUp}>出價</Button>
        }
        <Button size="small" onClick={handleToggleModalShowUp}>
          更多資訊
        </Button>
      </CardActions>

      {/*詳細資料*/}
      <TpModal
        title={commodity.productName}
        isVisible={isVisible}
        onClose={handleToggleModalShowUp}
        margin={margin + "px"}
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
                    <Checkbox onChange={handleChange} checked={love} icon={<FavoriteBorder />} checkedIcon={<Favorite />}  sx={{color: pink[800],'&.Mui-checked': {color: pink[600]}}}/>
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    底價：${commodity.upsetPrice}
                  </p>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    競標價：${commodity.currentPrice}{" "}
                    <Checkbox onChange={handleChange} checked={love} icon={<FavoriteBorder />} checkedIcon={<Favorite />}  sx={{color: pink[800],'&.Mui-checked': {color: pink[600]}}}/>
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
              <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
              <p style={{ color: "black" }}>
                賣家：<a>{commodity.sellerName}</a>
                <IconButton size="small" onClick={handleButtonClick}>
                  <QuestionAnswerIcon color="secondary" fontSize="inherit" />
                </IconButton>
              </p>
              <p style={{ color: "black" }}>
                分類：
                <a href={"/" + (() => {
                  switch (commodity.productType) {
                    case "日用品": return "daily";
                    case "3C產品": return "electronic";
                    case "文具類": return "Stationary";
                    case "其它": return "other";
                  }
                }
                )()}>
                  {commodity.productType}
                </a>
              </p>
                {commodity.isFixedPrice ? (
                  <div style={{ display: "flex", width:"100%", flexDirection: "row-reverse"}}>
                    <div style={{ padding: 5}}>
                      <IconButton 
                        color="secondary" 
                        size="small" 
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
                        }>
                        <RemoveIcon fontSize="inherit" />
                      </IconButton>
                      {br ? <br/> : null}
                      <span> {productAmountTMP}個 </span>
                      {br ? <br/> : null}
                      <IconButton
                        color="secondary"
                        size="small"
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
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <Button variant="contained" color="error" onClick={handleSubmit}>
                      加入購物車
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: "flex", width:"100%", flexDirection: "row-reverse"}}>
                    <div style={{ padding: 5 }}>
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={handleMinusClick} >
                        <RemoveIcon fontSize="inherit" />
                      </IconButton>
                      {br ? <br/> : null}
                      <span> {commodityTMP}$ </span>
                      {br ? <br/> : null}
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={() =>
                          setCommodityTMP((prevCommodityTMP) => {
                            if (
                              typeof prevCommodityTMP === "number" &&
                              commodity?.bidIncrement
                            ) {
                              if(prevCommodityTMP === commodity.currentPrice)
                                return prevCommodityTMP + commodity.bidIncrement;
                              else
                                return prevCommodityTMP + 1;
                            }
                            return prevCommodityTMP;
                          })
                        }
                      >
                        <AddIcon fontSize="inherit" />
                      </IconButton >
                    </div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick= {handleSubmit}
                    >
                      出價
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </ModalContent>
      </TpModal>
      <Snackbar
        open={openSnackbarErrror}
        autoHideDuration={5000}
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
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          出價成功，請重新整理頁面
        </MuiAlert>
      </Snackbar>
    </Card>
  );
}