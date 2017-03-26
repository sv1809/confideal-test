import React from "react";
import { mount } from "enzyme";
import AddTransactionWindow from "./AddTransactionWindow";

function setup() {
    const props = {
        addTransaction: jest.fn(),
        onClose: jest.fn(),
        rate: 10,
    };

    const enzymeWrapper = mount(<AddTransactionWindow {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("AddTransactionWindow", () => {

        const expectedState = {
            date: "2017-03-26",
            customer: "customer",
            contractor: "contactor",
            amount: 10,
            isContractorPayFee: true,
            fee: 0.3,
            paymentAmount: 10,
            receivingAmount: 9.7,
        };

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();
            const { amount, fee, paymentAmount, receivingAmount } = expectedState;
            enzymeWrapper.setState(expectedState);
            expect(enzymeWrapper.find(".base").length).toBe(1);
            expect(enzymeWrapper.find(".base").props().onClick).toBe(props.onClose);
            expect(enzymeWrapper.find(".window").length).toBe(1);
            expect(enzymeWrapper.find("header").text()).toBe("Новая сделка");
            expect(enzymeWrapper.find(".body").length).toBe(1);
            expect(enzymeWrapper.find(".footer").length).toBe(1);
            expect(enzymeWrapper.find("PrimaryButton").at(0).props().onClick).toBe(props.onClose);
            expect(enzymeWrapper.find("PrimaryButton").at(0).props().text).toBe("Отмена");
            expect(enzymeWrapper.find("PrimaryButton").at(1).props().onClick).not.toBe(null);
            expect(enzymeWrapper.find("PrimaryButton").at(1).props().text).toBe("Добавить");
            expect(enzymeWrapper.find("LabelInput").length).toBe(5);
            expect(enzymeWrapper.find("LabelInput").at(0).props().caption).toBe("Дата");
            expect(enzymeWrapper.find("LabelInput").at(0).props().value).toBe(enzymeWrapper.state().date);
            expect(enzymeWrapper.find("LabelInput").at(1).props().caption).toBe("Имя заказчика");
            expect(enzymeWrapper.find("LabelInput").at(1).props().value).toBe(enzymeWrapper.state().customer);
            expect(enzymeWrapper.find("LabelInput").at(2).props().caption).toBe("Имя исполнителя");
            expect(enzymeWrapper.find("LabelInput").at(2).props().value).toBe(enzymeWrapper.state().contractor);
            expect(enzymeWrapper.find("LabelInput").at(3).props().caption).toBe("Сумма сделки(ETH)");
            expect(enzymeWrapper.find("LabelInput").at(3).props().value).toBe(enzymeWrapper.state().amount);
            expect(enzymeWrapper.find("LabelInput").at(4).props().caption).toBe("Комиссию оплачивает исполнитель");
            expect(enzymeWrapper.find("LabelInput").at(4).props().value).toBe(enzymeWrapper.state().isContractorPayFee);
            expect(enzymeWrapper.find(".feeInfo").text()).toBe(`Сумма сделки: ${amount} ETH(${amount * props.rate} USD). Комиссия: ${fee} ETH(${fee * props.rate} USD). Сумма к оплате: ${paymentAmount} ETH(${paymentAmount * props.rate} USD). Сумма к получению: ${receivingAmount} ETH(${receivingAmount * props.rate} USD).`);
        });

        it("should update state on inputs", () => {
            const { enzymeWrapper } = setup();
            enzymeWrapper.find("LabelInput").at(0).props().onChange({ target: { value: expectedState.date } });
            enzymeWrapper.find("LabelInput").at(1).props().onChange({ target: { value: expectedState.customer } });
            enzymeWrapper.find("LabelInput").at(2).props().onChange({ target: { value: expectedState.contractor } });
            enzymeWrapper.find("LabelInput").at(3).props().onChange({ target: { value: expectedState.amount } });
            enzymeWrapper.find("LabelInput").at(4).props().onChange({ target: { checked: expectedState.isContractorPayFee } });
            expect(enzymeWrapper.state(), expectedState);
        });

        it("should call onClose when close button or base was clicked", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.find(".base").simulate("click");
            expect(props.onClose.mock.calls.length).toBe(1);
            enzymeWrapper.find("PrimaryButton").at(0).simulate("click");
            expect(props.onClose.mock.calls.length).toBe(2);
        });

        it("should call addTransaction when add button was clicked", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.setState(expectedState);
            enzymeWrapper.find("PrimaryButton").at(1).simulate("click");
            expect(props.addTransaction.mock.calls.length).toBe(1);
            const newTransaction = props.addTransaction.mock.calls[props.addTransaction.mock.calls.length - 1][0];
            expect(newTransaction.date.toString()).toBe(new Date(expectedState.date).toString());
            expect(newTransaction.customer).toBe(expectedState.customer);
            expect(newTransaction.contractor).toBe(expectedState.contractor);
            expect(newTransaction.amount).toBe(expectedState.amount);
            expect(newTransaction.fee).toBe(expectedState.fee);
        });

    });

});