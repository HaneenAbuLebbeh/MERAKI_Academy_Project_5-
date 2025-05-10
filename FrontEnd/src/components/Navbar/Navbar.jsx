import React ,{useState,useEffect,useContext} from "react";
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
import Popover from "@mui/material/Popover"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';

/* */
import MarketIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';


import ReceiveSocketMessages from "../Socket/ReciveSocketMessages";
import { setLogout } from "../../../Redux/reducers/login";

const pages = ["Top Spots", "Market", "Cart", "About Us"];
const settings = ["Account", "Favourites", "Orders", "Logout"];

const Navbar = () => {
  
  const cart = useSelector((state) => state.cart.items);
  // Calculating the total number of items in the cart
  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const userId=useSelector((initialState)=> initialState.login.userId)
  const dispatch=useDispatch()
  const [newMessages, setNewMessages] = useState(false); 
  const [image, setimage] = useState("")
  const isLoggedIn = useSelector(
    (state) => state.login.isLoggedIn 
  );
  const [isGuide, setisGuide] = useState(false)
  const user_id=useSelector((initialState)=> initialState.login.userId)
  console.log(user_id)
  useEffect(() => {
    console.log("user_id:", user_id);
    if (user_id === 35) {
      setisGuide(true); 
    } else {
      setisGuide(false); 
    }
  }, [user_id]);

  useEffect(() => {
    if (isGuide) {
      
      const timer = setInterval(() => {
        setNewMessages((prev) => !prev); 
      }, 5000); 
      return () => clearInterval(timer); 
    }
  }, [isGuide]);
  console.log("isGuide:", isGuide);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openChat, setOpenChat] = useState(false); 
  const [anchorElMail, setAnchorElMail] = useState(null); 

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/users/userinfo/${userId}`);
        setimage(response.data.result[0].image); 
        console.log(response)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
if (userId){
  fetchUserData();
}
    
  }, [userId]);








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
    navigate("/Market")
  };

  const navigateToCart=()=>{
    navigate("/cart")
  };

  const navigateToAbout=()=>{
    navigate("/About")
  };
  const navigateToFavourites = () => {
    navigate("/Favourite");
    handleCloseUserMenu(); 
  };

  const navigateToAccount = () => {
    navigate("/Account");
    handleCloseUserMenu(); 
  };

  const navigateToOrders = () => {
    navigate("/my-PreviousOrders");
    handleCloseUserMenu(); 
  };

  const navigateToLogout = () => {
    dispatch(setLogout())
    navigate("/");
    handleCloseUserMenu(); 
  };
  const handleOpenChat = (event) => {
    setAnchorElMail(event.currentTarget); 
    setOpenChat(true); 
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

  


  const handleCloseChat = () => {
    setOpenChat(false); 
    setAnchorElMail(null); 
  };
  console.log(image)
//background: "linear-gradient(90deg, #ff8a00, #fc2976)"

/*linear-gradient(90deg, #ff8a00,  #FF5F6D)*/
  return (
    <AppBar position="fixed" sx={{   background: "linear-gradient(90deg, #FFC107, #FF4F3E)"
      , color: "black", mb: 2 , height: "66px" , margin:"0px", zIndex:"4"}}>

            {/* Video background */}
          {/*  <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, 
        }}
      >
        <video
          
          loop
          muted
          style={{
            objectFit: "cover", 
            width: "140%",
            height: "200%",
          }}
        >
          <source src="./src/assets/cloud2.mp4" type="video/mp4" />
        </video>
      </Box>*/}

    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
          <img
            id="logo"
            src="/logo2.png"
            alt="Logo"
            style={{ height: "70px", width: "160px" }}
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

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "space-around" }}>
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
              <MenuItem
                key={page}
                onClick={
                  page === "Top Spots"
                    ? navigateToSpots
                    : page === "Market"
                    ? navigateToMarket
                    : page === "Cart"
                    ? navigateToCart
                    : page === "About Us"
                    ? navigateToAbout
                    : handleCloseNavMenu
                }
                sx={{
                  mx: 3,
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
            className="mooon"
              key={page}
              onClick={
                page === "Top Spots"
                  ? navigateToSpots
                  : page === "Market"
                  ? navigateToMarket
                  : page === "Cart"
                  ? navigateToCart
                  : page === "About Us"
                  ? navigateToAbout
                  : handleCloseNavMenu
              }
              sx={{ mx: 9.9, color: "black", display: "block" }}
            >
            
            {page === "Cart" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon className="moon-icon" sx={{ order: -1 }} />
          </Badge>
          <Typography>Cart</Typography>
        </Box>
      ) : page === "Market" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MarketIcon className="moon-icon"/>
          <Typography>Market</Typography>
        </Box>
      ) : page === "Top Spots" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ExploreIcon className="moon-icon"/>
          <Typography>Top Spots</Typography>
        </Box>
      ) : page === "About Us" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InfoIcon className="moon-icon"/>
          <Typography>About Us</Typography>
        </Box>
      ) : (
        page
      )}        
            </Button>
          ))}
        </Box>

{/*       <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
</Box>
*/} 
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">

                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src={image}
                    /* "./src/assets/user.jpg" */ />
                  </IconButton>

                  
      {/*             <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
                  

                </Tooltip>

                {/* <Box sx={{ color: "action.active" }}>
                  <Badge color="secondary" variant="dot">
                    <MailIcon />
                  </Badge>
                </Box> */}

                
                {isGuide && (
                  <Box sx={{ ml: 2 }}>
                    <IconButton onClick={handleOpenChat} sx={{ p: 0 }}>
                      <MailIcon />
                    </IconButton>
                  </Box>
                )}
                

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
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button onClick={handleSignInClick} sx={{ color: "white" }}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </Container>
    <ReceiveSocketMessages openChat={openChat} handleCloseChat={handleCloseChat} />
  </AppBar>
  );
};

export default Navbar;
