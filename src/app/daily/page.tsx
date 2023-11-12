import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from '@/components/MediaCard';

import commodity from '../commodity.json' assert { type: 'JSON' };
let len = Object.keys(commodity.commodity.daily).length;
console.log(len);

export default function daily() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading={commodity.commodity.daily.heading}
              text={commodity.commodity.daily.text}
              img={commodity.commodity.daily.img}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
