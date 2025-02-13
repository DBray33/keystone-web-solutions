// Test secret API key
const stripe = Stripe(
  'pk_test_51QqKcUJXGPtgK9FkKNvFLhpGZ8cDFZQVXGW4QNhGHIhXC3IXNA4EjRpmDiiuYqrl5GUP34FXDXsuu96WD5TAjOMI00EUSQQO4v'
);

initialize();

let checkout;

async function initialize() {
  // Fetch the client secret based on the packageType
  const fetchClientSecret = async (packageType) => {
    const response = await fetch('checkout.php', {
      method: 'POST',
      body: JSON.stringify({ packageType }), // Pass the packageType to the server
      headers: { 'Content-Type': 'application/json' },
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Function to create the Checkout session and mount the Checkout
  const createCheckoutSession = async (packageType) => {
    if (checkout) {
      checkout.destroy(); // Unmount and destroy the previous checkout session
    }

    const clientSecret = await fetchClientSecret(packageType);

    checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret: () => clientSecret,
    });

    // Mount the Checkout into the #checkout div
    checkout.mount('#checkout');
  };

  // Add event listeners for each payment button
  document
    .getElementById('silver-deposit-btn')
    .addEventListener('click', () => createCheckoutSession('silver_deposit'));
  document
    .getElementById('silver-final-btn')
    .addEventListener('click', () => createCheckoutSession('silver_final'));
  document
    .getElementById('gold-deposit-btn')
    .addEventListener('click', () => createCheckoutSession('gold_deposit'));
  document
    .getElementById('gold-final-btn')
    .addEventListener('click', () => createCheckoutSession('gold_final'));
}
