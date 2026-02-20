import express from "express";
import userAuth from "../middleware/userAuth.js";
import { createBulkQuote, getSellerBulkQuotes, updateBulkQuoteStatus} from "../controller/bulkQuoteController.js";
import authseller from "../middleware/authseller.js";

const router = express.Router();

router.post("/submit-bulk-quote", userAuth, createBulkQuote);
router.get(
  "/seller-bulk-quotes",
  authseller,
  getSellerBulkQuotes
);
router.put(
  "/seller-bulk-quotes/:quoteId/status",
  authseller,
  updateBulkQuoteStatus
);

export default router;