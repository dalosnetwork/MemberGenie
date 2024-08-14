import axios from "axios";
const BASE_URL = "https://apimembergenie.dalosnetwork.com";


export const isPayed = async (walletAddress) => {
  try {
    const response = await axios.get(`${BASE_URL}/is_payed`, {
      params: { walletAddress },
    });
    if (response) {
      console.log(response)
      return response.data.data;
    } else {
      console.error('Failed to check payment status:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    return null;
  }
};

export const paymentDone = async (walletAddress) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment_done`,
  {
      walletAddress,
    }
  , {
    headers: {
      'Content-Type': 'application/json',
    }
  }
);


    if (response) {
      return response;
    } else {
      console.error('Failed to update payment status:', response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error: ', error.response.data.detail);
    } else {
      console.error('Error updating payment status:', error);
    }
    return null;
  }
};