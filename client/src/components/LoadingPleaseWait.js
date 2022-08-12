import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

function LoadingPleaseWait() {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
        }}
        style={{ textAlign: "center" }}
      >
        <CircularProgress />
      </Box>
    </Grid>
  );
}

export default LoadingPleaseWait;
