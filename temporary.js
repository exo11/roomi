'use strict';

////////////////////////////sidebar/////////////////////////

const sideBar = document.querySelector('.sidebar'),
  burger = document.querySelector('.burger'),
  sideBarCloseBtn = document.querySelector('.sidebar__close'),
  sidebarContent = document.querySelector('.sidebar__content');
  
  

burger.addEventListener('click', sideBarOpen);

function sideBarOpen() {
  sidebarContent.style.transform = 'translateX(0%)';
  sideBar.classList.add('sidebar_opened');
  sideBar.removeAttribute('hidden');
 }

sideBarCloseBtn.addEventListener('click', sideBarClose);

function sideBarClose() {
  sidebarContent.style.transform = 'translateX(100%)';
  setTimeout(() => {
    sideBar.classList.remove('sidebar_opened');
    sideBar.setAttribute('hidden','true');
  }, 200);
}

/////////////////////////////slider/////////////////////////////

const sliderTape = document.querySelector('.slider__tape'),
  sliderBanner = document.querySelector('#banner-slider__tape'),
  sliderPrev = document.querySelector('.slider__prev'),
  sliderNext = document.querySelector('.slider__next'),
  slider = document.querySelector('.slider');
let slideNum = 0,
  slideBannerNum = 0,
  slideArr = [
    'translateX(0%)',
    'translateX(-100%)',
    'translateX(-200%)',
    'translateX(-300%)',
    'translateX(-400%)',
    'translateX(-500%)'
  ];

  slider.addEventListener('click', (e) => {sliderHandler(e, 1, 2, sliderTape)});

  function sliderHandler(e, i, a, slider) {
    clearInterval(timerId);
    let etc = e.target.classList;
    slider.style.transition = 'none 0s ease 0s';
    if (etc.contains('slider__prev') || etc.contains('fa-backward')) {
      prevSlide(a, slider);
    } else if(etc.contains('slider__next') || etc.contains('fa-forward')) {
      nextSlide(i, slider);
    }
    setTimeout(() => {
      clearInterval(timerId);
      console.log('hi');
      timerId = autoSlideChange(slider);
    }, 10000);
  }
 
  let timerId; 
  timerId = autoSlideChange(sliderTape);

  function autoSlideChange(slider) {
    return setInterval(() => {
      if(slideNum === slideArr.length - 1) {
        slider.style.transition = 'none 0s ease 0s';
        nextSlide(0, slider);
      } 
      setTimeout(() => {
        slider.style.transition = 'transform 1s ease-in-out';
        nextSlide(0, slider);
      }, 100);
    }, 4900);
  }

  autoSlideBannerChange(sliderBanner);

  function autoSlideBannerChange(slider) {
    return setInterval(() => {
      if(slideBannerNum === slideArr.length - 1) {
        slider.style.transition = 'none 0s ease 0s';
        nextBannerSlide(0, slider);
      } 
      setTimeout(() => {
        slider.style.transition = 'transform 1s ease-in-out';
        nextBannerSlide(0, slider);
      }, 100);
    }, 4900);
  }

  function nextSlide(i, slider) {
    slideNum++;
    slideNum = slideNum === (slideArr.length - i) ? 0 : slideNum;
    slider.style.transform = slideArr[slideNum];
    console.log(slideArr[slideNum]);
  }

  function prevSlide(a, slider) {
    slideNum--;
    slideNum = slideNum < 0 ? (slideArr.length - a) : slideNum;
    slider.style.transform = slideArr[slideNum];
    console.log(slideArr[slideNum]);
  }

  function nextBannerSlide(i, slider) {
    slideBannerNum++;
    slideBannerNum = slideBannerNum === (slideArr.length - i) ? 0 : slideBannerNum;
    slider.style.transform = slideArr[slideBannerNum];
    console.log(slideArr[slideBannerNum]);
  }

/////////////////////////////routing/////////////////////////////

const mainLink = document.getElementsByClassName('mainlink'),
  dynamicContainer = document.getElementsByClassName('dynamic_container');


Array.from(mainLink).forEach(link => link.addEventListener('click', mainLinkHandler));

function mainLinkHandler(e) {
  Array.from(dynamicContainer).forEach(container => {
    if (e.target.dataset.link === container.dataset.id) {
      container.style.display = 'block';
      setTimeout(() => container.classList.add('dynamic_visible'), 100);
    } else {
      container.classList.remove('dynamic_visible');
      container.style.display = 'none';
    }
  }); 
  if (e.target.classList.contains('menu__link')) {
    sideBarClose();
  };
}