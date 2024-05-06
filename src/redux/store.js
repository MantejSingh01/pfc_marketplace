import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userApi } from "./userSlice";
import kycReducer, { kycApi } from "./kycSlice";
import listingReducer, { listApi } from "./listSlice";
import materialReducer, { materialApi } from "./materialSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [kycApi.reducerPath]: kycApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
    [materialApi.reducerPath]: materialApi.reducer,
    user: userReducer,
    kyc: kycReducer,
    listing: listingReducer,
    material: materialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(kycApi.middleware)
      .concat(listApi.middleware)
      .concat(materialApi.middleware),
});

export default store;
