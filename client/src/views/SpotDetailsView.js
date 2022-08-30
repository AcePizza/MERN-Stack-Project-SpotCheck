import { Container } from "@mui/system";
import { Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Alert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SpotDetailsView() {
  const [currentSpot, setCurrentSpot] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const { spot } = useParams();

  const isTheTokenThere = localStorage.getItem("token");

  const reqOptions = {
    method: "GET",
    redirect: "follow",
  };

  const getCurrentSpot = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/spots/one/${spot}`,
        reqOptions
      );
      const results = await response.json();
      setCurrentSpot(results);
    } catch (error) {
      console.log(error);
    }
  };

  const editSpotHandler = () => {
    if (isTheTokenThere) {
      return (
        <>
          <Alert severity="warning">Nothing here yet</Alert>
        </>
      );
    } else {
      return (
        <>
          <Alert severity="error">Please login to edit spots!</Alert>
        </>
      );
    }
  };

  const favoriteSpotHandler = () => {
    console.log("Favorite clicked");
  };

  useEffect(() => {
    getCurrentSpot();
  }, []);

  return (
    <Container>
      {!currentSpot ? (
        <LoadingPleaseWait />
      ) : (
        <>
          <Card>
            <div style={{ position: "relative" }}>
              <CardMedia
                style={{ height: "250px" }}
                component="img"
                image={currentSpot.image}
                title="Pancakes"
                alt="Pancakes"
              />
              <div
                style={{
                  position: "absolute",
                  color: "white",
                  top: 0,
                  left: "7%",
                  textShadow: "-1px 1px 10px rgba(0, 0, 0, 0.75)",
                }}
              >
                <h3>{currentSpot.title}</h3>
              </div>
            </div>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <IconButton onClick={editSpotHandler} aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              <IconButton onClick={favoriteSpotHandler} aria-label="Edit">
                {currentSpot.votes.length <= 0 ? (
                  <FavoriteBorderIcon />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5>Description</h5>
              <p>{currentSpot.description}</p>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5>Comments</h5>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default SpotDetailsView;
