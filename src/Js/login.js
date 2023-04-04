const buildScreenQuery = (screenQuery) => {
	let finalQuery = "";
	let key, value;
	for (key in screenQuery) {
		value = screenQuery[key];
		if (typeof value === "number" || typeof value === "string") {
			if (finalQuery !== "") {
				finalQuery += `and (${key}: ${screenQuery[key]}px)`;
			} else {
				finalQuery += `(${key}: ${screenQuery[key]}px)`;
			}
		}
	}
	return finalQuery;
};

const screenQueries = {
	up: function (query) {
		return buildScreenQuery({ "min-width": this[query] });
	},
	down: function (query) {
		return buildScreenQuery({ "max-width": this[query] });
	},
	between: function (minQuery, maxQuery) {
		return buildScreenQuery({
			"min-width": this[minQuery],
			"max-width": this[maxQuery],
		});
	},
	xs: 320,
	sm: 600,
	md: 768,
	lg: 1024,
};

const matchesScreen = (screenQuery) => {
	let mediaQuery;
	if (typeof screenQuery === "object") {
		mediaQuery = window.matchMedia(buildScreenQuery(screenQuery));
	} else if (typeof screenQuery === "string") {
		mediaQuery = window.matchMedia(screenQuery);
	} else if (typeof screenQuery === "number") {
		mediaQuery = window.matchMedia(
			`(min-width: ${screenQuery}) and (max-width: ${screenQuery})`
		);
	}
	return { matches: (mediaQuery ?? {}).matches, mediaQuery };
};

const enablePageAnimation = (isMobile) => {
	const formToggleButton = document.querySelector("#formToggleButton");
	const formSubmitButton = document.querySelector("#formSubmitButton");
	const right = document.querySelector(".right");
	const left = document.querySelector(".left");
	const sidePanelTitle = document.querySelector("#sidePanelTitle");
	const sidePanelSubtitle = document.querySelector("#sidePanelSubtitle");

	const form = document.querySelector("#main-form");
	const formTitle = form.querySelector(".title");
	const forgotPasswordText = form.querySelector(".sub-title-2");
	const fieldsToHide = form.querySelectorAll(".field.field-is-hidden");

	formToggleButton.addEventListener("click", () => {
		// overlaySignIn.classList.add("active");

		if (formToggleButton.innerText === "Sign Up") {
			fieldsToHide.forEach((field) => {
				field.classList.remove("field-is-hidden");
				field.querySelector("input").setAttribute("required", "true");
			});

			if (!isMobile) {
				right.classList.add("is-active");
				left.classList.add("is-active");
			}

			formToggleButton.textContent = "Sign In";
			formSubmitButton.textContent = "Sign Up";

			formTitle.textContent = "Create Account";
			forgotPasswordText.setAttribute("style", "display: none");
			sidePanelTitle.textContent = "Hello, friend!";
			sidePanelSubtitle.textContent =
				"Don't have an account sign up now!!";
		} else if (formToggleButton.innerText === "Sign In") {
			fieldsToHide.forEach((field) => {
				field.classList.add("field-is-hidden");
				field.querySelector("input").removeAttribute("required");
			});

			if (!isMobile) {
				right.classList.remove("is-active");
				left.classList.remove("is-active");
			}

			formToggleButton.textContent = "Sign Up";
			formSubmitButton.textContent = "Sign In";

			formTitle.textContent = formSubmitButton.innerText;
			forgotPasswordText.setAttribute("style", "display: block");
			sidePanelTitle.textContent = "Welcome back, friend!";
			sidePanelSubtitle.textContent =
				"To keep connected with us please login with your personal info";
		}
	});
};

window.onload = () => {
	const isMobileScreen = matchesScreen(screenQueries.down("md")).matches;
	enablePageAnimation(isMobileScreen);
	// console.log(`Matches mobile: ${isMobileScreen}`);
};

window.onresize = () => {
	const isMobileScreen = matchesScreen(screenQueries.down("md")).matches;
	enablePageAnimation(isMobileScreen);
	// console.log(`Matches mobile: ${isMobileScreen}`);
};
