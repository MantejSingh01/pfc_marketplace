import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL_KYC = "http://localhost:2001/info/kyc";

export const kycApi = createApi({
  reducerPath: "kycApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_KYC }),
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getAllKYC: builder.query({
      query: () => "/getKycInfo",
    }),
    editKYC: builder.mutation({
      query: ({ id, ...kycData }) => ({
        url: `/editKyc/${id}`,
        method: "PUT",
        body: kycData,
      }),
    }),
    deleteKYC: builder.mutation({
      query: (id) => ({
        url: `/deleteKyc/${id}`,
        method: "DELETE",
      }),
    }),
    onBoardKYC: builder.mutation({
      query: (body) => ({
        url: `/onboardKYC`,
        method: "POST",
        body: {
          gstDetails: body.gstDetails,
          panNumber: body.panNumber,
          bankDetails: {
            accountHolderName: body["bankDetails.accountHolderName"],
            bankName: body["bankDetails.bankName"],
            accountNumber: body["bankDetails.accountNumber"],
            ifscCode: body["bankDetails.ifscCode"],
            cancelCheque: body["bankDetails.cancelCheque"],
          },
          acceptanceTerms: body.acceptanceTerms,
          complyWithPolicies: body.complyWithPolicies,
          aadharNumber: body.aadharNumber,
          emergencyContact: body.emergencyContact,
          userId: body.userId,
        },
      }),
    }),
  }),
});

export const kycSlice = createSlice({
  name: "kyc",
  initialState: [],
  reducers: {
    setKYC: (state, action) => {
      state.push(action.payload);
    },
    clearKYC: (state) => {
      state.length = 0;
    },
    updateKyc(state, action) {
      state.unshift(action.payload);
    },
  },
});

export const {
  useGetAllKYCQuery,
  useEditKYCMutation,
  useDeleteKYCMutation,
  useOnBoardKYCMutation,
} = kycApi;
export const { setKYC, clearKYC, updateKyc } = kycSlice.actions;

export default kycSlice.reducer;
