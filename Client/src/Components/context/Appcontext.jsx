import api from '../../utils/api';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();

// CRITICAL: Enable cookies for all requests via api instance
// axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // Auth state - no localStorage token, server cookie is the source of truth
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
 // AppContext.jsx

const [bulkCart, setBulkCart] = useState([]);


// FETCH BULK CART
const fetchBulkCart = useCallback(async () => {

  if (!isLoggedin) {
    setBulkCart([]);
    return;
  }

  try {

    const res = await api.get("/api/bulk-cart");

    if (res.data.success) {

      setBulkCart(res.data.bulkCart);

    } else {

      setBulkCart([]);

    }

  } catch (err) {

    console.error(err);

  }

}, [isLoggedin]);



// ADD BULK CART
const addToBulkCart = async (
  product,
  quantity,
  giftMessage = "",
  senderName = "",
  receiverName = ""
) => {

  if (!isLoggedin) {

    toast.warning("Please login first");

    navigate("/login");

    return;

  }

  try {

    const res = await api.post("/api/bulk-cart", {

      productId: product._id,

      quantity,

      giftMessage,

      senderName,

      receiverName

    });

    if (res.data.success) {

      setBulkCart(res.data.bulkCart);

      toast.success("Added to Bulk Cart");

    }

  }
  catch (err) {

    toast.error(err.response?.data?.message || "Failed");

  }

};



// REMOVE BULK CART ITEM
const removeBulkCart = async (productId) => {

  try {

    const res =
      await api.delete(`/api/bulk-cart/${productId}`);

    if (res.data.success)
      setBulkCart(res.data.bulkCart);

  } catch (err) {

    console.error(err);

  }

};



// UPDATE BULK CART QTY
const updateBulkCartQuantity =
async (productId, quantity) => {

  try {

    const res =
      await api.put("/api/bulk-cart", {

        productId,
        quantity

      });

    if (res.data.success)
      setBulkCart(res.data.bulkCart);

  } catch (err) {

    console.error(err);

  }

};



// CLEAR BULK CART AFTER QUOTE
const clearBulkCart = async () => {

  try {

    await api.delete("/api/bulk-cart");

    setBulkCart([]);

  } catch (err) {

    console.error(err);

  }

};

  // Fetch detailed profile info
  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/api/user/profile');
      if (data.success && data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [backendurl]);

  // Fetch basic user data
  const getuserData = useCallback(async () => {
    try {
      const { data } = await api.get('/api/user/data');
      if (data.success) {
        setUserdata(data.userData);
        fetchProfile();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [backendurl, fetchProfile]);

  // Fetch Cart
  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/cart');
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }, [backendurl]);

  // Fetch Wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/wishlist');
      setWishlistItems(res.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  }, [backendurl]);

  // Clear cart after order
  const clearCartAfterOrder = useCallback(async () => {
    setCartItems([]);
    try {
      await api.delete('/api/auth/clear-cart');
      await fetchCart();
    } catch (err) {
      console.error("Error clearing backend cart:", err);
    }
  }, [backendurl, fetchCart]);

  // ========== AUTH FUNCTIONS ==========

  /**
   * Check if user is logged in by calling /api/auth/me
   * This replaces localStorage.getItem('token') check
   * The server will verify the HttpOnly cookie
   */
  const checkAuthStatus = useCallback(async () => {
    try {
      const { data } = await api.get('/api/auth/me');

      if (data.success && data.user) {
        setIsLoggedin(true);
        setUserdata(data.user);

        // Fetch additional data
        fetchProfile();
        fetchCart();
        fetchWishlist();
        fetchBulkCart(); 
      } else {
        setIsLoggedin(false);
        setUserdata(null);
      }
    } catch (error) {
      // 401 means not logged in - this is expected for guests
      if (error.response?.status === 401) {
        setIsLoggedin(false);
        setUserdata(null);
      } else {
        console.error('Auth check failed:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [backendurl, fetchProfile, fetchCart, fetchWishlist,fetchBulkCart]);

  /**
   * Logout - calls server to clear the HttpOnly cookie
   */
  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout-session');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state regardless of server response
      setIsLoggedin(false);
      setUserdata(null);
      setProfile({ name: '', phone: '', email: '' });
      setCartItems([]);
      setWishlistItems([]);
      setBulkCart([]);

      // Clear any remaining localStorage items (cleanup)
      localStorage.removeItem("chatbotSessionId");

      navigate('/');
      toast.success('Logged out successfully');
    }
  }, [backendurl, navigate]);

  /**
   * Called after successful login/registration
   * Sets user data and fetches additional info
   */
  const onLoginSuccess = useCallback((user) => {
    setIsLoggedin(true);
    if (user) {
      setUserdata(user);
    }
    fetchProfile();
    fetchCart();
    fetchWishlist();
    fetchBulkCart();  
  }, [fetchProfile, fetchCart, fetchWishlist,fetchBulkCart]);

  // ========== INITIAL AUTH CHECK ==========
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // ========== CONTEXT VALUE ==========
  const value = {
     bulkCart,

  fetchBulkCart,

  addToBulkCart,

  removeBulkCart,

  updateBulkCartQuantity,

  clearBulkCart,
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserdata,
    profile,
    setProfile,
    fetchProfile,
    logout,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    fetchCart,
    fetchWishlist,
    clearCartAfterOrder,
    loading,           // NEW: Loading state for auth check
    checkAuthStatus,   // NEW: Manual auth refresh
    onLoginSuccess     // NEW: Called after successful login
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

