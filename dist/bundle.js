/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js"
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calculator

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) sex = localStorage.getItem('sex');
    if (localStorage.getItem('ratio')) ratio = localStorage.getItem('ratio');

    function initLocalSettings(...selectors) {
        console.log(selectors);
        let sexDivs = document.querySelectorAll(selectors[0]);
        let ratioDivs = document.querySelectorAll(selectors[1]);
        sexDivs.forEach(sexDiv => {
            if (sexDiv.id === localStorage.getItem('sex')) sexDiv.classList.add('calculating__choose-item_active');
        })
        ratioDivs.forEach(ratioDiv => {
            if (ratioDiv.getAttribute('data-ratio') === localStorage.getItem('ratio')) ratioDiv.classList.add('calculating__choose-item_active');
        })
    }

    function divsEval(selector) {
        let divs = document.querySelectorAll(selector);
        divs.forEach(div => {
            div.classList.remove('calculating__choose-item_active');
            div.addEventListener('click', (e) => {
                divs.forEach(div => div.classList.remove('calculating__choose-item_active'));
                div.classList.add('calculating__choose-item_active');
                if (e.target.id === 'female' || e.target.id === 'male') {
                    sex = e.target.id;
                    localStorage.setItem('sex', e.target.id);
                } else if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                inputsEval("#height");
                inputsEval("#weight");
                inputsEval("#age");
                calculate(sex, height, weight, age, ratio);
            })
        })
    }

    function inputsEval(selector) {
        let input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (!input.value.match(/\D/g) || input.value === "") {
                input.style.border = 'none';
            } else if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }
            if (/^[1-9]\d*$/.test(input.value)) {
                switch (input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                calculate(sex, height, weight, age, ratio);
            } else {
                console.log(`Incorrect ${selector.slice(1)} value. Try again`);
                switch (input.getAttribute('id')) {
                    case "height":
                        height = undefined;
                        break;
                    case "weight":
                        weight = undefined;
                        break;
                    case "age":
                        age = undefined;
                        break;
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                calculate();
            }
        });
    }

    function calculate(sex, height, weight, age, ratio) {
        const result = document.querySelector('.calculating__result span');
        result.textContent = '____';
        if (sex && height && weight && age && ratio) {
            let finalResult;
            if (sex === 'female') {
                finalResult = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                finalResult = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
            result.textContent = finalResult;
            console.log(`Total result: ${finalResult} kcal.`);
        }
    }

    divsEval('#gender div');
    divsEval(".calculating__choose_big div")
    inputsEval("#height");
    inputsEval("#weight");
    inputsEval("#age");
    calculate();
    initLocalSettings('#gender div', '.calculating__choose_big div');
    console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ },

/***/ "./js/modules/cards.js"
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ },

/***/ "./js/modules/customizator.js"
/*!************************************!*\
  !*** ./js/modules/customizator.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Customizator)
/* harmony export */ });
class Customizator {
  constructor() {
    this.btnBlock = document.createElement('div');
    this.colorPicker = document.createElement('input');
    this.clrBtn = document.createElement('div');
    this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    this.clrBtn.addEventListener('click', () => this.onClr());

    this.scale = localStorage.getItem('scale') || 1;
    this.color = localStorage.getItem('color') || '#ffffff';
  }

  onClr() {
    localStorage.clear();
    this.scale = 1;
    this.color = '#ffffff';
    this.setBgColor();
    this.onScaleChange();
  }

  setBgColor() {
    document.querySelector('body').style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }

  onScaleChange(e) {
    if (e) {
      this.scale = parseFloat(e.target.value);
    }

    const recursion = elem => {
      elem.childNodes.forEach(node => {
        if (node.nodeName === "#text" && node.textContent.trim() !== '') {
          if (!node.parentNode.getAttribute('data-fz')) {
            node.parentNode.setAttribute('data-fz', parseInt(window.getComputedStyle(node.parentNode, null).fontSize));
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px";
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px";
          }
        } else {
          recursion(node);
        }
      })
    }

    recursion(document.querySelector('body'));
    localStorage.setItem('scale', this.scale);
  }

