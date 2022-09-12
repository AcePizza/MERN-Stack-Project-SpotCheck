import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AutenticationContext } from "../context/AutenticationContext";

const theme = createTheme();

function AddSpotView() {
  const [submitFormData, setSubmitFormData] = useState();
  const [fileObject, setFileObject] = useState();
  const [imageURL, setImageURL] = useState();

  const { isUserLoggedIn } = useContext(AutenticationContext);

  const handleFile = (event) => {
    setFileObject(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formData = new FormData();
    formData.append("image", fileObject);

    const imageRequestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const sendImageRespose = await fetch(
        "http://localhost:5000/spots/imageupload",
        imageRequestOptions
      );
      const sendImageResult = await sendImageRespose.json();
      console.log(sendImageResult.imageURL);
      setImageURL(sendImageResult.imageURL);

      try {
        setSubmitFormData({
          title: data.get("spotName"),
          location: data.get("spotLocation"),
          image: imageURL,
          description: data.get("spotDescription"),
          votes: ["62fe886907ff84184dfe1705", "62fe38a38ad558691473456b"],
          author: "62fe871a07ff84184dfe1702",
        });

        const spotOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitFormData),
        };

        console.log("spotOptions", spotOptions);

        const sendSpotResponse = await fetch(
          "http://localhost:5000/spots/createspot",
          spotOptions
        );
        const sendSpotResult = await sendSpotResponse.json();
        console.log(sendSpotResult);
      } catch (error) {
        throw new Error({
          msg: "There was an error uploading the spot 😞",
          error: error,
        });
      }
    } catch (error) {
      throw new Error({
        msg: "There was an error uploading the picture 😞",
        error: error,
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add spot
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="spotName"
                    required
                    fullWidth
                    id="spotName"
                    label="Spot Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label htmlFor="spotImage">
                    Choose an image for the spot:
                  </label>
                  <input
                    type="file"
                    id="myFile"
                    name="filename"
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                  ></input>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="spotDescription"
                    label="Description"
                    name="spotDescription"
                    autoComplete="spotDescription"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="spotLocation"
                    label="Location"
                    id="spotLocation"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add spot
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddSpotView;
