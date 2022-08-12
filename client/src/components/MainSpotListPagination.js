import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function MainSpotListPagination() {
  return (
    <Stack spacing={10}>
      <Pagination count={10} size="small" />
    </Stack>
  );
}

export default MainSpotListPagination;
