import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import MainSpotListCard from "../components/MainSpotListCard";
import MainSpotListDropDownFilter from "../components/MainSpotListDropDownFilter";
import MainSpotListPagination from "../components/MainSpotListPagination";
import useFetch from "../utils/useFetch";

function MainSpotListView() {
  const [allSpots, setAllSpots] = useState(null);
  const url = "http://localhost:5000/spots/all";

  const foundSpots = useFetch(url);

  return (
    <Container>
      <MainSpotListDropDownFilter />
      <MainSpotListPagination />
      <br />
      {foundSpots &&
        foundSpots.allSpots.map((spot, index) => {
          return <MainSpotListCard spot={spot} index={index} />;
        })}
    </Container>
  );
}

export default MainSpotListView;
