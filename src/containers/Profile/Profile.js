import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import AddTransactionWindow from "../../components/AddTransactionWindow";
import { addTransaction, deleteTransaction } from "../../actions/transactionActions";
import { getRate, subscribeToRate } from "../../actions/rateActions";
import TransactionFilter from "../../components/TransactionFilter";

import styles from "./Profile.module.css";

// amountStart: "",
//     amountEnd: "",
//         isUsd: false
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const transactionFilter = (filter, rate) => transaction => {
    if (filter == null) {
        return true;
    }
    if (filter.dateStart != null && new Date(filter.dateStart) > new Date(transaction.date)) {
        return false;
    }
    if (filter.dateEnd != null && new Date(filter.dateEnd) < new Date(transaction.date)) {
        return false;
    }
    if (filter.customer != null && transaction.customer.indexOf(filter.customer) === -1) {
        return false;
    }
    if (filter.contractor != null && transaction.contractor.indexOf(filter.contractor) === -1) {
        return false;
    }
    if (filter.amountStart != null && isNumeric(filter.amountStart)) {
        if (filter.isUsd) {
            if (transaction.amount * rate < filter.amountStart) {
                return false;
            }
        } else if (transaction.amount < filter.amountStart) {
            return false;
        }
    }
    if (filter.amountEnd != null && isNumeric(filter.amountEnd)) {
        if (filter.isUsd) {
            if (transaction.amount * rate > filter.amountEnd) {
                return false;
            }
        } else if (transaction.amount > filter.amountEnd) {
            return false;
        }
    }
    return true;
};

class Profile extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            addTransactionVisible: false,
            filter: null
        };
    }

    componentWillMount = () => {
        this.props.getRate();
    }

    componentWillReceiveProps = next => {
        if (this.props.rate == null && next.rate != null) {
            this.props.subscribeToRate();
        }
    }

    setTransactionWindowVisibility = value => this.setState({
        ...this.state,
        addTransactionVisible: value,
    })

    render() {
        const { transactions, rate } = this.props;
        const { filter, addTransactionVisible } = this.state;
        return (<div>
            <Header showAddTransaction={() => this.setTransactionWindowVisibility(true)} rate={rate} />
            <div className={styles.body}>
                <TransactionFilter applyFilter={filter => this.setState({ ...this.state, filter })} />
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Заказчик</th>
                            <th>Исполнитель</th>
                            <th>Сумма</th>
                            <th>Комиссия</th>
                            <th>Сумма к оплате</th>
                            <th>Сумма к получению</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.filter(transactionFilter(filter, rate)).map(item => (<tr key={item.id} >
                            <td>{item.date}</td>
                            <td>{item.customer}</td>
                            <td>{item.contractor}</td>
                            <td>{item.amount} ETH({item.amount * rate} USD)</td>
                            <td>{item.fee} ETH({item.fee * rate} USD)</td>
                            <td>{item.paymentAmount} ETH({item.paymentAmount * rate} USD)</td>
                            <td>{item.receivingAmount} ETH({item.receivingAmount * rate} USD)</td>
                            <td><span className={styles.deleteBtn} onClick={() => this.props.deleteTransaction(item.id)}>Удалить</span></td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            {addTransactionVisible && <AddTransactionWindow onClose={() => this.setTransactionWindowVisibility(false)} addTransaction={this.props.addTransaction} rate={rate} />}
        </div>);
    }
}

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction)),
    getRate: () => dispatch(getRate()),
    subscribeToRate: () => dispatch(subscribeToRate()),
    deleteTransaction: id => dispatch(deleteTransaction(id)),
});

export default connect(
    state => ({ transactions: state.transactions, rate: state.usdEthRate }),
    mapDispatchToProps
)(Profile);