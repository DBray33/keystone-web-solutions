<?php
require '../vendor/autoload.php'; // Load Stripe's PHP library

// ✅ Set your Stripe Secret Key
\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

header('Content-Type: application/json');

// ✅ Set your business details
$YOUR_DOMAIN = 'https://keystonewebsolutions.com'; // Your actual website domain

// ✅ Define Stripe Price IDs for each package
$priceIds = [
    'silver_deposit' => 'price_1QrRkIJXGPtgK9Fkl94Wiy4k', // Silver Package - Payment #1 (Deposit)
    'silver_final' => 'price_1QrS0dJXGPtgK9Fk1mZ65bsR',   // Silver Package - Payment #2 (Final Installment)
    'silver_subscription' => 'price_1QrS92JXGPtgK9Fkx0a4vowu', // Silver Package - Subscription (Monthly)
    
    'gold_deposit' => 'price_1QrS65JXGPtgK9Fk4oyymwC9', // Gold Package - Payment #1 (Deposit)
    'gold_final' => 'price_1QrS76JXGPtgK9FkkG283MG0',   // Gold Package - Payment #2 (Final Installment)
    'gold_subscription' => 'price_1QrSHTJXGPtgK9FkXIvU9DqH', // Gold Package - Subscription (Monthly)
];

// ✅ Get the package type from the frontend request
$input = json_decode(file_get_contents("php://input"), true);
$packageType = $input['packageType'] ?? null;

// 🔍 Debugging: Log received package type
error_log("Received package type from frontend: " . json_encode($input));

// ✅ Validate the selected package
if (!isset($priceIds[$packageType])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid package type', 'received' => $packageType]);
    exit;
}

try {
    // ✅ Create a Stripe Checkout Session
    $checkout_session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price' => $priceIds[$packageType],
            'quantity' => 1,
        ]],
        'mode' => strpos($packageType, 'subscription') !== false ? 'subscription' : 'payment',
        'success_url' => $YOUR_DOMAIN . '/success.html',
        'cancel_url' => $YOUR_DOMAIN . '/cancel.html',
    ]);

    echo json_encode(['id' => $checkout_session->id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>