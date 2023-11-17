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
            <div>
            {function() {
              let show = []
              for (let i = 0; i<len; i++){
                show.push(<MediaCard
                              productName={commodity[i].productName}
                              isFixedPrice={commodity[i].isFixedPrice}
                              productImage={commodity[i].productImage}
                              productDescription={commodity[i].productDescription}
                              price={commodity[i].price}
                              currentPrice={commodity[i].currentPrice}
                              />)
              }
            return show
            }()}
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
