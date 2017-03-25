import autobahn from "autobahn";

import { SUBSCRIBE_TO_RATE } from "../constants/actionTypes";
import { updateRate } from "../actions/rateActions";

const wsuri = "wss://api.poloniex.com";
let connection = null;

const onConnectionOpen = store => session => {
    session.subscribe("ticker", args => {
        if (args[0] === "USDT_ETH") {
            store.dispatch(updateRate(args[1]));
        }
    });
};

export default store => next => action => {
    switch (action.type) {
        case SUBSCRIBE_TO_RATE:
            if (connection != null) {
                break;
            }
            connection = new autobahn.Connection({
                url: wsuri,
                realm: "realm1"
            });
            connection.onopen = onConnectionOpen(store);
            connection.onclose = function () {
                /* eslint-disable */
                console.log("Websocket connection closed.");
                /* eslint-enable */
            };
            connection.open();
            break;
        default:
            return next(action);
    }
};
