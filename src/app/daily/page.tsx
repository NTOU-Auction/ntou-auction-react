"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "@/components/MediaCard";

const commodityAPI = "/api/v1/product/products";

export default function Daily() {
  interface CommodityItem {
    productType: string;
  }
  const [commodity, setcommodity] = React.useState<CommodityItem[]>([]);
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
    <Box sx={{ display: "block"  , marginTop: "60px"  }}>
      <div>
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid xs={6} style={{ width: "100%" }}>
            <div style={{ display: 'flex', flexWrap: "wrap" }}>
              {commodity ? (
                (function () {
                  let show = [];
                  for (let i = 0; i < len; i++) {
                    if (commodity[i].productType == "日用品")
                      show.push((<MediaCard commodity={commodity[i]} />)
                      );
                  }
                  return show;
                })()
              ) : (
                <p>404</p>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
