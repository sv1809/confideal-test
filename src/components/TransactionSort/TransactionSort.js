import React, { PropTypes } from "react";

import PrimaryButton from "../PrimaryButton";
import * as sortDirections from "../../constants/sortDirections";

import styles from "./TransactionSort.module.css";

export default class TransactionSort extends React.Component {

    static propTypes = {
        sort: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = props && { 
            field: props.field || "date", 
            direction: props.direction || sortDirections.ASCENDING 
        } || { 
            field: "date", 
            direction: sortDirections.ASCENDING 
        };
    }

    render() {
        const { field, direction } = this.state;
        const sort = this.props.sort;
        return (<div className={styles.filter}>
            <h4 className={styles.header}>Сотрировка</h4>
            <div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Поле:</label>
                    <select value={field} onChange={e => this.setState({ ...this.state, field: e.target.value })}>
                        <option value="date">Дата</option>
                        <option value="customer">Заказчик</option>
                        <option value="contractor">Исполнитель</option>
                        <option value="amount">Сумма сделки</option>
                        <option value="fee">Комиссия</option>
                        <option value="paymentAmount">Сумма к оплате</option>
                        <option value="receivingAmount">Сумма к получению</option>
                    </select>
                </div>
                <div className={styles.condition}>
                    <label className={styles.conditionLabel}>Порядок:</label>
                    <label className={styles.radio}><input type="radio" value={sortDirections.ASCENDING}
                        checked={direction === sortDirections.ASCENDING}
                        onChange={(e) => this.setState({ ...this.state, direction: e.target.value })} />По возрастанию</label>
                    <label className={styles.radio}><input type="radio" value={sortDirections.DESCENDING}
                        checked={direction === sortDirections.DESCENDING}
                        onChange={(e) => this.setState({ ...this.state, direction: e.target.value })} />По убыванию</label>
                </div>
            </div>
            <footer className={styles.footer}>
                <PrimaryButton text="Применить" onClick={() => sort(this.state)} className={styles.button} />
            </footer>
        </div >);
    }

}