// Text for inital menu
function printInitialMenu() {
	var lineBreak = "\n";
	var header = colorYellow("Welcome to DollarsBank ATM!" + lineBreak + lineBreak);
	var firstOption = colorYellow("1)") + " Sign In" + lineBreak + lineBreak;
	var secondOption = colorYellow("2)") + " Create New Account" + lineBreak + lineBreak;
	var thirdOption = colorYellow("3)") + " Exit" + lineBreak;
	return header + firstOption + secondOption + thirdOption;
}

// Text for transaction menu
function printTransactionMenu() {
	var lineBreak = "\n";
	var header = colorYellow("Transaction Menu: " + lineBreak + lineBreak);
	var firstOption = colorYellow("1)") + " Check Account Balance" + lineBreak + lineBreak;
	var secondOption = colorYellow("2)") + " Deposit Funds" + lineBreak + lineBreak;
	var thirdOption = colorYellow("3)") + " Withdraw Funds" + lineBreak + lineBreak;
	var fourthOption = colorYellow("4)") + " Update PIN" + lineBreak + lineBreak;
	var fifthOption = colorYellow("5)") + " Print Transactions" + lineBreak + lineBreak;
	var sixthOption = colorYellow("6)") + " Sign Out" + lineBreak;
	return header + firstOption + secondOption + thirdOption + fourthOption + fifthOption + sixthOption;
}

// Prompt for account name
function printCreateAccountName() {
	return colorYellow("Enter your name: ");
}

// Prompt for account inital deposit
function printCreateAccountInitialDeposit() {
	return colorYellow("Enter initial deposit in the form: 00.00: ");
}

// Prompt for creating account PIN
function printCreateAccountEnterPIN() {
	return colorYellow("Enter secure PIN: 4 digit number: ");
}

// Prompt for verifying PIN
function printCreateAccountVerifyPIN() {
	return colorYellow("Verify PIN: ");
}

// Prompt for logging in PIN
function printLogInPIN() {
	return colorYellow("Enter PIN: ");
}

// Success for account creation
function printAccountCreationSuccess() {
	return colorYellow("Success! Thank you for banking with DollarsBank!");
}

// Prompt for updating PIN
function printUpdatePIN() {
	return colorYellow("Enter new PIN: 4 digit number: ");
}

// Prompt for withdrawing funds
function printWithdraw() {
	return colorYellow("Enter withdraw amount: ");
}

// Prompt for depositing funds
function printDeposit() {
	return colorYellow("Enter deposit amount: ");
}

// Display transactions header
function printTransactionDisplayHeader() {
	return colorYellow("All transactions: ");
}

// Display exit message
function printExiting() {
	return colorYellow("Exiting application. Thank you for using DollarsBank!");
}

// Display partition line for easier viewing
function printSeparateLine() {
	return "-----------------------";
}

// Error for unfinished section of app
function errorUnfinishedPart() {
	return colorRed("This section is not finished yet. Returning to menu.");
}

// Error for invalid menu input
function errorMenuInput() {
	return colorRed("Error reading menu option. Please select one of the given options.");
}

// Error for invalid number input
function errorNumberInput() {
	return colorRed("Input was not a valid positive number.");
}

// Error for invalid withdraw
function errorNotEnoughBalance() {
	return colorRed("You do not have enough in your balance to perform that transaction.");
}

// Error for invalid PIN
function errorInvalidPIN() {
	return colorRed("The given PIN is not valid. Please ensure it is a 4 digit number.");
}

// Error for mismatching PINs
function errorNotMatchingPIN() {
	return colorRed("The given PIN does not match the previously given PIN.");
}

// Error for no account/failed login
function errorNoAccount() {
	return colorRed("No account matches the given PIN.");
}

exports.initMenu = printInitialMenu();
exports.transactionMenu = printTransactionMenu();

exports.customerName = printCreateAccountName();
exports.initDeposit = printCreateAccountInitialDeposit();
exports.enterPIN = printCreateAccountEnterPIN();
exports.verifyPIN = printCreateAccountVerifyPIN();
exports.loginPIN = printLogInPIN();
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

// Display account balance
exports.accountBalance = function(pin, balance) {
	return "Account balance of " + colorBlue(pin) + " is " + colorGreen("$" + balance);
}

// Success for updating PIN
exports.updatePINSuccess = function(pin) {
	return "Account PIN updated to: " + colorBlue(pin);
}

// Success for withdraw or deposit, display new balance
exports.fundSuccess = function(balance) {
	return "New balance: " + colorGreen("$" + balance);
}

// Color text function for external use
exports.color = function(colorCode, text) {
	return "\x1b[" + colorCode + "m" + text + "\x1b[0m";
}

// Color text function for internal use
function colorText(colorCode, text) {
	return "\x1b[" + colorCode + "m" + text + "\x1b[0m";
}

// Color text red
function colorRed(text) {
	return colorText(31, text);
}

// Color text green
function colorGreen(text) {
	return colorText(32, text);
}

// Color text yellow
function colorYellow(text) {
	return colorText(33, text);
}

// Color text blue
function colorBlue(text) {
	return colorText(34, text);
}