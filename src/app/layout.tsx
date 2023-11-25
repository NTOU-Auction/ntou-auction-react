"use client"
import * as React from "react";
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
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import axios from 'axios';
import Cookies from 'js-cookie';

 const metadata = {
  title: "NTOU Auction",
  description: "NTOU Auction",
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: '文具類', href: '/Stationary', icon: CreateIcon },
  { text: '日用品', href: '/daily', icon: RedeemIcon },
  { text: '3C產品', href: '/electronic', icon: ComputerIcon }
];

const PLACEHOLDER_LINKS = [
  { text: "購物車",href: "/sign-in", icon: ShoppingCartIcon },
  { text: "聊天室",href: "/sign-in", icon: ChatIcon },
  { text: "設定",href: "/", icon: SettingsIcon }];


const token = Cookies.get('token');
async function fetchUserInfo() {
  const response = axios.get('http://localhost:8080/api/v1/account/users', {
    headers: {
      Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
    }
  })
  return response;
}

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserInfo();
        setUser(data.data);
      } catch (error) {
        console.error('獲取帳號資料錯誤:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{backgroundColor: 'background.paper' }}>
              <Typography height='100%' width='100%' variant="h6" noWrap component="div" color="black">
                <div style={{float:"left", display: "flex",textAlign: "center",alignItems: "center"}}>
                  <ListItemButton>
                    <ListIcon/>
                  </ListItemButton>
                  <button style={{border:"none", background:"white"}}>
                    <a href='/'><img src='img/logo.png' width={'50px'} /></a>
                  </button>
                  NTOU Auction
                </div>
                <div style={{ float:"left", width: "50%", justifyContent: "center", display: "flex",textAlign: "center",alignItems: "center"}}>
                  <input style={{width: "50%", height: "40px", borderRadius:"18px", border: "1px solid #ccc", paddingLeft: "3%"}} type="search" placeholder="搜尋商品"/>
                  <SearchIcon/>
                </div>
                <div style={{ float:"right", display: "flex",textAlign: "center",alignItems: "center"}}>
                  {user ? (
                    <ListItemButton component={Link} href={'/tasks'}>
                      <u style={{fontSize:"15px", color:"orange"}}>{user.name}</u>
                    </ListItemButton>
                  ) : (
                    <ListItemButton component={Link} href={'/sign-in'}>
                      <u style={{fontSize:"15px", color:"orange"}}><LoginIcon/>登入</u>
                    </ListItemButton>
                  )}
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                top: ["48px", "56px", "64px"],
                height: "auto",
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
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
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              ml: `${DRAWER_WIDTH}px`,
              mt: ["48px", "56px", "64px"],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}