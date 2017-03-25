import { combineReducers } from "redux";

import rates from "./exchangeRates";
import transactions from "./transactions";

export default combineReducers({
    rates,
    transactions,
});