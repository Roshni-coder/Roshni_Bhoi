import mongoose from "mongoose";

const bulkQuoteSchema = new mongoose.Schema({
    quoteId: {
  type: String,
  unique: true
},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    deliveryAddress: {
        name: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },

    deliveryDate: { type: Date, required: true },
    additionalNotes: { type: String },

    // Capture items from the cart at the moment of request
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: String,
        image: String,
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number
    }],

    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Reviewed", "Contacted", "Completed"], 
        default: "Pending" 
    }
}, { timestamps: true });

const BulkQuote = mongoose.models.BulkQuote || mongoose.model("BulkQuote", bulkQuoteSchema);
export default BulkQuote;