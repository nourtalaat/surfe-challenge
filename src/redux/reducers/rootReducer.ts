import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import notesReducer from "./notes";
import usersReducer from "./users";

export const rootReducer = {
  Notes: notesReducer,
  Users: usersReducer,
};

const persistConfig = {
  key: "root",
  storage,
};

const combinedRootReducer = combineReducers(rootReducer);

export default persistReducer(persistConfig, combinedRootReducer);
