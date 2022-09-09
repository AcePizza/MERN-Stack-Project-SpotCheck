import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AutenticationContext } from "../context/AutenticationContext";

export default function NavbarDrawer({ openDrawer, setOpenDrawer }) {
  const currentPage = useLocation();

  const redirectTo = useNavigate();

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

  const isUserLoggedIn = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    redirectTo("/home");
  };

  const handleSortChange = (e) => {
    console.log(e.target.value);
  };

  const notLoggedIn = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href="/home" underline="none">
              {"Home"}
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {currentPage.pathname == "/home" ? (
        <List>
          <ListItem>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="sort-simple-select-label">Sort</InputLabel>
              <Select
                labelId="sort-simple-select-label"
                id="sort-simple-select"
                value={10}
                label="sort"
                onChange={handleSortChange}
              >
                <MenuItem value={10}>Ascending</MenuItem>
                <MenuItem value={20}>Descending</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>You are NOT on the homepage</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  const loggedIn = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href="/home" underline="none">
              {"Home"}
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href="/profile" underline="none">
              {"Profile"}
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href="/addspot" underline="none">
              {"Add Spot"}
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Button onClick={logoutHandler}>Logout</Button>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {currentPage.pathname == "/home" ? (
        <List>
          <ListItem>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="sort-simple-select-label">Sort</InputLabel>
              <Select
                labelId="sort-simple-select-label"
                id="sort-simple-select"
                value={10}
                label="sort"
                onChange={handleSortChange}
              >
                <MenuItem value={10}>Ascending</MenuItem>
                <MenuItem value={20}>Descending</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            {/* <ListItemButton>
              <ListItemText>{`Current Page: ${currentPage.pathname}`}</ListItemText>
            </ListItemButton> */}
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <>
        <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>
          {!isUserLoggedIn ? notLoggedIn() : loggedIn()}
        </Drawer>
      </>
    </div>
  );
}
