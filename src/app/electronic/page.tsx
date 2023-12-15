"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "@/components/MediaCard";

const commodityAPI = "http://localhost:8080/api/v1/product/product/classification";

export default function Electron() {

  const [commodity, setcommodity] = React.useState([]);
  
  React.useEffect(() => {
    fetch(commodityAPI+"/3C產品")
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
                    show.push((<MediaCard commodity={commodity[i]} />));
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
