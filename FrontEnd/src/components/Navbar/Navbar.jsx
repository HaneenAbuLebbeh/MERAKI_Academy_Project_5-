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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';

const pages = ["Top Spots", "Market", "Cart", "About Us"];
const settings = ["Account", "Favourites", "Orders", "Logout"];

const Navbar = () => {
  const isLoggedIn = useSelector(
    (state) => state.login.isLoggedIn // Corrected selector syntax
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

  const navigateToSpots=()=>{
    navigate("/TouristSpots")
  };
  const navigateToMarket=()=>{
    navigate("/Products")
  };

  const navigateToCart=()=>{
    navigate("/cart")
  };

  const navigateToAbout=()=>{
    navigate("/About")
  };
  const navigateToFavourites = () => {
    navigate("/Favourite");
    handleCloseUserMenu(); // Close the menu when navigating
  };

  const navigateToAccount = () => {
    navigate("/Account");
    handleCloseUserMenu(); // Close the menu when navigating
  };

  const navigateToOrders = () => {
    navigate("/Orders");
    handleCloseUserMenu(); // Close the menu when navigating
  };

  const navigateToLogout = () => {
    // Add your logout logic here (e.g., clear session)
    navigate("/Logout");
    handleCloseUserMenu(); // Close the menu when navigating
  };
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white', // Set the default background color to white
    '&:hover': {
      backgroundColor: '#BEBEC0', // Change the background color on hover
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
    
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img
              id="logo"
              src="./src/assets/Screenshot 2024-11-14 201237.png"
              alt="Logo"
              style={{ height: "70px", width: "200px" }}
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } ,justifyContent:"space-around"}}>
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
                vertical: "center",
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
                <MenuItem key={page} sx={{ textAlign: "center", fontSize: "16px", fontFamily: "Roboto" }}  onClick={
                  page === "Top Spots"
                    ? navigateToSpots
                    : page === "Market"
                    ? navigateToMarket
                    : page === "Cart"
                    ? navigateToCart
                    : page === "About Us"
                    ? navigateToAbout
                    : handleCloseUserMenu
                }>
                  <Typography >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ mx: 3, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box>
<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
</Box>
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
                  
                </Tooltip>
                {/* <Box sx={{ color: "action.active" }}>
                  <Badge color="secondary" variant="dot">
                    <MailIcon />
                  </Badge>
                </Box> */}
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
                          ? navigateToLogout
                          : handleCloseUserMenu
                      }
                    >
                      <Typography >
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
