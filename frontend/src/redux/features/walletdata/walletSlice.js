import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { useNavigate } from "react-router";

const initialState = {
  wallet: null, // Use `null` for a single wallet address
  status: 'idle', // For tracking loading state
  error: null, // For tracking errors
};

export const getWalletAdress = createAsyncThunk('wallet/getWalletAdress', async() => {

  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    console.log("ryewyrwr")
    return _walletAddress;
  } else {
    throw new Error('No Ethereum provider found');
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletAdress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWalletAdress.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getWalletAdress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default walletSlice.reducer;


