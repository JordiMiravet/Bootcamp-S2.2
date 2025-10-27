
// Exercise 6

const validateInput = (input, isValid) => {
	if(!isValid){
		input.classList.remove("is-valid");
		input.classList.add("is-invalid");
	}else{
		input.classList.remove("is-invalid");
		input.classList.add("is-valid");
	}
}

function getInputsForm(){
	const fName = document.getElementById("fName");
	const fLastN = document.getElementById("fLastN");
	const fEmail = document.getElementById("fEmail");
	const fPassword = document.getElementById("fPassword");
	const fAddress = document.getElementById("fAddress");
	const fPhone = document.getElementById("fPhone");

	return { fName, fLastN, fEmail, fPassword, fAddress, fPhone };
}

function getRegex(){
	const regexOnlyText = /^[a-zA-ZÀ-ÿ\s]+$/;
	const regexOnlyNumbers = /^[0-9]*$/;
	const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
	const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	return { regexOnlyText, regexOnlyNumbers, regexPassword, regexMail }
}
const validate = () => {
	const { fName, fLastN, fEmail, fPassword, fAddress, fPhone } = getInputsForm();
	const { regexOnlyText, regexOnlyNumbers, regexPassword, regexMail } = getRegex();
	
    const fieldsValidate = [
		{ input: fName, isValid: () => fName.value.trim().length >= 3 && regexOnlyText.test(fName.value) },
		{ input: fLastN, isValid: () => fLastN.value.trim().length >= 3 && regexOnlyText.test(fLastN.value) },
		{ input: fEmail, isValid: () => fEmail.value.length >= 3 && regexMail.test(fEmail.value) },
		{ input: fPassword, isValid: () => fPassword.value.trim().length >= 3 && regexPassword.test(fPassword.value) },
		{ input: fAddress, isValid: () => fAddress.value.trim().length >= 3 },
		{ input: fPhone, isValid: () => fPhone.value.trim().length >= 9 && regexOnlyNumbers.test(fPhone.value) }
	];

	fieldsValidate.forEach(({ input, isValid }) => {
		validateInput(input, isValid());
	});
    
}
document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	validate();
})
