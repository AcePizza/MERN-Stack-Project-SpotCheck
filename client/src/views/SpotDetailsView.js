import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import React from "react";
import { useParams } from "react-router-dom";

function SpotDetailsView() {
  const spotID = useParams();

  const getCurrentSpot = async () => {};

  return (
    <>
      <img src="lslslsl" alt="Something"></img>
      <Divider />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />

            <PhotoCamera />
          </IconButton>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            id="firstname"
            label="First Name"
            defaultValue="{profileData.firstname}"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="lastname"
            label="Last Name"
            defaultValue="{profileData.lastname}"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Button variant="contained">Update</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SpotDetailsView;
