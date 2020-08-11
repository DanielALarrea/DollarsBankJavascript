// exports.customerAccount = function (name, pin, balance) {
// 	this.name = name;
// 	this.pin = pin;
// 	this.balance = balance;
// 	this.transactions = [];

// 	function deposit(amount) {
// 		this.balance += amount;
// 	}

// 	function withdraw(amount) {
// 		this.balance -= amount;
// 	}

// 	function updatePIN(newPIN) {
// 		this.pin = newPIN;
// 	}

// 	function getName() {
// 		return this.name;
// 	}

// 	function getPIN() {
// 		return this.pin;
// 	}

// 	function getBalance() {
// 		return this.balance;
// 	}

// 	function pushTransaction(transaction) {
// 		this.transactions.push(transaction);
// 	}
// }

function account(name, pin, balance) {
	this.name = name;
	this.pin = pin;
	this.balance = balance;
	this.transactions = [];
}

account.prototype.deposit = function(amount) {
	this.balance += amount;
}

account.prototype.withdraw = function(amount) {
	this.balance -= amount;
}

account.prototype.updatePIN = function(newPIN) {
	this.pin = newPIN;
}

account.prototype.pushTransaction = function(transaction) {
	this.transactions.push(transaction);
}

account.prototype.getName = function() {
	return this.name;
}

account.prototype.getPIN = function() {
	return this.pin;
}

account.prototype.getBalance = function() {
	return this.balance;
}

account.prototype.getTransactions = function() {
	var allTransactions = "\n";
	this.transactions.forEach(transaction => {
		allTransactions += transaction + "\n";
	});

	return allTransactions;
}

account.prototype.toStringForm = function() {
	var combined = "Name: " + this.getName() + "\n"
				 + "PIN: " + this.getPIN() + "\n"
				 + "Balance: " + this.getBalance() + "\n"
				 + "Transactions: " + this.getTransactions();

	return combined;
}

module.exports = account;