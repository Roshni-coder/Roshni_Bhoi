// routes/bulkCartRoutes.js

import express from "express";
import userAuth from "../middleware/userAuth.js";

import {

    addToBulkCart,
    clearBulkCart,
    getBulkCart,
    removeBulkCart,
    updateBulkCartQuantity

} from "../controller/bulkCartController.js";

const router = express.Router();

router.post("/bulk-cart", userAuth, addToBulkCart);

router.get("/bulk-cart", userAuth, getBulkCart);

router.delete("/bulk-cart/:productId", userAuth, removeBulkCart);

router.put("/bulk-cart", userAuth, updateBulkCartQuantity);
router.delete("/bulk-cart", userAuth, clearBulkCart);
export default router;
