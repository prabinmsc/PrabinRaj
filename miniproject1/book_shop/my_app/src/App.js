import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MiniUi from "./component/MiniUi";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Payment from "./component/Payment";
import OfferShop from "./component/OfferShop";




function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<MiniUi />} />
        <Route path="/offer" element={<OfferShop />} />
        <Route path="/mycart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
