import React, { PropTypes } from "react";
import { Provider } from "react-redux";

import Profile from "../Profile";

const Root = ({ store }) => (<Provider store={store}>
    <Profile />
</Provider >);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;