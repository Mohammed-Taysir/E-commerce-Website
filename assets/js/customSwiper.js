
// Headphone Slider Swipper 

const swiper = new Swiper(".site-banner", {
  slidesPerView: 1,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".site-banner .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".site-banner .swiper-button-next",
    prevEl: ".site-banner .swiper-button-prev",
  },
});


// Custom Logos Banner 

var bannerLogos = new Swiper(".logos-banner", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: {
    enabled: true,
    momentum: false,
  },
  allowTouchMove: false,
  slidesPerView: 1,
  spaceBetween: 10,
  // pagination: {
  //   el: ".logos-pagination",
  //   clickable: true,
  // },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

const categoriesSwiper = new Swiper(".categories-slider", {
  spaceBetween: 30,
  pagination: {
    el: ".categories-slider .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    }
  },
  navigation: {
    nextEl: ".categories-slider .swiper-button-next",
    prevEl: ".categories-slider .swiper-button-prev",
  },
});



var testiSwiper = new Swiper(".testi-swiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    }
  },
});

const servicesSwiper = new Swiper(".services-swiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".services-swiper .swiper-button-next",
    prevEl: ".services-swiper .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  },
  pagination: {
    el: ".services-swiper .swiper-pagination",
    clickable: true,
  },
});




