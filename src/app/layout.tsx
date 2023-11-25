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
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: "NTOU Auction",
  description: "NTOU Auction",
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: '文具類', href: '/stationery', icon: CreateIcon },
  { text: '日用品', href: '/daily', icon: RedeemIcon },
  { text: '3C產品', href: '/3c', icon: ComputerIcon },
  { text: '登入' , href: '/sign-in' ,icon: LoginIcon },
  { text: "註冊", href: "/sign-up", icon: AssignmentIndIcon },
  { text: "新增商品", href: "/add-product", icon: AssignmentIndIcon },
  { text: "測試", href: "/test", icon: AssignmentIndIcon },
];

const PLACEHOLDER_LINKS = [{ text: "設定", icon: SettingsIcon }];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isAuthorized = AuthorizationChecker();
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <Typography variant="h6" noWrap component="div" color="black">
                <div style={{float:"left", display: "flex",textAlign: "center",alignItems: "center"}}>
                  <button style={{border:"none", background:"white"}}>
                    <img src='img/option.png' width={'30px'} />
                  </button>
                  <button style={{border:"none", background:"white"}}>
                    <a href='/'><img src='img/logo.png' width={'50px'} /></a>
                  </button>
                  NTOU Auction
                </div>
                <div style={{float:"right", display: "flex",textAlign: "center",alignItems: "start"}}>
                  <button style={{border:"none", background:"white"}}>
                    <u style={{display: "flex", color:"orange"}}>login</u>
                  </button>
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
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
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