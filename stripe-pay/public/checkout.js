// This is your test secret API key.
const stripe = Stripe(
  'pk_test_51QqKcUJXGPtgK9FkKNvFLhpGZ8cDFZQVXGW4QNhGHIhXC3IXNA4EjRpmDiiuYqrl5GUP34FXDXsuu96WD5TAjOMI00EUSQQO4v'
);

initialize();

async function initialize() {
  // Fetch the client secret from the server
  const fetchClientSecret = async () => {
    const response = await fetch('checkout.php', {
      // Changed path to just 'checkout.php'
      method: 'POST',
      body: JSON.stringify({ packageType: 'silver_deposit' }), // Match the package type you want to test
      headers: { 'Content-Type': 'application/json' },
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Initialize the Checkout with the client secret
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount the Checkout into the #checkout div
  checkout.mount('#checkout');
}
