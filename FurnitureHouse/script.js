
// ============================================
// FURNIHOUSE SHOPPING SYSTEM
// JavaScript + Tailwind CSS
// ============================================


// ============================================
// 1. PRODUCT DATABASE (SAMPLE DATA)
// ============================================

const products = [

    // ELECTRIC ITEMS

    {
        id: 1,
        name: "Electric Oven",
        category: "Electric Items",
        subcategory: "Oven",
        price: 65000,
        stock: 5,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500"
    },

    {
        id: 2,
        name: "Double Door Fridge",
        category: "Electric Items",
        subcategory: "Fridge",
        price: 125000,
        stock: 8,
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500"
    },

    {
        id: 3,
        name: "Washing Machine",
        category: "Electric Items",
        subcategory: "Washing Machine",
        price: 95000,
        stock: 4,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500"
    },

    {
        id: 4,
        name: "Electric Toaster",
        category: "Electric Items",
        subcategory: "Toaster",
        price: 8500,
        stock: 10,
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500"
    },

    {
        id: 5,
        name: "Air Fryer",
        category: "Electric Items",
        subcategory: "Air Fryer",
        price: 25000,
        stock: 6,
        image: "https://images.unsplash.com/photo-1645543702687-8a12f60f5c38?w=500"
    },

    {
        id: 6,
        name: "Microwave Oven",
        category: "Electric Items",
        subcategory: "Microwave",
        price: 35000,
        stock: 7,
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500"
    },


    // CHAIRS

    {
        id: 7,
        name: "Wooden Chair",
        category: "Chairs",
        price: 8500,
        stock: 12,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500"
    },

    {
        id: 8,
        name: "Office Chair",
        category: "Chairs",
        price: 18500,
        stock: 8,
        image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500"
    },

    {
        id: 9,
        name: "Modern Dining Chair",
        category: "Chairs",
        price: 12000,
        stock: 0,
        image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=500"
    },


    // TABLES

    {
        id: 10,
        name: "Dining Table",
        category: "Tables",
        price: 45000,
        stock: 4,
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500"
    },

    {
        id: 11,
        name: "Coffee Table",
        category: "Tables",
        price: 22000,
        stock: 0,
        image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500"
    },

    {
        id: 12,
        name: "Wooden Table",
        category: "Tables",
        price: 30000,
        stock: 6,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500"
    },


    // SOFAS

    {
        id: 13,
        name: "Modern Sofa",
        category: "Sofas",
        price: 95000,
        stock: 3,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    },

    {
        id: 14,
        name: "Luxury Sofa",
        category: "Sofas",
        price: 145000,
        stock: 2,
        image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500"
    },

    {
        id: 15,
        name: "Living Room Sofa",
        category: "Sofas",
        price: 110000,
        stock: 0,
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500"
    },


    // OFFICE ITEMS

    {
        id: 16,
        name: "Office Desk",
        category: "Office Items",
        price: 35000,
        stock: 6,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500"
    },

    {
        id: 17,
        name: "Office Cabinet",
        category: "Office Items",
        price: 28000,
        stock: 0,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500"
    },

    {
        id: 18,
        name: "Office Workstation",
        category: "Office Items",
        price: 55000,
        stock: 5,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500"
    }

];


// ============================================
// 2. SHOPPING CART
// ============================================

let cart = [];

let selectedCategory = "All";

let selectedSubcategory = "All";


// ============================================
// 3. SELECT HTML ELEMENTS
// ============================================

const productList = document.getElementById("product-list");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const subtotalElement = document.getElementById("subtotal");

const shippingElement = document.getElementById("shipping");

const totalElement = document.getElementById("total");

const searchInput = document.getElementById("search-input");

const checkoutBtn = document.getElementById("checkout-btn");

const electricSubcategories = document.getElementById(
    "electric-subcategories"
);


// ============================================
// 4. PRICE FORMAT FUNCTION
// ============================================

function formatPrice(price) {

    return "Rs. " + price.toLocaleString("en-LK");

}


// ============================================
// 5. DISPLAY PRODUCTS
// ============================================

