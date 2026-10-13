import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import GiftBoxes from './pages/GiftBoxes.jsx';
import Collections from './pages/Collections.jsx';
import OurStory from './pages/OurStory.jsx';
import Boutique from './pages/Boutique.jsx';
import Contact from './pages/Contact.jsx';
import GiftStudio from './pages/GiftStudio.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import { Privacy, ShippingAndReturns, Terms } from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="chocolates" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="gift-boxes" element={<GiftBoxes />} />
          <Route path="collections" element={<Collections />} />
          <Route path="our-story" element={<OurStory />} />
          <Route path="boutique" element={<Boutique />} />
          <Route path="contact" element={<Contact />} />
          <Route path="personalise" element={<GiftStudio />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="shipping-and-returns" element={<ShippingAndReturns />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
