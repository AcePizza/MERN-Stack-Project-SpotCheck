import { Container } from "@mui/system";
import React from "react";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import MainSpotListCard from "../components/MainSpotListCard";
import MainSpotListDropDownFilter from "../components/MainSpotListDropDownFilter";
import MainSpotListPagination from "../components/MainSpotListPagination";
import useFetch from "../utils/useFetch";

function MainSpotListView() {
  const url = "http://localhost:5000/users/all";
  useFetch(url);

  return (
    <Container>
      <MainSpotListDropDownFilter />
      <MainSpotListPagination />
      <br></br>
      <MainSpotListCard />
    </Container>
  );
}

export default MainSpotListView;
