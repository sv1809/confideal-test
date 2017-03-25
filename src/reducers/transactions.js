import { ADD_TRANSACTION } from "../constants/actionTypes";

export default (state = mock, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return [
                ...state,
                action.transaction
            ];
        default:
            return state;
    }
};

const mock = [{
    date: new Date().toJSON().slice(0, 10),
    customer: "customer1",
    contractor: "contractor1",
    amount: 120,
    isContractorPayFee: false,
    fee: 1,
    paymentAmount: 123,
    receivingAmount: 120,
}, {
    date: new Date().toJSON().slice(0, 10),
    customer: "customer2",
    contractor: "contractor2",
    amount: 312,
    isContractorPayFee: false,
    fee: 2,
    paymentAmount: 34,
    receivingAmount: 32,
}, {
    date: new Date().toJSON().slice(0, 10),
    customer: "customer3",
    contractor: "contractor3",
    amount: 213,
    isContractorPayFee: false,
    fee: 1,
    paymentAmount: 132,
    receivingAmount: 312,
}, {
    date: new Date().toJSON().slice(0, 10),
    customer: "customer4",
    contractor: "contractor4",
    amount: 5464,
    isContractorPayFee: false,
    fee: 5,
    paymentAmount: 123,
    receivingAmount: 1,
}, {
    date: new Date().toJSON().slice(0, 10),
    customer: "customer5",
    contractor: "contractor5",
    amount: 234213,
    isContractorPayFee: false,
    fee: 2314,
    paymentAmount: 2,
    receivingAmount: 3,
}];