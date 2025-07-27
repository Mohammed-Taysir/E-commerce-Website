import {
  createProduct,
  productImageSlider,
  calculateDisscount,
  initImgSwiper,
  openProductPage,
  addToCart,
  displayCart,
  deleteFromCart,
  editCartNumber,
  handleCartHeader,
  calculateTotalPrice,
  showToast,
  addToWishList,
  displayWishList,
  deleteFromWishList,
  handleWishCounter
} from "./module.js";
import { formValidation } from "./form_validation.js";

window.openProductPage = openProductPage;
window.addToCart = addToCart;
window.deleteFromCart = deleteFromCart;
window.editCartNumber = editCartNumber;
window.handleCartHeader = handleCartHeader;
window.calculateTotalPrice = calculateTotalPrice;
window.addToWishList = addToWishList;
window.deleteFromWishList = deleteFromWishList;
window.handleWishCounter = handleWishCounter;

displayCart();
editCartNumber();
handleWishCounter();

formValidation(".login-form");

async function getProducts(apiLink) {
  const { data } = await axios.get(apiLink);
  return data;
}

async function createProducts(category, container, limit) {
  try {
    const products = await getProducts(
      `https://klbtheme.com/fynode/wp-json/wc/store/products?category=${category}&per_page=${limit}`
    );

    const productsContainer = document.querySelector(container);

    productsContainer.innerHTML = products
      .map((product) => {
        const productDiv = createProduct(product);
        return `
            <div class = "swiper-slide">
                ${productDiv}
            </div>
        `;
      })
      .join("");

    initImgSwiper();
    initMostSolidSwiper();
    displayCart();
    displayWishList();
  } catch (error) {
    console.log(error);
  } finally {
    document.querySelector(".loader-container").classList.add("d-none");
  }
}

function handleNavigation() {
  const category = document
    .querySelector(".most-solid ul li.active")
    .getAttribute("data-cat");
  createProducts(category, ".most-solid .products-container", 8);
}

function mostSolidClick() {
  const navigators = document.querySelectorAll(".most-solid ul li");
  navigators.forEach((navigate) => {
    navigate.addEventListener("click", (e) => {
      removeActive(".most-solid ul li");
      e.target.classList.add("active");
      handleNavigation();
    });
  });
}

function removeActive(itemsSelector) {
  document.querySelectorAll(itemsSelector).forEach((item) => {
    if (item.classList.contains("active")) item.classList.remove("active");
  });
}

function mostSolidSectionHandling() {
  handleNavigation();
  mostSolidClick();
}

function initMostSolidSwiper() {
  const mostSolid = new Swiper(".most-solid-swiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    navigation: {
      nextEl: ".most-solid-swiper .swiper-button-next",
      prevEl: ".most-solid-swiper .swiper-button-prev",
    },
    pagination: {
      el: ".most-solid-swiper .swiper-pagination",
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
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}

// async function getBlogsWithLimit(postsLimit) {
//     const {data} = await axios.get(`https://klbtheme.com/fynode/wp-json/wp/v2/posts?per_page=${postsLimit}`);
//     console.log(data);
//     console.log("Hello")
// }

mostSolidSectionHandling();
// getBlogsWithLimit(3);
