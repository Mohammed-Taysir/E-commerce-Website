import {
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



const placeOrder = document.querySelector(".place-order");

placeOrder.addEventListener("click", (e) => {
  const inputs = document.querySelectorAll(".checkout-form input");
  console.log(inputs)
  inputs.forEach(input => {
    if(input.getAttribute("data-required") !== "false") {
      if(input.value === "") {
        input.parentElement.innerHTML += `
          <p class = "fs__15 text-danger">This field cant be leaved empty.</p>
        `
      }
    }
  })
});
