import api from "./api.js";

export const getSellerBulkQuotes = async (startDate, endDate) => {
  try {

    let url = "/api/seller-bulk-quotes";

    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const res = await api.get(url);

    return res.data;

  } catch (err) {

    console.error(err);

    return {
      success: false,
      filteredQuotes: []
    };
  }
};


export const updateQuoteStatus = async (quoteId, status) => {
  try {
    const res = await api.put(
      `/api/seller-bulk-quotes/${quoteId}/status`,
      { status }
    );
    return res.data;
  } catch (err) {
    console.error("Update Status Error:", err);
    return { success: false };
  }
};
