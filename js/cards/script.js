"use strict";


const slides = document.querySelectorAll('.slide');

slides[Math.floor(Math.random()*slides.length)].classList.add('active');

for (const slide of slides) {
    slide.addEventListener('click', () => {
        clearAllActiveClasses();
        slide.classList.add('active');
    });
}

function clearAllActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
}