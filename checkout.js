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


checkoutForm.addEventListener("submit", async function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Check whether the cart is empty
    if (shoppingCart.length === 0) {
        alert("Your shopping cart is empty. Please add products first.");
        return;
    }

    // Prepare the order details
    const orderDetailsField = document.querySelector("#order-details");

    const orderDetails = shoppingCart.map(function(item) {
        const subtotal = item.price * item.quantity;

        return `${item.name} | Size: ${item.size} | Quantity: ${item.quantity} | Subtotal: R${subtotal.toFixed(2)}`;
    }).join("\n");

    const total = shoppingCart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    orderDetailsField.value = orderDetails + `\nOrder Total: R${total.toFixed(2)}`;

    try {

        // Send the order to Netlify
        const formData = new FormData(checkoutForm);

        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
            throw new Error("Order submission failed.");
        }

        // Save a copy of the order for the confirmation page
        localStorage.setItem("confirmedOrder", JSON.stringify(shoppingCart));

        // Open the order confirmation page
        window.location.href = "order-confirmation.html";

    } catch (error) {
        alert("Sorry, your order could not be submitted. Please try again.");
        console.error("Order submission error:", error);
    }

});
