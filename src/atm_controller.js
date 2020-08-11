var account = require('./customer_account');
var view = require('./application_views');
const readline = require('readline');
const userInteract = readline.createInterface({
    input: process.stdin,
	output: process.stdout,
	terminal: false
});

// In memory account storage
var accounts = [];

// Application start point
function runMenu() {
	// Begin with inital menu
	initialMenu();
}

// Menu when user is not logged in and when starting application
function initialMenu() {
	console.log(view.separateLine);
	console.log(view.initMenu);
	userInteract.question("Enter your choice: ", (menuOption) => {
        if(menuOption == 1) {
			// Option 1: Log In
			loginMenu();
		} else if (menuOption == 2) {
			// Option 2: Create New Account
			createAccountMenu();
		} else if (menuOption == 3) {
			// Option 3: Exit Application
			console.log(view.exitingApp);
			userInteract.close();
		} else {
			// Incorrect input
			console.log(view.errorMenu + "\n");
			initialMenu();
		}
    })
}

// Menu when user is logged in and ready to make transactions
function transactionMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.transactionMenu);
	userInteract.question("Enter your choice: ", (menuOption) => {
        if (menuOption == 1) {
			// Option 1: Account Balance Display
			accountBalanceDisplay(userAccount);
		} else if (menuOption == 2) {
			// Option 2: Deposit Funds
			depositMenu(userAccount);
		} else if (menuOption == 3) {
			// Option 3: Withdraw Funds
			withdrawMenu(userAccount);
		} else if (menuOption == 4) {
			// Option 4: Update PIN
			updatePINMenu(userAccount);
		} else if (menuOption == 5) {
			// Option 5: Account Transaction Display
			accountTransactionsDisplay(userAccount);
		} else if (menuOption == 6) {
			// Option 6: Log Out and move to inital menu
			initialMenu();
		} else {
			// Incorrect input
			console.log(view.errorMenu + "\n");
			transactionMenu(userAccount);
		}
    })
}

// Logic when creating a new account
function createAccountMenu() {
	console.log(view.separateLine);
	// Ask for user's name, no validation
	userInteract.question(view.customerName, (nameInput) => {
		// Ask for initial deposit amount
		userInteract.question(view.initDeposit, (moneyInput) => {
			// Check that initial deposit is a valid number
			if(validateNumberInput(moneyInput)) {
				// Ask for account PIN
				userInteract.question(view.enterPIN, (pinInput) => {
					// Check that given PIN matches criteria
					if (verifyPIN(pinInput)) {
						// Ask to verify PIN
						userInteract.question(view.verifyPIN, (pinInputVerify) => {
							// Check that first and second PINs match
							if (pinInput == pinInputVerify) {
								// Create account
								var currentAccount = createAccount(nameInput, pinInput, parseFloat(moneyInput));
								console.log(view.accountSuccess);
							} else {
								// Display error for mismatched PIN inputs
								console.log(view.errorNotMatchingPIN);
							}
							// Return to initial menu
							initialMenu();
						})
					} else {
						// Display error for invalid PIN and return to initial menu
						console.log(view.errorInvalidPIN);
						initialMenu();
					}
				})
			} else {
				// Display error for invalid number and return to initial menu
				console.log(view.errorNumber);
				initialMenu();
			}
		})
    })
}

// Logic for logging user in to ATM
function loginMenu() {
	// Stand in for user account, un filled if improper credentials found
	var loggedInAccount = new account();
	console.log(view.separateLine);
	// pinInput is PIN to log in with
	userInteract.question(view.loginPIN, (pinInput) => {
		// Check that PIN is a valid PIN
		if(verifyPIN(pinInput)) {
			// Attempt to retrieve account based on pin input
			loggedInAccount = retrieveAccount(pinInput);

			// If the stand in account is not null, account retrieval was successful
			if(loggedInAccount.getPIN() != null) {
				// Move to transaction menu
				transactionMenu(loggedInAccount);
			} else {
				// Display account not found error and return to inital menu
				console.log(view.errorNoAccount);
				initialMenu();
			}
		} else {
			// Display invalid PIN error and return to initial menu
			console.log(view.errorInvalidPIN);
			initialMenu();
		}
	})
}

// Logic for depositing funds to account
function depositMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestDeposit);
	// moneyInpuy is amount to deposit
	userInteract.question("", (moneyInput) => {
		// Check if moneyInpuy is a valid number
		if (validateNumberInput(moneyInput)) {
			depositToAccount(userAccount, parseFloat(moneyInput));
		} else {
			// Display error for invalid number input
			console.log(view.errorNumber);
		}
		// Return to transaction menu
		transactionMenu(userAccount);
    })
}

// Logic for withdrawing funds from account
function withdrawMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestWithdraw);
	// moneyInput is amount to withdraw
	userInteract.question("", (moneyInput) => {
		// Check that moneyInput is numbers
		if (validateNumberInput(moneyInput)) {
			// Check that moneyInput is a valid amount to withdraw
			if(validateWithdraw(userAccount, parseFloat(moneyInput))) {
				withdrawFromAccount(userAccount, parseFloat(moneyInput));
			} else {
				// Display error for not enough funds to withdraw
				console.log(view.errorNotEnough);
			}
		} else {
			// Display error for invalid number input
			console.log(view.errorNumber);
		}
		// Return to transaction menu
		transactionMenu(userAccount);
    })
}

