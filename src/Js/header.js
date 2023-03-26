let navBar = document.getElementById("navBar");
let navBarMenu = document.getElementById("navbar-menu");
let navBarBurger = document.getElementById("navbar-burger");

document.addEventListener("scroll", function () {
	let scrollPosition = window.pageYOffset;

	if (scrollPosition > 10) {
		navBar.classList.add("solid");
	} else {
		navBar.classList.remove("solid");
	}
});

navBarBurger.addEventListener("click", function () {
	navBarMenu.classList.toggle("is-active");
	navBarBurger.classList.toggle("is-active");
	navBarBurger.classList.toggle("toggle");
});
