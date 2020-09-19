window.onscroll = ()=> {
	navShrink();
}

function navShrink() {
	const scrolled = window.scrollY;
	let navLogo = document.querySelector('.header-logo');

	if(scrolled > 100) {
		navLogo.classList += ' header-logo-shrink';
	} else {
		navLogo.classList = 'header-logo';
	}
}
