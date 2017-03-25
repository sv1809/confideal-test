import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import AddTransactionWindow from "../../components/AddTransactionWindow";
import { addTransaction } from "../../actions/transactionActions";

import styles from "./Profile.module.css";

class Profile extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            addTransactionVisible: false,
        };
    }

    setTransactionWindowVisibility = value => this.setState({
        ...this.state,
        addTransactionVisible: value,
    })

    render() {
        const { transactions, rate } = this.props;
        return (<div>
            <Header showAddTransaction={() => this.setTransactionWindowVisibility(true)} />
            <div className={styles.body}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((item, index) => (<tr key={index} >
                            <td>{item.date}</td>
                            <td>{item.customer}</td>
                            <td>{item.contractor}</td>
                            <td>{item.amount}</td>
                            <td>{item.fee} ETH({item.fee * rate} USD)</td>
                            <td>{item.paymentAmount} ETH({item.paymentAmount * rate} USD)</td>
                            <td>{item.receivingAmount} ETH({item.receivingAmount * rate} USD)</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            {this.state.addTransactionVisible && <AddTransactionWindow onClose={() => this.setTransactionWindowVisibility(false)} addTransaction={this.props.addTransaction} rate={rate} />}
        </div>);
    }
}

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction)),
});

export default connect(
    state => ({ transactions: state.transactions, rate: state.rates.USD_ETH }),
    mapDispatchToProps
)(Profile);