// controller/bulkCartController.js

import BulkCart from "../model/BulkCart.js";
import Product from "../model/addproduct.js";
import { handleError } from "../utils/errorHandler.js";

const MAX_BULK_ITEMS = 50;
const MAX_BULK_QTY = 10000;


/**
 * ADD TO BULK CART
 */
export const addToBulkCart = async (req, res) => {

    try {

        const userId = req.user?.id || req.userId;

        const {
            productId,
            quantity,
            giftMessage,
            senderName,
            receiverName
        } = req.body;

        if (!userId)
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });

        const qty = parseInt(quantity);

        if (!qty || qty < 1)
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });

        const product = await Product.findById(productId);

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        let bulkCart = await BulkCart.findOne({ userId });

        if (!bulkCart)
            bulkCart = new BulkCart({
                userId,
                items: []
            });

        const existingItem =
            bulkCart.items.find(
                item => item.productId.toString() === productId
            );

        const unitPrice = product.price;
        const totalPrice = unitPrice * qty;

        if (existingItem) {

            existingItem.quantity += qty;

            existingItem.totalPrice =
                existingItem.unitPrice * existingItem.quantity;

            // ✅ UPDATE FIELDS
            if (giftMessage !== undefined)
                existingItem.giftMessage = giftMessage;

            if (senderName !== undefined)
                existingItem.senderName = senderName;

            if (receiverName !== undefined)
                existingItem.receiverName = receiverName;

        }
        else {

            bulkCart.items.push({

                productId,
                sellerId: product.sellerId,

                productName: product.title,

                image: product.images?.[0]?.url || "",

                quantity: qty,

                unitPrice,

                totalPrice,

                // ✅ SAVE THESE
                giftMessage: giftMessage || "",

                senderName: senderName || "",

                receiverName: receiverName || ""

            });

        }

        await bulkCart.save();

        res.json({
            success: true,
            bulkCart: bulkCart.items
        });

    }
    catch (err) {

        handleError(res, err, "Add bulk cart failed");

    }

};


/**
 * GET BULK CART
 */
export const getBulkCart = async (req, res) => {

    try {

        const userId = req.user?.id || req.userId;

        if (!userId)
            return res.status(401).json({
                success: false
            });

        const bulkCart = await BulkCart.findOne({ userId });

        res.json({

            success: true,
            bulkCart: bulkCart?.items || []

        });

    }
    catch (err) {

        handleError(res, err, "Get bulk cart failed");

    }

};



/**
 * REMOVE BULK CART ITEM
 */
export const removeBulkCart = async (req, res) => {

    try {

        const userId = req.user?.id || req.userId;
        const { productId } = req.params;

        const bulkCart = await BulkCart.findOne({ userId });

        if (!bulkCart)
            return res.status(404).json({ success: false });


        bulkCart.items =
            bulkCart.items.filter(
                item => item.productId.toString() !== productId
            );

        await bulkCart.save();

        res.json({
            success: true,
            bulkCart: bulkCart.items
        });

    }
    catch (err) {

        handleError(res, err, "Remove bulk cart failed");

    }

};



/**
 * UPDATE QUANTITY
 */
export const updateBulkCartQuantity = async (req, res) => {

    try {

        const userId = req.user?.id || req.userId;
        const { productId, quantity } = req.body;

        const bulkCart = await BulkCart.findOne({ userId });

        if (!bulkCart)
            return res.status(404).json({
                success: false
            });

        const item =
            bulkCart.items.find(
                item => item.productId.toString() === productId
            );

        if (!item)
            return res.status(404).json({
                success: false
            });

        item.quantity = quantity;
        item.totalPrice = item.unitPrice * quantity;

        await bulkCart.save();

        res.json({
            success: true,
            bulkCart: bulkCart.items
        });

    }
    catch (err) {

        handleError(res, err, "Update bulk cart failed");

    }

};
export const clearBulkCart = async (req, res) => {

    try {

        const userId = req.user?.id || req.userId;

        await BulkCart.findOneAndDelete({ userId });

        res.json({
            success: true,
            message: "Bulk cart cleared"
        });

    } catch (err) {

        handleError(res, err, "Clear bulk cart failed");

    }

};
