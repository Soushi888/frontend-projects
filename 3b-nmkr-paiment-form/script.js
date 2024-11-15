// https://docs.nmkr.io/nmkr-studio/set-up-sales/nmkr-pay

const paymentForm = document.getElementById("payment-form");
const basePaymentLink =
  "https://pay.nmkr.io/?receiverAddress=<address>&amount=<amount>";

function submitFormHandler(event) {
  event.preventDefault();

  const receverAddress = paymentForm.address.value;
  const amount = Number(paymentForm.amount.value);
  const amountInADASats = amount * 1000000;
  const note = paymentForm.note.value;
  let errorMessageEl = document.querySelector(".error-message");

  if (!receverAddress || !amount) {
    errorMessageEl.textContent =
      "Receiver address and amount are required fields";
    return;
  }

  if (!receverAddress.startsWith("addr")) {
    errorMessageEl.textContent = "Invalid Cardano address";
    return;
  }

  let paymentLink = basePaymentLink
    .replace("<address>", receverAddress)
    .replace("<amount>", amountInADASats);

  if (note) {
    paymentLink += `&note=${note}`;
  }

  window.open(paymentLink, "_blank", "resizable=yes,scrollbars=no");

  paymentForm.reset();
}

paymentForm.addEventListener("submit", submitFormHandler);
