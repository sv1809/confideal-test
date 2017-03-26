import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
/* eslint-disable */
import fetch from "isomorphic-fetch";
/* eslint-enable */

import * as actions from "./rateActions";
import * as types from "../constants/actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("rate actions", () => {

    afterEach(() => nock.cleanAll());

    it("should create an action to update a rate", () => {
        const rate = 32;
        const expectedAction = {
            type: types.UPDATE_RATE,
            rate
        };
        expect(actions.updateRate(rate)).toEqual(expectedAction);
    });

    it("should create an action to subsribe to rate", () => {
        const expectedAction = {
            type: types.SUBSCRIBE_TO_RATE,
        };
        expect(actions.subscribeToRate()).toEqual(expectedAction);
    });

    it("creates UPDATE_RATE when fetching rates has been done", () => {

        nock("https://poloniex.com/")
            .get("/public?command=returnTicker")
            .reply(200, { USDT_ETH: { last: 32 } });

        const expectedActions = [
            { type: types.UPDATE_RATE, rate: 32 }
        ];
        const store = mockStore({ rate: null });

        return store.dispatch(actions.getRate())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

});