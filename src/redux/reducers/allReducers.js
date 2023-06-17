import { combineReducers } from "redux";
import langReducer from "./langReducer";
import userReducer from "./userReducer";
const allReducers = combineReducers({
    langReducer: langReducer,
    userReducer: userReducer,
});
export default allReducers;