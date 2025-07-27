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
const form = document.querySelector("form");
console.log(document.querySelectorAll("form input"))

form.onsubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("form input");
    let isValid = true;
    console.log(inputs)
    inputs.forEach(input => {
        if(input.value === "") {
            input.parentElement.innerHTML += `<p class = "text-danger">Please Fill This Field</p>`
            isValid = false;
        }
    })

    if(!isValid) {
        return;
    }
}