import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import AddTransactionWindow from "../../components/AddTransactionWindow";

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
        return (<div>
            <Header showAddTransaction={() => this.setTransactionWindowVisibility(true)} />
            {this.state.addTransactionVisible && <AddTransactionWindow onClose={() => this.setTransactionWindowVisibility(false)} addTransaction={() => { }} rate={30} />}
        </div>);
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(Profile);