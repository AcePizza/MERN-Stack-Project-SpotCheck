import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainSpotListCard({ spot, index }) {
  const redirectTo = useNavigate();

  return (
    <React.Fragment key={index}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={spot.image}
          alt="green iguana"
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
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
