import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../constants/actionTypes";

export default (state = mock, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return [
                ...state,
                action.transaction
            ];
        case DELETE_TRANSACTION:
            const ind = state.findIndex(item => item.id === action.id);
            return [
                ...state.slice(0, ind),
                ...state.slice(ind + 1)
            ];
        default:
            return state;
    }
};

const mock = [{
    date: "2017-03-25",
    customer: "customer1",
    contractor: "contractor1",
    amount: 120,
    isContractorPayFee: false,
    fee: 1,
    paymentAmount: 123,
    receivingAmount: 120,
    id: "1",
}, {
    date: "2017-03-24",
    customer: "customer2",
    contractor: "contractor2",
    amount: 312,
    isContractorPayFee: false,
    fee: 2,
    paymentAmount: 34,
    receivingAmount: 32,
    id: "2",
}, {
    date: "2017-02-25",
    customer: "customer3",
    contractor: "contractor3",
    amount: 213,
    isContractorPayFee: false,
    fee: 1,
    paymentAmount: 132,
    receivingAmount: 312,
    id: "3",
}, {
    date: "2017-01-25",
    customer: "customer4",
    contractor: "contractor4",
    amount: 5464,
    isContractorPayFee: false,
    fee: 5,
    paymentAmount: 123,
    receivingAmount: 1,
    id: "4",
}, {
    date: "2017-03-30",
    customer: "customer5",
    contractor: "contractor5",
    amount: 234213,
    isContractorPayFee: false,
    fee: 2314,
    paymentAmount: 2,
    receivingAmount: 3,
    id: "5",
}];