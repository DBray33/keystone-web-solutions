// Initialize Stripe with your publishable key
const stripe = Stripe(
  'pk_live_51QqKcUJXGPtgK9Fk6FG4QY9rCUaBIFzUaUiVMXrJBv1q11N8iJ289gP9DeLYzKot5Pjye1wHGF8vi8cZQ2KafVrf00Gq9gdGVe'
); // Your publishable key

async function createCheckoutSession(packageType) {
  console.log('Package Type Sent:', packageType); // 🔍 Debugging Line

  const response = await fetch('/server/create-checkout-session.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packageType }),
  });

  const session = await response.json();

  if (session.id) {
    window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
  } else {
    alert('Error creating checkout session: ' + session.error);
    console.error('Stripe Checkout Error:', session.error); // 🔍 Debugging Error
  }
}

// Attach event listeners to payment buttons
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('silver-deposit-btn')
    ?.addEventListener('click', (e) => {
      e.preventDefault();
      createCheckoutSession('silver_deposit');
    });

  document
    .getElementById('silver-final-btn')
    ?.addEventListener('click', (e) => {
      e.preventDefault();
      createCheckoutSession('silver_final');
    });

  document
    .getElementById('gold-deposit-btn')
    ?.addEventListener('click', (e) => {
      e.preventDefault();
      createCheckoutSession('gold_deposit');
    });

  document.getElementById('gold-final-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    createCheckoutSession('gold_final');
  });
});

// Error handling in createCheckoutSession function
async function createCheckoutSession(packageType) {
  console.log('Package Type Sent:', packageType); // 🔍 Debugging Line

  const response = await fetch('/server/create-checkout-session.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packageType }),
  });

  const session = await response.json();

  if (session.id) {
    window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
  } else {
    console.error('Error creating checkout session: ', session); // More detailed error logging
    alert('Error creating checkout session: ' + session.error);
  }
}