  onColorChange(e) {
    document.querySelector('body').style.backgroundColor = e.target.value;
    localStorage.setItem('color', e.target.value);
  }

  injectStyle() {
    const style = document.createElement('style');
    style.innerHTML = 
    `
      .panel {
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: fixed;
          bottom: 10px;
          left: 10px;
          border: 1px solid rgba(0,0,0, .2);
          box-shadow: 0 0 20px rgba(0,0,0, .5);
          width: 300px;
          height: 60px;
          background-color: #fff;

      }

      .scale {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100px;
          height: 40px;
      }

      .scale_btn {
          display: block;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(0,0,0, .2);
          border-radius: 4px;
          font-size: 18px;
      }

      .color {
          width: 40px;
          height: 40px;
      }

      .clr {
          font-size: 20px;
          cursor: pointer;
      }
    `
    document.querySelector('head').appendChild(style);
  }

  render() {
    this.injectStyle();
    this.setBgColor();
    this.onScaleChange();
    let scaleInputS = document.createElement('input'),
      scaleInputM = document.createElement('input'),
      panel = document.createElement('div');

    scaleInputS.classList.add('scale_btn');
    scaleInputM.classList.add('scale_btn');
    this.btnBlock.classList.add('scale');
    this.colorPicker.classList.add('color');
    this.clrBtn.innerHTML = "&times";
    this.clrBtn.classList.add('clr');
    panel.classList.add('panel');

    scaleInputS.setAttribute('type', 'button');
    scaleInputS.setAttribute('value', '1x');
    scaleInputM.setAttribute('type', 'button');
    scaleInputM.setAttribute('value', '1.5x');
    this.colorPicker.setAttribute('type', 'color');
    this.colorPicker.setAttribute('value', '#ffffff');

    this.btnBlock.append(scaleInputS, scaleInputM);
    panel.append(this.btnBlock, this.colorPicker, this.clrBtn);
    document.querySelector('body').append(panel);
  }
}

/***/ },

/***/ "./js/modules/forms.js"
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerID) {
    // Forms

    console.log({
        openModal: _modal__WEBPACK_IMPORTED_MODULE_0__.openModal,
        closeModal: _modal__WEBPACK_IMPORTED_MODULE_0__.closeModal,
        disableModalByScroll: _modal__WEBPACK_IMPORTED_MODULE_0__.disableModalByScroll
    });

    const forms = document.querySelectorAll(formSelector),
        messages = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся.',
            failure: 'Что-то пошло не так...'
        }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3002/requests', json)
                .then(data => {
                    console.log(data);
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.disableModalByScroll)();
                    showThanksModal(messages.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(messages.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./js/modules/modal.js"
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   disableModalByScroll: () => (/* binding */ disableModalByScroll),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerID) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerID) clearInterval(modalTimerID);
    
}

let modalDisabled = false;

function disableModalByScroll() {
    modalDisabled = true;
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    // Modal

    const   modalOpenBtns = document.querySelectorAll(triggerSelector),
            modalWindow = document.querySelector(modalSelector);

    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    })

    modalWindow.addEventListener('click', (e) => {  
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            e.preventDefault();
            closeModal(modalSelector);
        }
    })

    function showModalAtScrollEnd() {
        if (!modalDisabled && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalAtScrollEnd);
        }
    }

    window.addEventListener('scroll', showModalAtScrollEnd);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ },

/***/ "./js/modules/slider.js"
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./js/modules/tabs.js"
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const   tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    }

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == e.target) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    hideTabContent();
    showTabContent();
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./js/modules/timer.js"
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer

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

        updateClock();
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ },

/***/ "./js/services/services.js"
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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



/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_customizator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/customizator.js */ "./js/modules/customizator.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");












window.addEventListener('DOMContentLoaded', () => {

  let   isDataSent = false;
  const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 60000),
        panel = new _modules_customizator_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

  panel.render();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_7__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerID);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', "2026-07-01T00:00:00");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerID);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    currentCounter: 'current',
    totalCounter: 'total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map