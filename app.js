const password = document.querySelector(".password");
const range = document.querySelector('#range');
const upperEl = document.querySelector("#upper");
const lowerEl = document.querySelector("#lower");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const btn = document.querySelector(".btn");
const copy = document.querySelector(".copy");
btn.addEventListener("click", hasSittingsCheck);
copy.addEventListener("click", copyPassword);

const configObj = {
	lower: getLowerLetter,
	upper: getUpperLetter,
	number: getNumber,
	symbol: getSymbol
}

hasSittingsCheck();

function passwordGenerate(upper, lower, number, symbol, length) {
	const typesCount = upper + lower + number + symbol;
	const typesArray = [{upper}, {lower}, {number}, {symbol}];

	if(typesCount === 0) return "";

	const hasTrue = typesArray.filter(sitting => (Object.values(sitting)[0]));

	let passwordGenerateData = '';

	for (let start = 0; start < length; start += typesCount){
		hasTrue.forEach(item => {
			const keys = Object.keys(item)[0];
			passwordGenerateData += configObj[keys]();
		})
	}

	passwordGenerateData = passwordGenerateData.slice(0, length);

	return passwordGenerateData;
}

function hasSittingsCheck() {

	const hasValue = +range.value;
	const hasUpper = upperEl.checked;
	const hasLower = lowerEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	password.innerHTML = passwordGenerate(hasUpper, hasLower, hasNumber, hasSymbol, hasValue);
}

function copyPassword() {
	const textarea = document.createElement('textarea');
	const passwords = password.innerText;
	
	if(!passwords) { return; }
	
	textarea.value = passwords;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
}

function getLowerLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpperLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}