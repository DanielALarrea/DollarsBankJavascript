// Model for bank account
function account(name, pin, balance) {
	// Account has name, PIN, balance, and list of transactions
	this.name = name;
	this.pin = pin;
	this.balance = balance;
	this.transactions = [];
}

// Add to balance
account.prototype.deposit = function(amount) {
	this.balance += amount;
}

// Subtract from balance
account.prototype.withdraw = function(amount) {
	this.balance -= amount;
}

// Change PIN
account.prototype.updatePIN = function(newPIN) {
	this.pin = newPIN;
}

// Add transaction
account.prototype.pushTransaction = function(transaction) {
	this.transactions.push(transaction);
}

// Retrieve name
account.prototype.getName = function() {
	return this.name;
}

// Retrieve PIN
account.prototype.getPIN = function() {
	return this.pin;
}

// Retrieve balance
account.prototype.getBalance = function() {
	return this.balance;
}

// Retrieve all transactions as single string
account.prototype.getTransactions = function() {
	var allTransactions = "\n";
	this.transactions.forEach(transaction => {
		allTransactions += transaction + "\n";
	});

	return allTransactions;
}

// Account data as single string
account.prototype.toStringForm = function() {
	var combined = "Name: " + this.getName() + "\n"
				 + "PIN: " + this.getPIN() + "\n"
				 + "Balance: " + this.getBalance() + "\n"
				 + "Transactions: " + this.getTransactions();

	return combined;
}

// Export account
module.exports = account;