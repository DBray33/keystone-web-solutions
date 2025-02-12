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
    .getElementById('silver-deposit-form')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();
      createCheckoutSession('silver_deposit');
    });

  document
    .getElementById('silver-final-form')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();
      createCheckoutSession('silver_final');
    });

  document
    .getElementById('gold-deposit-form')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();
      createCheckoutSession('gold_deposit');
    });

  document
    .getElementById('gold-final-form')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();
      createCheckoutSession('gold_final');
    });
});
