# NMKR Cardano Payment Form

## 📝 Assignment Overview
A JavaScript-based payment form designed to demonstrate fundamental web development skills, focusing on form handling, validation, and interaction with the Cardano blockchain payment system.

## 🎯 Learning Objectives
- Master DOM manipulation techniques
- Implement client-side form validation
- Handle form submission programmatically
- Understand event-driven programming
- Work with URL generation and window interactions
- Apply basic CSS styling using Pico CSS

## 🚀 Technologies Utilized
- HTML5
- CSS3 (Pico CSS)
- Vanilla JavaScript
- NMKR Pay API Integration

## ✨ Core Features
- Cardano wallet address input
- Payment amount specification
- Optional transaction note
- Real-time form validation
- Dynamic payment link generation
- Error handling and user feedback

## 🛠 Technical Implementation Details

### HTML Structure
```html
<form id="payment-form">
  <input name="address" placeholder="Cardano Wallet Address" required>
  <input name="amount" type="number" placeholder="Amount in ADA" required>
  <input name="note" placeholder="Optional Transaction Note">
  <button type="submit">Generate Payment Link</button>
  <div class="error-message"></div>
</form>
```

### JavaScript Validation Techniques
```javascript
function submitFormHandler(event) {
  event.preventDefault();
  
  // Validate receiver address format
  if (!receverAddress.startsWith("addr")) {
    errorMessageEl.textContent = "Invalid Cardano address";
    return;
  }
  
  // Ensure required fields are filled
  if (!receverAddress || !amount) {
    errorMessageEl.textContent = "Receiver address and amount are required";
    return;
  }
}
```

### Key Coding Concepts Demonstrated
- `getElementById()` for element selection
- Event listener implementation
- Form submission prevention
- Dynamic URL parameter replacement
- Window interaction with `window.open()`
- Conditional form validation
- Error message management

## 🔍 Advanced Techniques Explored
- String manipulation
- Form input validation
- Dynamic link generation
- Error handling and user feedback
- Secure payment link creation

## 💡 Challenges Addressed
- Implementing comprehensive client-side validation
- Creating user-friendly error messaging
- Handling blockchain-specific address formats
- Generating secure payment links

## 🚧 Potential Enhancements
- Implement more robust address validation
- Add client-side ADA amount formatting
- Create loading states during link generation
- Enhance error handling mechanisms
- Support multiple blockchain address formats

## 📚 Learning Resources
- [NMKR Pay Documentation](https://docs.nmkr.io/nmkr-studio/set-up-sales/nmkr-pay)
- [MDN Web Docs: Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [JavaScript Event Handling](https://developer.mozilla.org/en-US/docs/Web/Events)

## 🤝 Contribution
Contributions welcome! Feel free to fork and improve the payment form functionality.
