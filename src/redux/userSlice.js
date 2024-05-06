import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:2001/info";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/user/getAllUsers",
    }),
    editUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    onBoardUser: builder.mutation({
      query: (body) => ({
        url: `/user/onboardUser`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      state.push(...action.payload);
    },
    updateUserIsKYCDone: (state, action) => {
      const { id, isKYCDone } = action.payload;
      const userToUpdate = state.find((user) => user.id === id);
      if (userToUpdate) {
        userToUpdate.isKYCDone = isKYCDone;
      }
    },
    updateUser(state, action) {
      state.unshift(action.payload);
    },
    clearUser: (state, action) => {
      state.length = 0;
    },
  },
});

export const {
  useGetAllUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useOnBoardUserMutation,
} = userApi;
export const { setUser, clearUser, updateUser, updateUserIsKYCDone } =
  userSlice.actions;

export default userSlice.reducer;
