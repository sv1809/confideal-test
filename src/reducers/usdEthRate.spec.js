import reducer from "./usdEthRate";
import * as actions from "../actions/rateActions";

describe("usdEthRate reducer", () => {

    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(null);
    });

    it("should handle UPDATE_RATE", () => {
        expect(reducer(null, actions.updateRate(15))).toEqual(15);
    });

});