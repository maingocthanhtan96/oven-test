/**
 * Represents an entity with a money balance.
 * @interface
 */
interface IEntity {
    getMoney(): number
    addMoney(amount: number): void
    backMoney(amount: number): boolean // returns false if not enough money
}

interface ITransaction {
    lend(amount: number): void
    getMoneyBack(amount: number): void
}

/**
 * Represents a user.
 *
 * @class
 * @implements {IEntity}
 */
class User implements IEntity {
    constructor(private readonly firstName: string, private readonly lastName: string, private money: number) {
    }

    getMoney(): number {
        return this.money;
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    backMoney(amount: number): boolean {
        if (this.money < amount) {
            return false;
        }
        this.money -= amount;
        return true;
    }
}

class Lender extends User { }
class Borrower extends User { }

/**
 * @classdesc Represents a bank.
 * @class Bank
 * @implements {IEntity}
 */
class Bank implements IEntity {
    constructor(private readonly name: string, private money: number) {}

    getMoney(): number {
        return this.money;
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    backMoney(amount: number): boolean {
        if (this.money < amount) {
            return false;
        }
        this.money -= amount;
        return true;
    }
}

/**
 * Represents a transaction between a lender and a borrower.
 */
class Transaction implements ITransaction {
    constructor(private readonly lender: IEntity, private readonly borrower: IEntity) {}

    lend(amount: number): void {
        if (this.lender.backMoney(amount)) {
            this.borrower.addMoney(amount);
        } else {
            console.log('Transaction could not be completed');
        }
    }

    getMoneyBack(amount: number): void {
        if (this.borrower.backMoney(amount)) {
            this.lender.addMoney(amount);
        } else {
            console.log('Payback could not be completed');
        }
    }
}

const lender = new Lender('borrower', 'Le', 1000);
const borrower = new Borrower('Jonny', 'Nguyen', 500);
const bank = new Bank('ABC', 20000);
const transaction1 = new Transaction(lender, borrower);
const transaction2 = new Transaction(bank, borrower);

console.log({lender: lender.getMoney(), borrower: borrower.getMoney()})
transaction1.lend(100);
transaction1.lend(100);
console.log({lender: lender.getMoney(), borrower: borrower.getMoney()})
transaction1.getMoneyBack(100);
transaction1.getMoneyBack(100);
console.log({lender: lender.getMoney(), borrower: borrower.getMoney()})

console.log("=========BANK=========");
transaction2.lend(1500);
console.log({bank: bank.getMoney(), borrower: borrower.getMoney()})
transaction2.getMoneyBack(1500);
console.log({bank: bank.getMoney(), borrower: borrower.getMoney()})
