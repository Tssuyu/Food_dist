window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item');
  tabsContent = document.querySelectorAll('.tabcontent');
  tabsContent = document.querySelectorAll('.tabcontent');
  tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == e.target) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // Timer

  const deadline = "2026-01-01T00:00:00"

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60) / 24),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      if (t.total > 0) {

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
      } else {
        clearInterval(timeInterval);
        document.querySelector('.promotion__timer .title').innerHTML = 'Упс, акция окончилась :(';
        days.innerHTML = '00';
        hours.innerHTML = '00';
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
      }

    }
  }
  setClock('.timer', deadline);

  // Modal

  const modalOpenBtns = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');

  function closeModal() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerID);
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  })

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModal();
    }
  })

  const modalTimerID = setTimeout(openModal, 30000000);

  function showModalAtScrollEnd() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalAtScrollEnd);
    }
  }

  window.addEventListener('scroll', showModalAtScrollEnd);

  // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.changeToUAH();
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length == 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  axios.get('http://localhost:3002/menu')
    .then(data => {
      data.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
      })
    });

  // Forms

  const forms = document.querySelectorAll('form'),
    message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      failure: 'Что-то пошло не так...'
    }

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: data
    });
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3002/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        })
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    modalWindow.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000)
  }

  //  Slider

  const slider = document.querySelector('.offer__slider'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    nextBtn = document.querySelector('.offer__slider-next'),
    slides = document.querySelectorAll('.offer__slide'),
    currentSlideNum = document.getElementById('current'),
    totalSlideCount = document.getElementById('total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    dotsWrapper = document.createElement('ol');
  let slideIndex = 1;
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



});