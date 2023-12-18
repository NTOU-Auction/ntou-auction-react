"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { Link } from "react-router-dom";
// import Link from "next/link";
import { useRouter } from "next/navigation";
// import { usePathname, useSearchParams } from 'next/navigation'

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
const token = Cookies.get("token");
async function fetchProductInfo() {
  const response = axios.get(
    "http://localhost:8080/api/v1/product/sellercenter",
    {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
      },
    }
  );
  return response;
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// export default function Album() => {
function Album() {
  const router = useRouter();
  // console.log(url)
  const handleEditClick = (product) => {
    // const productInfo = {
    //   id: product.id,
    //   name: "Product Name",
    //   description: "Product Description",
    // };

    localStorage.setItem("product", JSON.stringify(product));
    const pathname = "/update-product";
    // const searchParams = { productInfo: JSON.stringify(productInfo) };
    const url = `${pathname}?id=${product.id}`;
    router.push(url);

    // 嘗試傳遞物件
    // router.push({
    //     pathname: '/update-product',
    //     query: { data: JSON.stringify(productInfo)}
    // })

    // router.push((url){
    //   // pathname: '/update-product',
    //   query: { productInfo: JSON.stringify(productInfo) },
    // });
  };

  
  const [products, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductInfo();
        setProduct(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("獲取帳號資料錯誤:", error);
      }
    }
    fetchData();
  }, []);
  
  const handleRemoveClick = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      if (response.data.success) {
        console.log(`Product with ID ${productId} removed successfully!`);
      } else {
        console.error(`Failed to remove product with ID ${productId}`);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar position="relative" >
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ display: "flex" , marginTop: "80px"}}>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              商品管理
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              歡迎來到賣家商品中心<br></br>您可以在此更新商品資訊以及下架商品!
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  /> */}
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                      backgroundImage: product.productImage,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  /> */}
                  <Image
                    alt="Image"
                    src={"" + product.productImage}
                    width={640}
                    height={480}
                    style={{
                      maxWidth: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.productName}
                    </Typography>
                    <Typography sx={{ fontStyle: "italic", color: "#737373" }}>
                      {product.isFixedPrice
                        ? "不二價: " + product.currentPrice
                        : "競標價: " + product.currentPrice}
                    </Typography>
                    {product.isFixedPrice && (
                      <Typography
                        sx={{ fontStyle: "italic", color: "#737373" }}
                      >
                        {"商品剩餘數量: " + product.productAmount}
                      </Typography>
                    )}
                    {!product.isFixedPrice && (
                      <Typography
                        sx={{ fontStyle: "italic", color: "#737373" }}
                      >
                        {"截止時間: " + product.finishTime}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      variant="outlined"
                      onClick={() => handleRemoveClick(product.id)} // Pass the product ID
                    >
                      下架
                    </Button>
                    <Button
                      size="medium"
                      variant="outlined"
                      onClick={() => handleEditClick(product)}
                    >
                      編輯
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          商品管理中心
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Copyright © NTOU AUCTION 2023.
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Album;
