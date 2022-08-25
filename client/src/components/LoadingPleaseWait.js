import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

function LoadingPleaseWait() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <CircularProgress />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}

export default LoadingPleaseWait;
