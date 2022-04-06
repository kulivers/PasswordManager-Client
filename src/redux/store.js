import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
export const createAppStore = () => {
  return createStore(
    rootReducer,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};
