import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL_MATERIAL = "http://localhost:2001/info/material";

export const materialApi = createApi({
  reducerPath: "materialApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_MATERIAL }),

  endpoints: (builder) => ({
    getAllMaterial: builder.query({
      query: () => "/getAllMaterials",
    }),
    editMaterial: builder.mutation({
      query: ({ id, ...materialData }) => ({
        url: `/editMaterialSelection/${id}`,
        method: "PUT",
        body: materialData,
      }),
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/deleteMaterialSelection/${id}`,
        method: "DELETE",
      }),
    }),
    addMaterial: builder.mutation({
      query: (body) => ({
        url: `/addMaterialSelection`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const materialSlice = createSlice({
  name: "material",
  initialState: [],
  reducers: {
    setMaterial: (state, action) => {
      state.push(...action.payload);
    },
    clearMaterial: (state) => {
      state.length = 0;
    },
    updateMaterial(state, action) {
      const newItem = action.payload;
      const isDuplicate = state.some((item) => item.id === newItem.id);

      if (!isDuplicate) {
        state.unshift(newItem);
      }
    },
  },
});

export const {
  useGetAllMaterialQuery,
  useEditMaterialMutation,
  useDeleteMaterialMutation,
  useAddMaterialMutation,
} = materialApi;
export const { setMaterial, clearMaterial, updateMaterial } =
  materialSlice.actions;

export default materialSlice.reducer;
