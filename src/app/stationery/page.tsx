'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from '@/components/MediaCard';

const commodityAPI = "http://localhost:8080/api/v1/product/products";

export default function Electron(){

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

   var len = commodity ? Object.keys(commodity).length : 0;

  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Grid container rowSpacing={len} columnSpacing={len}>
          <Grid xs={6}> 
            <div style={{ display:'flex'}}>
            {commodity ? function() {
              let show = []
              for (let i = 0; i<len; i++){
                if(commodity[i].productType == "Stationary") show.push(<MediaCard
                                                                      productName={commodity[i].productName}
                                                                      isFixedPrice={commodity[i].isFixedPrice}
                                                                      productImage={commodity[i].productImage}
                                                                      productDescription={commodity[i].productDescription}
                                                                      price={commodity[i].price}
                                                                      currentPrice={commodity[i].currentPrice}
                                                                      />);
              }
            return show
            }() : <p>404</p>}
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
