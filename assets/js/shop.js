import {
  createProduct,
  productImageSlider,
  initImgSwiper,
  calculateDisscount,
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
  handleWishCounter,
} from "./module.js";

import { formValidation } from "./form_validation.js";

window.addToCart = addToCart;
window.deleteFromCart = deleteFromCart;
window.editCartNumber = editCartNumber;
window.handleCartHeader = handleCartHeader;
window.calculateTotalPrice = calculateTotalPrice;
window.addToWishList = addToWishList;
window.deleteFromWishList = deleteFromWishList;
window.handleWishCounter = handleWishCounter;
window.showToast = window.showToast;

displayCart();
displayWishList();
handleWishCounter();
editCartNumber();

window.openProductPage = openProductPage;
const slider = document.getElementById("slider");

const pricesInputs = document.querySelectorAll(".price-input");

let minInputValue = 0,
  maxInputValue = 590;

noUiSlider.create(slider, {
  start: [0, 590],
  connect: true,
  range: {
    min: minInputValue,
    max: maxInputValue,
  },
});

pricesInputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    if (e.target.classList.contains("min-price"))
      minInputValue = e.target.value;
    else maxInputValue = e.target.value;

    slider.noUiSlider.set([minInputValue, maxInputValue]);
  });
});

slider.noUiSlider.on("update", (values, handle) => {
  let minValue = 0,
    maxValue = 0;
  minValue = Math.round(values[0]);
  maxValue = Math.round(values[1]);

  document.querySelector(".min-range-price").textContent = minValue;
  document.querySelector(".max-range-price").textContent = maxValue;
});

async function getProducts() {
  try {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const category = params.get("category") || "all";
    document.title =
      category[0].toUpperCase() + category.substring(1) + " Products";
    document.getElementById(category).checked = true;
    const limit = 4;

    let products;
    if (category !== "all") {
      const { data } = await axios.get(
        `https://klbtheme.com/fynode/wp-json/wc/store/products?category=${category}&per_page=${limit}&page=${page}`
      );
      products = data;
    } else {
      const { data } = await axios.get(
        `https://klbtheme.com/fynode/wp-json/wc/store/products?per_page=${limit}&page=${page}`
      );
      products = data;
    }

    createProducts(products);
    const numOfPages = Math.ceil(products.length / limit);

    filterByCategory();
    filterByPrice(products);

    customPagination(numOfPages, parseInt(page), category);
    addActivePage(page);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    }).then(() => {
      location.reload();
    });
  } finally {
    document.querySelector(".loader-container").classList.add("d-none");
  }
}

function customPagination(numOfPages, page, category) {
  numOfPages += 1;
  const itemsToShow = pagesToShow();
  const startPage = Math.max(1, page - Math.floor(itemsToShow / 2));
  const endPage = Math.min(numOfPages, startPage + itemsToShow - 1);

  let pagination = `<li class = "d-flex justify-content-center align-items-center"><a class = "text-decoration-none text-dark" href = "./shop.html?category=${category}&page=${
    page - 1
  }"><i class="fa-solid fa-angle-left"></i></a></li>`;

  for (let i = startPage; i <= endPage; i++) {
    pagination += `<li class = "d-flex justify-content-center align-items-center page-${i}"><a class = "text-decoration-none" href = "./shop.html?category=${category}&page=${i}">${i}</a></li>`;
  }

  pagination += `<li class = "d-flex justify-content-center align-items-center"><a class = "text-decoration-none text-dark" href = "./shop.html?category=${category}&page=${
    page + 1
  }"><i class="fa-solid fa-angle-right"></i></a></li>`;
  document.querySelector(".pagination-list").innerHTML = pagination;
  if (page == 1)
    preventMove(document.querySelector(".pagination-list li:first-child"));
  if (page >= numOfPages)
    preventMove(document.querySelector(".pagination-list li:last-child"));

  if (page > 1 && page < numOfPages) {
    ableToMove(document.querySelector(".pagination-list li:first-child"));
    ableToMove(document.querySelector(".pagination-list li:last-child"));
  } else if (page > 1) {
    ableToMove(document.querySelector(".pagination-list li:first-child"));
  } else {
    ableToMove(document.querySelector(".pagination-list li:last-child"));
  }
}

function preventMove(link) {
  link.children[0].classList.add("d-none");
}

function ableToMove(link) {
  link.children[0].classList.remove("d-none");
}

function pagesToShow() {
  if (window.innerWidth <= 768) return 5;
  else if (window.innerWidth <= 992) return 8;
  else return 15;
}

function addActivePage(page) {
  const paginations = document.querySelectorAll(".pagination-list li");
  console.log(document.querySelector(`.page-${page}`));

  document.querySelector(`.page-${page}`).classList.add("active");
}

function customizeProduct(product) {
  return `
        <div class = "col-lg-6 col-sm-12 gy-4">
            ${createProduct(product)}
        </div>
    `;
}

function createProducts(products) {
  document.querySelector(".shop-content .row").innerHTML =
    products.length !== 0
      ? products
          .map((product) => {
            return customizeProduct(product);
          })
          .join("")
      : createNoProductsMessage();
}

function filterByCategory() {
  const checks = document.querySelectorAll(`.side-bar .form-check-input`);

  checks.forEach((input) => {
    input.onchange = (e) => {
      if (e.target.checked)
        window.location.href = `./shop.html?category=${
          e.target.value
        }&page=${1}`;
    };
  });
}

function remvoeUncheckedCategroy(targetValue) {
  let index = -1;
  for (let i = 0; i < checkedCategories.length; i++) {
    if (targetValue === checkedCategories[i]) {
      index = i;
      break;
    }
  }

  checkedCategories.splice(index, 1);
}

function filterByPrice(products) {
  const filterButton = document.querySelector(".filter-button");
  filterButton.addEventListener("click", (e) => {
    let maxPrice = +document.querySelector(".max-range-price").textContent;
    let minPrice = +document.querySelector(".min-range-price").textContent;
    const filteredProducts = products.filter((product) => {
      const salePrice = parseInt(product.prices.sale_price) / 100;
      return salePrice >= minPrice && salePrice <= maxPrice;
    });
    if (filteredProducts.length > 0) createProducts(filteredProducts);
    else createProducts(products);
  });
}

function createNoProductsMessage() {
  return `
        <div class = "no-products-message position-absolute position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center gap-3 w-auto">
            <i class="fa-solid fa-inbox fa-4x"></i>
            <h3>No Products Found!</h3>
        </div>
    `;
}

getProducts();
