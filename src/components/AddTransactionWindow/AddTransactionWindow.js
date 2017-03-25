import React, { PropTypes } from "react";
import uuidV4 from "uuid/v4";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import LabelInput from "../LabelInput";

import styles from "./AddTransactionWindow.module.css";

export default class AddTransactionWindow extends React.Component {

    static propTypes = {
        addTransaction: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        rate: PropTypes.number.isRequired,
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
            paymentAmount: 0,
            receivingAmount: 0,
        };
    }

    updateProp = (name, value) => {
        const newState = { ...this.state };
        newState[name] = value;
        if (newState.amount !== this.state.amount) {
            let fee = newState.amount * 0.015;
            if (fee < 0.3) {
                fee = 0.3;
            } else if (fee > 5) {
                fee = 5;
            }
            newState.fee = fee;
        }
        if (newState.amount !== this.state.amount || newState.isContractorPayFee !== this.state.isContractorPayFee) {
            newState.paymentAmount = newState.isContractorPayFee ? newState.amount : newState.amount + newState.fee;
            newState.receivingAmount = !newState.isContractorPayFee ? newState.amount : newState.amount - newState.fee;
        }
        this.setState(newState);
    }

    addTransaction = () => {
        this.props.addTransaction({
            ...this.state,
            id: uuidV4(),
        });
        this.props.onClose();
    }

    render() {
        const { onClose, rate } = this.props;
        const { date, customer, contractor, amount, isContractorPayFee, fee, paymentAmount, receivingAmount } = this.state;
        return (<div>
            <div className={styles.base} onClick={onClose} />
            <div className={styles.window}>
                <header className={styles.header}>Новая сделка</header>
                <div className={styles.body}>
                    <LabelInput caption="Дата" value={date} onChange={e => this.updateProp("date", e.target.value)} type="date" />
                    <LabelInput caption="Имя заказчика" value={customer} onChange={e => this.updateProp("customer", e.target.value)} />
                    <LabelInput caption="Имя исполнителя" value={contractor} onChange={e => this.updateProp("contractor", e.target.value)} />
                    <LabelInput caption="Сумма сделки(ETH)" value={amount} onChange={e => this.updateProp("amount", +e.target.value)} type="number" />
                    <span className={styles.feeInfo}>Комиссия: <b>{fee}</b> ETH({fee * rate} USD). Сумма к оплате: <b>{paymentAmount}</b> ETH({paymentAmount * rate} USD). Сумма к получению: <b>{receivingAmount}</b> ETH({receivingAmount * rate} USD).</span>
                    <LabelInput caption="Комиссию оплачивает исполнитель" value={isContractorPayFee} onChange={e => this.updateProp("isContractorPayFee", e.target.checked)} type="checkbox" />
                </div>
                <footer className={styles.footer}>
                    <SecondaryButton text="Отмена" onClick={onClose} className={styles.cancelButton + " " + styles.button} />
                    <PrimaryButton text="Создать" onClick={this.addTransaction} className={styles.button} />
                </footer>
            </div>
        </div>);
    }

}