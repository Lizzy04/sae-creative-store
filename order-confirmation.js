// Get the confirmed order from localStorage
const confirmedOrder = JSON.parse(localStorage.getItem("confirmedOrder")) || [];

// Select the order summary elements
const confirmedItems = document.querySelector("#confirmed-items");
const confirmedTotal = document.querySelector("#confirmed-total");
const confirmedPayment = document.querySelector("#confirmed-payment");

// Start with an empty total
let total = 0;

// Check whether an order exists
if (confirmedOrder.length === 0) {
    confirmedItems.textContent = "No order details are available.";
    confirmedTotal.textContent = "";
} else {
    // Display each confirmed item
    confirmedOrder.forEach(function(item) {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;

        const itemElement = document.createElement("p");

        itemElement.textContent =
            `${item.name} | Size: ${item.size} | Quantity: ${item.quantity} | R${itemSubtotal.toFixed(2)}`;

        confirmedItems.appendChild(itemElement);
    });

    // Display the final total
    confirmedTotal.textContent = `Total: R${total.toFixed(2)}`;
    // Display the selected payment method
const paymentMethod = localStorage.getItem("paymentMethod");

if (paymentMethod === "eft") {
    confirmedPayment.textContent = "Payment Method: Online EFT Payment";
} else if (paymentMethod === "campus") {
    confirmedPayment.textContent = "Payment Method: Pay on campus upon collection";
}
}
// Clear the shopping cart after confirmation
localStorage.removeItem("shoppingCart");