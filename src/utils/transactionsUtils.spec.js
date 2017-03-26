import * as utils from "./transactionsUtils";
import mock from "../../testUtils/mocks/transactionsMock";
import * as sortDirections from "../constants/sortDirections";

describe("transaction utils", () => {

    let transactions = [...mock];
    const rate = 10;

    beforeEach(() => transactions = [...mock]);

    describe("filter", () => {

        it("should return all transactions if filter is null", () => {
            expect(transactions.filter(utils.filter(null, rate))).toEqual(mock);
        });

        it("should filter transactions by start date", () => {
            const expectedResult = [
                mock[0],
                mock[1],
                mock[3],
            ];
            expect(transactions.filter(utils.filter({ dateStart: new Date("10 06 2014") }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by end date", () => {
            const expectedResult = [
                mock[1],
                mock[2],
                mock[4],
            ];
            expect(transactions.filter(utils.filter({ dateEnd: new Date("10 06 2014") }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by start and end date", () => {
            const expectedResult = [
                mock[0],
                mock[1],
                mock[2],
            ];
            expect(transactions.filter(utils.filter({ dateStart: new Date("10 06 2013"), dateEnd: new Date("10 07 2016") }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by customer", () => {
            const expectedResult = [
                mock[0],
            ];
            expect(transactions.filter(utils.filter({ customer: "customer 1" }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by contractor", () => {
            const expectedResult = [
                mock[0],
            ];
            expect(transactions.filter(utils.filter({ contractor: "contractor 1" }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by min amount", () => {
            const expectedResult = [
                mock[1],
                mock[3],
                mock[4],
            ];
            expect(transactions.filter(utils.filter({ amountStart: 45 }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by min amount in USD", () => {
            const expectedResult = [
                mock[1],
                mock[3],
                mock[4],
            ];
            expect(transactions.filter(utils.filter({ amountStart: 45 * rate, isUsd: true }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by max amount", () => {
            const expectedResult = [
                mock[0],
                mock[1],
                mock[2],
            ];
            expect(transactions.filter(utils.filter({ amountEnd: 50 }, rate))).toEqual(expectedResult);
        });

        it("should filter transactions by max amount in USD", () => {
            const expectedResult = [
                mock[0],
                mock[1],
                mock[2],
            ];
            expect(transactions.filter(utils.filter({ amountEnd: 50 * rate, isUsd: true }, rate))).toEqual(expectedResult);
        });

    });

    describe("sort", () => {

        it("should not change order if filter is null", () => {
            const expectedResult = [...mock];
            expect(transactions.sort(utils.sort(null))).toEqual(expectedResult);
        });

        it("should sort by amount by ascending", () => {
            const expectedResult = [
                mock[2],
                mock[0],
                mock[1],
                mock[4],
                mock[3],
            ];
            expect(transactions.sort(utils.sort({ field: "amount", direction: sortDirections.ASCENDING }))).toEqual(expectedResult);
        });

        it("should sort by amount by descending", () => {
            const expectedResult = [
                mock[3],
                mock[4],
                mock[1],
                mock[0],
                mock[2],
            ];
            expect(transactions.sort(utils.sort({ field: "amount", direction: sortDirections.DESCENDING }))).toEqual(expectedResult);
        });

    });

});