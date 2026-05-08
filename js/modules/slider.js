function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //  Slider

    const   slider = document.querySelector(container),
            slides = document.querySelectorAll(slide),
            prevBtn = document.querySelector(prevArrow),
            nextBtn = document.querySelector(nextArrow),
            currentSlideNum = document.getElementById(currentCounter),
            totalSlideCount = document.getElementById(totalCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width,
            dotsWrapper = document.createElement('ol');
    let     slideIndex = 1,
            offset = 0;

    slider.style.position = 'relative';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    totalSlideCount.textContent = (slides.length < 10) ? `0${slides.length}` : slides.length;
    currentSlideNum.textContent = '01';

    dotsWrapper.classList.add('carousel-indicators');
    slider.append(dotsWrapper);

    slides.forEach((slide, i) => {
        slide.style.width = width;
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dotsWrapper.append(dot);
    })

    function showActiveDot(i) {
        dotsWrapper.querySelectorAll('li').forEach((dot) => {
            dot.classList.remove('active');
        })
        const activeDot = dotsWrapper.querySelector(`[data-slide-to="${i}"]`);
        activeDot.classList.add('active');
    }

    function showNextSlide() {
        if (offset === parseInt(width) * (slides.length - 1)) {
            offset = 0;
            currentSlideNum.textContent = '01';
        } else {
            offset += parseInt(width);
            currentSlideNum.textContent = (currentSlideNum.textContent < 9) ? `0${parseInt(currentSlideNum.textContent) + 1}` : parseInt(currentSlideNum.textContent) + 1;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        showActiveDot(parseInt(currentSlideNum.textContent));
    }

    function showPrevSlide() {
        if (offset === 0) {
            offset = parseInt(width) * (slides.length - 1);
            currentSlideNum.textContent = totalSlideCount.textContent;
        } else {
            offset -= parseInt(width);
            currentSlideNum.textContent = (currentSlideNum.textContent < 11) ? `0${parseInt(currentSlideNum.textContent) - 1}` : parseInt(currentSlideNum.textContent) - 1;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        showActiveDot(parseInt(currentSlideNum.textContent));
    }

    showActiveDot(parseInt(currentSlideNum.textContent));

    dotsWrapper.querySelectorAll('li').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            offset = parseInt(width) * i;
            slidesField.style.transform = `translateX(-${offset}px)`;
            currentSlideNum.textContent = (i < 9) ? `0${i + 1}` : i + 1;
            showActiveDot(i + 1);
        })
    })

    nextBtn.addEventListener('click', () => {
        showNextSlide();
    })

    prevBtn.addEventListener('click', () => {
        showPrevSlide();
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showNextSlide();
        }
        if (event.key === 'ArrowLeft') {
            showPrevSlide();
        }
    });
}

export default slider;