import React, { useRef, useState } from "react";
import { Box, Typography, Grid, Paper, Button, TextField, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LocalShipping, VerifiedUser, SupportAgent, MenuBook, ArrowForward, Search, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Parallax, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import 'swiper/css/navigation';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {link,useNavigate} from "react-router-dom";
import img1 from "../assets/banner1.jpg";
import img2 from "../assets/banner2.jpg";
import img3 from "../assets/banner3.webp";

// Premium book data
const featuredBooks = [
  {
    "id": "1",
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "year": 1997,
    "description": "The first book in the Harry Potter series.",
    "image": "https://d3525k1ryd2155.cloudfront.net/h/145/825/654825145.0.x.jpg",
    "price_in_inr": "₹499",
    "discount": "10%",
    "discount_Price": "",
    "hoverImage": "https://pictures.abebooks.com/RAREBOOKCELLAR/30020287532.jpg",
    "quantity": 1
  },
  {
    "id": "5",
    "title": "Animal Farm",
    "author": "George Orwell",
    "genre": "Political Satire",
    "year": 1945,
    "description": "An allegorical novella about farm animals rebelling against humans.",
    "image": "https://th.bing.com/th/id/OIP.NXeqlaNItLAh_xG7mX72RAHaKM?rs=1&pid=ImgDetMain",
    "price_in_inr": "₹420",
    "discount": "10%",
    "discount_Price": "",
    "hoverImage": "https://th.bing.com/th/id/OIP.a891nJ57Nl8cjcbO0EFUCAHaKS?rs=1&pid=ImgDetMain",
    "quantity": 1
  },
  {
    "id": "7",
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "genre": "Romance",
    "year": 1813,
    "description": "A witty commentary on social class and marriage in Georgian England.",
    "image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664450095i/62821812.jpg",
    "price_in_inr": "₹399",
    "discount": "0%",
    "discount_Price": "",
    "hoverImage": "https://th.bing.com/th/id/R.c1c6633e41f81590f94188bfda47f1c4?rik=Y8yYxcTO5JDqfg&riu=http%3a%2f%2fd28hgpri8am2if.cloudfront.net%2fbook_images%2fonix%2fcvr9781471134746%2fpride-and-prejudice-9781471134746_hr.jpg&ehk=x2q%2fXHpsXqzUEAXbe4Bq%2f7uW8D%2fDjubqcxy5Kr9N93g%3d&risl=&pid=ImgRaw&r=0",
    "quantity": 1
  },
  {
    "id": "10",
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "genre": "Historical Fiction",
    "year": 1869,
    "description": "An epic novel about Russian society during the Napoleonic Era.",
    "image": "https://mynextreadinglist.com/wp-content/uploads/2019/01/71ykhMyjntL.jpg",
    "price_in_inr": "₹599",
    "discount": "0%",
    "discount_Price": "",
    "hoverImage": "https://tse3.mm.bing.net/th/id/OIP.c2ZJIxEnpX6Yzzih0E4UJAAAAA?rs=1&pid=ImgDetMain",
    "quantity": 1
  }
];

const bannerImages = [
  img1,
  img2,
  img3,
];

const BannerSlider = ({ bannerImages }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Box
      sx={{
        height: { xs: "60vh", sm: "80vh", md: "100vh" },
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Parallax, Navigation]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        speed={1000}
        parallax
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        style={{
          height: "100%",
          "--swiper-navigation-color": "#fff",
        }}
      >
        {bannerImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                willChange: "transform",
              }}
              data-swiper-parallax="-20%"
            />
          </SwiperSlide>
        ))}
  
        {/* Custom Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          disabled={isBeginning}
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: 8, sm: 16 },
            zIndex: 10,
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: "translateY(-50%)",
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.5)'
            },
            '&.Mui-disabled': {
              opacity: 0.3
            }
          }}
        >
          <ArrowBackIos fontSize="medium" />
        </IconButton>
  
        <IconButton
          onClick={handleNext}
          disabled={isEnd}
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: 8, sm: 16 },
            zIndex: 10,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.3)",
            transform: "translateY(-50%)",
            '&:hover': {
              bgcolor: "rgba(0,0,0,0.5)"
            },
            '&.Mui-disabled': {
              opacity: 0.3
            }
          }}
        >
          <ArrowForwardIos fontSize="medium" />
        </IconButton>
      </Swiper>
    </Box>
  );
  
  
};

const HomePage = () => {
  // const [wishlist, setWishlist] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });

  // const toggleWishlist = (bookId) => {
  //   setWishlist(prev => 
  //     prev.includes(bookId) 
  //       ? prev.filter(id => id !== bookId) 
  //       : [...prev, bookId]
  //   );
  // };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      } 
    }
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ overflowX: "hidden", bgcolor: "background.default", mt: 2 }}>
      {/* Luxury Hero Section */}
      <Box sx={{ 
        height: { xs: "90vh", md: "100vh" },
        position: "relative",
        isolation: "isolate"
      }}>
        <Box sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1
        }} />
        
        <BannerSlider bannerImages={bannerImages} />

        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3, // Increased z-index
          display: "flex",
          alignItems: "center",
          px: { xs: 3, md: 10 },
          pointerEvents: "none" // Allows clicks to pass through to slider
        }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ maxWidth: "800px", pointerEvents: "auto" }}
          >
            <Typography
              variant={isMobile ? "h2" : "h1"}
              sx={{
                fontWeight: 900,
                color: "white",
                mb: 3,
                lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              Where Stories <Box component="span" sx={{color: "rgb(232, 226, 109)" }}>Come</Box> to Life
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 5,
                textShadow: "0 1px 3px rgba(0,0,0,0.2)"
              }}
            >
              Discover handpicked collections from award-winning authors and emerging voices
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/product')}
                endIcon={<ArrowForward />}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: "50px",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  background:'linear-gradient(90deg, #191654, #43c6ac)',
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  "&:hover": { transform: "translateY(-2px)",
                    background:'linear-gradient(90deg, #43c6ac, #191654)',
                    boxShadow: "0 4px 20px  #f6d365",
                    borderColor: "white"
                   }
                }}
              >
                Explore Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/product')}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: "50px",
                  background:'linear-gradient(90deg, #191654, #43c6ac)',                  
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": { 
                    borderColor: "white",
                    boxShadow: "0 4px 20px  #f6d365",
                     background:'linear-gradient(90deg, #43c6ac, #191654)'
                  }
                }}
              >
                Our Authors
              </Button>
            </Box>
          </motion.div>
        </Box>

            {/* Decorative elements */}
            <Box sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          pointerEvents: "none"
        }}>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowForward sx={{ 
              color: "white", 
              fontSize: "2rem",
              transform: "rotate(90deg)"
            }} />
          </motion.div>
        </Box>
      </Box>

      {/* Luxury Book Showcase */}
      <Box sx={{ py: 12, px: { xs: 3, md: 8 }, bgcolor: "background.paper" ,background: 'linear-gradient(90deg, #43c6ac, #191654)'}}>
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              mb: 6,
              color:'white',
              textAlign: "center",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 4,
                bgcolor: "primary.main",
                borderRadius: 2
              }
            }}>
              Collector's Editions
            </Typography>
          </motion.div>

          <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',  // 2 cards on mobile (xs)
      sm: 'repeat(2, 1fr)',  // 3 cards on tablet (sm)
      md: 'repeat(4, 1fr)'   // 4 cards on laptop/desktop (md and up)
    },
    gap: {
      xs: 2,  // 16px on mobile
      sm: 3,  // 24px on tablet
      md: 3   // 24px on laptop/desktop
    },
    mt: 6
  }}
