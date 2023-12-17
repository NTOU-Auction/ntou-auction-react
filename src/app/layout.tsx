"use client";
import React, { useRef, useEffect } from 'react';
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RedeemIcon from "@mui/icons-material/Redeem";
import CreateIcon from "@mui/icons-material/Create";
import ComputerIcon from "@mui/icons-material/Computer";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import ListIcon from "@mui/icons-material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Cookies from "js-cookie";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import SellIcon from "@mui/icons-material/Sell";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


//  const metadata = {
//   title: "NTOU Auction",
//   description: "NTOU Auction",
// };

const token = Cookies.get("token");
async function fetchUserInfo() {
  const response = axios.get("http://localhost:8080/api/v1/account/users", {
    headers: {
      Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
    },
  });
  return response;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //RWD
  const [DRAWER_WIDTH, setDRAWER_WIDTH] = React.useState<number>(240);

  React.useEffect(() => {
    function handleWindowResize() {
      window.innerWidth > 930 ? setDRAWER_WIDTH(240) : setDRAWER_WIDTH(window.innerWidth);
      console.log(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  interface User {
    name: string;
  }
  const [user, setUser] = React.useState<User | null>(null);


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

  const LINKS = [
    { text: "首頁", href: "/", icon: HomeIcon },
    { text: "文具類", href: "/Stationary", icon: CreateIcon },
    { text: "日用品", href: "/daily", icon: RedeemIcon },
    { text: "3C產品", href: "/electronic", icon: ComputerIcon },
    { text: "其他", href: "/other", icon: MoreHorizIcon },
  ];

  const SELLER_CENTER_LINKS = [
    { text: "賣家中心", href: user ? "/dashbord" : "/sign-in", icon: StorefrontIcon },
    { text: "商品管理", href: user ? "/seller-product" : "/sign-in", icon: SellIcon },
    { text: "訂單管理", href: user ? "/order" : "/sign-in", icon: ContentPasteIcon },
    { text: "上架商品", href: user ? "/add-product" : "/sign-in", icon: AddIcon },
  ];

  const PLACEHOLDER_LINKS = [
    { text: "購物車", href: user ? "/shopping-cart" : "/sign-in", icon: ShoppingCartIcon },
    { text: "聊天室", href: user ? "/chat" : "/sign-in", icon: ChatIcon },
    { text: "設定", href: "/", icon: SettingsIcon },
  ];
  /* 側邊欄收縮 */
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    isDrawerOpen ? localStorage.setItem("isDrawerOpen", "0") : localStorage.setItem("isDrawerOpen", "1");
    setIsDrawerOpen(!isDrawerOpen);
  };
  React.useEffect(() => {
    isDrawerOpen ? localStorage.setItem("isDrawerOpen", "1") : localStorage.setItem("isDrawerOpen", "0");
  });

  /* 登出 */
  const [loggedIn, setLoggedIn] = React.useState(!!user); // 假設 user 是您從某處獲得的使用者資訊
  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false); // 將使用者設定為未登入狀態
    location.reload();
  };
  
  //搜尋
  const [keywords, setKeywords] = React.useState("");

  const search = () => {
    console.log(keywords);
    localStorage.setItem("keyword", keywords);
    window.location.href = "/search";
  }
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      console.log(keywords);
      localStorage.setItem("keyword", keywords);
      window.location.href = "/search";
    }
  };

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar
            position="fixed"
            style={{
              width: `calc(100% - ${isDrawerOpen ? DRAWER_WIDTH : 0}px)`,
              zIndex: 1100,
            }}
          >
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              <Typography
                height="100%"
                width="100%"
                variant="h6"
                noWrap
                component="div"
                color="black"
              >
                <div
                  style={{
                    float: "left",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={toggleDrawer}
                    color="primary"
                    size="large"
                  >
                    <ListIcon fontSize="inherit" />
                  </IconButton>
                  <button style={{ border: "none", background: "white" }}>
                    <a href="/">
                      <img src="img/logo.png" width={"50px"} />
                    </a>
                  </button>
                  {typeof window !== "undefined" && window.innerWidth > 700 ? (
                    <p>NTOU Auction</p>
                  ) : (
                    null
                  )}
                </div>
                <div
                  style={{
                    padding: 6,
                    float: "left",
                    paddingLeft:"10%",
                    width: "40%",
                    justifyContent: "center",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "18px",
                      border: "1px solid #ccc",
                      paddingLeft: "3%",
                    }}
                    onChange={(e) => setKeywords(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="search"
                    placeholder="搜尋商品"
                  />
                  <IconButton onClick={() => keywords ? search() : null}>
                    <SearchIcon />
                  </IconButton>
                </div>
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  {user ? (
                    <div style={{ display:"flex" }}>
                      <ListItemButton component={Link} href={"/tasks"}>
                        <u style={{ fontSize: "15px", color: "orange" }}>{user.name}</u>
                      </ListItemButton>
                      <Button onClick={handleLogout} style={{ fontSize: "15px" }}>
                        登出
                      </Button>
                    </div>
                  ) : (
                    <ListItemButton component={Link} href={"/sign-in"}>
                      <u style={{ fontSize: "15px", color: "orange" }}>
                        <LoginIcon />
                        登入
                      </u>
                    </ListItemButton>
                  )}
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            style={{
              width: isDrawerOpen ? DRAWER_WIDTH : 0,
              flexShrink: 0,
              whiteSpace: "nowrap",
              transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              zIndex: 1000,
            }}
            PaperProps={{
              style: {
                width: isDrawerOpen ? DRAWER_WIDTH : 0,
                transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              },
            }}
          >
            <IconButton
              onClick={() => setIsDrawerOpen(false)}
              color="primary"
              aria-label="close drawer"
              size="large"
            >
              <ChevronLeftIcon />
            </IconButton>
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: "auto" }} />
            <List>
              {SELLER_CENTER_LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: "auto" }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            style={{
              flexGrow: 1,
              padding: "20px",
              transition: "margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              marginLeft: isDrawerOpen ? DRAWER_WIDTH : 0,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
