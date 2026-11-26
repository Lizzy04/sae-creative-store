
// Select all Add to Cart buttons
const cartButtons = document.querySelectorAll(".add-to-cart");

// Keep track of the number of items in the cart
let cartCount = 0;

// Store products added to the shopping cart
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Find the cart counter in the navigation bar
const cartCountDisplay = document.querySelector("#cart-count");

// Find the shopping cart display area
const cartItemsDisplay = document.querySelector("#cart-items");

// Listen for clicks on each button
cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);

        // Find the product card
        const productCard = button.closest(".product-card");

        // Check whether this product has a size dropdown
        const sizeSelect = productCard.querySelector(".size-select");

        let selectedSize = "";

        if (sizeSelect) {

            selectedSize = sizeSelect.value;

            if (selectedSize === "") {
                alert("Please select a size before adding this product to your cart.");
                return;
            }

        }

        // Create a product object
        const cartItem = {
            name: productName,
            size: selectedSize,
            price: productPrice,
            quantity: 1
        };

        // Add the product to the shopping cart
        shoppingCart.push(cartItem);

        // Save the shopping cart in the browser
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        // Refresh the shopping cart display
        displayCart();

        // Show confirmation
        if (selectedSize !== "") {
            alert(productName + " (Size: " + selectedSize + ") added to your cart!");
        } else {
            alert(productName + " added to your cart!");
        }

    });

});



function displayCart() {

    // Calculate the total number of products
cartCount = shoppingCart.reduce(function(total, item) {
    return total + item.quantity;
}, 0);

// Update the navigation cart counter
cartCountDisplay.textContent = cartCount;

    // Clear the current cart display
    cartItemsDisplay.innerHTML = "";
    // Calculate the total value of the shopping cart
let cartTotal = shoppingCart.reduce(function(total, item) {
    return total + (item.price * item.quantity);
}, 0);

    
    // Check whether the cart is empty
    if (shoppingCart.length === 0) {

        cartItemsDisplay.innerHTML =
            '<p class="empty-cart">Your cart is currently empty.</p>';
            
    } else {

        // Display each product in the cart
        shoppingCart.forEach(function(item, index) {

            const cartItemElement = document.createElement("div");

            cartItemElement.classList.add("cart-item");

           cartItemElement.innerHTML = `
    <h3>${item.name}</h3>
    <p>Size: ${item.size}</p>
    <p>Price: R${Number(item.price || 0).toFixed(2)}</p>
    <p>Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>
    <div class="quantity-controls">
    <button class="decrease-quantity" data-index="${index}">−</button>
    <span>Quantity: ${item.quantity}</span>
    <button class="increase-quantity" data-index="${index}">+</button>
</div>
    <button class="remove-item" data-index="${index}">
        REMOVE
    </button>
`;
            cartItemsDisplay.appendChild(cartItemElement);
            // Find the Increase Quantity button
const increaseButton = cartItemElement.querySelector(".increase-quantity");

increaseButton.addEventListener("click", function() {

    // Increase the product quantity
    shoppingCart[index].quantity++;

    // Save the updated cart
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    // Refresh the cart display
    displayCart();
// Display the shopping cart total

});

// Find the Decrease Quantity button
const decreaseButton = cartItemElement.querySelector(".decrease-quantity");

decreaseButton.addEventListener("click", function() {

    // Reduce the product quantity, but never below 1
    if (shoppingCart[index].quantity > 1) {

        shoppingCart[index].quantity--;

        // Save the updated cart
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        // Refresh the cart display
        displayCart();

    }

});
            // Find the Remove button
const removeButton = cartItemElement.querySelector(".remove-item");

// Listen for clicks on the Remove button
removeButton.addEventListener("click", function() {

    // Remove the selected item from the shopping cart
    shoppingCart.splice(index, 1);
    // Update the saved shopping cart
localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    // Update the cart counter
    cartCount = shoppingCart.reduce(function(total, item) {
    return total + item.quantity;
}, 0);
    cartCountDisplay.textContent = cartCount;

    // Refresh the cart display
    displayCart();

});

        });
      // Display the shopping cart total
const totalDisplay = document.createElement("div");

totalDisplay.classList.add("cart-total");

totalDisplay.innerHTML = `
    <h3>Cart Total: R${cartTotal.toFixed(2)}</h3>
`;

cartItemsDisplay.appendChild(totalDisplay);
// Create the checkout button
const checkoutButton = document.createElement("button");
checkoutButton.textContent = "Proceed to Checkout";
checkoutButton.classList.add("checkout-button");

checkoutButton.addEventListener("click", function() {
    window.location.href = "checkout.html";
});


cartItemsDisplay.appendChild(checkoutButton);

    }

}
// Restore the saved cart when the website loads
// Restore the saved cart when the website loads
displayCart();