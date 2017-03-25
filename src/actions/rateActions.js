import { UPDATE_RATE, SUBSCRIBE_TO_RATE } from "../constants/actionTypes";

export const updateRate = rate => ({
    type: UPDATE_RATE,
    rate
});

export const getRate = () => dispatch => fetch("https://poloniex.com/public?command=returnTicker")
    .then(req => req.json())
    .then(json => {
        const rate = json.USDT_ETH && json.USDT_ETH.last || null;
        dispatch(updateRate(rate));
    });

export const subscribeToRate = () => ({
    type: SUBSCRIBE_TO_RATE
});