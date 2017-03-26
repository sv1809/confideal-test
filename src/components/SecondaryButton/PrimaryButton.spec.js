import React from "react";
import { shallow } from "enzyme";
import SecondaryButton from "./SecondaryButton";

function setup() {
    const props = {
        text: "test",
        onClick: jest.fn(),
        className: "test-class"
    };

    const enzymeWrapper = shallow(<SecondaryButton {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {

    describe("SecondaryButton", () => {

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();
            expect(enzymeWrapper.hasClass("button")).toBe(true);
            expect(enzymeWrapper.hasClass(props.className)).toBe(true);
            expect(enzymeWrapper.text()).toBe(props.text);
        });

        it("should call onCLick on button click", () => {
            const { enzymeWrapper, props } = setup();
            enzymeWrapper.simulate("click");
            expect(props.onClick.mock.calls.length).toBe(1);
        });

    });

});