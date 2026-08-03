/* ==========================================
   ShopSphere E-Commerce Website
   script.js - Part 1
========================================== */

// ================= ELEMENTS =================

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistPopup = document.getElementById("wishlistPopup");
const closeWishlist = document.getElementById("closeWishlist");

const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");

const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartTotal = document.getElementById("cartTotal");

const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");

// ================= LOCAL STORAGE =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================= PRODUCTS =================

const products = [

{
id:1,
name:"iPhone 16 Pro",
price:129999,
category:"Mobile",
rating:5,
discount:"10%",
image:"images/product1 .jpg.jpg",
description:"Apple flagship smartphone with A18 Pro chip."
},

{
id:2,
name:"Samsung Galaxy S25",
price:94999,
category:"Mobile",
rating:5,
discount:"8%",
image:"images/product2 .jpg.jpeg",
description:"Premium Android smartphone with AI features."
},

{
id:3,
name:"MacBook Air M4",
price:139999,
category:"Laptop",
rating:5,
discount:"12%",
image:"images/product3 .jpg.jpeg",
description:"Thin and powerful laptop for professionals."
},

{
id:4,
name:"Dell XPS 15",
price:124999,
category:"Laptop",
rating:4,
discount:"15%",
image:"images/product4 .jpg.jpeg",
description:"Premium Windows laptop with OLED display."
},

{
id:5,
name:"Sony WH-1000XM5",
price:29999,
category:"Accessories",
rating:5,
discount:"20%",
image:"images/product5 .jpg.jpeg",
description:"Industry-leading noise cancelling headphones."
},

{
id:6,
name:"Apple Watch Ultra",
price:89999,
category:"Accessories",
rating:5,
discount:"5%",
image:"images/product6 .jpg.jpeg",
description:"Premium smartwatch for fitness and adventure."
},

{
id:7,
name:"Nike Air Max",
price:8999,
category:"Fashion",
rating:4,
discount:"25%",
image:"images/product7 .jpg.jpeg",
description:"Comfortable premium sports shoes."
},

{
id:8,
name:"Adidas Hoodie",
price:3999,
category:"Fashion",
rating:4,
discount:"18%",
image:"images/product8 .jpg.jpeg",
description:"Premium cotton hoodie."
},

{
id:9,
name:"Canon EOS R10",
price:87999,
category:"Camera",
rating:5,
discount:"10%",
image:"images/product9 .jpg.jpeg",
description:"Mirrorless camera for creators."
},

{
id:10,
name:"PlayStation 5",
price:54999,
category:"Gaming",
rating:5,
discount:"7%",
image:"images/product10 .jpg.jpeg",
description:"Next-generation gaming console."
},

{
id:11,
name:"iPad Air",
price:64999,
category:"Tablet",
rating:5,
discount:"9%",
image:"images/product11 .jpg.jpeg",
description:"Powerful tablet for work and creativity."
},

{
id:12,
name:"JBL Flip 6",
price:10999,
category:"Speaker",
rating:4,
discount:"15%",
image:"images/product12 .jpg.jpeg",
description:"Portable Bluetooth speaker."
}

];

// ================= DISPLAY PRODUCTS =================

function displayProducts(productList){

productContainer.innerHTML="";

productList.forEach(product=>{

productContainer.innerHTML+=`

<div class="product-card">

<span class="discount-badge">

-${product.discount}

</span>

<img
src="${product.image}"
class="product-image"
alt="${product.name}">

<div class="product-info">

<h3 class="product-title">

${product.name}

</h3>

<p class="product-description">

${product.description}

</p>

<div class="rating">

${"⭐".repeat(product.rating)}

</div>

<h2 class="product-price">

₹${product.price.toLocaleString()}

</h2>

<div class="product-buttons">

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add to Cart

</button>

<button
class="wishlist-btn"
onclick="addToWishlist(${product.id})">

❤

</button>

</div>

</div>

</div>

`;

});

}

displayProducts(products);
/* ==========================================
   ShopSphere E-Commerce Website
   script.js - Part 2
========================================== */

// ================= ADD TO CART =================

function addToCart(id){

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    saveCart();
    updateCart();
    showToast(product.name + " added to cart");

}

// ================= REMOVE FROM CART =================

function removeFromCart(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();
    updateCart();

    showToast("Item removed from cart");

}

// ================= CHANGE QUANTITY =================

function increaseQuantity(id){

    const item = cart.find(item => item.id === id);

    if(item){

        item.quantity++;

        saveCart();
        updateCart();

    }

}

function decreaseQuantity(id){

    const item = cart.find(item => item.id === id);

    if(!item) return;

    if(item.quantity > 1){

        item.quantity--;

    }else{

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();
    updateCart();

}

// ================= UPDATE CART =================

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML =

        `<p class="empty-cart">
            Your cart is empty.
        </p>`;

    }

    cart.forEach(item=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-item-details">

<h4>${item.name}</h4>

<p>₹${item.price.toLocaleString()}</p>

<div style="display:flex;align-items:center;gap:10px;margin-top:8px;">

<button onclick="decreaseQuantity(${item.id})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${item.id})">+</button>

</div>

<button onclick="removeFromCart(${item.id})">

Remove

</button>

</div>

</div>

`;

    });

    cartCount.textContent = cart.length;

    cartTotal.textContent = total.toLocaleString();

}

// ================= SAVE CART =================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

// Initial Load

updateCart();
/* ==========================================
   ShopSphere E-Commerce Website
   script.js - Part 3
========================================== */

// ================= WISHLIST =================

function addToWishlist(id) {

    const product = products.find(item => item.id === id);

    const exists = wishlist.find(item => item.id === id);

    if (exists) {
        showToast("Already in Wishlist");
        return;
    }

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlist();

    showToast(product.name + " added to Wishlist");
}

function updateWishlist() {

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p class='empty-cart'>Wishlist is empty.</p>";

    } else {

        wishlist.forEach(item => {

            wishlistItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-item-details">

<h4>${item.name}</h4>

<p>₹${item.price.toLocaleString()}</p>

<button onclick="removeWishlist(${item.id})">

Remove

</button>

</div>

</div>

`;

        });

    }

    wishlistCount.textContent = wishlist.length;
}

function removeWishlist(id) {

    wishlist = wishlist.filter(item => item.id !== id);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlist();

    showToast("Removed from Wishlist");
}

// ================= SEARCH =================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );

    displayProducts(filtered);

});

// ================= CART =================

cartBtn.onclick = () => {

    cartSidebar.classList.add("active");

};

closeCart.onclick = () => {

    cartSidebar.classList.remove("active");

};

// ================= WISHLIST =================

wishlistBtn.onclick = () => {

    wishlistPopup.classList.add("active");

};

closeWishlist.onclick = () => {

    wishlistPopup.classList.remove("active");

};

// ================= DARK MODE =================

themeBtn.onclick = () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

};

// Restore Theme

if (localStorage.getItem("theme") === "true") {

    document.body.classList.add("dark");

}

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    showToast("Message Sent Successfully!");

    contactForm.reset();

});

// ================= TOAST =================

function showToast(message){

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

// ================= LOAD DATA =================

updateCart();
updateWishlist();

console.log("ShopSphere Loaded Successfully 🚀");