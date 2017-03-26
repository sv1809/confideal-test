import reducer from "./transactions";
import * as actions from "../actions/transactionActions";
import mockTransactions from "../../testUtils/mocks/transactionsMock";

const initialState = {
    transactions: [],
    filter: null,
    sorting: null
};

describe("usdEthRate reducer", () => {

    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should add transaction", () => {
        const expectedState = {
            ...initialState,
            transactions: [mockTransactions[0]]
        };
        expect(reducer(initialState, actions.addTransaction(mockTransactions[0]))).toEqual(expectedState);
    });

    it("should delete transaction", () => {
        const initialState = {
            ...initialState,
            transactions: mockTransactions
        };
        const initialLength = initialState.transactions.length;
        const expectedLength = initialLength - 1;
        const stateAfterDelete = reducer(initialState, actions.deleteTransaction("3"));
        expect(stateAfterDelete.transactions.length).toEqual(expectedLength);
        expect(stateAfterDelete.transactions.findIndex(item => item.id === "3")).toEqual(-1);
    });

    it("should set a filter", () => {
        const filter = {
            startDate: new Date(),
            customer: "customer 1"
        };
        const expectedState = {
            ...initialState,
            filter
        };
        expect(reducer(initialState, actions.applyFilter(filter))).toEqual(expectedState);
    });

    it("should set a sorting", () => {
        const sorting = {
            field: "customer"
        };
        const expectedState = {
            ...initialState,
            sorting
        };
        expect(reducer(initialState, actions.sortTransactions(sorting))).toEqual(expectedState);
    });

});