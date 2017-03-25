const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export default (filter, rate) => transaction => {
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