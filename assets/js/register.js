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
    handleWishCounter
 } from "./module.js";

 import { formValidation } from "./form_validation.js";

window.addToCart =addToCart;
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


formValidation(".login-form");

formValidation(".register-form");