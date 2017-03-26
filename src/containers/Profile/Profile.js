import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import AddTransactionWindow from "../../components/AddTransactionWindow";
import { addTransaction, deleteTransaction, applyFilter, sortTransactions } from "../../actions/transactionActions";
import { getRate, subscribeToRate } from "../../actions/rateActions";
import TransactionFilter from "../../components/TransactionFilter";
import TransactionsTable from "../../components/TransactionsTable";
import TransactionSort from "../../components/TransactionSort";
import * as transactionsUtils from "../../utils/transactionsUtils";

import styles from "./Profile.module.css";

export class Profile extends React.Component {

    static propTypes = {
        addTransaction: PropTypes.func.isRequired,
        getRate: PropTypes.func.isRequired,
        subscribeToRate: PropTypes.func.isRequired,
        deleteTransaction: PropTypes.func.isRequired,
        applyFilter: PropTypes.func.isRequired,
        sortTransactions: PropTypes.func.isRequired,
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
        rate: PropTypes.number,
        filer: PropTypes.shape({
        }),
        sorting: PropTypes.shape({

        }),
    }

    constructor(props) {
        super(props);
        this.state = {
            addTransactionVisible: false,
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
        const { transactions, rate, deleteTransaction, applyFilter, sortTransactions } = this.props;
        const { addTransactionVisible } = this.state;
        return (<div>
            <Header showAddTransaction={() => this.setTransactionWindowVisibility(true)} rate={rate} />
            <div className={styles.body}>
                <TransactionFilter applyFilter={filter => applyFilter(filter)} />
                <TransactionSort sort={params => sortTransactions(params)} />
                <TransactionsTable transactions={transactions} rate={rate} deleteTransaction={deleteTransaction} />
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
    applyFilter: filter => dispatch(applyFilter(filter)),
    sortTransactions: sorting => dispatch(sortTransactions(sorting)),
});

const mapStateToProps = state => {
    const { transactions, filter, sorting } = state.transactions;
    return {
        transactions: transactions.filter(transactionsUtils.filter(filter, state.usdEthRate)).sort(transactionsUtils.sort(sorting)),
        filter,
        sorting,
        rate: state.usdEthRate
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);