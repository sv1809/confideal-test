import React, { PropTypes } from "react";
import uuidV4 from "uuid/v4";

import styles from "./LabelInput.module.css";

const LabelInput = ({ caption, value, onChange, type }) => {
    const id = uuidV4();
    return (<div className={styles.captionInput}>
        <label className={styles.caption} htmlFor={id}>{caption}</label>
        <input className={styles.input} value={value} onChange={onChange} type={type || "text"} id={id} checked={value} />
    </div>);
};

LabelInput.propTypes = {
    caption: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    type: PropTypes.string
};

export default LabelInput;