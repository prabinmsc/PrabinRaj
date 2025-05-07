// import React, { useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade, Parallax, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// const BannerSlider = ({ bannerImages }) => {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   useEffect(() => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       const swiperInstance = swiperRef.current.swiper;
      
//       // Assign the navigation elements
//       swiperInstance.params.navigation.prevEl = prevRef.current;
//       swiperInstance.params.navigation.nextEl = nextRef.current;
      
//       // Re-init navigation
//       swiperInstance.navigation.destroy();
//       swiperInstance.navigation.init();
//       swiperInstance.navigation.update();
//     }
//   }, [bannerImages]);

//   return (
//     <Box sx={{ 
//       height: { 
//         xs: "60vh",  // Mobile
//         sm: "70vh",  // Small tablet
//         md: "80vh",  // Tablet
//         lg: "90vh",  // Laptop
//         xl: "100vh"  // Desktop
//       }, 
//       position: "relative", 
//       isolation: "isolate" 
//     }}>
//       {/* Gradient overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
//           zIndex: 1,
//         }}
//       />
      
//       {/* Swiper container */}
//       <Swiper
//         ref={swiperRef}
//         modules={[Autoplay, EffectFade, Parallax, Navigation]}
//         effect="fade"
//         autoplay={{ 
//           delay: 6000, 
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true 
//         }}
//         loop
//         speed={1000}
//         parallax
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}
//         style={{
//           height: "100%",
//           "--swiper-navigation-color": "#fff",
//           "--swiper-navigation-size": isMobile ? "24px" : "32px",
//         }}
//         onInit={(swiper) => {
//           swiper.params.navigation.prevEl = prevRef.current;
//           swiper.params.navigation.nextEl = nextRef.current;
//           swiper.navigation.init();
//           swiper.navigation.update();
//         }}
//       >
//         {bannerImages.map((img, i) => (
//           <SwiperSlide key={i}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background: `url(${img})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: isMobile ? "center top" : "center center",
//                 willChange: "transform",
//               }}
//               data-swiper-parallax="-20%"
//             />
//           </SwiperSlide>
//         ))}

//         {/* Navigation buttons with responsive sizing */}
//         <IconButton 
//           ref={prevRef} 
//           sx={{ 
//             position: 'absolute', 
//             top: '50%', 
//             left: { xs: 4, sm: 8, md: 10 },
//             zIndex: 10, 
//             color: '#fff', 
//             transform: 'translateY(-50%)',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             '&:hover': {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)'
//             },
//             width: { xs: 36, sm: 44, md: 48 },
//             height: { xs: 36, sm: 44, md: 48 },
//           }}
//           aria-label="Previous image"
//         >
//           <ArrowBackIos fontSize={isMobile ? "small" : "medium"} />
//         </IconButton>

//         <IconButton 
//           ref={nextRef} 
//           sx={{ 
//             position: 'absolute', 
//             top: '50%', 
//             right: { xs: 4, sm: 8, md: 10 },
//             zIndex: 10, 
//             color: '#fff', 
//             transform: 'translateY(-50%)',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             '&:hover': {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)'
//             },
//             width: { xs: 36, sm: 44, md: 48 },
//             height: { xs: 36, sm: 44, md: 48 },
//           }}
//           aria-label="Next image"
//         >
//           <ArrowForwardIos fontSize={isMobile ? "small" : "medium"} />
//         </IconButton>
//       </Swiper>
//     </Box>
//   );
// };

// export default BannerSlider;






import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const BannerSlider = ({ bannerImages }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const theme = useTheme();
  
  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  // Responsive values
  const getHeight = () => {
    if (isXs) return "50vh";
    if (isSm) return "60vh";
    if (isMd) return "70vh";
    if (isLg) return "85vh";
    return "100vh";
  };

  const getArrowSize = () => {
    if (isXs) return "small";
    if (isSm) return "small";
    return "medium";
  };

  const getButtonSize = () => {
    if (isXs) return 32;
    if (isSm) return 36;
    if (isMd) return 40;
    if (isLg) return 44;
    return 48;
  };

  const getButtonPadding = () => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 6;
    if (isLg) return 8;
    return 10;
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      
      // Assign the navigation elements
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      
      // Re-init navigation
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [bannerImages]);

  return (
    <Box sx={{ 
      height: getHeight(),
      position: "relative", 
      isolation: "isolate",
      overflow: "hidden"
    }}>
      {/* Gradient overlay with responsive opacity */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isXs 
            ? "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1,
        }}
      />
      
      {/* Swiper container with responsive settings */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Parallax, Navigation]}
        effect="fade"
        autoplay={{ 
          delay: isXs ? 5000 : 6000, // Faster rotation on mobile
          disableOnInteraction: false,
          pauseOnMouseEnter: !isXs // Disable hover pause on mobile
        }}
        loop
        speed={isXs ? 800 : 1000} // Faster transition on mobile
        parallax
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          disabledClass: "swiper-button-disabled"
        }}
        style={{
          height: "100%",
          "--swiper-navigation-color": "#fff",
          "--swiper-navigation-size": isXs ? "20px" : "28px",
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
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
                backgroundPosition: isXs ? "center top" : "center center",
                backgroundAttachment: isXs ? "scroll" : "fixed",
                willChange: "transform",
              }}
              data-swiper-parallax={isXs ? "-10%" : "-20%"}
            />
          </SwiperSlide>
        ))}

        {/* Responsive navigation buttons */}
        <IconButton 
          ref={prevRef} 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: getButtonPadding(),
            zIndex: 10, 
            color: '#fff', 
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            width: getButtonSize(),
            height: getButtonSize(),
            minWidth: 'auto',
            '&.swiper-button-disabled': {
              opacity: 0.2,
              pointerEvents: 'none'
            }
          }}
          aria-label="Previous image"
        >
          <ArrowBackIos fontSize={getArrowSize()} />
        </IconButton>

        <IconButton 
          ref={nextRef} 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            right: getButtonPadding(),
            zIndex: 10, 
            color: '#fff', 
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            width: getButtonSize(),
            height: getButtonSize(),
            minWidth: 'auto',
            '&.swiper-button-disabled': {
              opacity: 0.2,
              pointerEvents: 'none'
            }
          }}
          aria-label="Next image"
        >
          <ArrowForwardIos fontSize={getArrowSize()} />
        </IconButton>
      </Swiper>
    </Box>
  );
};

export default BannerSlider;