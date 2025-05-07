import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Box, Button, Paper, Typography, Grid,
  Card, CardContent, CardMedia, CardActions,
  IconButton, Divider, Chip, Badge, Avatar,
  Tooltip, Snackbar, Alert, Collapse, useMediaQuery, useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as DiscountIcon,
  Redeem as GiftIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ArrowBack as BackIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon
} from "@mui/icons-material";
const DiscountBadge = styled(Chip)(({ theme }) => ({
  // styling here
}));

// Styled Components
const StyledItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "16px",
  boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 16px 32px rgba(0,0,0,0.12)"
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
  border: 0,
  borderRadius: "50px",
  color: "white",
  padding: "10px 28px",
  boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .2)",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  "&:hover": {
    background: "linear-gradient(45deg, #2196f3 0%, #3f51b5 100%)",
    boxShadow: "0 5px 8px 2px rgba(33, 150, 243, .3)"
  },
}));

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);
  const [expandedCoupon, setExpandedCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Calculate discount price for an item
  const calculateDiscountPrice = (item) => {
    const price = parseInt(item.price_in_inr.replace(/[^0-9]/g, '')) || 0;
    const discountPercent = parseInt(item.discount) || 0;
    const discountPrice = Math.round(price * (1 - discountPercent / 100));
    return `₹${discountPrice}`;
  };

  // Fetch cart data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      // Add calculated discount_price to each item
      const dataWithDiscountPrices = response.data.map(item => ({
        ...item,
        discount_price: calculateDiscountPrice(item)
      }));
      setData(dataWithDiscountPrices);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update quantity in backend
  const updateQuantityInBackend = async (id, newQuantity) => {
    try {
      await axios.patch(`http://localhost:5000/cart/${id}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          const updatedQuantity = (item.quantity || 1) + 1;
          updateQuantityInBackend(id, updatedQuantity);
          return { 
            ...item, 
            quantity: updatedQuantity,
            discount_price: calculateDiscountPrice(item) // Recalculate to ensure accuracy
          };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id && (item.quantity || 1) > 1) {
          const updatedQuantity = item.quantity - 1;
          updateQuantityInBackend(id, updatedQuantity);
          return { 
            ...item, 
            quantity: updatedQuantity,
            discount_price: calculateDiscountPrice(item) // Recalculate to ensure accuracy
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = async (id) => {
    try {
      setIsProcessing(true);
      const itemToRemove = data.find(item => item.id === id);
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setData(data.filter((item) => item.id !== id));
      setRemovedItem(itemToRemove);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const undoRemove = async () => {
    if (!removedItem) return;
    try {
      setIsProcessing(true);
      await axios.post("http://localhost:5000/cart", removedItem);
      setData([...data, removedItem]);
      setSnackbarOpen(false);
    } catch (error) {
      console.error("Error restoring item:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return data.reduce((total, item) => {
      // Use discount_price if available, otherwise use price_in_inr
      const priceStr = item.discount_price || item.price_in_inr;
      const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    return couponApplied ? Math.round(calculateSubtotal() * 0.1) : 0;
  };

  const calculateFinalTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "SAVE10") {
      setCouponApplied(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      width: "100%", 
      padding: isMobile ? 1 : 3, 
      pt: isMobile ? "80px" : "100px",
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    }}>
      <Box sx={{ 
        maxWidth: "1600px", 
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        padding: isMobile ? 2 : 4,
        overflow: "hidden",
        bgcolor: "rgb(243, 238, 241)"
      }}>
        {/* Header */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          mb: 4,
          pb: 2,
          borderBottom: "1px solid #eee",
          gap: isMobile ? 2 : 0
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={data.length} color="primary" sx={{ mr: 2 }}>
              <ShoppingCartIcon color="action" sx={{ fontSize: isMobile ? "2rem" : "2.5rem" }} />
            </Badge>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ 
              fontWeight: "bold", 
              background: "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Your Shopping Cart
            </Typography>
          </Box>
          <Button 
            variant="text" 
            color="primary" 
            startIcon={<BackIcon />}
            onClick={() => navigate("/product")}
            sx={{ 
              textTransform: "none",
              alignSelf: isMobile ? "flex-end" : "auto"
            }}
          >
            {isMobile ? "Back" : "Back to Shop"}
          </Button>
        </Box>

        {error ? (
          <Box sx={{ 
            textAlign: "center", 
            p: isMobile ? 2 : 4, 
            border: "1px dashed #ff6b6b",
            borderRadius: "12px",
            background: " #fff5f5"
          }}>
            <Typography variant={isMobile ? "body1" : "h6"} color="error" sx={{ mb: 1 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error}
            </Typography>
            <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={fetchData}>
              Retry
            </Button>
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ 
            textAlign: "center", 
            p: isMobile ? 3 : 6,
            background: "#f9f9f9",
            borderRadius: "16px",
            bgcolor: " rgb(228, 227, 227)",
            border: "2px dashed rgb(176, 174, 174)"
          }}>
            <ShoppingCartIcon sx={{ 
              fontSize: isMobile ? "3rem" : "5rem", 
              color: "text.disabled", 
              mb: 2,
              opacity: 0.6
            }} />
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
              mb: 1, 
              color: "text.secondary",
              fontWeight: "medium"
            }}>
              Your cart feels lonely
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"} sx={{ 
              color: "text.disabled", 
              mb: 3,
              maxWidth: "500px",
              margin: "0 auto"
            }}>
              Add some amazing products to get started with your shopping journey
            </Typography>
            <GradientButton onClick={() => navigate("/product")} sx={{ px: isMobile ? 4 : 6 }}>
              Explore Products
            </GradientButton>
          </Box>
        ) : (
          <>
           <Box sx={{ 
  display: 'flex', 
  flexDirection: { xs: 'column', md: 'row' },
  gap: 3
}}>
  {/* Cart Items - Left Side */}
  <Box sx={{ 
    flex: 1,
    minWidth: 0 // Prevent overflow
  }}>
    {data.map((cart) => (
      <StyledItem key={cart.id} sx={{ mb: 3 }}>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "center" : "flex-start"
                    }}>
                      <Box sx={{ 
                        width: isMobile ? "100%" : "200px",
                        height: isMobile ? "180px" : "auto",
                        borderRadius: "12px",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      }}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={cart.image}
                          alt={cart.title}
                          sx={{ 
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": {
                              transform: "scale(1.05)"
                            }
                          }}
                        />
                        {cart.isNew && (
                          <Chip 
                            label="NEW" 
                            color="primary" 
                            size="small" 
                            sx={{ 
                              position: "absolute", 
                              top: 10, 
                              left: 10,
                              zIndex: 1,
                              fontWeight: "bold"
                            }} 
                          />
                        )}
                        {cart.discount !== "0%" && (
                          <DiscountBadge 
                            label={`${cart.discount} OFF`} 
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              zIndex: 1
                            }}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ 
                        flex: 1, 
                        p: isMobile ? 0 : 2,
                        pt: isMobile ? 2 : 0,
                        textAlign: isMobile ? "center" : "left",
                        width: isMobile ? "100%" : "auto"
                      }}>
                        <Box sx={{ 
                          display: "flex", 
                          flexDirection: isMobile ? "column" : "row",
                          justifyContent: "space-between",
                          alignItems: isMobile ? "center" : "flex-start",
                          gap: isMobile ? 1 : 0
                        }}>
                          <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
                              fontWeight: "bold", 
                              mb: 0.5,
                              color: "text.primary"
                            }}>
                              {cart.title}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ 
                              color: "text.secondary", 
                              mb: 1.5,
                              fontStyle: "italic"
                            }}>
                              by {cart.author}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column",
                            alignItems: "flex-end"
                          }}>
                            {cart.discount !== "0%" && (
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ textDecoration: 'line-through' }}
                              >
                                {cart.price_in_inr}
                              </Typography>
                            )}
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
                              fontWeight: "bold",
                              color: cart.discount !== "0%" ? "error.main" : "primary.main",
                              whiteSpace: "nowrap"
                            }}>
                              {cart.discount_price || cart.price_in_inr}
                            </Typography>
                            {cart.discount !== "0%" && (
                              <Typography variant="caption" color="error.main" sx={{ fontWeight: "bold" }}>
                                You save {cart.discount}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        
                        {!isMobile && (
                          <Typography variant="body2" sx={{ 
                            color: "text.secondary",
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}>
                            {cart.description || "No description available"}
                          </Typography>
                        )}
                        
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          justifyContent: isMobile ? "space-around" : "space-between",
                          flexWrap: "wrap",
                          gap: isMobile ? 1 : 2,
                          mt: isMobile ? 2 : 0
                        }}>
                          {/* Quantity Controls */}
                          <Box sx={{ 
                            display: "flex", 
                            alignItems: "center",
                            border: "1px solid #ddd",
                            borderRadius: "50px",
                            padding: "4px 12px"
                          }}>
                            <Tooltip title="Decrease quantity">
                              <IconButton 
                                onClick={() => decreaseQuantity(cart.id)} 
                                size="small" 
                                color="primary"
                                disabled={isProcessing}
                                sx={{ 
                                  "&:hover": { 
                                    background: "rgba(63, 81, 181, 0.1)" 
                                  }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography sx={{ 
                              mx: 1.5, 
                              minWidth: "24px",
                              fontWeight: "bold",
                              color: "text.primary"
                            }}>
                              {cart.quantity || 1}
                            </Typography>
                            <Tooltip title="Increase quantity">
                              <IconButton 
                                onClick={() => increaseQuantity(cart.id)} 
                                size="small" 
                                color="primary"
                                disabled={isProcessing}
                                sx={{ 
                                  "&:hover": { 
                                    background: "rgba(63, 81, 181, 0.1)" 
                                  }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          
                          <Box sx={{ display: "flex", gap: 1 }}>
                            {!isMobile && (
                              <Tooltip title="Save for later">
                                <IconButton
                                  color="secondary"
                                  disabled={isProcessing}
                                  sx={{ 
                                    border: "1px solid",
                                    borderColor: "secondary.main",
                                    "&:hover": {
                                      background: "rgba(233, 30, 99, 0.1)"
                                    }
                                  }}
                                >
                                  <FavoriteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            
                            <Tooltip title="Remove item">
                              <IconButton
                                color="error"
                                onClick={() => removeFromCart(cart.id)}
                                disabled={isProcessing}
                                sx={{ 
                                  border: "1px solid",
                                  borderColor: "error.main",
                                  "&:hover": {
                                    background: "rgba(244, 67, 54, 0.1)"
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </StyledItem>
                ))}
              </Box>
              
    {/* Order Summary - Right Side (sticky) */}
    <Box sx={{ 
    width: { xs: '100%', md: '350px' },
    position: { md: 'sticky' },
    top: { md: '20px' },
    alignSelf: { md: 'flex-start' },
    height: { md: 'fit-content' }
  }}>
    <Paper sx={{ 
      p: 3, 
      borderRadius: "16px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
    }}>

                  <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
                    fontWeight: "bold", 
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    color: "text.primary"
                  }}>
                    <GiftIcon color="primary" sx={{ mr: 1.5, fontSize: isMobile ? "1.5rem" : "2rem" }} />
                    Order Summary
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      mb: 1.5
                    }}>
                      <Typography variant="body1" color="text.secondary">
                        Subtotal ({data.length} {data.length > 1 ? "items" : "item"})
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        ₹{calculateSubtotal()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      mb: 1.5
                    }}>
                      <Typography variant="body1" color="text.secondary">
                        Shipping
                      </Typography>
                      <Typography variant="body1" color="success.main" fontWeight="bold">
                        FREE
                      </Typography>
                    </Box>
                    
                    {/* Coupon Section */}
                    <Box sx={{ mb: 2 }}>
                      <Button 
                        variant="text" 
                        size="small" 
                        onClick={() => setExpandedCoupon(!expandedCoupon)}
                        sx={{ 
                          textTransform: "none",
                          color: "primary.main",
                          fontWeight: "medium",
                          p: 0
                        }}
                      >
                        {expandedCoupon ? "Hide" : "Have a coupon code?"}
                      </Button>
                      
                      <Collapse in={expandedCoupon}>
                        <Box sx={{ 
                          display: "flex", 
                          gap: 1,
                          mt: 1.5
                        }}>
                          <Box sx={{ flex: 1 }}>
                            <input
                              type="text"
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                transition: "border 0.3s",
                                "&:focus": {
                                  borderColor: "#3f51b5"
                                }
                              }}
                            />
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleApplyCoupon}
                            disabled={couponApplied}
                            sx={{
                              borderRadius: "8px",
                              textTransform: "none",
                              fontWeight: "medium"
                            }}
                          >
                            {couponApplied ? "Applied" : "Apply"}
                          </Button>
                        </Box>
                        {couponApplied && (
                          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                            <CheckIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                            Coupon applied successfully!
                          </Typography>
                        )}
                      </Collapse>
                    </Box>
                    
                    {couponApplied && (
                      <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        mb: 1.5
                      }}>
                        <Typography variant="body1" color="text.secondary">
                          <DiscountIcon color="success" sx={{ 
                            fontSize: "1rem", 
                            mr: 0.5,
                            verticalAlign: "middle"
                          }} />
                          Discount (10%)
                        </Typography>
                        <Typography variant="body1" color="success.main" fontWeight="bold">
                          -₹{calculateDiscount()}
                        </Typography>
                      </Box>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      mb: 1
                    }}>
                      <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="bold" color="text.primary">
                        Total Amount
                      </Typography>
                      <Typography variant={isMobile ? "subtitle1" : "h5"} color="primary" fontWeight="bold">
                        ₹{calculateFinalTotal()}
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary">
                      Inclusive of all taxes
                    </Typography>
                  </Box>
                  
                  <GradientButton
                    fullWidth
                    size={isMobile ? "medium" : "large"}
                    sx={{ mb: 2 }}
                    onClick={() => navigate("/payment")}
                  >
                    Proceed to Checkout
                  </GradientButton>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => navigate("/product")}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: "medium"
                    }}
                  >
                    Continue Shopping
                  </Button>
                  
                  {!isMobile && (
                    <Box sx={{ 
                      mt: 3, 
                      p: 2, 
                      background: "#f9f9f9",
                      borderRadius: "12px",
                      textAlign: "center"
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        <CheckIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                        Secure checkout
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5 }}>
                        Your payment information is processed securely
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </>
        )}
      </Box>
      
      {/* Snackbar for removed items */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: isMobile ? "center" : "right" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="info"
          onClose={handleCloseSnackbar}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={undoRemove}
              disabled={isProcessing}
            >
              UNDO
            </Button>
          }
          sx={{ 
            width: "100%",
            alignItems: "center"
          }}
        >
          Item removed from cart
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;