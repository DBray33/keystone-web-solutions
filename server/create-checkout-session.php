<?php
require '../vendor/autoload.php'; // Load Stripe's PHP library

header('Content-Type: application/json');

// ✅ Retrieve and Set Stripe Secret Key
$stripeSecretKey = getenv('STRIPE_SECRET_KEY');

if (!$stripeSecretKey) {
    error_log('❌ ERROR: Stripe Secret Key is missing.');
    http_response_code(500);
    echo json_encode(['error' => 'Stripe Secret Key is not set.']);
    exit;
}

\Stripe\Stripe::setApiKey($stripeSecretKey);
error_log('✅ Stripe Secret Key successfully retrieved.');

// ✅ Define business details
$YOUR_DOMAIN = 'https://keystonewebsolutions.com'; // Your actual website domain

// ✅ Define Stripe Price IDs
$priceIds = [
    'silver_deposit' => 'price_1QrRkIJXGPtgK9Fkl94Wiy4k', // Silver Package - Payment #1 (Deposit)
    'silver_final' => 'price_1QrS0dJXGPtgK9Fk1mZ65bsR',   // Silver Package - Payment #2 (Final Installment)
    'silver_subscription' => 'price_1QrS92JXGPtgK9Fkx0a4vowu', // Silver Package - Subscription (Monthly)
    
    'gold_deposit' => 'price_1QrS65JXGPtgK9Fk4oyymwC9', // Gold Package - Payment #1 (Deposit)
    'gold_final' => 'price_1QrS76JXGPtgK9FkkG283MG0',   // Gold Package - Payment #2 (Final Installment)
    'gold_subscription' => 'price_1QrSHTJXGPtgK9FkXIvU9DqH', // Gold Package - Subscription (Monthly)
];

// ✅ Receive JSON input from frontend
$input = json_decode(file_get_contents("php://input"), true);
$packageType = $input['packageType'] ?? null;

// ✅ Debugging: Log received package type
error_log("📦 Received package type: " . json_encode($input));

// ✅ Validate package selection
if (!isset($priceIds[$packageType])) {
    error_log("❌ ERROR: Invalid package type received - " . $packageType);
    http_response_code(400);
    echo json_encode([
        'error' => 'Invalid package type',
        'received' => $packageType,
        'valid_options' => array_keys($priceIds)
    ]);
    exit;
}

try {
    // ✅ Create Stripe Checkout Session
    $checkout_session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price' => $priceIds[$packageType],
            'quantity' => 1,
        ]],
        'mode' => strpos($packageType, 'subscription') !== false ? 'subscription' : 'payment',
        'success_url' => $YOUR_DOMAIN . '/success.html?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
    ]);

    error_log("✅ Checkout Session Created: " . json_encode($checkout_session));

    echo json_encode(['id' => $checkout_session->id]);
} catch (Exception $e) {
    error_log("❌ Stripe API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Stripe API error: ' . $e->getMessage()]);
}
?>