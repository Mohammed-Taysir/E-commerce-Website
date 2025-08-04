
const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
const wishList = JSON.parse(window.localStorage.getItem("wishList") || "[]")


export function productImageSlider(product) {

    return product.images.map((image) => {
        return `
            <div class = "swiper-slide">
                <img class = "img-fluid" src = "${image.src}" />
            </div>
        `
    }).join("");
}

export function calculateDisscount(regularPrice, salePrice) {
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}


export function createProduct(product) {
    const imgSlides = productImageSlider(product);
    return `
    <div class = "product rounded-4 position-relative overflow-hidden" >
            <div class = "product-head d-flex justify-content-between" id = "${product.id}" >
                <div class = "percentage rounded-pill text-white bg-dark d-flex align-items-center justify-content-center fs__15">
                    ${calculateDisscount(product.prices.regular_price, product.prices.sale_price)}%</div>
                <div class = "rating bg-white rounded-pill d-flex align-items-center justify-content-center fw-bold">
                   <i class="fa-solid fa-star"></i>
                   <span>${product.average_rating}</span>
                </div>
            </div>
            <div class = "icons d-flex flex-column justify-content-between position-absolute z-3">
                <div class = "top-icons d-flex flex-column gap-2">
                    <i class="fa-regular fa-eye bg-white rounded-circle d-flex align-items-center justify-content-center fs__15 cursor__pointer"></i>
                    <i class="fa-solid fa-repeat bg-white rounded-circle d-flex align-items-center justify-content-center fs__15 cursor__pointer"></i>
                </div>
                <button class = "bottom-icons bg-transparent border-0" onclick = "addToWishList('${product.name}',' ${product.images[0].src}', '${product.id}')">
                    <i class="fa-regular fa-heart cursor__pointer"></i>
                </button>
            </div>
            <div class = "image overflow-hidden position-relative overflow-hidden">
                <div class="swiper mySwiper imgs-swiper">
                    <div class="swiper-wrapper imgs-product-slider">
                        ${imgSlides}
                    </div>
                    <div class="img-pagination swiper-pagination"></div>
                    
                </div>
                <button class = "add-to-cart text-white bg-dark text-decoration-none rounded-pill d-flex align-items-center justify-content-center position-absolute fw-bold center__translate__x select-option" onclick = 'addToCart(${JSON.stringify(product)}, ${1})'>Add to cart</button>
            </div>
            <div class = "content p-5">
                <a href = "#" class = "text-decoration-none text-capitalize fs__13">${product.categories[0].slug}</a>
                <h3 class = "product-title underline__hover cursor__pointer" onclick = openProductPage('${product.id}')>${product.name}</h3>
                <div class = "price d-flex gap-2">
                    <span class = "current-price fs__15">$${product.prices.sale_price / 100}</span>
                    <span class = "regular-price text-decoration-line-through fs__15">${product.prices.regular_price === product.prices.sale_price? "": "$" + (product.prices.regular_price / 100)}</span>
                </div>
            </div>
        </div>
    `;


}

export function initImgSwiper() {
document.querySelectorAll(".imgs-swiper").forEach((imgSlider) => {
        const imgSwiper = new Swiper(imgSlider, {
            spaceBetween: 0,
            allowTouchMove: false,
            speed: 400,
            pagination: {
                el: imgSlider.querySelector(".swiper-pagination"),
                clickable: true,
            },
        });

        imgSlider.addEventListener("mousemove", (e) => {
            const bounds = imgSlider.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const percent = mouseX / bounds.width;
            const targetIndex = Math.floor(percent * imgSwiper.slides.length);
            const maxIndex = imgSwiper.slides.length - 1;
            imgSwiper.slideTo(Math.min(targetIndex, maxIndex), 400);
        });
    });
}


export function openProductPage(productId) {

    window.location.href = `./product.html?id=${productId}`;

}



export function createBlogsWidgets(blogs) {
    document.querySelector(".blogs-widgets").innerHTML = blogs.map(blog => {
        return `
            <div class = "blog-widget d-flex align-items-center gap-4 w-100" onclick = openBlog('${blog.id}')>
                <div class = "img-widget">
                    <img class = "rounded-4" src = "${blog.img}" />
                </div>

                <div class = "content">
                    <h3 class = "fs__14 w-100 fw-bold lh-base underline__hover cursor__pointer" onclick = "openBlogWithId('${blog.id}')">${blog.title}</h3>
                    <div class = "date fs__13 text__777">${blog.date}</div>
                
                </div>
            
            </div>
        `;
    }).join("");
}

export function openBlogWithId(blogId) {
    window.location.href = `./blog.html?id=${blogId}`;
}


export function addToCart(product, quantity) {
    product.quantity = quantity;
    cart.push(product);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    editCartNumber();
    showToast(`${product.quantity} Product added successfully to cart`);
}

