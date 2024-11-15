# JavaScript Payment Form Assignment

## Objective
Create a simple payment form using HTML, CSS, and JavaScript. Implement basic functionality for submitting payments to a Cardano wallet.

## Requirements

### HTML Structure
Provide an HTML structure for the payment form with the following elements:
- A form element with id="payment-form"
- Input fields for receiver address, amount, and optional note
- A submit button

### CSS Styling
Use Pico CSS to style your form. Ensure it looks visually appealing and easy to use. You can add you own CSS as needed.

### JavaScript Functionality
Implement the following JavaScript features:
1. Basic input validation:
   - Check if both receiver address and amount are filled out
   - Validate that the receiver address starts with "addr"

2. Form submission handling:
   - Prevent default form submission behavior
   - Create a payment link using the provided base URL: `https://pay.nmkr.io/?receiverAddress=<address>&amount=<amount>&note=<note>`
   - Open the payment link in a new window when submitted

3. Form reset:
   - Reset the form after successful submission

### Key Concepts to Focus On

1. Accessing DOM elements using getElementById()
2. Using event listeners to handle form submissions
3. String manipulation with replace() method
4. Accessing form inputs by they name attribute
4. Conditional logic for form validation
5. Opening links in new windows using window.open()

### Bonus Challenge
Try to implement more advanced validation, such as checking if the amount is a valid number.

Additionally, add CSS styling to display error messages in red color. When an error occurs during form submission, update the text content of the element with class "error-message" to display the error message in red.


Have fun coding!