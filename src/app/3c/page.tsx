import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from '@/components/MediaCard';

import commodity from '../commodity.json' assert { type: 'JSON' };
let len = Object.keys(commodity.commodity.Electron).length;
console.log(len);

export default function Electron() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading={commodity.commodity.Electron.heading}
              text={commodity.commodity.Electron.text}
              img={commodity.commodity.Electron.img}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