export function showToast(message, color = "success") {
    const toastEl = document.getElementById('globalToast');
    const toastBody = document.getElementById('globalToastBody');
    toastBody.textContent = message;
    toastEl.className = `toast align-items-center text-bg-${color} border-0`;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

export function displayCart() {

    const cartBody = document.querySelector(".cart-body");
    handleCartHeader();
    if(!cartBody)
        return;
    console.log(cartBody)
    console.log(cart);
    if(cart.length !== 0) {
       cartBody.innerHTML =  cart.map((product, index) => {
            return `

                <div class = "cartItem d-flex gap-3 py-3 border border-0 border-bottom">
                    <div class = "item-img">
                        <img src = "${product.images[0].src}" />
                    </div>
                    <div class = "item-content d-flex justify-content-between flex-grow-1">
                       <div class = "d-flex flex-column gap-2">
                            <span class = "fs__13 fw-semibold">${product.name}</span>
                            <span class = "fs__13 fw-semibold">${product.quantity} x $${product.prices.sale_price / 100}</span>
                        </div>
                        <button class = "delete-item bg-transparent border-0 align-self-start" onclick = "deleteFromCart(${index})">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        
                        

                    </div>
                </div>

            `;
        }).join("") + totalCartPrice();
    }else {
        cartBody.innerHTML = `
            <div class="empty-message d-flex flex-column align-items-center p-5 gap-2">
                <i class="fa-solid fa-cart-shopping shopping-icon"></i>
                <h3>Your cart is empty</h3>
                <p class="text-center fs__14">
                    You may check out all the available products and buy some in the shop..
                </p>
            </div>
        `;
    }
}


export function deleteFromCart(prodcutIndex) {
    cart.splice(prodcutIndex, 1);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    editCartNumber();
}

export function editCartNumber() {
    document.querySelector(".cart-count").setAttribute("data-count", cart.length);
}

export function totalCartPrice() {
    return `
        <div class = "total-cart-price d-flex flex-column gap-2 py-3">
            <div class = "d-flex justify-content-between">
                <span class = "fs__13 fw-bold">Subtotal</span>
                <span class = "fs__13 fw-bold">$${calculateTotalPrice().toFixed(2)}</span>
            </div>
            
                
            <a class = "text-decoration-none text-white bg-black fs__15 fw-semibold py-2 rounded-4 d-flex justify-content-center align-items-center" href = "./checkout.html">Checkout</a>
            
        </div>
    `;
}


export function calculateTotalPrice() {
    let total = 0;
    for(let i = 0; i < cart.length; i++)
        total += ((cart[i].prices.sale_price / 100) * cart[i].quantity);

    return total;
}


export function handleCartHeader() {
    const offer = document.querySelector(".offer-price");
    offer.textContent = Math.max((500 - calculateTotalPrice()).toFixed(2), 0);
    const progressBar = document.querySelector(".offer-progress div");
    console.log(progressBar)
    progressBar.style.width = `${((calculateTotalPrice()) / 500) * 100}%`;
    
}

export function addToWishList(productName, srcImage, productId) {
    wishList.push({name: productName, src: srcImage, id: productId});
    window.localStorage.setItem("wishList", JSON.stringify(wishList));
    displayWishList();
    handleWishCounter();
    showToast("Product added successfully to wishlist");
    
}


export function displayWishList() {
    if(wishList.length !== 0) {
        document.querySelector(".wishlist-body").innerHTML = wishList.map((product, productIndex) => {
        return `
            <div class = "wishList-item d-flex align-items-center gap-4 py-3 border border-0 border-bottom flex-wrap position-relative">
                <div class = "item-img">
                    <img src = "${product.src}" />
                </div>
                <div class = "wish-content d-flex justify-content-between align-items-center flex-grow-1 gap-2">
                    <span class = "fs__14 fw-semibold">${product.name}</span>
                    <div class = "d-flex h-100 align-items-center gap-1">
                        <a class  = "text-decoration-none fw-semibold text-white bg-black py-2 rounded-4 fs__13 px-2" href = "./product.html?id=${product.id}">Select Option</a>
                        <button class = "delete-item bg-transparent border-0 align-self-start fs__13 position-absolute top-0 end-0" onclick = "deleteFromWishList('${productIndex}')">
                            <i class="fa-solid fa-xmark fs__13"></i>
                        </button>

                    </div>
                </div>
            </div>
        
        `;
    }).join("");
    }else {
        document.querySelector(".wishlist-body").innerHTML = `
            <div class = "empty-list-message d-flex flex-column justify-content-center align-items-center gap- h-100">
                <i class="fa-regular fa-heart wishing-icon"></i>
                <p class = "fw-medium">The wishlist is empty</p>
                <a class = "text-decoration-none py-3 px-4 rounded-4 bg-black text-white" href="./shop.html?category=all&page=1">Return to shop</a>
            </div>
        `;
    }
}

export function deleteFromWishList(index) {
    wishList.splice(index, 1);
    window.localStorage.setItem("wishList", JSON.stringify(wishList));
    displayWishList();
    handleWishCounter();
}

export function handleWishCounter() {
    document.querySelector(".wish-count").setAttribute("data-count", wishList.length);
}