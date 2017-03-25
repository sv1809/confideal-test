import React, { PropTypes } from "react";

import styles from "./SecondaryButton.module.css";

const PrimaryButton = ({ text, onClick, className }) => (<button className={styles.button + (className != null ? " " + className : "")} onClick={onClick}>{text}</button>);

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default PrimaryButton;