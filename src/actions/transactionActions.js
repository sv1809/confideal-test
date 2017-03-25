import { ADD_TRANSACTION } from "../constants/actionTypes";

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    transaction
});