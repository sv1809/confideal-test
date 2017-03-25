import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import AddTransactionWindow from "../../components/AddTransactionWindow";
import { addTransaction, deleteTransaction } from "../../actions/transactionActions";
import { getRate, subscribeToRate } from "../../actions/rateActions";
import TransactionFilter from "../../components/TransactionFilter";
import TransactionsTable from "../../components/TransactionsTable";
import transactionFilter from "../../utils/transactionFilter";

import styles from "./Profile.module.css";

class Profile extends React.Component {

    static propTypes = {
        addTransaction: PropTypes.func.isRequired,
        getRate: PropTypes.func.isRequired,
        subscribeToRate: PropTypes.func.isRequired,
        deleteTransaction: PropTypes.func.isRequired,
        transactions: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string.isRequired,
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
        const { transactions, rate, deleteTransaction } = this.props;
        const { filter, addTransactionVisible } = this.state;
        return (<div>
            <Header showAddTransaction={() => this.setTransactionWindowVisibility(true)} rate={rate} />
            <div className={styles.body}>
                <TransactionFilter applyFilter={filter => this.setState({ ...this.state, filter })} />
                <TransactionsTable transactions={transactions.filter(transactionFilter(filter, rate))} rate={rate} deleteTransaction={deleteTransaction} />
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