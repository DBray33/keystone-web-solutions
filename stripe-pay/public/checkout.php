<?php
require_once '../vendor/autoload.php'; // Load Stripe's PHP library
require_once '../secrets.php'; 

$stripe = new \Stripe\StripeClient($stripeSecretKey); 
header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:4242'; 

// Set price IDs based on the package type
$priceIds = [
  'silver_deposit' => 'price_1QrloJJXGPtgK9FkgjaLaOBi',  
  'silver_final' => 'price_1QroCIJXGPtgK9Fk8PoggJQi',
  'silver_subscription' => 'price_1QroDFJXGPtgK9FkSRL5WcX2',
  'gold_deposit' => 'price_1QroDjJXGPtgK9Fk5NkHzdbG',
  'gold_final' => 'price_1QroEBJXGPtgK9FkhVBIE2yd',
  'gold_subscription' => 'price_1QroEYJXGPtgK9FkCoxq6XuI',
];

// Get the packageType from the request
$input = json_decode(file_get_contents('php://input'), true);
$packageType = $input['packageType'];

if (!isset($priceIds[$packageType])) {
    echo json_encode(['error' => 'Invalid package type']);
    exit;
}

$priceId = $priceIds[$packageType];

// Define the line items for the checkout session
$line_items = [[
  'price' => $priceId,
  'quantity' => 1,
]];

// If the selected package includes a subscription (Payment #2 + Subscription), add both
if (strpos($packageType, 'final') !== false) {
    $subscriptionPrice = str_replace('final', 'subscription', $packageType); // e.g., "gold_final" -> "gold_subscription"
    $line_items[] = [
        'price' => $priceIds[$subscriptionPrice],  // Add the subscription price as a second line item
        'quantity' => 1,
    ];

    // Switch to 'subscription' mode for Payment #2 + Subscription
    $mode = 'subscription';
} else {
    // Default to 'payment' mode for one-time payments
    $mode = 'payment';
}

// Create the Checkout session
$checkout_session = $stripe->checkout->sessions->create([
  'ui_mode' => 'embedded',  
  'line_items' => $line_items,
  'mode' => $mode,  // Use 'subscription' for Payment #2 + Subscription, and 'payment' for one-time payments
  'return_url' => $YOUR_DOMAIN . '/return.html?session_id={CHECKOUT_SESSION_ID}', 
]);

echo json_encode(['clientSecret' => $checkout_session->client_secret]);
?>