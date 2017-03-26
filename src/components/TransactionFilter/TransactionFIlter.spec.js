import React from "react";
import { shallow } from "enzyme";
import TransactionFilter from "./TransactionFilter";

function setup() {
    const props = {
        applyFilter: jest.fn(),
    };

    const enzymeWrapper = shallow(<TransactionFilter {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("TransactionFilter", () => {

        const initialState = {
            dateStart: "",
            dateEnd: "",
            customer: "",
            contractor: "",
            amountStart: "",
            amountEnd: "",
            isUsd: false
        };

        const expectedState = {
            dateStart: "2017-03-26",
            dateEnd: "2017-03-26",
            customer: "customer",
            contractor: "contractor",
            amountStart: 10,
            amountEnd: 30,
            isUsd: true
        };

        it("should render self", () => {
            const { enzymeWrapper } = setup();
            enzymeWrapper.setState(expectedState);
            expect(enzymeWrapper.hasClass("filter")).toBe(true);
            expect(enzymeWrapper.find("h4").text()).toBe("Фильтр");

            const conditions = enzymeWrapper.find(".condition");
            expect(conditions.length).toBe(4);

            const dateCondition = conditions.at(0);
            expect(dateCondition.find(".conditionLabel").text()).toBe("Дата");
            expect(dateCondition.find(".input").at(0).props().value).toBe(enzymeWrapper.state().dateStart);
            expect(dateCondition.find(".input").at(1).props().value).toBe(enzymeWrapper.state().dateEnd);

            const customerCondition = conditions.at(1);
            expect(customerCondition.find(".conditionLabel").text()).toBe("Имя заказчика");
            expect(customerCondition.find(".input").props().value).toBe(enzymeWrapper.state().customer);

            const contractorCondition = conditions.at(2);
            expect(contractorCondition.find(".conditionLabel").text()).toBe("Имя исполнителя");
            expect(contractorCondition.find(".input").props().value).toBe(enzymeWrapper.state().contractor);

            const amountCondition = conditions.at(3);
            expect(amountCondition.find(".conditionLabel").text()).toBe("Сумма сделки");
            expect(amountCondition.find(".input").at(0).props().value).toBe(enzymeWrapper.state().amountStart);
            expect(amountCondition.find(".input").at(1).props().value).toBe(enzymeWrapper.state().amountEnd);
            expect(amountCondition.find(".additionalCondition").find("label").text()).toBe("USD");
            expect(amountCondition.find(".additionalCondition").find(".input").props().checked).toBe(enzymeWrapper.state().isUsd);

            expect(enzymeWrapper.find("PrimaryButton").at(0).props().onClick).not.toBe(null);
            expect(enzymeWrapper.find("PrimaryButton").at(0).props().text).toBe("Очистить");
            expect(enzymeWrapper.find("PrimaryButton").at(1).props().onClick).not.toBe(null);
            expect(enzymeWrapper.find("PrimaryButton").at(1).props().text).toBe("Применить");
        });

        it("should update state on inputs", () => {
            const { enzymeWrapper } = setup();

            const conditions = enzymeWrapper.find(".condition");

            const dateCondition = conditions.at(0);
            dateCondition.find(".input").at(0).props().onChange({ target: { value: expectedState.dateStart } });
            dateCondition.find(".input").at(1).props().onChange({ target: { value: expectedState.dateEnd } });

            const customerCondition = conditions.at(1);
            customerCondition.find(".input").props().onChange({ target: { value: expectedState.customer } });

            const contractorCondition = conditions.at(2);
            contractorCondition.find(".input").props().onChange({ target: { value: expectedState.contractor } });

            const amountCondition = conditions.at(3);
            amountCondition.find(".input").at(0).props().onChange({ target: { value: expectedState.amountStart } });
            amountCondition.find(".input").at(1).props().onChange({ target: { value: expectedState.amountEnd } });
            amountCondition.find(".additionalCondition").find(".input").props().onChange({ target: { checked: expectedState.isUsd } });
            const { dateStart, dateEnd, customer, contractor, amountStart, amountEnd, isUsd } = enzymeWrapper.state();
            expect(dateStart).toBe(expectedState.dateStart);
            expect(dateEnd).toBe(expectedState.dateEnd);
            expect(customer).toBe(expectedState.customer);
            expect(contractor).toBe(expectedState.contractor);
            expect(amountStart).toBe(expectedState.amountStart);
            expect(amountEnd).toBe(expectedState.amountEnd);
            expect(isUsd).toBe(expectedState.isUsd);
        });

        it("should clear filter and call applyFilter", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.find("PrimaryButton").at(0).simulate("click");
            expect(props.applyFilter.mock.calls.length).toBe(1);
            const { dateStart, dateEnd, customer, contractor, amountStart, amountEnd, isUsd } = enzymeWrapper.state();
            expect(dateStart).toBe(initialState.dateStart);
            expect(dateEnd).toBe(initialState.dateEnd);
            expect(customer).toBe(initialState.customer);
            expect(contractor).toBe(initialState.contractor);
            expect(amountStart).toBe(initialState.amountStart);
            expect(amountEnd).toBe(initialState.amountEnd);
            expect(isUsd).toBe(initialState.isUsd);
        });

        it("should call applyFilter", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.setState(expectedState);
            enzymeWrapper.find("PrimaryButton").at(1).simulate("click");
            expect(props.applyFilter.mock.calls.length).toBe(1);
            const { dateStart, dateEnd, customer, contractor, amountStart, amountEnd, isUsd } = props.applyFilter.mock.calls[props.applyFilter.mock.calls.length - 1][0];
            expect(dateStart.toString()).toBe(new Date(expectedState.dateStart).toString());
            expect(dateEnd.toString()).toBe(new Date(expectedState.dateEnd).toString());
            expect(customer).toBe(expectedState.customer);
            expect(contractor).toBe(expectedState.contractor);
            expect(amountStart).toBe(expectedState.amountStart);
            expect(amountEnd).toBe(expectedState.amountEnd);
            expect(isUsd).toBe(expectedState.isUsd);
        });

    });

});