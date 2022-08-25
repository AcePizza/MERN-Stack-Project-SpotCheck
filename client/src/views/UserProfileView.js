import React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";

function UserProfileView() {
  const getUser = useFetch("");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

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
        <Grid item xs={6}>
          <TextField
            required
            id="firstname"
            label="First Name"
            defaultValue="Hello World"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="lastname"
            label="Last Name"
            defaultValue="Hello World"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Button variant="contained">Update</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfileView;
