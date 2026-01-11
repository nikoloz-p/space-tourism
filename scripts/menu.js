// side nav menu
const burgerMenu = document.getElementById('burger_menu');
const headerNav = document.getElementById('header_nav_items');
const closeNavBtn = document.getElementById('close_nav');

burgerMenu.addEventListener('click', () => {
    headerNav.classList.add('active');

    document.body.style.overflow = 'hidden';
});

closeNavBtn.addEventListener('click', () => {
    headerNav.classList.remove('active');
    document.body.style.overflow = 'auto';
});