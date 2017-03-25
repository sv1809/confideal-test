import React, { PropTypes } from "react";

import styles from "./Header.module.css";
import PrimaryButton from "../PrimaryButton";

const Header = ({ rate, showAddTransaction }) => (<header className={styles.header}>
    <div className={styles.title}>Личный кабинет</div>
    <div>
        <span className={styles.rate}>USD/ETH {rate || "..."}</span>
        <PrimaryButton text="Добавить операцию" onClick={showAddTransaction} />
    </div>
</header>);

Header.propTypes = {
    rate: PropTypes.number,
    showAddTransaction: PropTypes.func.isRequired
};

export default Header;