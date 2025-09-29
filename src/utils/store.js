import { configureStore } from "@reduxjs/toolkit";
import appSLice from "./appSlice";
import searchSLice from "./searchSlice";

const store = configureStore({
  reducer: {
    app: appSLice,
    search: searchSLice,
  },
});

export default store;