function displayProducts() {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();


    // Filter products

    const filteredProducts = products.filter(product => {

        const matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;


        const matchSubcategory =
            selectedCategory !== "Electric Items" ||
            selectedSubcategory === "All" ||
            product.subcategory === selectedSubcategory;


        const matchSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue) ||
            (product.subcategory || "").toLowerCase().includes(searchValue);


        return matchCategory &&
               matchSubcategory &&
               matchSearch;

    });


    // Clear previous products

    productList.innerHTML = "";


    // No products found

    if (filteredProducts.length === 0) {

        productList.innerHTML = `
            <div class="col-span-full text-center py-16">

                <p class="text-4xl mb-3">🔍</p>

                <h3 class="text-xl font-bold">
                    No Products Found
                </h3>

                <p class="text-stone-500 mt-2">
                    Try another category or search keyword.
                </p>

            </div>
        `;

        return;

    }


    // Display each product

    filteredProducts.forEach(product => {

        const isAvailable = product.stock > 0;


        productList.innerHTML += `

            <div class="product-card bg-white rounded-xl
                        shadow-sm overflow-hidden">

                <!-- Product Image -->

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="w-full h-48 object-cover"
                    loading="lazy">


                <div class="p-4">

                    <!-- Category -->

                    <p class="text-xs text-amber-700 font-semibold">
                        ${product.category}
                        ${product.subcategory
                            ? " / " + product.subcategory
                            : ""}
                    </p>


                    <!-- Product Name -->

                    <h3 class="font-bold text-lg mt-2">
                        ${product.name}
                    </h3>


                    <!-- Price -->

                    <p class="text-amber-900 font-bold mt-2">
                        ${formatPrice(product.price)}
                    </p>


                    <!-- Stock Status -->

                    <div class="mt-3">

                        <span class="${isAvailable
                            ? 'text-green-700 bg-green-100'
                            : 'text-red-700 bg-red-100'}
                            text-xs px-3 py-1 rounded-full font-semibold">

                            ${isAvailable
                                ? 'In Stock (' + product.stock + ')'
                                : 'Out of Stock'}

                        </span>

                    </div>


                    <!-- Add To Cart -->

                    <button
                        data-action="add"
                        data-id="${product.id}"
                        ${!isAvailable ? "disabled" : ""}

                        class="w-full mt-4
                               bg-amber-800 hover:bg-amber-900
                               disabled:bg-stone-300
                               text-white py-2 rounded-lg transition">

                        ${isAvailable
                            ? "Add to Cart"
                            : "Sold Out"}

                    </button>

                </div>

            </div>

        `;

    });

}


// ============================================
// 6. ADD TO CART (CREATE)
// ============================================

function addToCart(productId) {

    // Find selected product

    const product = products.find(
        item => item.id === productId
    );


    // Check product availability

    if (!product || product.stock <= 0) {

        alert("Sorry! This product is out of stock.");

        return;

    }


    // Check whether product already exists in cart

    const existingItem = cart.find(
        item => item.id === productId
    );


    // Decrease available stock

    product.stock--;


    if (existingItem) {

        // Increase existing quantity

        existingItem.quantity++;

    } else {

        // Add new product to cart

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }


    // Refresh application

    updateCart();

}


// ============================================
// 7. DISPLAY CART (READ)
// ============================================

