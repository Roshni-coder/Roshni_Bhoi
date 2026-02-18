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

    // get bulk cart
    const bulkCart = await BulkCart.findOne({ userId });

    if (!bulkCart || bulkCart.items.length === 0)
      return res.status(400).json({
        success: false,
        message: "Bulk cart empty"
      });

    // calculate total
    const totalAmount =
      bulkCart.items.reduce(
        (sum, item) => sum + item.totalPrice, 0
      );

    // generate unique quoteId
    const quoteId =
      "QUOTE-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    // create quote
    const newQuote = new BulkQuote({

      quoteId,

      userId,

      companyName,
      contactPerson,
      email,
      phone,

      deliveryAddress,
      deliveryDate,
      additionalNotes,

      items: bulkCart.items,

      totalAmount

    });

    await newQuote.save();

    // clear cart
    await BulkCart.findOneAndDelete({ userId });

    res.json({

      success: true,
      message: "Bulk quote submitted successfully",
      quoteId: newQuote.quoteId

    });

  }
  catch (err) {

    handleError(res, err, "Submit bulk quote failed");

  }

};
