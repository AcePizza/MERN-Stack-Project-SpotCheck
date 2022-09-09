import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import MainSpotListCard from "../components/MainSpotListCard";
import MainSpotListDropDownFilter from "../components/MainSpotListDropDownFilter";
import MainSpotListPagination from "../components/MainSpotListPagination";
import useFetch from "../utils/useFetch";

function MainSpotListView() {
  // const [foundSpots, setFoundSpots] = useState(null);

  const url = "http://localhost:5000/spots/all";
  const options = "";

  // This does not work with no token :(
  const data = useFetch(url, options);
  let foundSpots = "";

  if (data.loading == false) {
    foundSpots = data.data;
  }

  return (
    <Container>
      <br />
      {!foundSpots ? (
        <LoadingPleaseWait />
      ) : (
        foundSpots.allSpots.map((spot, index) => {
          return <MainSpotListCard key={index} spot={spot} index={index} />;
        })
      )}
    </Container>
  );
}

export default MainSpotListView;
