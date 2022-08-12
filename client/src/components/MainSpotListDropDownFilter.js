import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

function MainSpotListDropDownFilter() {
  const [selectValue1, setSelectValue1] = useState(10);
  const [selectValue2, setSelectValue2] = useState(10);

  const xonChangeFilterHandeler = (evt) => {
    console.log(evt);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectValue1}
                label="Age"
                onChange={xonChangeFilterHandeler}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Boroughs</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectValue2}
                label="Age"
                onChange={xonChangeFilterHandeler}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <br></br>
    </>
  );
}

export default MainSpotListDropDownFilter;
