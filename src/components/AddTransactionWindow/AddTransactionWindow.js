import React, { PropTypes } from "react";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import LabelInput from "../LabelInput";

import styles from "./AddTransactionWindow.module.css";

export default class AddTransactionWindow extends React.Component {

    static propTypes = {
        addTransaction: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toJSON().slice(0, 10),
            customer: "",
            contractor: "",
            amount: 0,
            isContractorPayFee: false,
            fee: 0,
        };
    }

    render() {
        const { addTransaction, onClose } = this.props;
        const { date, customer, contractor, amount, isContractorPayFee, fee } = this.state;
        return (<div>
            <div className={styles.base} onClick={onClose} />
            <div className={styles.window}>
                <header className={styles.header}>Новая сделка</header>
                <div className={styles.body}>
                    <LabelInput caption="Дата" value={date} onChange={() => { }} type="date" />
                    <LabelInput caption="Имя заказчика" value={customer} onChange={() => { }} />
                    <LabelInput caption="Имя исполнителя" value={customer} onChange={() => { }} />
                    <LabelInput caption="Сумма сделки(ETH)" value={amount} onChange={() => { }} type="number" />
                    <LabelInput caption="Комиссию оплачивает исполнитель" value={amount} onChange={() => { }} type="checkbox" />
                </div>
                <footer className={styles.footer}>
                    <SecondaryButton text="Отмена" onClick={onClose} className={styles.cancelButton + " " + styles.button} />
                    <PrimaryButton text="Создать" onClick={addTransaction} className={styles.button} />
                </footer>
            </div>
        </div>);
    }

}