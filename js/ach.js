(function () {
  "use strict";

  var elements = stripe.elements({
    // Stripe's examples are localized to specific languages, but if
    // you wish to have Elements automatically detect your user's locale,
    // use `locale: 'auto'` instead.
    locale: window.__exampleLocale
  });

  /**
   * Card Element
   */
  // var card = elements.create("card", {
  //   iconStyle: "solid",
  //   style: {
  //     base: {
  //       iconColor: "#fff",
  //       color: "#fff",
  //       fontWeight: 400,
  //       fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  //       fontSize: "16px",
  //       fontSmoothing: "antialiased",

  //       "::placeholder": {
  //         color: "#BFAEF6"
  //       },
  //       ":-webkit-autofill": {
  //         color: "#fce883"
  //       }
  //     },
  //     invalid: {
  //       iconColor: "#FFC7EE",
  //       color: "#FFC7EE"
  //     }
  //   }
  // });
  // card.mount("#gene-iq-card");

  /**
   * Payment Request Element
   */
  var paymentRequest = stripe.paymentRequest({
    country: "US",
    currency: "usd",
    total: {
      amount: 500,
      label: "Total"
    },
    requestShipping: true,
    shippingOptions: [{
      id: "free-shipping",
      label: "Free shipping",
      detail: "Arrives in 5 to 7 days",
      amount: 0
    }]
  });
  paymentRequest.on("token", function (result) {
    var example = document.querySelector(".gene-iq");
    example.querySelector(".token").innerText = result.token.id;
    example.classList.add("submitted");
    result.complete("success");
  });

  var paymentRequestElement = elements.create("paymentRequestButton", {
    paymentRequest: paymentRequest,
    style: {
      paymentRequestButton: {
        theme: "light"
      }
    }
  });

  paymentRequest.canMakePayment().then(function (result) {
    if (result) {
      document.querySelector(".gene-iq .card-only").style.display = "none";
      document.querySelector(
          ".gene-iq .payment-request-available"
        ).style.display =
        "block";
      paymentRequestElement.mount("#gene-iq-paymentRequest");
    }
  });

  //registerElements([card], "gene-iq");
})();