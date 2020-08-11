function printInitialMenu() {
	var lineBreak = "\n";
	var header = colorYellow("Welcome to DollarsBank!" + lineBreak + lineBreak);
	var firstOption = colorYellow("1)") + " Open Transaction Menu" + lineBreak + lineBreak;
	var secondOption = colorYellow("2)") + " Create New Account" + lineBreak + lineBreak;
	var thirdOption = colorYellow("3)") + " Exit" + lineBreak;
	return header + firstOption + secondOption + thirdOption;
}

function printTransactionMenu() {
	var lineBreak = "\n";
	var header = colorYellow("Transaction Menu: " + lineBreak + lineBreak);
	var firstOption = colorYellow("1)") + " Check Account Balance" + lineBreak + lineBreak;
	var secondOption = colorYellow("2)") + " Deposit Funds" + lineBreak + lineBreak;
	var thirdOption = colorYellow("3)") + " Withdraw Funds" + lineBreak + lineBreak;
	var fourthOption = colorYellow("4)") + " Update PIN" + lineBreak + lineBreak;
	var fifthOption = colorYellow("5)") + " Print Transactions" + lineBreak;
	return header + firstOption + secondOption + thirdOption + fourthOption + fifthOption;
}

function printCreateAccountName() {
	return colorYellow("Enter your name: ");
}

function printCreateAccountInitialDeposit() {
	return colorYellow("Enter initial deposit in the form: 00.00: ");
}

function printCreateAccountEnterPIN() {
	return colorYellow("Enter secure PIN: 4 digit number: ");
}

function printCreateAccountVerifyPIN() {
	return colorYellow("Verify PIN: ");
}

function printAccountCreationSuccess() {
	return colorYellow("Success! Thank you for banking with DollarsBank!");
}

function printUpdatePIN() {
	return colorYellow("Enter new PIN: 4 digit number: ");
}

function printWithdraw() {
	return colorYellow("Enter withdraw amount: ");
}

function printDeposit() {
	return colorYellow("Enter deposit amount: ");
}

function printTransactionDisplayHeader() {
	return colorYellow("All transactions: ");
}

function printExiting() {
	return colorYellow("Exiting application. Thank you for using DollarsBank!");
}

function printSeparateLine() {
	return "-----------------------";
}

function errorUnfinishedPart() {
	return colorRed("This section is not finished yet. Returning to menu.");
}

function errorMenuInput() {
	return colorRed("Error reading menu option. Please select one of the given options.");
}

function errorNumberInput() {
	return colorRed("Input was not a valid positive number.");
}

function errorNotEnoughBalance() {
	return colorRed("You do not have enough in your balance to perform that transaction.");
}

function errorInvalidPIN() {
	return colorRed("The given PIN is not valid. Please ensure it is a 4 digit number.");
}

function errorNotMatchingPIN() {
	return colorRed("The given PIN does not match the previously given PIN.");
}

function errorNoAccount() {
	return colorRed("No account has been created. Please create an account.");
}

exports.initMenu = printInitialMenu();
exports.transactionMenu = printTransactionMenu();

exports.customerName = printCreateAccountName();
exports.initDeposit = printCreateAccountInitialDeposit();
exports.enterPIN = printCreateAccountEnterPIN();
exports.verifyPIN = printCreateAccountVerifyPIN();
exports.accountSuccess = printAccountCreationSuccess();

exports.requestUpdatePIN = printUpdatePIN();
exports.requestWithdraw = printWithdraw();
exports.requestDeposit = printDeposit();
exports.requestTransactionsHeader = printTransactionDisplayHeader();

exports.exitingApp = printExiting();
exports.separateLine = printSeparateLine();
exports.unfinishedPart = errorUnfinishedPart();

exports.errorMenu = errorMenuInput();
exports.errorNumber = errorNumberInput();
exports.errorNotEnough = errorNotEnoughBalance();
exports.errorInvalidPIN = errorInvalidPIN();
exports.errorNotMatchingPIN = errorNotMatchingPIN();
exports.errorNoAccount = errorNoAccount();

exports.accountBalance = function(pin, balance) {
	return "Account balance of " + colorBlue(pin) + " is " + colorGreen("$" + balance);
}

exports.updatePINSuccess = function(pin) {
	return "Account PIN updated to: " + colorBlue(pin);
}

exports.fundSuccess = function(balance) {
	return "New balance: " + colorGreen("$" + balance);
}

exports.color = function(colorCode, text) {
	return "\x1b[" + colorCode + "m" + text + "\x1b[0m";
}

function colorText(colorCode, text) {
	return "\x1b[" + colorCode + "m" + text + "\x1b[0m";
}

function colorRed(text) {
	return colorText(31, text);
}

function colorGreen(text) {
	return colorText(32, text);
}

function colorYellow(text) {
	return colorText(33, text);
}

function colorBlue(text) {
	return colorText(34, text);
}