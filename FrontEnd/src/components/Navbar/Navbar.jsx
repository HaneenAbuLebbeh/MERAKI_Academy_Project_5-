import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const pages = ["Top Spots", "Market", "Cart", "About Us"];
const settings = ["Account", "Favourites", "Orders", "Logout"];

const Navbar = () => {
  const isLoggedIn = useSelector(
    (initialState) => initialState.login.isLoggedIn
  );
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignInClick = () => {
    navigate("/Login");
  };
  const navigateToFavourites=()=>{
    navigate("/Favourite");
  }

  const navigateToAccount=()=>{
    navigate("/Account");
  }

const navigateToOrders=()=>{
  navigate("/orders");
}
const navigateToLogOut=()=>{
  navigate("/Logout")
}
 
    return (
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img
                id="logo"
                src="./src/assets/Logo4.png"
                alt="Logo"
                style={{ height: "85px", width: "200px" }}
                onClick={() => navigate("/")}
              />
            </Box>
  
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
  
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" src="./src/assets/user.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ color: "action.active" }}>
                    <Badge color="secondary" variant="dot">
                      <MailIcon />
                    </Badge>
                  </Box>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={
                          setting === "Favourites"
                            ? navigateToFavourites
                            : setting === "Account"
                            ? navigateToAccount
                            : setting === "Orders"
                            ? navigateToOrders
                            : setting === "Logout"
                            ? navigateToLogOut
                            : handleCloseUserMenu
                        }
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button onClick={handleSignInClick} sx={{ color: "black" }}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

export default Navbar;
