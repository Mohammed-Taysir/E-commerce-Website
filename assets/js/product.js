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

window.handleCartAddtion = handleCartAddtion;
window.handleWishListAddition = handleWishListAddition;

window.addToCart =addToCart;
window.deleteFromCart = deleteFromCart;
window.editCartNumber = editCartNumber;
window.handleCartHeader = handleCartHeader;
window.calculateTotalPrice = calculateTotalPrice;
window.addToWishList = addToWishList;
window.deleteFromWishList = deleteFromWishList;
window.handleWishCounter = handleWishCounter;
window.showToast = window.showToast;

handleCartHeader();

displayCart();
displayWishList();
handleWishCounter();
editCartNumber();
async function getProductDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const prodcutId = params.get("id");

        const { data } = await axios.get(`https://klbtheme.com/fynode/wp-json/wc/store/products/${prodcutId}`);
        createImageSlider(data);
        customizeDetails(data);
        chooseColor();
        handleQuantity();
    }catch(error) {
        Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    }).then(() => {
      location.href = "./index.html";
    });
    }finally {
        document.querySelector(".loader-container").classList.add("d-none");
    }
}


function customizeDetails(productDetails) {
    document.title = productDetails.name;

    document.querySelector(".product-details .content-side").innerHTML =  `
        <div>
            <div class="product-details-head d-flex flex-column gap-2 pb-3 border border-0 border-bottom">
                <p class = "category fs__14 text__777">
                    ${productDetails.categories[0].name}
                </p>
                <h2 class = "title fw-bold">${productDetails.name}</h2>
                <div class = "d-flex gap-4">
                    <span class = "ranking"><i class="fa-solid fa-star text-warning"></i>
                   <span>${productDetails.average_rating}</span></span>
                    <span class = "fs__14"><span class = "text__777">SKU</span>: <span class = "sku">${productDetails.sku}</span></span>
                </div>
            </div>
            <div class = "product-details-body py-4">
                <div class = "price fw-semibold fs__19">
                    $${productDetails.prices.sale_price / 100}${productDetails.prices.sale_price != productDetails.prices.regular_price?    '<i class="fa-solid fa-minus"></i>' + "$" + productDetails.prices.regular_price / 100: ""}
                </div>

                <div class = "product-description lh-base text__777 fs__14">
                    ${productDetails.short_description}
                </div>

                <div class = "colors-field d-flex gap-5">
                    <div><span class = "text__777 fs__14">color</span>: <span class = "choosen-color fw-semibold"></span></div>
                    <div class = "colors d-flex gap-2">
                        <span class = "bg-black d-block rounded-circle"   data-color = "Black"></span>
                        <span class = "bg-primary d-block rounded-circle" data-color = "Blue"></span>
                        <span class = "bg-success d-block rounded-circle" data-color = "Green"></span>
                        <span class = "bg-warning d-block rounded-circle" data-color = "Yellow"></span>
                    </div>
                </div>

                <div class = "d-flex my-3 gap-4">
                    <div class = "quantity rounded-pill border d-flex justify-content-center align-items-center gap-4">
                        <span class = "minus bg-black cursor__pointer"></span>
                        <span class = "value fw-semibold">1</span>
                        <span class = "plus fw-bold cursor__pointer fs__18">+</span>
                    </div>
                    <button class = "add-to-cart border-0 bg-black text-white py-2 flex-grow-1 rounded-pill fw-semibold" onclick = "handleCartAddtion('${productDetails.name}', '${productDetails.images[0].src}', '${productDetails.prices.sale_price}')">Add to cart</button>
                </div>

                <div class = "d-flex my-3 gap-4">
                    <a href = "./checkout.html" class = "buy-now text-decoration-none d-flex justify-content-center align-items-center text-black fw-semibold border-0 bg__gray py-2 flex-grow-1 rounded-pill">Buy Now</a>
                    <div class = "icon-holder d-flex justify-content-center align-items-center rounded-circle cursor__pointer" onclick = "handleWishListAddition('${productDetails.name}', '${productDetails.images[0].src}', '${productDetails.id}')"><i class="fa-regular fa-heart"></i></div>
                </div>

                
                <ul class = "list-unstyled d-flex gap-3 py-5 border border-0 border-bottom">
                    <li>
                        <div class = "d-flex gap-2 align-items-center fw-semibold fs__14 cursor__pointer" data-bs-toggle="modal" data-bs-target="#ask-question" data-bs-whatever="@mdo">
                            <span class = "question-mark rounded-circle border d-flex justify-content-center align-items-center border-dark">?</span>
                            <span>Ask a question</span>
                        </div>
                    </li>
                    <li>
                        <div class = "d-flex gap-2 align-items-center fw-semibold fs__14 cursor__pointer" data-bs-toggle="modal" data-bs-target="#returns-modal">
                            <img src = "./assets/imgs/public/services-2.png" />
                            <span>Delivery Return</span>
                        </div>
                    </li>
                </ul>
                

                <!-- Modal -->
                    <div class="modal fade" id="returns-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header border-0">
                            <h1 class="modal-title fs-5 m-auto" id="staticBackdropLabel">Delivery Returns</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul class = "list-unstyled d-flex flex-column gap-3">
                                <li>
                                    <span class = "fw-semibold fs__18">Delivery</span>
                                    <ul class = "list-unstyled d-flex flex-column gap-2 fs__13 text__777">
                                        <li>All orders shipped with UPS Express.</li>
                                        <li>Always free shipping for orders over US $250.</li>
                                        <li>All orders are shipped with a UPS tracking number.</li>

                                    </ul>
                                
                                </li>
                                <li>
                                    <span class = "fw-semibold fs__18">Returns</span>
                                    <ul class = "list-unstyled d-flex flex-column gap-2 fs__13 text__777">
                                        <li>Items returned within 14 days of their original shipment date in same as new condition will be eligible for a full refund or store credit.</li>
                                        <li>Refunds will be charged back to the original form of payment used for purchase.</li>
                                        <li>Customer is responsible for shipping charges when making returns and shipping/handling fees of original purchase is non-refundable.</li>
                                        <li>All sale items are final purchases.</li>
                                    </ul>
                                
                                </li>
                                <li>
                                    <span class = "fw-semibold fs__18">Help</span>
                                    <ul class = "list-unstyled d-flex flex-column gap-2 fs__13 text__777">
                                        <li>Give us a shout if you have any other questions and/or concerns.</li>
                                        <li>Email: contact@domain.com</li>
                                        <li>Phone: +1 (23) 456 789</li>

                                    </ul>
                                
                                </li>
                            
                            </ul>
                        </div>
                        
                        </div>
                    </div>
                    </div>

            </div>
            <div class="modal fade" id="ask-question" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 m-auto" id="exampleModalLabel">Ask a Question</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class = "d-flex align-items-center gap-3 mb-3">
            <div>
                <label for="name" class="col-form-label fs__13">Your name</label>
                <input type="text" class="form-control py-2" id="name">
            </div>
            <div>
                 <label for="email" class="col-form-label fs__13">Your email</label>
                <input type="text" class="form-control py-2" id="emial">
            </div>
          </div>
          <div>
                 <label for="subject" class="col-form-label fs__13">Subject</label>
                <input type="text" class="form-control py-2" id="subject">
            </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label fs__13">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-dark me-auto">Send message</button>
      </div>
    </div>
  </div>
</div>

    
        
        </div>`;
    

}

