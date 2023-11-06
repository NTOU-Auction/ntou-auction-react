"use client"
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

import Button from '@mui/material/Button';

interface NotifyState {
  isOpen: boolean;
  message: string;
  type: string;
}


export default function HomePage() {

  // const [notify, setNotify] = React.useState<NotifyState>({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });

  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>歡迎來到海大拍賣系統 👋</AlertTitle>
          您可以在本系統購買商品，也可以上架想賣出的商品。
        </Alert>

        {/* <Alert notify={notify} setNotify={setNotify}>This is a success alert — check it out! </Alert> */}

        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="原子筆"
              text="不二價"
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
