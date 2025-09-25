import { configureStore } from "@reduxjs/toolkit";
import appSLice from "./appSlice";

const store = configureStore({
  reducer: {
    app: appSLice,
  },
});

export default store;
