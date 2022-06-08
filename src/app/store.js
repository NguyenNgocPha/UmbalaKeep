import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import noteReducer from "./noteSlice";
import trashReducer from "./trashSlice";
const rootReducer = {
  note: noteReducer,
  trash: trashReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
