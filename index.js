var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents a user.
 *
 * @class
 * @implements {IEntity}
 */
var User = /** @class */ (function () {
    function User(firstName, lastName, money) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.money = money;
    }
    User.prototype.getMoney = function () {
        return this.money;
    };
    User.prototype.addMoney = function (amount) {
        this.money += amount;
    };
    User.prototype.backMoney = function (amount) {
        if (this.money < amount) {
            return false;
        }
        this.money -= amount;
        return true;
    };
    return User;
}());
var Lender = /** @class */ (function (_super) {
    __extends(Lender, _super);
    function Lender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lender;
}(User));
var Borrower = /** @class */ (function (_super) {
    __extends(Borrower, _super);
    function Borrower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Borrower;
}(User));
/**
 * @classdesc Represents a bank.
 * @class Bank
 * @implements {IEntity}
 */
var Bank = /** @class */ (function () {
    function Bank(name, money) {
        this.name = name;
        this.money = money;
    }
    Bank.prototype.getMoney = function () {
        return this.money;
    };
    Bank.prototype.addMoney = function (amount) {
        this.money += amount;
    };
    Bank.prototype.backMoney = function (amount) {
        if (this.money < amount) {
            return false;
        }
        this.money -= amount;
        return true;
    };
    return Bank;
}());
/**
 * Represents a transaction between a lender and a borrower.
 */
var Transaction = /** @class */ (function () {
    function Transaction(lender, borrower) {
        this.lender = lender;
        this.borrower = borrower;
    }
    Transaction.prototype.lend = function (amount) {
        if (this.lender.backMoney(amount)) {
            this.borrower.addMoney(amount);
        }
        else {
            console.log('Transaction could not be completed');
        }
    };
    Transaction.prototype.getMoneyBack = function (amount) {
        if (this.borrower.backMoney(amount)) {
            this.lender.addMoney(amount);
        }
        else {
            console.log('Payback could not be completed');
        }
    };
    return Transaction;
}());
var lender = new Lender('borrower', 'Le', 1000);
var borrower = new Borrower('Jonny', 'Nguyen', 500);
var bank = new Bank('ABC', 20000);
var transaction1 = new Transaction(lender, borrower);
var transaction2 = new Transaction(bank, borrower);
console.log({ lender: lender.getMoney(), borrower: borrower.getMoney() });
transaction1.lend(100);
transaction1.lend(100);
console.log({ lender: lender.getMoney(), borrower: borrower.getMoney() });
transaction1.getMoneyBack(100);
transaction1.getMoneyBack(100);
console.log({ lender: lender.getMoney(), borrower: borrower.getMoney() });
console.log("=========BANK=========");
transaction2.lend(1500);
console.log({ bank: bank.getMoney(), borrower: borrower.getMoney() });
transaction2.getMoneyBack(1500);
console.log({ bank: bank.getMoney(), borrower: borrower.getMoney() });
