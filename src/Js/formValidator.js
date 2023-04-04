const form = document.querySelector("#main-form");

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");

	const error = formField.querySelector("small");
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");

	const error = formField.querySelector("small");
	error.textContent = "";
};

const isGreater = (length, max) => {
	return typeof length === "number" && length > max;
};

const validators = {
	firstName: (firstNameEl) => {
		let valid = false;
		const max = 500;
		const firstName = firstNameEl.value.trim();

		if (isGreater(firstName.length, max)) {
			showError(
				firstNameEl,
				`First name must be between ${max} characters`
			);
		} else {
			showSuccess(firstNameEl);
			valid = true;
		}
		return valid;
	},
	lastName: (lastNameEl) => {
		let valid = false;
		const max = 500;
		const lastName = lastNameEl.value.trim();

		if (isGreater(lastName.length, max)) {
			showError(
				lastNameEl,
				`First name must be between ${max} characters`
			);
		} else {
			showSuccess(lastNameEl);
			valid = true;
		}
		return valid;
	},
	confirmEmail: (emailEl, confirmEmailEl) => {
		let valid = false;
		const email = emailEl.value.trim();
		const confirmEmail = confirmEmailEl.value.trim();

		if (email !== confirmEmail) {
			showError(confirmEmailEl, "Confirm, email does not match");
		} else {
			showSuccess(confirmEmailEl);
			valid = true;
		}
		return valid;
	},
	confirmPassword: (passwordEl, confirmPasswordEl) => {
		let valid = false;
		const password = passwordEl.value.trim();
		const confirmPassword = confirmPasswordEl.value.trim();

		if (password !== confirmPassword) {
			showError(confirmPasswordEl, "Confirm, password does not match");
		} else {
			showSuccess(confirmPasswordEl);
			valid = true;
		}
		return valid;
	},
	email: (emailEl) => {
		let valid = false;
		const email = emailEl.value.trim();

		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			showError(emailEl, "Email is not valid");
		} else {
			showSuccess(emailEl);
			valid = true;
		}
		return valid;
	},
	password: (passwordEl) => {
		let valid = false;
		const password = passwordEl.value.trim();

		if (
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
				password
			)
		) {
			showError(
				passwordEl,
				"Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)"
			);
		} else {
			showSuccess(passwordEl);
			valid = true;
		}
		return valid;
	},
	phoneNumber: (phoneNumberEl) => {
		let valid = false;
		const phoneNumber = phoneNumber.value.trim();

		if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(phoneNumber)) {
			showError(phoneNumberEl, "Phone number is not valid");
		} else {
			showSuccess(phoneNumberEl);
			valid = true;
		}
		return valid;
	},
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const buttonStatus = e.target.formSubmitButton.textContent;
	const isSignIn = buttonStatus === "Sign In";

	if (isSignIn) {
		const [isValidEmail, isValidPassword] = [
			validators.email(e.target.email),
			validators.password(e.target.password),
		];
		if (isValidEmail && isValidPassword) {
			// do stuff...
		}
	} else {
		const [
			isValidFirstName,
			isValidLastName,
			isValidEmail,
			isValidPassword,
			isPasswordConfirmed,
		] = [
			validators.firstName(e.target.firstName),
			validators.lastName(e.target.lastName),
			validators.email(e.target.email),
			validators.password(e.target.password),
			validators.confirmPassword(
				e.target.password,
				e.target.confirmPassword
			),
		];
		if (
			isValidFirstName &&
			isValidLastName &&
			isValidEmail &&
			isValidPassword &&
			isPasswordConfirmed
		) {
			// do stuff...
		}
	}
});
