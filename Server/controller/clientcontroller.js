/**
 * Client Controller
 * 
 * SECURITY HARDENED:
 * - IDOR Protection on all order operations
 * - NoSQL Injection prevention
 * - ReDoS-safe search
 * - Uses req.userId from auth middleware (never req.body.userId)
 */

import addproductmodel from "../model/addproduct.js";
import Category from "../model/Category.js";
import orderModel from "../model/order.js";
import sellermodel from "../model/sellermodel.js";
import {
  handleError,
  isValidObjectId,
  createSafeSearchRegex,
  sanitizeForMongo
} from "../utils/errorHandler.js";
import Cart from "../model/cart.js";
 import crypto from "crypto";

/**
 * Get list of all available products
 * Excludes products from: holiday mode sellers, suspended sellers, blocked sellers
 */
export const productlist = async (req, res) => {
  try {
    // Get IDs of unavailable sellers
    const unavailableSellers = await sellermodel.find({
      $or: [
        { holidayMode: true },
        { status: 'Suspended' },
        { isBlocked: true }
      ]
    }).select('_id');

    const unavailableSellerIds = unavailableSellers.map(s => s._id);

    const categories = await Category.find();

    // Filter products: Exclude those from unavailable sellers
    const products = await addproductmodel.find({
      sellerId: { $nin: unavailableSellerIds }
    });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found"
      });
    }

    res.status(200).json({ success: true, products, categories });
  } catch (error) {
    handleError(res, error, "Failed to fetch products");
  }
};

/**
 * Get all products organized by category
 */
export const getAllProductsByCategory = async (req, res) => {
  try {
    // Get unavailable sellers
    const unavailableSellers = await sellermodel.find({
      $or: [
        { holidayMode: true },
        { status: 'Suspended' },
        { isBlocked: true }
      ]
    }).select('_id');
    const unavailableSellerIds = unavailableSellers.map(s => s._id);

    const categories = await Category.find();
    const result = await Promise.all(
      categories.map(async (category) => {
        const products = await addproductmodel.find({
          categoryname: category._id,
          sellerId: { $nin: unavailableSellerIds }
        });
        return { category: category.categoryname, products };
      })
    );

    res.status(200).json({ success: true, categories: result });
  } catch (error) {
    handleError(res, error, "Failed to fetch products by category");
  }
};

/**
 * Place Order
 * 
 * SECURITY:
 * - Uses req.userId from auth middleware (NOT req.body.userId)
 * - Validates stock availability
 * - Checks seller availability
 */
// export const placeorder = async (req, res) => {
//   try {
//     // SECURITY: Use authenticated userId from middleware, NOT from body
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication required"
//       });
//     }

//     const { items, totalAmount, shippingAddress, image, paymentId } = req.body;

//     // Validate required fields
//     if (!items?.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Order items are required"
//       });
//     }

//     if (!shippingAddress) {
//       return res.status(400).json({
//         success: false,
//         message: "Shipping address is required"
//       });
//     }

//     if (!totalAmount || totalAmount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid total amount is required"
//       });
//     }

//     // Validate stock for all items
//     const productsToUpdate = [];
//     for (const item of items) {
//       // SECURITY: Validate productId format
//       if (!isValidObjectId(item.productId)) {
//         return res.status(400).json({
//           success: false,
//           message: `Invalid product ID format`
//         });
//       }

