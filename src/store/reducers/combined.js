import { combineReducers } from "redux";
import user from "./user";
import admin from "./admin";

export const rootReducer = combineReducers({
  userData: user,
  adminData: admin,
});