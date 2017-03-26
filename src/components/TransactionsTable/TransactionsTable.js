import React, { PropTypes } from "react";

import styles from "./TransactionsTable.module.css";

const TransactionsTable = ({ transactions, rate, deleteTransaction }) => (<table className={styles.table}>
    <thead>
        <tr>
            <th>Дата</th>
            <th>Заказчик</th>
            <th>Исполнитель</th>
            <th>Сумма сделки</th>
            <th>Комиссия</th>
            <th>Сумма к оплате</th>
            <th>Сумма к получению</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {transactions.map(item => (<tr key={item.id} >
            <td>{item.date.toJSON().slice(0, 10)}</td>
            <td>{item.customer}</td>
            <td>{item.contractor}</td>
            <td>{item.amount} ETH({item.amount * rate} USD)</td>
            <td>{item.fee} ETH({item.fee * rate} USD)</td>
            <td>{item.paymentAmount} ETH({item.paymentAmount * rate} USD)</td>
            <td>{item.receivingAmount} ETH({item.receivingAmount * rate} USD)</td>
            <td><span className={styles.deleteBtn} onClick={() => deleteTransaction(item.id)}>Удалить</span></td>
        </tr>))}
    </tbody>
</table>);

TransactionsTable.propTypes = {
    rate: PropTypes.number,
    deleteTransaction: PropTypes.func.isRequired,
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.any.isRequired,
            customer: PropTypes.string.isRequired,
            contractor: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            fee: PropTypes.number.isRequired,
            paymentAmount: PropTypes.number.isRequired,
            receivingAmount: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default TransactionsTable;