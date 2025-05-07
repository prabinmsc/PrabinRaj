import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { LocalOffer as OfferIcon, Star, Stars } from '@mui/icons-material';
import { darken } from '@mui/system';



// Animation for the discount badge
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const OfferCard = styled(Card)(({ theme }) => ({
  width: '300px',
  height: '560px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: `0 10px 20px rgba(0,0,0,0.1)`,
  transition: 'all 0.3s ease',
  background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 15px 30px rgba(0,0,0,0.2)`,
  },
}));

const BookMedia = styled(CardMedia)({
  height: '220px',
  objectFit: 'contain',
  padding: '20px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)',
  }
});

const BookContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px'
});


const ExclusiveRibbon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '15px',
  left: '-30px',
  width: '120px',
  padding: '4px 0',
  backgroundColor: theme.palette.error.main,
  color: 'white',
  textAlign: 'center',
  transform: 'rotate(-45deg)',
  boxShadow: `0 2px 4px rgba(0,0,0,0.2)`,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    borderTop: `4px solid ${darken(theme.palette.error.main, 0.1)}`,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
  },
  '&::before': {
    left: 0,
  },
  '&::after': {
    right: 0,
  }
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  backgroundColor: theme.palette.error.main,
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '4px 8px',
  borderRadius: '12px',
  animation: `${pulse} 2s infinite`,
  boxShadow: `0 4px 8px rgba(0,0,0,0.2)`,
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

const OfferShop = () => {
  const [books, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/book');
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleAddToCart = async (book) => {
    try {
      await axios.post('http://localhost:5000/cart', book);
      alert(`${book.title} has been added to your cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Something went wrong while adding to cart.');
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return '₹0'; // safeguard for undefined/null
  
    const numericPrice = parseInt(price.toString().replace(/[^0-9]/g, ''));
    const numericDiscount = parseInt(discount.toString().replace('%', ''));
  
    if (isNaN(numericPrice) || isNaN(numericDiscount)) return '₹0';
  
    const discountedPrice = numericPrice * (1 - numericDiscount / 100);
    return `₹${Math.round(discountedPrice)}`;
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">Error loading books: {error}</Typography>
      </Box>
    );
  }

  return (

  <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Premium Header Section */}
      <Box sx={{ 
        textAlign: 'center',
        mb: 8,
        p: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        boxShadow: 3,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }
      }}>
        <Stars sx={{ 
          fontSize: '3rem', 
          color: 'gold', 
          mb: 2,
          filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.7))'
        }} />
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 1
        }}>
          EXCLUSIVE OFFERS
        </Typography>
        <Typography variant="h5" sx={{ 
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          position: 'relative',
          zIndex: 1
        }}>
          Limited-time discounts on our premium collection
        </Typography>
      </Box>

      {/* Offers Grid */}
      <Grid container spacing={5} justifyContent="center" sx={{ mt: 2 }}>
      {books.map((book) => {
        // Parse the discount value (remove % sign and convert to number)
        const discountValue = parseInt(book.discount) || 0;
        
        // Only render the card if discount is greater than 0%
        if (discountValue <= 0) return null;

        return (
          <Grid item key={book.id}>
            <OfferCard>
              {/* Exclusive Ribbon */}
              <ExclusiveRibbon>
                EXCLUSIVE
              </ExclusiveRibbon>
              
              {/* Discount Badge */}
              <DiscountBadge 
                label={`${book.discount} OFF`} 
                icon={<OfferIcon sx={{ fontSize: '1rem', ml: 0.5 }} />}
              />
              
              {/* Book Cover */}
              <BookMedia
                component="img"
                image={book.image}
                alt={book.title}
              />

              {/* Book Details - Only show if discount > 0% */}
              <BookContent>
                <Typography variant="h5" component="h2" noWrap sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)',
                    borderRadius: '3px'
                  }
                }}>
                  {book.title}
                </Typography>

                <Divider sx={{ 
                  my: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                  height: '1px'
                }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" noWrap >
                    by {book.author}
                  </Typography>
                  <Star sx={{ fontSize: '1rem', color: 'gold' }} />
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 1
                }}>
                  <Chip 
                    label={book.genre} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      fontWeight: 'bold',
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {book.year}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  noWrap
                  sx={{ 
                    mt: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flexGrow: 1,
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6
                  }}
                >
                  {book.description}
                </Typography>
                
                {/* Price Section */}
                <Box sx={{ 
                  mt: 1,
                  p: 2,
                  background: 'rgba(255, 152, 0, 0.05)',
                  borderRadius: '8px',
                  border: '1px dashed rgba(255, 152, 0, 0.3)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ textDecoration: 'line-through' }}
                    >
                      {book.price_in_inr}
                    </Typography>
                    <Typography variant="h5" color="error" fontWeight="bold">
                      {calculateDiscountedPrice(book.price_in_inr, book.discount)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
                    You save {book.discount} (Limited Time Offer!)
                  </Typography>
                </Box>
              </BookContent>

              {/* Add to Cart Button */}
              <CardActions sx={{ justifyContent: 'center', px: 3 }}>
                <Button 
                  fullWidth
                  variant="contained" 
                  onClick={() => handleAddToCart(book)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 10px rgba(0,0,0,0.2)`,
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  ADD TO CART
                </Button>
              </CardActions>
            </OfferCard>
          </Grid>
        );
      })}
    </Grid>


      {/* Premium Footer */}
      <Box sx={{ 
        textAlign: 'center',
        mt: 8,
        p: 4,
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: '20px',
        boxShadow: 3,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Don't Miss Out!
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: '600px', margin: '0 auto' }}>
          These exclusive books are available for a limited time only. Grab your favorites before they're gone!
        </Typography>
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)'
        }} />
        <Box sx={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          transform: 'translate(-30%, 30%)'
        }} />
      </Box>
    </Container>
  );
};

export default OfferShop;