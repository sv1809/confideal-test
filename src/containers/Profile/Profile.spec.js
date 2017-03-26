import React from "react";
import { shallow } from "enzyme";
import { Profile } from "./Profile";
import transactions from "../../../testUtils/mocks/transactionsMock";

function setup() {
    const props = {
        addTransaction: jest.fn(),
        getRate: jest.fn(),
        subscribeToRate: jest.fn(),
        deleteTransaction: jest.fn(),
        applyFilter: jest.fn(),
        sortTransactions: jest.fn(),
        transactions,
        rate: 10,
    };

    const enzymeWrapper = shallow(<Profile {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("Profile", () => {

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find("Header").props().rate).toBe(props.rate);
            expect(typeof enzymeWrapper.find("Header").props().showAddTransaction).toBe("function");
            expect(enzymeWrapper.find(".body").length).toBe(1);
            expect(typeof enzymeWrapper.find("TransactionFilter").props().applyFilter).toBe("function");
            expect(typeof enzymeWrapper.find("TransactionSort").props().sort).toBe("function");
            expect(enzymeWrapper.find("TransactionsTable").props().rate).toBe(props.rate);
            expect(enzymeWrapper.find("TransactionsTable").props().transactions).toBe(props.transactions);
            expect(typeof enzymeWrapper.find("TransactionsTable").props().deleteTransaction).toBe("function");
            expect(enzymeWrapper.find("AddTransactionWindow").length).toBe(0);
        });

        it("should show AddTransactionWindow when addTransactionVisible is true", () => {
            const { enzymeWrapper } = setup();
            enzymeWrapper.setState({ addTransactionVisible: true });
            expect(enzymeWrapper.find("AddTransactionWindow").length).toBe(1);
        });

        it("should set addTransactionVisible to true when call showAddTransaction", () => {
            const { enzymeWrapper } = setup();
            enzymeWrapper.find("Header").props().showAddTransaction();
            expect(enzymeWrapper.state().addTransactionVisible).toBe(true);
        });

    });

});