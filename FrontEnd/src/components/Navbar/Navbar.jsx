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
import ReceiveSocketMessages from "../Socket/ReciveSocketMessages";
import { setLogout } from "../../../Redux/reducers/login";
const pages = ["Top Spots", "Market", "Cart", "About Us"];
const settings = ["Account", "Favourites", "Orders", "Logout"];

const Navbar = () => {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);








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

  const navigateToFavourites = () => {
    navigate("/Favourite");
    handleCloseUserMenu(); 
  };

  const navigateToAccount = () => {
    navigate("/Account");
    handleCloseUserMenu(); 
  };

  const navigateToOrders = () => {
    navigate("/Orders");
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


  const handleCloseChat = () => {
    setOpenChat(false); 
    setAnchorElMail(null); 
  };
  console.log(image)
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
              onClick={() => {}}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={false}
              onClose={() => {}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {}}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {}}
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
                    <Avatar alt="User" src={image}
                    /* "./src/assets/user.jpg" */ />
                  </IconButton>
                </Tooltip>
                
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
      <ReceiveSocketMessages openChat={openChat} handleCloseChat={handleCloseChat} />
     
    </AppBar>
  );
};

export default Navbar;
