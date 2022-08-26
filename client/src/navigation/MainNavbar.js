import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import NavbarDrawer from "../components/NavbarDrawer";

function MainNavbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const redirectTo = useNavigate();

  const loginOnClickHandeler = () => [redirectTo("/login")];

  const openDrawerHandeler = (event) => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openDrawerHandeler}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SpotView
            </Typography>
            <Button onClick={loginOnClickHandeler} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <NavbarDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </Box>
      <br></br>
    </>
  );
}

export default MainNavbar;
