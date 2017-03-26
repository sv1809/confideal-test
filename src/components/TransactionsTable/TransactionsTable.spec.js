import React from "react";
import { shallow } from "enzyme";
import TransactionsTable from "./TransactionsTable";
import transactions from "../../../testUtils/mocks/transactionsMock";

function setup() {
    const props = {
        rate: 10,
        deleteTransaction: jest.fn(),
        transactions
    };

    const enzymeWrapper = shallow(<TransactionsTable {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("TransactionsTable", () => {

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.hasClass("table")).toBe(true);
            expect(enzymeWrapper.hasClass("thead")).not.toBe(null);
            expect(enzymeWrapper.hasClass("tbody")).not.toBe(null);
            expect(enzymeWrapper.find("th").length).toBe(8);
            expect(enzymeWrapper.find("tr").length).toBe(transactions.length + 1);
            const firstDataTr = enzymeWrapper.find("tr").at(1);
            const firstTransactionTds = firstDataTr.find("td");
            expect(firstTransactionTds.length).toBe(8);
            const tr = props.transactions[0];
            expect(firstTransactionTds.at(0).text()).toBe(tr.date.toJSON().slice(0, 10));
            expect(firstTransactionTds.at(1).text()).toBe(tr.customer);
            expect(firstTransactionTds.at(2).text()).toBe(tr.contractor);
            expect(firstTransactionTds.at(3).text()).toBe(`${tr.amount} ETH(${tr.amount * props.rate} USD)`);
            expect(firstTransactionTds.at(4).text()).toBe(`${tr.fee} ETH(${tr.fee * props.rate} USD)`);
            expect(firstTransactionTds.at(5).text()).toBe(`${tr.paymentAmount} ETH(${tr.paymentAmount * props.rate} USD)`);
            expect(firstTransactionTds.at(6).text()).toBe(`${tr.receivingAmount} ETH(${tr.receivingAmount * props.rate} USD)`);
            const delteButtonProps = firstTransactionTds.at(7).find(".deleteBtn").props();
            expect(delteButtonProps.children).toBe("Удалить");
            expect(delteButtonProps.onClick).not.toBe(null);
        });

        it("should call deleteTransaction on delte button click", () => {
            const { enzymeWrapper, props } = setup();
            const firstDataTr = enzymeWrapper.find("tr").at(1);
            const firstTransactionTds = firstDataTr.find("td");
            const delteButton = firstTransactionTds.at(7).find(".deleteBtn");
            delteButton.simulate("click");
            expect(props.deleteTransaction.mock.calls.length).toBe(1);
            expect(props.deleteTransaction.mock.calls[props.deleteTransaction.mock.calls.length - 1][0]).toBe(props.transactions[0].id);
        });

    });

});