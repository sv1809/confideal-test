import React, { PropTypes } from "react";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

import styles from "./TransactionFilter.module.css";

const initialState = {
    dateStart: "",
    dateEnd: "",
    customer: "",
    contractor: "",
    amountStart: "",
    amountEnd: "",
    isUsd: false
};

export default class TransactionFilter extends React.Component {

    static propTypes = {
        applyFilter: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    updateProp = (name, value) => {
        const newState = { ...this.state };
        newState[name] = value;
        this.setState(newState);
    }

    render() {
        const { dateStart, dateEnd, customer, contractor, amountStart, amountEnd, isUsd } = this.state;
        const applyFilter = this.props.applyFilter;
        return (<div className={styles.filter}>
            <h4 className={styles.header}>Фильтр</h4>
            <div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Дата</label>
                    <input type="date" className={styles.input} value={dateStart} onChange={e => this.updateProp("dateStart", e.target.value)} />
                    <label className={styles.separator}>-</label>
                    <input type="date" className={styles.input} value={dateEnd} onChange={e => this.updateProp("dateEnd", e.target.value)} />
                </div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Имя заказчика</label>
                    <input className={styles.input} value={customer} onChange={e => this.updateProp("customer", e.target.value)} />
                </div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Имя Исполнителя</label>
                    <input className={styles.input} value={contractor} onChange={e => this.updateProp("contractor", e.target.value)} />
                </div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Сумма сделки</label>
                    <input type="number" className={styles.input} value={amountStart} onChange={e => this.updateProp("amountStart", +e.target.value)} />
                    <label className={styles.separator}>-</label>
                    <input type="number" className={styles.input} value={amountEnd} onChange={e => this.updateProp("amountEnd", +e.target.value)} />
                    <div className={styles.additionalCondition}>
                        <input type="checkbox" className={styles.input} checked={isUsd} onChange={e => this.updateProp("isUsd", e.target.checked)} />
                        <label>USD</label>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <SecondaryButton text="Очистить" onClick={() => this.setState(initialState, () => applyFilter(this.state))} className={styles.cancelButton + " " + styles.button} />
                <PrimaryButton text="Применить" onClick={() => applyFilter(this.state)} className={styles.button} />
            </footer>
        </div>);
    }

}