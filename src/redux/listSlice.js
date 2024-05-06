import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL_list = "http://localhost:2001/info/listing";

export const listApi = createApi({
  reducerPath: "listApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_list }),
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getAllList: builder.query({
      query: () => "/getAllListing",
    }),
    editList: builder.mutation({
      query: ({ id, ...listData }) => ({
        url: `/editListing/${id}`,
        method: "PUT",
        body: listData,
      }),
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/deleteListing/${id}`,
        method: "DELETE",
      }),
    }),
    addListing: builder.mutation({
      query: (body) => ({
        url: `/addListing`,
        method: "POST",
        body: {
          description: body.description,
          materialDescription: body.materialDescription,
          materialSpecifications: {
            weight: body["materialSpecifications.dimensions"],
            dimensions: body["materialSpecifications.dimensions"],
            color: body["materialSpecifications.color"],
          },
          availableQuantity: body.availableQuantity,
          availableQuantity: body.availableQuantity,
          materialType: body.materialType,
          availabilityDate: body.availabilityDate,
          materialQualityImage: body.materialQualityImage,
          pricingStructure: body.pricingStructure,

          offeredPrice: body.offeredPrice,
          currentStockStatus: body.currentStockStatus,
          packaging: body.packaging,
          bulkListingTimeline: body.bulkListingTimeline,
        },
      }),
    }),
  }),
});

export const listSlice = createSlice({
  name: "listing",
  initialState: [],
  reducers: {
    setList: (state, action) => {
      state.push(...action.payload);
    },
    clearList: (state) => {
      state.length = 0;
    },
    updateList(state, action) {
      const newItem = action.payload;
      const isDuplicate = state.some((item) => item.id === newItem.id);

      if (!isDuplicate) {
        state.unshift(newItem);
      }
    },
  },
});

export const {
  useGetAllListQuery,
  useEditListMutation,
  useDeleteListMutation,
  useAddListingMutation,
} = listApi;
export const { setList, clearList, updateList } = listSlice.actions;

export default listSlice.reducer;