function displayCart() {

    cartItems.innerHTML = "";


    // Empty cart message

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="text-center py-8">

                <p class="text-4xl mb-3">🛒</p>

                <p class="text-stone-400">
                    Your cart is empty.
                </p>

            </div>

        `;

        return;

    }


    // Display cart products

    cart.forEach(item => {

        cartItems.innerHTML += `

            <div class="flex gap-3 items-center border-b pb-4">

                <!-- Image -->

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-16 h-16 object-cover rounded-lg">


                <!-- Product Information -->

                <div class="flex-1 min-w-0">

                    <h3 class="font-semibold text-sm">
                        ${item.name}
                    </h3>

                    <p class="text-amber-800 font-bold text-sm mt-1">
                        ${formatPrice(item.price)}
                    </p>


                    <!-- Quantity Controls -->

                    <div class="flex items-center gap-3 mt-2">

                        <button
                            data-action="decrease"
                            data-id="${item.id}"
                            class="bg-stone-100 hover:bg-stone-200
                                   px-2 rounded">

                            -

                        </button>


                        <span class="font-semibold">
                            ${item.quantity}
                        </span>


                        <button
                            data-action="increase"
                            data-id="${item.id}"
                            class="bg-stone-100 hover:bg-stone-200
                                   px-2 rounded">

                            +

                        </button>

                    </div>

                </div>


                <!-- Remove Button -->

                <button
                    data-action="remove"
                    data-id="${item.id}"
                    class="text-red-500 hover:text-red-700
                           text-xs font-semibold">

                    Remove

                </button>

            </div>

        `;

    });

}


// ============================================
// 8. CHANGE QUANTITY (UPDATE)
// ============================================

function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );


    const product = products.find(
        product => product.id === productId
    );


    if (!item || !product) return;


    // Increase quantity

    if (amount === 1) {

        if (product.stock <= 0) {

            alert("No more stock available!");

            return;

        }

        item.quantity++;

        product.stock--;

    }


    // Decrease quantity

    else if (amount === -1) {

        item.quantity--;

        product.stock++;


        // Remove if quantity reaches zero

        if (item.quantity <= 0) {

            removeFromCart(productId);

            return;

        }

    }


    updateCart();

}


// ============================================
// 9. REMOVE PRODUCT (DELETE)
// ============================================

function removeFromCart(productId) {

    const item = cart.find(
        item => item.id === productId
    );


    if (!item) return;


    const product = products.find(
        product => product.id === productId
    );


    // Restore all reserved stock

    if (product) {

        product.stock += item.quantity;

    }


    // Delete product from cart

    cart = cart.filter(
        item => item.id !== productId
    );


    updateCart();

}


// ============================================
// 10. CALCULATE TOTAL PRICE
// ============================================

function calculateTotal() {

    // Calculate subtotal

    const subtotal = cart.reduce(

        (sum, item) => {

            return sum + (item.price * item.quantity);

        },

        0

    );


    // Shipping calculation

    const shipping = subtotal === 0 ? 0 : 500;


    // Final total

    const total = subtotal + shipping;


    // Display prices

    subtotalElement.textContent =
        formatPrice(subtotal);

    shippingElement.textContent =
        formatPrice(shipping);

    totalElement.textContent =
        formatPrice(total);

}


// ============================================
// 11. UPDATE CART UI
// ============================================

function updateCart() {

    // Refresh products and cart

    displayProducts();

    displayCart();


    // Calculate prices

    calculateTotal();


    // Calculate total quantity

    const totalItems = cart.reduce(

        (sum, item) => {

            return sum + item.quantity;

        },

        0

    );


    // Update cart badge

    cartCount.textContent = totalItems;


    // Enable or disable checkout

    checkoutBtn.disabled = cart.length === 0;

}


// ============================================
// 12. DISPLAY ELECTRIC SUBCATEGORIES
// ============================================

function displaySubcategories() {

    if (selectedCategory === "Electric Items") {

        electricSubcategories.classList.remove("hidden");

        electricSubcategories.classList.add("flex");

    } else {

        electricSubcategories.classList.add("hidden");

        electricSubcategories.classList.remove("flex");

    }

}


// ============================================
// 13. CATEGORY FILTER
// ============================================

document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", function() {

        selectedCategory = this.dataset.category;

        selectedSubcategory = "All";


        // Remove previous active style

        document.querySelectorAll(".category-btn").forEach(btn => {

            btn.classList.remove("active");

        });


        // Activate selected category

        this.classList.add("active");


        // Reset electric subcategory buttons

        document.querySelectorAll(".subcategory-btn").forEach(btn => {

            btn.classList.remove("active");

        });


        document.querySelector(
            '[data-subcategory="All"]'
        ).classList.add("active");


        displaySubcategories();

        displayProducts();

    });

});


// ============================================
// 14. ELECTRIC SUBCATEGORY FILTER
// ============================================

document.querySelectorAll(".subcategory-btn").forEach(button => {

    button.addEventListener("click", function() {

        selectedSubcategory = this.dataset.subcategory;


        // Remove previous active style

        document.querySelectorAll(".subcategory-btn").forEach(btn => {

            btn.classList.remove("active");

        });


        // Activate selected subcategory

        this.classList.add("active");


        displayProducts();

    });

});


// ============================================
// 15. PRODUCT SEARCH
// ============================================

searchInput.addEventListener("input", function() {

    displayProducts();

});


// ============================================
// 16. PRODUCT BUTTON EVENTS
// ============================================

productList.addEventListener("click", function(event) {

    const button = event.target.closest(
        'button[data-action="add"]'
    );

    if (!button) return;


    const productId = Number(button.dataset.id);


    addToCart(productId);

});


// ============================================
// 17. CART BUTTON EVENTS
// ============================================

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;


    const productId = Number(button.dataset.id);

    const action = button.dataset.action;


    switch (action) {

        case "increase":

            changeQuantity(productId, 1);

            break;


        case "decrease":

            changeQuantity(productId, -1);

            break;


        case "remove":

            removeFromCart(productId);

            break;

    }

});


// ============================================
// 18. HOME LOGO NAVIGATION
// ============================================

document.getElementById("home-logo").addEventListener(
    "click",

    function(event) {

        event.preventDefault();


        // Reset category

        selectedCategory = "All";

        selectedSubcategory = "All";


        // Clear search

        searchInput.value = "";


        // Reset category buttons

        document.querySelectorAll(".category-btn").forEach(btn => {

            btn.classList.remove("active");

        });


        document.querySelector(
            '[data-category="All"]'
        ).classList.add("active");


        // Reset subcategory buttons

        document.querySelectorAll(".subcategory-btn").forEach(btn => {

            btn.classList.remove("active");

        });


        document.querySelector(
            '[data-subcategory="All"]'
        ).classList.add("active");


        // Display all products

        displaySubcategories();

        displayProducts();


        // Scroll to homepage

        document.getElementById("home").scrollIntoView({

            behavior: "smooth"

        });

    }

);


// ============================================
// 19. CHECKOUT
// ============================================

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) return;


    const confirmation = confirm(

        "Are you sure you want to place this order?"

    );


    if (!confirmation) return;


    const orderTotal = cart.reduce(

        (sum, item) => sum + (item.price * item.quantity),

        0

    ) + 500;


    alert(

        "Thank you for shopping at FurniHouse!\n\n" +
        "Your order total is " + formatPrice(orderTotal) +
        "\n\nThis is a demonstration checkout."

    );


    // Clear cart WITHOUT restoring stock.
    // Stock remains reduced because the order is treated as completed.

    cart = [];

    updateCart();

});


// ============================================
// 20. INITIALIZE APPLICATION
// ============================================

// Display all products when website loads

displayProducts();


// Display empty cart and initial prices

updateCart();


// Initially hide electric subcategories

displaySubcategories();


// ============================================
// END OF APPLICATION
// ============================================
