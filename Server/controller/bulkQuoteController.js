import BulkQuote from "../model/BulkQuote.js";
import BulkCart from "../model/BulkCart.js";
import { handleError } from "../utils/errorHandler.js";



export const createBulkQuote = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      companyName,
      contactPerson,
      email,
      phone,
      deliveryAddress,
      deliveryDate,
      additionalNotes
    } = req.body;

    const bulkCart = await BulkCart.findOne({ userId });

    if (!bulkCart || bulkCart.items.length === 0)
      return res.status(400).json({
        success: false,
        message: "Bulk cart empty"
      });

    // ✅ GROUP ITEMS BY SELLER
    const sellerMap = {};

    bulkCart.items.forEach(item => {

      const sellerId = item.sellerId.toString();

      if (!sellerMap[sellerId])
        sellerMap[sellerId] = [];

      sellerMap[sellerId].push(item);

    });

    const createdQuotes = [];

    // ✅ CREATE SEPARATE QUOTE PER SELLER
    for (const sellerId in sellerMap) {

      const sellerItems = sellerMap[sellerId];

      const totalAmount =
        sellerItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

      const quoteId =
        "QUOTE-" +
        Date.now() +
        "-" +
        Math.floor(1000 + Math.random() * 9000);

      const newQuote = new BulkQuote({

        quoteId,
        sellerId: sellerId,
        // ✅ IMPORTANT FIX
        userId,

        companyName,
        contactPerson,
        email,
        phone,

        deliveryAddress,
        deliveryDate,
        additionalNotes,

        items: sellerItems,
        totalAmount

      });

      await newQuote.save();

      createdQuotes.push(newQuote);

    }

    // clear cart
    await BulkCart.findOneAndDelete({ userId });

    res.json({
      success: true,
      message: "Bulk quote submitted successfully",
      quotes: createdQuotes
    });

  }
  catch (err) {

    handleError(res, err, "Submit bulk quote failed");

  }
};

// controller/bulkQuoteController.js

export const getSellerBulkQuotes = async (req, res) => {
  try {

    const sellerId = req.sellerId;

    const { startDate, endDate } = req.query;

    let filter = { sellerId };

    // ✅ DATE FILTER
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const quotes = await BulkQuote.find(filter)
      .populate("userId", "name email")
      .populate("items.productId", "title price images")
      .sort({ createdAt: -1 });

    const filteredQuotes = quotes.map((quote) => ({
      _id: quote._id,
      quoteId: quote.quoteId,
      user: quote.userId,
      companyName: quote.companyName,
      contactPerson: quote.contactPerson,
      email: quote.email,
      phone: quote.phone,
      items: quote.items,
      totalAmount: quote.totalAmount,
      deliveryAddress: quote.deliveryAddress,
      deliveryDate: quote.deliveryDate,
      additionalNotes: quote.additionalNotes,
      status: quote.status,
      createdAt: quote.createdAt
    }));

    res.json({
      success: true,
      filteredQuotes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateBulkQuoteStatus = async (req, res) => {
  try {
    const sellerId = req.sellerId;
    const { quoteId } = req.params;
    const { status } = req.body;

    // allowed statuses
    const allowedStatus = ["Approved", "Rejected", "Completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const quote = await BulkQuote.findOne({
      _id: quoteId,
      sellerId
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found"
      });
    }

    quote.status = status;
    await quote.save();

    res.json({
      success: true,
      message: `Quote ${status} successfully`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: error.message
    });
  }
};
