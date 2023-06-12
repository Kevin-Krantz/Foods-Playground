import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import api from "./services/rtkApi";

export default combineReducers({
  entities: entitiesReducer,
  [api.reducerPath]: api.reducer,
});
