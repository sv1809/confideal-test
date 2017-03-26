import * as actions from "./transactionActions";
import * as types from "../constants/actionTypes";

describe("transaction actions", () => {

    it("should create an action to add a transaction", () => {
        const transaction = {
            customer: "customer"
        };
        const expectedAction = {
            type: types.ADD_TRANSACTION,
            transaction
        };
        expect(actions.addTransaction(transaction)).toEqual(expectedAction);
    });

    it("should create an action to delete a transaction", () => {
        const id = "1";
        const expectedAction = {
            type: types.DELETE_TRANSACTION,
            id
        };
        expect(actions.deleteTransaction(id)).toEqual(expectedAction);
    });

    it("should create an action to apply a filter", () => {
        const filter = {
            customer: "customer"
        };
        const expectedAction = {
            type: types.APPLY_FILTER,
            filter
        };
        expect(actions.applyFilter(filter)).toEqual(expectedAction);
    });

    it("should create an action to apply a sort", () => {
        const sorting = {
            field: "customer"
        };
        const expectedAction = {
            type: types.SORT_TRANSACTIONS,
            sorting
        };
        expect(actions.sortTransactions(sorting)).toEqual(expectedAction);
    });

});