"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import TuneIcon from '@mui/icons-material/Tune';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const commodityAPI = "http://localhost:8080/api/v1/product/products";

export default function HomePage() {
  const [commodity, setcommodity] = React.useState([]);
  React.useEffect(() => {
    fetch(commodityAPI)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcommodity(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [price, setPrice] = React.useState([0,Infinity]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}$`;
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  var len = commodity ? Object.keys(commodity).length : 0;

  return (
    <Box style={{ display: 'block' , marginTop: "60px" }}>
      <div>
        <Alert variant="outlined" severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>歡迎來到海大拍賣系統 👋</AlertTitle>
          您可以在本系統購買商品，也可以上架想賣出的商品。
        </Alert>
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid xs={6} style={{ width: "100%" }}>
            <div style={{ display: 'flex', flexWrap: "wrap" }}>
              {commodity ? function () {
                let show = []
                for (let i = 0; i < len; i++) {
                  show.push(<MediaCard commodity={commodity[i]} />)
                }
                return show
              }() : <p>404</p>}
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ position:"fixed", right:"10px", bottom: "10px" }}>
        <Fab 
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="primary">
          <TuneIcon />
        </Fab>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem disabled>價格區間</MenuItem>
          <MenuItem>
            <Slider 
              value={price}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              style={{width:"150px"}}
            ></Slider>
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
}