function handleQuantity() {
    const minus = document.querySelector(".quantity .minus");
    const plus = document.querySelector(".quantity .plus");
    const value = document.querySelector(".quantity .value");

    minus.addEventListener("click", () => {
        if(parseInt(value.textContent) > 1)
            value.textContent = parseInt(value.textContent) - 1;
    })

    plus.addEventListener("click", ()=> {
        value.textContent = parseInt(value.textContent) + 1;
    })
}

function chooseColor() {
    const colors = document.querySelectorAll(".colors-field .colors span");
    colors.forEach(color => {
        color.addEventListener("click", (e) => {
            colors.forEach(targeted => {
                if(targeted.classList.contains("active"))
                    targeted.classList.remove("active");
            });
            color.classList.add("active");
            document.querySelector(".choosen-color").textContent = color.getAttribute("data-color");
        })
    })
}


function createImageSlider(productDetails) {
    const paginationImagesContainer = document.querySelector(".pagination-images");
    const imgs = productDetails.images.map(image => `<div class = "img p-1"><img src = "${image.thumbnail}" alt = "${image.alt}" /></div>`);

    paginationImagesContainer.innerHTML = imgs.join("");
    paginationImagesContainer.children[0].classList.add("active");
    customSlides(paginationImagesContainer.children);
    switchActive(paginationImagesContainer.children);
}

function customSlides(imgs) {
    const imgToShow = document.querySelector(".image-to-show img");

    Array.from(imgs).forEach(img => {
        if (img.classList.contains('active'))
            imgToShow.setAttribute("src", `${img.children[0].getAttribute("src")}`);
    })


}

function switchActive(slidesImages) {
    const imgs = document.querySelectorAll(".pagination-images .img");
    imgs.forEach(img => {
        img.addEventListener("click", (e) => {
            imgs.forEach(targetDiv => {
                if (targetDiv.classList.contains("active"))
                    targetDiv.classList.remove("active");
            });
            img.classList.add("active");
            customSlides(slidesImages);
        })
    })

}


function handleRatingTabs() {
    const numOfReviews = parseInt(document.querySelector(".number-of-reviews").textContent);
    for(let i = 1; i <= 5; i++) {
        const count = parseInt(document.querySelector(`#tab-${i} .count`).textContent);
        console.log(count);
        const percentage = (count / numOfReviews) * 100;
        document.querySelector(`#tab-${i} .progress`).setAttribute("aria-valuenow", `${percentage}`);
        document.querySelector(`#tab-${i} .progress div`).style.width = `${percentage}%`;
    }
    showReviews();
    const ratingTabs = document.querySelectorAll(".rating-tab");
    ratingTabs.forEach(tab => {
        tab.addEventListener("click", ()=> {
            ratingTabs.forEach(ratingTab => {
                if(ratingTab.classList.contains("active"))
                    ratingTab.classList.remove("active");
            });
            tab.classList.add("active");
            showReviews();
        })
    })
}

function showReviews() {
    const activeTab = document.querySelector(".rating-tab.active");
    console.log(activeTab);
    document.querySelectorAll(".reviews-group").forEach(group => {
        if(group.getAttribute("data-count") != activeTab.getAttribute("data-count"))
            group.classList.add("d-none");
        else
            group.classList.remove("d-none");
        
    })
}

function yourRating() {
    const stars = document.querySelectorAll(".your-review-stars > div");
    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            stars.forEach(targetStar => {
            if(targetStar.classList.contains("active"))
                targetStar.classList.remove("active");
        });
        star.classList.add("active");
        })
    })
}


function handleCartAddtion(productName, productImg, productPrice) {
    const product = {name: productName, images: [
        {
            src: productImg,
        },
        
        ],
        prices: {
            "sale_price": productPrice,
        } 
    };

    const quantity = document.querySelector(".quantity .value").textContent;

    addToCart(product, quantity);
}


function handleWishListAddition(productName, productImg, productId) {
    addToWishList(productName, productImg, productId);
}

getProductDetails();

handleRatingTabs();
yourRating();

