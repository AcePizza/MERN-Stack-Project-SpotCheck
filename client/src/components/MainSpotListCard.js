import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MainSpotListCard({ spot, index }) {
  const redirectTo = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const isPostFavorited = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/spots/one/${spot._id}`
      );
      const result = await response.json();
      if (result.votes.length <= 0) {
        setFavorite(true);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Need to add functionality to this
  const favoriteButtonHandler = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    isPostFavorited();
  }, []);

  return (
    <React.Fragment key={index}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={spot.image}
          alt="Image of the skatespot"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {spot.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {spot.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={favoriteButtonHandler}
            aria-label="add to favorites"
          >
            {!favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {spot.votes.length}
          </Typography>
          <Button
            onClick={() => {
              redirectTo(`/spotdetails/${spot._id}`);
            }}
            size="small"
          >
            More info
          </Button>
        </CardActions>
      </Card>
      <br />
    </React.Fragment>
  );
}

export default MainSpotListCard;
