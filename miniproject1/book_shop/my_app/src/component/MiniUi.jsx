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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const BookCard = styled(Card)(({ theme }) => ({
  width: '280px',
  height: '520px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  margin: '0 auto',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
  '&:hover .default-img': {
    opacity: 0,
  },
  '&:hover .hover-img': {
    opacity: 1,
  },
}));

const BookMedia = styled(CardMedia)({
  height: '240px',
  objectFit: 'contain',
  padding: '12px',
  backgroundColor: '#f8f8f8',
  position: 'relative'
});

const BookContent = styled(CardContent)({
  flexGrow: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: '12px'
});

const BookShop = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterType, setFilterType] = useState('genre');
  const [filterValue, setFilterValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/book');
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
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

  useEffect(() => {
    let results = books;
    
    // Apply search filter if search query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter if not 'all'
    if (filterValue !== 'all') {
      results = results.filter(book => 
        filterType === 'genre' 
          ? book.genre === filterValue 
          : book.author === filterValue
      );
    }
    
    setFilteredBooks(results);
  }, [searchQuery, filterType, filterValue, books]);

  const genres = ['all', ...new Set(books.map(book => book.genre))];
  const authors = ['all', ...new Set(books.map(book => book.author))];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0;
    const numericDiscount = parseInt(discount) || 0;
    const discountedPrice = Math.round(numericPrice * (1 - numericDiscount / 100));
    return `₹${discountedPrice}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
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
    <Container maxWidth="xl" sx={{ py: 4, background: 'linear-gradient(135deg,rgb(206, 201, 206) 0%,rgb(217, 215, 216) 100%)' }}>
      {/* Search and Filter Section */}
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mt: 7
      }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            flexGrow: 1,
            maxWidth: { sm: '400px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              backgroundColor: '#fff',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <IconButton onClick={clearSearch} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }}
        />

        {/* Filter Controls */}
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          width: { xs: '100%', sm: 'auto' }
        }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              value={filterType}
              label="Filter By"
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue('all');
              }}
            >
              <MenuItem value="genre">Genre</MenuItem>
              <MenuItem value="author">Author</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>
              {filterType === 'genre' ? 'Select Genre' : 'Select Author'}
            </InputLabel>
            <Select
              value={filterValue}
              label={filterType === 'genre' ? 'Select Genre' : 'Select Author'}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value="all">All {filterType === 'genre' ? 'Genres' : 'Authors'}</MenuItem>
              {(filterType === 'genre' ? genres : authors)
                .filter(item => item !== 'all')
                .map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Books Grid */}
      <Grid container spacing={3} justifyContent="center">
        {filteredBooks
          .filter(book => book.discount === "0%") // Only show books with 0% discount
          .map((book) => (
            <Grid item key={book.id}>
              <BookCard
              sx={{ borderRadius: "25px" }}>
                <Box sx={{ position: "relative", height: "240px", overflow: "hidden" }}>
    {/* default image */}
    <BookMedia
      component="img"
      image={book.image}
      alt={book.title}
      className="default-img"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transition: "opacity 0.3s ease",
        opacity: 1,
        zIndex: 1,
      }}
    />
    {/* hover image */}
    <BookMedia
      component="img"
      image={book.hoverImage}
      alt={`${book.title} hover`}
      className="hover-img"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transition: "opacity 0.3s ease",
        opacity: 0,
        zIndex: 2,
      }}
    />
  </Box>

                <BookContent>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" noWrap>
                    {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {book.genre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {book.year}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {book.description}
                  </Typography>
                </BookContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Typography variant="subtitle1" color="primary" fontWeight="bold">
                    {book.price_in_inr}
                  </Typography>
                  <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => handleAddToCart(book)}
                    sx={{
                      bgcolor: "rgb(164, 7, 196)", 
                      color: "#fff", 
                      "&:hover": { 
                        bgcolor: "rgb(220, 132, 23)"
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </BookCard>
            </Grid>
          ))}
      </Grid>

      {filteredBooks.filter(book => book.discount === "0%").length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6">
            No books found matching your criteria
          </Typography>
          {searchQuery && (
            <Button 
              variant="outlined" 
              onClick={clearSearch}
              sx={{ mt: 2 ,
                 background: 'linear-gradient(135deg,rgb(rgb(217, 215, 216))'
              }}
            >
              Clear search
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default BookShop;