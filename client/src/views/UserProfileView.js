import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import LoadingPleaseWait from "../components/LoadingPleaseWait";

function UserProfileView() {
  const [profileData, setProfileData] = useState(null);
  const [fileObject, setFileOject] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const firstnameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastnameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const getLoggedInUser = async () => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/users/findoneuser",
        requestOptions
      );
      console.log("respose", response);
      const results = await response.json();

      setProfileData(results);
    } catch (error) {
      console.log({
        msg: "fetch failed",
        error: error,
        message: error.message,
      });
    }
  };

  const handleFile = (e) => {
    setFileOject(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", fileObject);

    const imageRequestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/users/imageupload",
        imageRequestOptions
      );
      const result = await response.json();
      setImageURL(result.imageURL);
      if (imageURL) {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

          const urlencoded = new URLSearchParams();
          urlencoded.append("firstname", firstName);
          urlencoded.append("lastname", lastName);
          urlencoded.append("emailaddress", profileData.emailaddress);
          urlencoded.append("image", imageURL);

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
          };

          const profileResponse = await fetch(
            "http://localhost:5000/users/update",
            requestOptions
          );
          const profileResults = await profileResponse.json();
          console.log(profileResults);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <Container>
      {!profileData ? (
        <LoadingPleaseWait />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Avatar
                alt="Remy Sharp"
                src={profileData.image}
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
                onChange={handleFile}
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
                defaultValue={profileData.firstname}
                variant="standard"
                onChange={firstnameChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="lastname"
                label="Last Name"
                defaultValue={profileData.lastname}
                variant="standard"
                onChange={lastnameChangeHandler}
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Button onClick={handleSubmit} variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default UserProfileView;
