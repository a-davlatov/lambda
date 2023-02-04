'use strict';

// Animation
const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

// Fixed header
const headerEl = document.querySelector('#header');
const introEl = document.querySelector('#intro');
const navEl = document.querySelector('#nav');
const navToggleEl = document.querySelector('#navToggle');
const burgerEl = document.querySelector('.burger');
let introH = introEl.clientHeight;
let scrollPos = window.scrollY;

checkScroll(scrollPos, introH);
window.addEventListener('scroll', changeScrollPos);
window.addEventListener('resize', changeScrollPos);

function changeScrollPos() {
    introH = introEl.clientHeight;
    scrollPos = window.scrollY;

    checkScroll(scrollPos, introH);
}

function checkScroll(scrollPos, introH) {
    if (scrollPos > introH) {
        headerEl.classList.add('fixed');
        return;
    }
    headerEl.classList.remove('fixed');
}

// Smooth scroll
const navLinks = document.querySelectorAll('[data-scroll]');
navLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();

        const elementId = el.dataset.scroll;
        const elementOffset = document.getElementById(elementId).offsetTop;

        navEl.classList.remove('show');
        burgerEl.classList.remove('clicked');

        if (window.innerWidth <= 414) {
            window.scrollTo({
                top: elementOffset - 56,
                behavior: 'smooth'
            });
            return;
        }

        window.scrollTo({
            top: elementOffset + 1,
            behavior: 'smooth'
        });
    });
});

// Nav toggle
navToggleEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    burgerEl.classList.toggle('clicked');
    navEl.classList.toggle('show');
});

const formEl = document.getElementById('form');
formEl.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: new FormData(form),
        })
            .catch((err) => {
                throw err;
            });

    evt.reset();
});