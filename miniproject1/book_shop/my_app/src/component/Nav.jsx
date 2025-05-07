import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { 
  AppBar, Box,InputAdornment, Toolbar, Typography, Button, IconButton, Badge, TextField, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, 
  useTheme, Slide, useScrollTrigger, CssBaseline, Avatar, Menu, MenuItem
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'; 
import {
  ShoppingCart, Menu as MenuIcon, Inventory, Home, Info, Login, Person, Logout, Favorite
} from "@mui/icons-material";
import MenuBook from '@mui/icons-material/MenuBook';
import LocalMall from '@mui/icons-material/LocalMall';
import { color } from "framer-motion";



function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Nav = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const open = Boolean(anchorEl);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const interval = setInterval(fetchCartCount, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setLoginOpen(false);
    handleClose();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    handleClose();
  };

  const sidebarList = (
    <Box 
      sx={{ 
        width: 280,
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        height: '100%',
        color: ' #191654'
      }} 
      role="presentation" 
      onClick={toggleDrawer(false)} 
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, textAlign: 'center', }}>
        <Typography variant="h6" sx={{ fontFamily: "'Lemon', cursive",color:" #191654" }}>
          BOOK WORLD
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {[
          { text: 'Home', icon: <Home />, path: '/' },
          { text: 'Collections', icon: <MenuBook />, path: '/product' },
          { text: 'Offers', icon: <LocalMall  />, path: '/offer' },
          { text: 'Wishlist', icon: <Favorite />, path: '/wishlist' },
          { text: 'About Us', icon: <Info />, path: '/about' },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'rgb(13, 145, 119)' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} />
      <List>
        <ListItem 
          button 
          onClick={() => navigate('/mycart')}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          <ListItemIcon sx={{ color: 'rgb(13, 145, 119)' }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="My Cart" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            background: 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '0 0 12px 12px',
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            padding: isMobile ? '0 8px' : '0 24px'
          }}>
            {/* Left Side - Menu and Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                onClick={() => navigate('/')}
                sx={{
                  fontFamily: "'Lemon', cursive",
                  fontWeight: "bold",
                  fontSize: isMobile ? "1.2rem" : "1.8rem",
                  letterSpacing: "1px",
                  background: 'linear-gradient(90deg, #43c6ac, #191654)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #191654, #43c6ac)',
                    WebkitBackgroundClip: 'text',
                    "&:hover": { transform: "translateY(-2px)" }
                  },
                  // transition: 'all 0.3s ease',
                }}
              >
                BOOK SHELF
              </Typography>
            </Box>

            {/* Center - Navigation Links (Desktop only) */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                mx: 2,
                flexGrow: 1,
                justifyContent: 'center'
              }}>
                <Button
                  component={Link}
                  to="/"
                  startIcon={<Home />}
                  sx={{
                    color: 'linear-gradient(90deg, #191654,#43c6ac)',
                  
                    '&:hover': {
                      WebkitBackgroundClip: 'text',
                      transform: "translateY(-2px)" 
                    }
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/product"
                  startIcon={<MenuBook />}
                  sx={{
                    color: 'linear-gradient(90deg, #191654,#43c6ac)',
                  
                    '&:hover': {
                      WebkitBackgroundClip: 'text',
                      transform: "translateY(-2px)" 
                    }
                  }}
                >
                  Collections
                </Button>
                <Button
                  component={Link}
                  to="/offer"
                  size="large"
                  startIcon={<LocalMall />}
                  sx={{
                    color: 'linear-gradient(90deg, #191654,#43c6ac)',
                  
                    '&:hover': {
                      transform: "translateY(-2px)" 
                    }
                  }}
                >
                  Offers
                </Button>
              </Box>
            )}

            {/* Right Side - Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="large"
                color="primary"
                onClick={() => navigate('/mycart')}
                sx={{                  
                  '&:hover': {
                    WebkitBackgroundClip: 'text',
                    transform: "translateY(-2px)" 
                  }
                }}
              >
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {loggedIn ? (
                <>
                  <IconButton
                    onClick={handleMenu}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor:  'rgb(80, 77, 143)' }}>
                      <Person sx={{ fontSize: 18 }} />
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/wishlist')}>
                      <ListItemIcon>
                        <Favorite fontSize="small" />
                      </ListItemIcon>
                      Wishlist
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<Login />}
                  onClick={() => setLoginOpen(true)}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    display: isMobile ? 'none' : 'flex',
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {sidebarList}
      </Drawer>

      {/* Login Dialog */}
      <Dialog 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: '12px',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #191654 0%, #43c6ac 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          Welcome Back
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Login />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{
              background: 'linear-gradient(45deg, #191654 0%, #43c6ac 100%)',
              color: 'white',
              px: 4,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                background: 'linear-gradient(45deg, #43c6ac 0%, #191654 100%)'
                
              },
              transition: 'all 0.3s',
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => setLoginOpen(false)}
            sx={{
              borderColor: '#3d1541',
              color: 'rgb(255, 255, 255)',
              background: 'linear-gradient(45deg,rgb(137, 2, 2) 0%,rgb(255, 20, 20) 100%)',
              px: 4,
              '&:hover': {
                borderColor: '#e19bc1',
                transform: 'translateY(-2px)',
                background: 'linear-gradient(45deg,,rgb(249, 82, 82) 0%,rgb(137, 2, 2) 100%)'
              },transition: 'all 0.3s',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Nav;