import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
  Button,
  Divider
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Pinterest,
  Book,
  Email,
  Phone,
  LocationOn,
  FavoriteBorder
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(45deg,rgb(58, 56, 59),rgb(33, 18, 37))",
        color: "white",
        pt: 6,
        pb: 4,
        px: isMobile ? 2 : 3, // Adjusted horizontal padding
        width: "100%", // Ensure the footer spans full width
        boxSizing: "border-box", // Apply consistent box-sizing
        position: "relative",
        borderRadius:"12px",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
        }
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          zIndex: 0,
          overflow: "hidden", // Prevent decorative overflow issues
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          zIndex: 0,
          overflow: "hidden", // Prevent decorative overflow issues
        }}
      />

      <Grid container spacing={4} justifyContent="center" position="relative" zIndex={1}>
        {/* Brand Section */}
        <Grid item xs={12} md={3} sx={{ textAlign: isMobile ? "center" : "left" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start" }}>
            <Book sx={{ fontSize: 40, color:' #43c6ac', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              BookVerse
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            Your portal to endless stories and knowledge. We curate the finest collection of books for every reader.
          </Typography>
          
          <Box sx={{ mt: 3, display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                borderRadius: "50px",
                background: 'linear-gradient(90deg, #191654, #43c6ac)',
                boxShadow: "0 4px 15px  #191654",
                "&:hover":{ background: 'linear-gradient(90deg, #43c6ac, #191654)',
                   boxShadow: "0 4px 15px #43c6ac"
                }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
            Explore
          </Typography>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Featured Books</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">New Releases</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Bestsellers</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Authors</Typography>
          </Link>
        </Grid>

        {/* Company */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
            Company
          </Typography>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">About Us</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Our Story</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Careers</Typography>
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1.5, opacity: 0.8, "&:hover": { opacity: 1 } }}>
            <Typography variant="body2">Blog</Typography>
          </Link>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Email sx={{ mr: 1.5, fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              support@bookverse.com
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Phone sx={{ mr: 1.5, fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              +1 (555) 123-4567
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOn sx={{ mr: 1.5, fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              123 Book Street, Literary City
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, background: "rgba(255,255,255,0.1)" }} />

      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} sx={{ textAlign: isMobile ? "center" : "left" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} BookVerse. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: isMobile ? "center" : "right" }}>
          <Box>
            <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#3b5998" } }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#1da1f2" } }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#e1306c" } }}>
              <Instagram />
            </IconButton>
            {/* <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#007  7b5" } }}> */}
            <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#0077b5" } }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1, color: "#e60023" } }}>
              <Pinterest />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Note */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          Made with <FavoriteBorder sx={{ fontSize: 14, verticalAlign: "middle" }} /> for book lovers
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
