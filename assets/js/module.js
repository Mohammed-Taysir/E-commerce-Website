


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
                <div class = "bottom-icons">
                    <i class="fa-regular fa-heart wish cursor__pointer"></i>
                </div>
            </div>
            <div class = "image overflow-hidden position-relative overflow-hidden">
                <div class="swiper mySwiper imgs-swiper">
                    <div class="swiper-wrapper imgs-product-slider">
                        ${imgSlides}
                    </div>
                    <div class="img-pagination swiper-pagination"></div>
                    
                </div>
                <button class = "add-to-cart text-white bg-dark text-decoration-none rounded-pill d-flex align-items-center justify-content-center position-absolute fw-bold center__translate__x select-option">Add to cart</button>
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
                    <h3 class = "fs__14 w-100 fw-bold lh-base underline__hover cursor__pointer">${blog.title}</h3>
                    <div class = "date fs__13 text__777">${blog.date}</div>
                
                </div>
            
            </div>
        `;
    }).join("");
}

