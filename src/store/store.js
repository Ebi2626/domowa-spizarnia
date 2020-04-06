import { createStore } from "redux";
import stateOfApp from "../reducers/reducers";

const store = createStore(
  stateOfApp /* preloadedState, */,
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
