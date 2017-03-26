import React from "react";
import { shallow } from "enzyme";
import TransactionSort from "./TransactionSort";
import * as sortDirections from "../../constants/sortDirections";

function setup() {
    const props = {
        sort: jest.fn(),
    };

    const enzymeWrapper = shallow(<TransactionSort {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("TransactionSort", () => {

        const expectedState = {
            field: "customer",
            direction: sortDirections.DESCENDING
        };

        it("should render self", () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.hasClass("filter")).toBe(true);
            expect(enzymeWrapper.find("h4").text()).toBe("Сотрировка");

            const conditions = enzymeWrapper.find(".condition");
            expect(conditions.length).toBe(2);

            const fieldCondition = conditions.at(0);
            expect(fieldCondition.find(".conditionLabel").text()).toBe("Поле:");
            expect(fieldCondition.find("select").props().value).toBe(enzymeWrapper.state().field);
            expect(fieldCondition.find("select").props().onChange).not.toBe(null);

            const directionCondition = conditions.at(1);
            expect(directionCondition.find(".conditionLabel").text()).toBe("Порядок:");
            expect(directionCondition.find(".radio").length).toBe(2);
            expect(directionCondition.find(".radio").at(0).text()).toBe("По возрастанию");
            expect(directionCondition.find(".radio").at(0).find("input").props().value).toBe(sortDirections.ASCENDING);
            expect(directionCondition.find(".radio").at(0).find("input").props().checked).toBe(enzymeWrapper.state().direction === sortDirections.ASCENDING);
            expect(directionCondition.find(".radio").at(0).find("input").props().onChange).not.toBe(null);
            expect(directionCondition.find(".radio").at(1).text()).toBe("По убыванию");
            expect(directionCondition.find(".radio").at(1).find("input").props().value).toBe(sortDirections.DESCENDING);
            expect(directionCondition.find(".radio").at(1).find("input").props().checked).toBe(enzymeWrapper.state().direction === sortDirections.DESCENDING);
            expect(directionCondition.find(".radio").at(1).find("input").props().onChange).not.toBe(null);

            expect(enzymeWrapper.find("PrimaryButton").props().text).toBe("Применить");
            expect(enzymeWrapper.find("PrimaryButton").props().onClick).not.toBe(null);
        });

        it("should update state on inputs", () => {
            const { enzymeWrapper } = setup();
            const conditions = enzymeWrapper.find(".condition");
            expect(conditions.length).toBe(2);
            const fieldCondition = conditions.at(0);
            fieldCondition.find("select").props().onChange({ target: { value: "customer" } });
            const directionCondition = conditions.at(1);
            directionCondition.find(".radio").at(1).find("input").props().onChange({ target: { value: directionCondition.find(".radio").at(1).find("input").props().value } });
            const { field, direction } = enzymeWrapper.state();
            expect(field).toBe(expectedState.field);
            expect(direction).toBe(expectedState.direction);
        });

        it("should call sort", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.setState(expectedState);
            enzymeWrapper.find("PrimaryButton").simulate("click");
            expect(props.sort.mock.calls.length).toBe(1);
            const { field, direction } = props.sort.mock.calls[props.sort.mock.calls.length - 1][0];
            expect(field).toBe(expectedState.field);
            expect(direction).toBe(expectedState.direction);
        });

    });

});