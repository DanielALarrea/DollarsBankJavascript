var account = require('./customer_account');
var view = require('./application_views');
const readline = require('readline');
const userInteract = readline.createInterface({
    input: process.stdin,
	output: process.stdout,
	terminal: false
});

var accounts = [];

function runTests() {
	runMenu();
	// testBasicThings();
	//testVerifyPIN();
	//testValidateWithdraw();
	//testValidateNumber();
	// testMenuDisplays();
	//testAccountRetrieval();
}

function runMenu() {
	/*
		TODO
		Ask to do more transactions after performing one
	*/

	var userAccount = new account();
	var testAccount = new account('Daniel', 1234, 500.0);

	testAccount.pushTransaction("Created account for " + 'Daniel' + " with PIN: " + 1234);
	
	initialMenu(userAccount);
}

function initialMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.initMenu);
	userInteract.question("Enter your choice: ", (menuOption) => {
        if(menuOption == 1) {
			if(userAccount.getPIN() != null) {
			transactionMenu(userAccount);
		} else {
			console.log(view.errorNoAccount);
			initialMenu(userAccount);
		}
		} else if (menuOption == 2) {
			createAccountMenu(userAccount);
		} else if (menuOption == 3) {
			console.log(view.exitingApp);
			userInteract.close();
		} else {
			console.log(view.errorMenu + "\n");
			initialMenu(userAccount);
		}
    })
}

function transactionMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.transactionMenu);
	userInteract.question("Enter your choice: ", (menuOption) => {
        if(menuOption == 0) {
			initialMenu(userAccount);
		} else if (menuOption == 1) {
			accountBalanceDisplay(userAccount);
		} else if (menuOption == 2) {
			depositMenu(userAccount);
		} else if (menuOption == 3) {
			withdrawMenu(userAccount);
		} else if (menuOption == 4) {
			updatePINMenu(userAccount);
		} else if (menuOption == 5) {
			accountTransactionsDisplay(userAccount);
		} else {
			console.log(view.errorMenu + "\n");
			transactionMenu(userAccount);
		}
    })
}

function createAccountMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.unfinishedPart);
	userInteract.question(view.customerName, (nameInput) => {
		userInteract.question(view.initDeposit, (moneyInput) => {
			if(validateNumberInput(moneyInput)) {
				userInteract.question(view.enterPIN, (pinInput) => {
					if (verifyPIN(pinInput)) {
						userInteract.question(view.verifyPIN, (pinInputVerify) => {
							if (pinInput == pinInputVerify) {
								var currentAccount = createAccount(nameInput, pinInput, parseFloat(moneyInput));
								console.log(view.accountSuccess);
								initialMenu(currentAccount);
							} else {
								console.log(view.errorNotMatchingPIN);
								initialMenu(userAccount);
							}
						})
					} else {
						console.log(view.errorInvalidPIN);
						initialMenu(userAccount);
					}
				})
			} else {
				console.log(view.errorNumber);
				initialMenu(userAccount);
			}
		})
		// initialMenu(userAccount);
    })
	// initialMenu(userAccount);
}

function depositMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestDeposit);
	userInteract.question("", (moneyInput) => {
		if (validateNumberInput(moneyInput)) {
			depositToAccount(userAccount, parseFloat(moneyInput));
		} else {
			console.log(view.errorNumber);
		}
		transactionMenu(userAccount);
    })
}

function withdrawMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestWithdraw);
	userInteract.question("", (moneyInput) => {
		if (validateNumberInput(moneyInput)) {
			if(validateWithdraw(userAccount, parseFloat(moneyInput))) {
				withdrawFromAccount(userAccount, parseFloat(moneyInput));
			} else {
				console.log(view.errorNotEnough);
			}
		} else {
			console.log(view.errorNumber);
		}
		transactionMenu(userAccount);
    })
}

function updatePINMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestUpdatePIN);
	userInteract.question("", (pinInput) => {
		if (verifyPIN(pinInput)) {
			userInteract.question(view.verifyPIN, (pinInputVerify) => {
				if (pinInput == pinInputVerify) {
					updateAccountPIN(userAccount, pinInput);
				} else {
					console.log(view.errorNotMatchingPIN);
				}
				transactionMenu(userAccount);
			})
		} else {
			transactionMenu(userAccount);
		}
    })
}

function accountBalanceDisplay(userAccount) {
	console.log(view.separateLine);
	console.log(getAccountBalance(userAccount));

	transactionMenu(userAccount);
}

function accountTransactionsDisplay(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestTransactionsHeader);
	displayTransactions(userAccount);

	transactionMenu(userAccount);
}

function createAccount(name, pin, balance) {
	var transaction = "Created account for " + view.color(33, name) + " with PIN: " + view.color(34, pin);
	var newAccount = new account(name, pin, balance);
	accounts.push(newAccount);
	newAccount.pushTransaction(transaction);

	return newAccount;
}

