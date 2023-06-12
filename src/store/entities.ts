import { combineReducers } from "redux";
import searchReducer from "./features/search";
import foodsReducer from "./features/foods";
import authReducer from "./features/auth";

export default combineReducers({
  search: searchReducer,
  foods: foodsReducer,
  auth: authReducer,
});
