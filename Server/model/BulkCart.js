// model/BulkCart.js

import mongoose from "mongoose";

const bulkCartItemSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },

    productName: String,

    image: String,

    quantity: {
        type: Number,
        default: 50
    },

    unitPrice: Number,

    totalPrice: Number

});

const bulkCartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    items: [bulkCartItemSchema]

}, { timestamps: true });

const BulkCart =
  mongoose.models.BulkCart ||
  mongoose.model("BulkCart", bulkCartSchema);

export default BulkCart;
