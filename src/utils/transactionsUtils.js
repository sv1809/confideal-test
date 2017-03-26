import * as sortDirections from "../constants/sortDirections";

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const filter = (filter, rate) => transaction => {
    if (filter == null) {
        return true;
    }
    if (filter.dateStart != null && filter.dateStart > transaction.date) {
        return false;
    }
    if (filter.dateEnd != null && filter.dateEnd < transaction.date) {
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

export const sort = sorting => (a, b) => {
    if (sorting == null) return 0;
    if (sorting.direction === sortDirections.ASCENDING) {
        if (a[sorting.field] < b[sorting.field]) return -1;
        if (a[sorting.field] > b[sorting.field]) return 1;
        return 0;
    } else {
        if (a[sorting.field] < b[sorting.field]) return 1;
        if (a[sorting.field] > b[sorting.field]) return -1;
        return 0;
    }
};