>
  {featuredBooks.map((book) => (
    <Grid item key={book.id} xs={6} sm={4} md={3}>
      <motion.div whileHover={{ y: -10 }}>
        <Paper
          elevation={0}
          onClick={() => navigate('/product')}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
             background: 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)',
             "&:hover":{boxShadow: "0 4px 20px  #f6d365"}
          }}
        >
        {/* Image Section */}
        <Box
          sx={{
            height: 220,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.4)',
              color: wishlist.includes(book.id) ? 'red' : 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.6)',
              },
            }}
            onClick={() => toggleWishlist(book.id)}
          >
            {wishlist.includes(book.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton> */}
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '3em',
              }}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {book.author}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexGrow: 1,
            }}
          >
            {book.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              {book.price_in_inr}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Star rating */}
            </Box>
          </Box>
        </Box>
        </Paper>
      </motion.div>
    </Grid>
  ))}
</Box>

        </Box>
      </Box>

      <Box sx={{ 
        py: 12,
        background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        <Box sx={{ 
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background: "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)",
          backgroundSize: "cover",
          opacity: 0.15
        }} />
        
        <Box sx={{ 
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 3, md: 6 },
          position: "relative",
          zIndex: 1
        }}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.3
                }}>
                  Join Our <Box component="span" sx={{ color: "primary.main" }}>Exclusive</Box> Book Club
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 4,
                  fontSize: "1.1rem",
                  opacity: 0.9,
                  lineHeight: 1.7
                }}>
                  Get early access to signed editions, author meetups, and 20% off all purchases. 
                  Our members receive a curated hardcover book each month.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    placeholder="Your email address"
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 250,
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.3)"
                        }
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      borderRadius: "50px",
                      fontWeight: 700,
                      textTransform: "none"
                    }}
                  >
                    Join Now
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper elevation={0} sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Membership Benefits
                  </Typography>
                  {[
                    "Monthly hardcover book",
                    "20% discount on all purchases",
                    "Exclusive signed editions",
                    "Free shipping worldwide",
                    "VIP access to author events"
                  ].map((benefit, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2
                      }}>
                        <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>
                          {i + 1}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {benefit}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;