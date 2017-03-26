import React from "react";
import { shallow } from "enzyme";
import LabelInput from "./LabelInput";

function setup() {
    const props = {
        caption: "test caption",
        value: "test value",
        onChange: jest.fn(),
        type: "text"
    };

    const enzymeWrapper = shallow(<LabelInput {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe("components", () => {
    describe("LabelInput", () => {

        it("should render self", () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.hasClass("captionInput")).toBe(true);
            expect(enzymeWrapper.find(".caption").text()).toBe(props.caption);
            const inputProps = enzymeWrapper.find(".input").props();
            expect(inputProps.value).toBe(props.value);
            expect(inputProps.type).toBe(props.type);
            expect(inputProps.onChange).toBe(props.onChange);
        });

        it("should call onChange on input", () => {
            const { enzymeWrapper, props } = setup();
            const input = enzymeWrapper.find(".input");
            input.simulate("change", { target: { value: "test" } });
            expect(props.onChange.mock.calls.length).toBe(1);
            expect(props.onChange.mock.calls[props.onChange.mock.calls.length - 1][0].target.value).toBe("test");
        });
    });

});