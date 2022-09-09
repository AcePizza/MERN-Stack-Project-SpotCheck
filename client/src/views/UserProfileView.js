import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import useGetProfile from "../utils/useGetProfile";

function UserProfileView() {
  const [profileData, setProfileData] = useState(null);
  const [fileObject, setFileOject] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [updatedData, setUpdatedDate] = useState("");
  const [isTokenThere, setIsTokenThere] = useState(
    localStorage.getItem("token")
  );

  const onChangeEventHandler = (e) => {
    console.log("Check", { [e.target.name]: e.target.value });
    setUpdatedDate({ ...updatedData, [e.target.name]: e.target.value });
  };

  const data = useGetProfile();

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
    console.log("Does this run");
    setFileOject(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageOptions = () => {
      const formData = new FormData();
      formData.append("image", fileObject);

      const imageRequestOptions = {
        method: "POST",
        body: formData,
      };
      return imageRequestOptions;
    };

    const profileOptions = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("firstname", updatedData.firstname);
      urlencoded.append("lastname", updatedData.lastname);
      urlencoded.append("emailaddress", profileData.emailaddress);
      imageURL && urlencoded.append("image", imageURL);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      return requestOptions;
    };

    try {
      const response = await fetch(
        "http://localhost:5000/users/imageupload",
        imageOptions()
      );
      const result = await response.json();
      setImageURL(result.imageURL);
      try {
        const profileResponse = await fetch(
          "http://localhost:5000/users/update",
          profileOptions()
        );
        const profileResults = await profileResponse.json();
        setProfileData(profileResults);
      } catch (error) {
        console.log("Profile error:", error);
      }
    } catch (error) {
      console.log("Image error: ", error);
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
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Avatar
                alt="Remy Sharp"
                src={imageURL ? imageURL : profileData.image}
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>

          <br />
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
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
                id="firstname"
                label={
                  profileData
                    ? ("First: ", profileData.firstname)
                    : "First Name"
                }
                name="firstname"
                variant="standard"
                onChange={onChangeEventHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastname"
                label={
                  profileData ? ("Last: ", profileData.lastname) : "Last Name"
                }
                name="lastname"
                variant="standard"
                onChange={onChangeEventHandler}
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
