<?php
require_once '../vendor/autoload.php'; // Load Stripe's PHP library
require_once '../secrets.php'; // Your secrets file for the API key

$stripe = new \Stripe\StripeClient($stripeSecretKey); // Initialize Stripe with your secret API key
header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:4242'; // The URL for your local testing

// Use the correct price ID from your Stripe product
$priceId = 'price_1QrloJJXGPtgK9FkgjaLaOBi';  // This should be the price ID you created for the product

// Create the Checkout session with the price ID
$checkout_session = $stripe->checkout->sessions->create([
  'ui_mode' => 'embedded',  // Ensures the Checkout is embedded
  'line_items' => [[
    'price' => $priceId,  // Set the correct price ID for the package
    'quantity' => 1,  // Number of items to buy (1 for testing)
  ]],
  'mode' => 'payment',  // For one-time payments
  'return_url' => $YOUR_DOMAIN . '/return.html?session_id={CHECKOUT_SESSION_ID}', // Return URL after the payment is complete
]);

// Return the session's client secret for the frontend
echo json_encode(array('clientSecret' => $checkout_session->client_secret));
?>