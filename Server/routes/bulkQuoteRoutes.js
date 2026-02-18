import express from "express";
import userAuth from "../middleware/userAuth.js";
import { createBulkQuote } from "../controller/bulkQuoteController.js";

const router = express.Router();

router.post("/submit-bulk-quote", userAuth, createBulkQuote);

export default router;