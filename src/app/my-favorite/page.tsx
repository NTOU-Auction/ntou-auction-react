"use client";
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import TuneIcon from '@mui/icons-material/Tune';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Cookies from 'js-cookie';

const favoriteAPI = "http://localhost:8080/api/v1/account/favorite";

export default function Favorite() {
  //token
  const token = Cookies.get('token');
  //我的最愛資料
  const [favorite, setfavorite] = React.useState<any>([]);

  React.useEffect(() => {
    async function fetchFavorite() {
      try {
        const view = await axios.get(favoriteAPI, {
          headers: {
            "Authorization": `Bearer ${token}` // Bearer 跟 token 中間有一個空格
          }
        });
        setfavorite(view.data);
      }
      catch (error) {
        console.error('獲取購物車資料錯誤:', error);
      }
    }
    fetchFavorite();
  }, []);

  //價個區間
  const [price, setPrice] = React.useState([0, 5]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
    console.log(price);
  };

  function valuetext(value: number) {
    return `${value}$`;
  }

  const marks = [
    {
      value: 0,
      label: '個',
    },
    {
      value: 1,
      label: '十',
    },
    {
      value: 2,
      label: '百',
    },
    {
      value: 3,
      label: '千',
    },
    {
      value: 4,
      label: '萬',
    },
    {
      value: 5,
      label: '∞',
    },
  ];

  //選項按鈕
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  var len = favorite ? Object.keys(favorite).length : 0;

  return (
    <Box sx={{ display: "block", marginTop: "60px" }}>
      <div>
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid xs={6} style={{ width: "100%" }}>
            <div style={{ display: 'flex', flexWrap: "wrap" }}>
              {favorite ? function () {
                let show = [];
                let min = 0;
                let max = null;
                switch (price[0]) {
                  case 0:
                    min = 0;
                    break;
                  case 1:
                    min = 10;
                    break;
                  case 2:
                    min = 100;
                    break;
                  case 3:
                    min = 1000;
                    break;
                  case 4:
                    min = 10000;
                    break;
                  case 5:
                    min = 100000;
                    break;
                }
                switch (price[1]) {
                  case 0:
                    max = 9;
                    break;
                  case 1:
                    max = 99;
                    break;
                  case 2:
                    max = 999;
                    break;
                  case 3:
                    max = 9999;
                    break;
                  case 4:
                    max = 99999;
                    break;
                  case 5:
                    max = null;
                    break;
                }
                for (let i = 0; i < len; i++) {
                  if (favorite[i].currentPrice >= min && max == null) {
                    show.push(<MediaCard commodity={favorite[i]} />)
                  }
                  else if (max && favorite[i].currentPrice >= min && favorite[i].currentPrice <= max)
                    show.push(<MediaCard commodity={favorite[i]} />)
                }
                return show
              }() : <p>404</p>}
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ position: "fixed", right: "10px", bottom: "10px" }}>
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
              size="small"
              value={price}
              min={0}
              max={5}
              marks={marks}
              onChange={handleChange}
              getAriaValueText={valuetext}
              style={{ width: "200px" }}
            ></Slider>
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
