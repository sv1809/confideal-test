import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

function setup() {
    const props = {
        rate: 10,
        showAddTransaction: jest.fn(),
    };

    const enzymeWrapper = shallow(<Header {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("Header", () => {

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.hasClass("header")).toBe(true);
            expect(enzymeWrapper.find(".title").text()).toBe("Личный кабинет");
            expect(enzymeWrapper.find(".rate").text()).toBe(`USD/ETH: ${props.rate}`);
            const addBtnProps = enzymeWrapper.find("PrimaryButton").props();
            expect(addBtnProps.text).toBe("Новая сделка");
            expect(addBtnProps.onClick).toBe(props.showAddTransaction);
        });

        it("should call showAddTransaction on button click", () => {
            const { enzymeWrapper, props } = setup();
            const btn = enzymeWrapper.find("PrimaryButton");
            btn.simulate("click");
            expect(props.showAddTransaction.mock.calls.length).toBe(1);
        });

    });

});