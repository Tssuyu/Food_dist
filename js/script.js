import Customizator from "./modules/customizator.js";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";
import tabs from "./modules/tabs";




window.addEventListener('DOMContentLoaded', () => {

  let   isDataSent = false;
  const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 60000),
        panel = new Customizator();

  panel.render();
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerID);
  timer('.timer', "2026-07-01T00:00:00");
  cards();
  calc();
  forms('form', modalTimerID);
  slider({
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