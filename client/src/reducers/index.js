import { combineReducers } from "redux";

import auth from "./auth-reducer";
import events from "./event-reducer";
import event from "./event-reducer";
import categories from "./category-reducer";
import settings from "./setting-reducer";
export default combineReducers({
  auth,
  events,
  event,
  categories,
  settings
});
