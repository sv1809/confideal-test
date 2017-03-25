import { combineReducers } from "redux";

import usdEthRate from "./usdEthRate";
import transactions from "./transactions";

export default combineReducers({
    usdEthRate,
    transactions,
});