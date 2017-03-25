import * as sortDirections from "../constants/sortDirections";

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const filter = (filter, rate) => transaction => {
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

export const sort = sorting => (a, b) => {
    if (sorting == null) return 0;
    if (sorting.field === "customer" || sorting.field === "contractor") {
        if (sorting.direction === sortDirections.ASCENDING) {
            if (a[sorting.field] < b[sorting.field]) return -1;
            if (a[sorting.field] > b[sorting.field]) return 1;
            return 0;
        } else {
            if (a[sorting.field] < b[sorting.field]) return 1;
            if (a[sorting.field] > b[sorting.field]) return -1;
            return 0;
        }
    }
    if (sorting.field === "amount" || sorting.field === "fee" || sorting.field === "paymentAmount" || sorting.field === "receivingAmount") {
        if (sorting.direction === sortDirections.ASCENDING) {
            return a[sorting.field] - b[sorting.field];
        } else {
            return b[sorting.field] - a[sorting.field];
        }
    }
    if (sorting.field === "date") {
        const aDate = new Date(a[sorting.field]);
        const bDate = new Date(b[sorting.field]);
        if (sorting.direction === sortDirections.ASCENDING) {
            if (aDate < bDate) return -1;
            if (aDate > bDate) return 1;
            return 0;
        } else {
            if (aDate < bDate) return 1;
            if (aDate > bDate) return -1;
            return 0;
        }
    }
};