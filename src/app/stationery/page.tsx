import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from '@/components/MediaCard';

import commodity from '../commodity.json' assert { type: 'JSON' };
let len = Object.keys(commodity.commodity.stationery).length;
console.log(len);

export default function Stationery() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading={commodity.commodity.stationery.heading}
              text={commodity.commodity.stationery.text}
              img={commodity.commodity.stationery.img}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