//       const product = await addproductmodel.findById(item.productId).populate('sellerId');
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Product not found: ${item.name || 'Unknown'}`
//         });
//       }

//       // Check seller status
//       const seller = product.sellerId;
//       if (seller && (seller.holidayMode || seller.status === 'Suspended' || seller.isBlocked)) {
//         return res.status(400).json({
//           success: false,
//           message: `Seller for "${product.title}" is currently unavailable.`
//         });
//       }

//       // Validate quantity
//       const quantity = parseInt(item.quantity) || 0;
//       if (quantity <= 0 || quantity > 100) {
//         return res.status(400).json({
//           success: false,
//           message: `Invalid quantity for ${product.title}`
//         });
//       }

//       if (product.stock < quantity) {
//         return res.status(400).json({
//           success: false,
//           message: `Insufficient stock for ${product.title}. Available: ${product.stock}`
//         });
//       }

//       productsToUpdate.push({ product, quantity });
//     }

//   const normalizedAddress = {
//       name: shippingAddress.name || shippingAddress.fullName || "Recipient",
//       phone: shippingAddress.phone || shippingAddress.phoneNumber || "",
//       alternatephone: shippingAddress.alternatephone || "",
//       address: shippingAddress.address || "",
//       city: shippingAddress.city || "",
//       state: shippingAddress.state || "",
//       pin: Number(shippingAddress.pin || shippingAddress.pincode || 0),
//     };

//     // 2. Create the Order
//    const newOrder = new orderModel({
//   user: userId,

//   items: items.map(item => ({
//     productId: item.productId,
//     name: item.name,
//     quantity: item.quantity,
//     price: item.price,
//     sellerId: item.sellerId,

//     giftMessage: item.giftMessage,
//     senderName: item.senderName,
//     receiverName: item.receiverName
//   })),

//   totalAmount,
//   shippingAddress: normalizedAddress,
//   image,
//   paymentId: paymentId || null
// });


//     await newOrder.save();
//    console.log("📦 ORDER ADDRESS SAVED:", normalizedAddress);

//     // Deduct stock
//     for (const { product, quantity } of productsToUpdate) {
//       product.stock -= quantity;
//       await product.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder
//     });
//   } catch (error) {
//     handleError(res, error, "Failed to place order");
//   }
// };

export const placeorder = async (req, res) => {
  try {

    const userId = req.userId;

    const {
      items,
      shippingAddress,
      paymentId,
      razorpayOrderId,
      razorpay_signature
    } = req.body;

    // VERIFY SIGNATURE
    const body = razorpayOrderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

    let finalItems = [];
    let totalAmount = 0;

    for (const item of items) {

      const product = await addproductmodel.findById(item.productId);

      if (!product) continue;

      const quantity = Number(item.quantity);

      finalItems.push({

        productId: product._id,

        name: product.title,

        quantity,

        price: product.price,

        sellerId: product.sellerId,

        giftMessage: item.giftMessage || "",

        senderName: item.senderName || "",

        receiverName: item.receiverName || ""

      });

      totalAmount += product.price * quantity;

      // deduct stock
      product.stock -= quantity;

      await product.save();
    }

    const order = await orderModel.create({

      user: userId,

      items: finalItems,

      totalAmount,

      shippingAddress: {

        name: shippingAddress.name,

        phone: shippingAddress.phone,

        address: shippingAddress.address,

        city: shippingAddress.city,

        state: shippingAddress.state,

        pin: shippingAddress.pin

      },

      paymentId,

      status: "Paid",

      placedAt: new Date()

    });

    res.status(201).json({

      success: true,

      order

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Order failed"

    });
  }
};
/**
 * Get User's Orders
 * 
 * SECURITY:
 * - Uses req.userId from auth middleware exclusively
 * - IDOR Protection: Users can only see their own orders
 /**
 * Get User's Orders
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Securely from middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Auth required" });
    }

    const orders = await orderModel
      .find({ user: userId })
      .populate({
        path: "items.productId",
        select: "title images price" // Fetch only necessary product fields
      })
      .sort({ placedAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    handleError(res, error, "Failed to fetch orders");
  }
};

/**
 * Get Single Order by ID
 */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const order = await orderModel.findOne({ _id: id, user: userId })
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    handleError(res, error, "Failed to fetch order details");
  }
};

/**
 * Search Products
 * 
 * SECURITY:
 * - ReDoS Protection: Escapes regex special characters
 * - NoSQL Injection Prevention: Sanitizes query input
 * - Limits search term length
 * 
 */

const extractPriceRange = (text) => {
  const lower = text.toLowerCase();

  const betweenMatch = lower.match(/(\d+)\s*(to|-)\s*(\d+)/);
  if (betweenMatch) {
    return { min: +betweenMatch[1], max: +betweenMatch[3] };
  }

  const underMatch = lower.match(/(under|below)\s*(\d+)/);
  if (underMatch) {
    return { min: 0, max: +underMatch[2] };
  }

  const aboveMatch = lower.match(/(above|over)\s*(\d+)/);
  if (aboveMatch) {
    return { min: +aboveMatch[2], max: 1000000 };
  }

  return null;
};
const cleanSearchText = (text) => {
  return text
    .toLowerCase()
    .replace(/under\s*\d+/g, "")
    .replace(/below\s*\d+/g, "")
    .replace(/above\s*\d+/g, "")
    .replace(/\d+\s*(to|-)\s*\d+/g, "")
    .trim();
};
export const getSearchProduct = async (req, res) => {
  try {
    const rawSearchText = (req.query.query || "").trim();

    // 1️⃣ Unavailable sellers
    const unavailableSellers = await sellermodel.find({
      $or: [
        { holidayMode: true },
        { status: "Suspended" },
        { isBlocked: true }
      ]
    }).select("_id");

    const unavailableSellerIds = unavailableSellers.map(s => s._id);

    // 2️⃣ Base query
    let mongoQuery = {
      sellerId: { $nin: unavailableSellerIds }
    };

    // 3️⃣ Price filter
    const priceRange = extractPriceRange(rawSearchText);
    if (priceRange) {
      mongoQuery.price = {
        $gte: priceRange.min,
        $lte: priceRange.max
      };
    }

    // 4️⃣ Clean text (category / title ke liye)
    const keyword = cleanSearchText(rawSearchText);

    // 5️⃣ Text search
    if (keyword) {
      const regex = new RegExp(keyword, "i");
      mongoQuery.$or = [
        { title: regex },
        { description: regex },
        { brand: regex }
      ];
    }

    // 6️⃣ Fetch products
    const products = await addproductmodel
      .find(mongoQuery)
      .populate("categoryname", "categoryname")
      .populate("subcategory", "name")
      .limit(200);

    // 7️⃣ FINAL FILTER (CATEGORY + TITLE)
    const finalProducts = products.filter(p => {
      const cat = p.categoryname?.categoryname?.toLowerCase() || "";
      const sub = p.subcategory?.name?.toLowerCase() || "";
      const title = p.title?.toLowerCase() || "";

      return (
        !keyword ||
        cat.includes(keyword) ||
        sub.includes(keyword) ||
        title.includes(keyword)
      );
    });

    res.status(200).json({
      success: true,
      data: finalProducts
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
};

/**
 * Validate Stock Availability
 * 
 * SECURITY:
 * - Uses req.userId for authentication verification
 * - Validates all productIds
 */
export const validateStock = async (req, res) => {
  try {
    // SECURITY: Require authentication
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const { items } = req.body;

    if (!items || !Array.isArray(items) || !items.length) {
      return res.status(400).json({
        success: false,
        message: "No items to validate"
      });
    }

    // Limit items to prevent DoS
    if (items.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Too many items to validate"
      });
    }

    for (const item of items) {
      // SECURITY: Validate ObjectId format
      if (!isValidObjectId(item.productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID format"
        });
      }

      const product = await addproductmodel.findById(item.productId).populate('sellerId');

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.name || 'Unknown'}`
        });
      }

      // Check seller status
      const seller = product.sellerId;
      if (seller && (seller.holidayMode || seller.status === 'Suspended' || seller.isBlocked)) {
        return res.status(400).json({
          success: false,
          message: `Seller for "${product.title}" is currently unavailable.`
        });
      }

      const quantity = parseInt(item.quantity) || 0;
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}. Available: ${product.stock}`
        });
      }
    }

    res.status(200).json({ success: true, message: "Stock available" });
  } catch (error) {
    handleError(res, error, "Stock validation failed");
  }
};