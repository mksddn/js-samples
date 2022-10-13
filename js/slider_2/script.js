window.addEventListener('DOMContentLoaded', function() {

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `0${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    function dotsOpacity(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function showCurSlide(){
        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function getWidth (width){
        return +width.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == getWidth(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += getWidth(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        }
        else {
            slideIndex++;
        }

        showCurSlide();
        dotsOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = getWidth(width) * (slides.length - 1);
        } else {
            offset += getWidth(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex--;
        }

        showCurSlide();
        dotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getWidth(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = slideIndex;
            }

            dotsOpacity();
        });
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });

});