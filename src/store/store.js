import { createStore } from "redux";
import stateOfApp from "../reducers/reducers";

const store = createStore(stateOfApp);

export default store;