function verifyPIN(pin) {
	var verified = false;
	if (pin.length == 4 && pin.match(/^[0-9]+$/) != null) {
		verified = true;
	}

	return verified;
}

function validateWithdraw(bankAccount, amount) {
	if (amount > bankAccount.getBalance()) {
		return false;
	} else {
		return true;
	}
}

function validateNumberInput(number) {
	var validNumber = true;
	if (number < 0 || isNaN(number)) {
		validNumber = false;
	}

	return validNumber;
}

function depositToAccount(bankAccount, amount) {
	var transaction = "Deposited " + view.color(32, "$" + amount);
	bankAccount.deposit(amount);
	bankAccount.pushTransaction(transaction);
	console.log(view.fundSuccess(bankAccount.getBalance()));
}

function withdrawFromAccount(bankAccount, amount) {
	var transaction = "Withdrew " + view.color(32, "$" + amount);
	bankAccount.withdraw(amount);
	bankAccount.pushTransaction(transaction);
	console.log(view.fundSuccess(bankAccount.getBalance()));
}

function updateAccountPIN(bankAccount, updatedPin) {
	var transaction = "Updated PIN to " + view.color(34, updatedPin);
	bankAccount.updatePIN(updatedPin);
	bankAccount.pushTransaction(transaction);
	console.log(view.updatePINSuccess(bankAccount.getPIN()));
}

function displayTransactions(bankAccount) {
	console.log(bankAccount.getTransactions());
}

function printAccounts() {
	for(let i = 0; i < accounts.length; i++) {
		console.log(accounts[i].toStringForm());
	}
}

function getHello() {
	return "Hello";
}

function getAccountBalance(bankAccount) {
	return view.accountBalance(bankAccount.getPIN(), bankAccount.getBalance());
}

function testBasicThings() {
	var hello = getHello();
	console.log("Saying Hello: " + hello);
	
	var testing = new account('Daniel', 1234, 500.0);
	console.log("Testing the getBalance function: " + testing.getBalance());
	// testing.deposit(100);
	depositToAccount(testing, 100.1);
	console.log("Testing the deposit function: " + testing.getBalance());

	var accountInfo = getAccountBalance(testing);
	console.log("Getting some account info: " + accountInfo);
}

function testValidateWithdraw() {
	var testing = new account('Daniel', 1234, 500.0);
	var validWithdraw = 200;
	var invalidWithdraw = 600;

	console.log(validWithdraw + " is a valid amount to withdraw: " + validateWithdraw(testing, validWithdraw));
	console.log(invalidWithdraw + " is a valid amount to withdraw: " + validateWithdraw(testing, invalidWithdraw));
}

function testValidateNumber() {
	var validNumber1 = 200;
	var validNumber2 = 300.0;
	var invalidNum1 = -100;
	var invalidNum2 = "awdw232de234";

	console.log(validNumber1 + " is a valid number: " + validateNumberInput(validNumber1));
	console.log(validNumber2 + " is a valid number: " + validateNumberInput(validNumber2));
	console.log(invalidNum1 + " is a valid number: " + validateNumberInput(invalidNum1));
	console.log(invalidNum2 + " is a valid number: " + validateNumberInput(invalidNum2));
}

function testVerifyPIN() {
	var testPin1 = "1234";
	// var verifyPin1 = "1234";
	console.log(testPin1 + " is a valid PIN: " + verifyPIN(testPin1));

	var testPin2 = "1234";
	// var verifyPin2 = "1235";
	console.log(testPin2 + " is a valid PIN: " + verifyPIN(testPin2));

	var testPin3 = "123";
	// var verifyPin3 = "123";
	console.log(testPin3 + " is a valid PIN: " + verifyPIN(testPin3));

	var testPin4 = "123W";
	// var verifyPin4 = "123W";
	console.log(testPin4 + " is a valid PIN: " + verifyPIN(testPin4));

	var testPin5 = "1-34";
	// var verifyPin5 = "1-34";
	console.log(testPin5 + " is a valid PIN: " + verifyPIN(testPin5));
}

function testAccountRetrieval() {
	var testing = new account('Daniel', 1234, 500.0);

	console.log(testing.toStringForm());

	testing.pushTransaction("Created account for " + testing.getName() + " with PIN: " + testing.getPIN());
	testing.pushTransaction("Test Transaction 2");
	testing.pushTransaction("Test Transaction 3");

	console.log(testing.toStringForm());

	depositToAccount(testing, 100.0);
	withdrawFromAccount(testing, 50.5);
	updateAccountPIN(testing, 2232);

	console.log(testing.toStringForm());

	displayTransactions(testing);

	var reversedAccount = createAccount(testing.getName(), testing.getPIN(), testing.getBalance());
	var account3 = createAccount("Danny Boy", "5590", 300.00);
	printAccounts();
}

function testMenuDisplays() {
	console.log(view.initMenu);
	console.log(view.transactionMenu);
}

exports.runTests = runTests();
// exports.runApp = runMenu();