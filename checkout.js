// Get the saved shopping cart
const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Select the order summary elements
const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");

// Start with an empty total
let total = 0;

// Clear the placeholder message
checkoutItems.innerHTML = "";

// Display each cart item
shoppingCart.forEach(function(item) {

    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;

    const itemElement = document.createElement("p");

    itemElement.textContent =
        `${item.name} | Size: ${item.size} | Quantity: ${item.quantity} | R${itemSubtotal.toFixed(2)}`;

    checkoutItems.appendChild(itemElement);

});

// Display the final total
checkoutTotal.textContent = `Total: R${total.toFixed(2)}`;
// Handle checkout form submission
const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Check whether the cart is empty
    if (shoppingCart.length === 0) {
        alert("Your shopping cart is empty. Please add products first.");
        return;
    }

    // Save a copy of the order for the confirmation page
// Get the selected payment method
const selectedPayment = document.querySelector('input[name="payment-method"]:checked');

// Save the selected payment method
localStorage.setItem("paymentMethod", selectedPayment.value);

// Save a copy of the order for the confirmation page
localStorage.setItem("confirmedOrder", JSON.stringify(shoppingCart));
// Open the order confirmation page
window.location.href = "order-confirmation.html";

});