// Logic for updating account PIN
function updatePINMenu(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestUpdatePIN);
	// pinInput is new PIN to give to account
	userInteract.question("", (pinInput) => {
		// If first input is a valid PIN, continue
		if (verifyPIN(pinInput)) {
			// pinInputVerify is extra layer of security
			userInteract.question(view.verifyPIN, (pinInputVerify) => {
				// If the two inputs match, update the PIN of the account
				if (pinInput == pinInputVerify) {
					updateAccountPIN(userAccount, pinInput);
				} else {
					// Display mismatch PIN error
					console.log(view.errorNotMatchingPIN);
				}
				// Return to transaction menu
				transactionMenu(userAccount);
			})
		} else {
			// Display invalid PIN error and return to transaction menu
			console.log(view.errorInvalidPIN);
			transactionMenu(userAccount);
		}
    })
}

// Display header for account balance
function accountBalanceDisplay(userAccount) {
	console.log(view.separateLine);
	console.log(getAccountBalance(userAccount));

	// Return to transaction menu when done
	transactionMenu(userAccount);
}

// Display header for account transactions
function accountTransactionsDisplay(userAccount) {
	console.log(view.separateLine);
	console.log(view.requestTransactionsHeader);
	displayTransactions(userAccount);

	// Return to transaction menu when done
	transactionMenu(userAccount);
}

// Create a new account and add it to the system
function createAccount(name, pin, balance) {
	var transaction = "Created account for " + view.color(33, name) 
					+ " with PIN: " + view.color(34, pin)
					+ " and initial deposit of " + view.color(32, "$" + balance);
	var newAccount = new account(name, pin, balance);
	accounts.push(newAccount);
	newAccount.pushTransaction(transaction);

	return newAccount;
}

// Check that the PIN is a 4 digit number
function verifyPIN(pin) {
	var verified = false;
	if (pin.length == 4 && pin.match(/^[0-9]+$/) != null) {
		verified = true;
	}

	return verified;
}

// Check that the withdraw amount is not more than the available balance
function validateWithdraw(bankAccount, amount) {
	if (amount > bankAccount.getBalance()) {
		return false;
	} else {
		return true;
	}
}

// Check that the input is a number
function validateNumberInput(number) {
	var validNumber = true;
	if (number < 0 || isNaN(number)) {
		validNumber = false;
	}

	return validNumber;
}

// Deposit some funds to account
function depositToAccount(bankAccount, amount) {
	var transaction = "Deposited " + view.color(32, "$" + amount);
	bankAccount.deposit(amount);
	bankAccount.pushTransaction(transaction);
	console.log(view.fundSuccess(bankAccount.getBalance()));
}

// Withdraw some funds from account
function withdrawFromAccount(bankAccount, amount) {
	var transaction = "Withdrew " + view.color(32, "$" + amount);
	bankAccount.withdraw(amount);
	bankAccount.pushTransaction(transaction);
	console.log(view.fundSuccess(bankAccount.getBalance()));
}

// Update account PIN
function updateAccountPIN(bankAccount, updatedPin) {
	var transaction = "Updated PIN to " + view.color(34, updatedPin);
	bankAccount.updatePIN(updatedPin);
	bankAccount.pushTransaction(transaction);
	console.log(view.updatePINSuccess(bankAccount.getPIN()));
}

// Print account transactions
function displayTransactions(bankAccount) {
	console.log(bankAccount.getTransactions());
}


// Return an account based on a given PIN
function retrieveAccount(pin) {
	var retrievedAccount = new account();
	accounts.forEach(account => {
		if(account.getPIN() == pin) {
			retrievedAccount = account;
		}
	});

	return retrievedAccount;
}

// Print all accounts in system
function printAccounts() {
	accounts.forEach(account => {
		console.log(account.toStringForm());
	});
}

// Print account balance of given account
function getAccountBalance(bankAccount) {
	return view.accountBalance(bankAccount.getPIN(), bankAccount.getBalance());
}

// Run various tests
function runTests() {
	// testBasicThings();
	// testVerifyPIN();
	// testValidateWithdraw();
	// testValidateNumber();
	// testMenuDisplays();
	// testAccountFunctions();
}

// Print Hello: for testing
function getHello() {
	return "Hello";
}

// Various testing
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

// Testing withdraw validation
function testValidateWithdraw() {
	var testing = new account('Daniel', 1234, 500.0);
	var validWithdraw = 200;
	var invalidWithdraw = 600;

	console.log(validWithdraw + " is a valid amount to withdraw: " + validateWithdraw(testing, validWithdraw));
	console.log(invalidWithdraw + " is a valid amount to withdraw: " + validateWithdraw(testing, invalidWithdraw));
}

// Testing number validation
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

// Testing PIN verification
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

// Testing various account functions
function testAccountFunctions() {
	var testing = new account('Daniel', 1234, 500.0);

	console.log(testing.toStringForm());

	testing.pushTransaction("Created account for " + testing.getName() + " with PIN: " + testing.getPIN());
	testing.pushTransaction("Test Transaction 2");
	testing.pushTransaction("Test Transaction 3");

	// console.log(testing.toStringForm());

	depositToAccount(testing, 100.0);
	withdrawFromAccount(testing, 50.5);
	updateAccountPIN(testing, 2232);

	// console.log(testing.toStringForm());

	//displayTransactions(testing);

	var reversedAccount = createAccount(testing.getName(), testing.getPIN(), testing.getBalance());
	var account3 = createAccount("Danny Boy", "5590", 300.00);
	printAccounts();

	var retrievedAccount = retrieveAccount(2232);
	console.log("Retrieved account: " + retrievedAccount.toStringForm());
}

// Test initial and transaction menu displays
function testMenuDisplays() {
	console.log(view.initMenu);
	console.log(view.transactionMenu);
}

exports.runApp = runMenu();
exports.runTests = runTests();