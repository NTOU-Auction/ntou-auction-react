"use client";
import * as React from 'react';
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

const favoriteAPI = "http://localhost:8080/api/v1/account/favorite";

export default function Favorite() {

  return (
    <Box sx={{ display: "block", marginTop: "60px" }}>
      敬請期待
    </Box>
  );
}
