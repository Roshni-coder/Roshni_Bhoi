import mongoose from "mongoose";

const bulkQuoteRequestSchema = new mongoose.Schema(
{
    quoteId: {
        type: String,
        required: true,
        unique: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    occasion: String,

    company: {
        companyName: String,
        gstNumber: String,
        industry: String
    },

    contact: {
        contactName: String,
        email: String,
        phone: String,
        designation: String
    },

    order: {
        quantity: Number,
        deliveryDate: Date,
        deliveryCity: String
    },

    customization: {
        logoRequired: Boolean,
        customMessage: Boolean,
        messageText: String,
        premiumPackaging: Boolean,
        giftTags: Boolean,
        logoFileUrl: String
    },

    pricing: {
        basePrice: Number,
        unitPrice: Number,
        subtotal: Number,
        extras: Number,
        total: Number,
        savings: Number
    },

    status: {
        type: String,
        default: "pending"
    }

},
{ timestamps: true }
);

export default mongoose.model(
    "BulkQuoteRequest",
    bulkQuoteRequestSchema
);
