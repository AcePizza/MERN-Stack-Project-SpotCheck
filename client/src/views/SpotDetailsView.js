import { Container } from "@mui/system";
import { Button, Divider, Grid } from "@mui/material";
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
import Comments from "../components/Comments";
import MakeComment from "../components/MakeComment";
import jwtDecode from "jwt-decode";

function SpotDetailsView() {
  const [currentSpot, setCurrentSpot] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const { spot } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [isTokenThere, setIsTokenThere] = useState(
    localStorage.getItem("token")
  );

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
    if (isTokenThere) {
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

  useEffect(() => {
    setTimeout(() => {
      setIsTokenThere(false);
    }, 3000);
  }, []);

  const favoriteSpotHandler = async () => {
    const fetchOption = () => {
      const userID = jwtDecode(localStorage.getItem("token"));

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("spot", currentSpot.id);
      urlencoded.append("user", userID.sub);

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
        "http://localhost:5000/spots/vote",
        fetchOption()
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log(error);
    }
  };

  const makeCommentHandeler = (e) => {
    setOpenDialog(true);
  };

  useEffect(() => {
    getCurrentSpot();
  }, []);

  return (
    <>
      {isTokenThere && editSpotHandler()}

      {openDialog && (
        <MakeComment openDialog={openDialog} currentSpot={currentSpot} />
      )}
      <br />
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
                {currentSpot.comments.map((element, index) => {
                  return (
                    <Comments
                      key={index}
                      spot={currentSpot}
                      comments={element}
                      index={index}
                    />
                  );
                })}
                {isTokenThere ? (
                  <Button disabled={true}>Make a comment</Button>
                ) : (
                  <Button onClick={makeCommentHandeler}>Make a comment</Button>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default SpotDetailsView;
