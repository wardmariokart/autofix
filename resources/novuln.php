<?php
// Check if the GET variable 'ns_dig' is set and not empty
if (isset($_GET['ns_dig']) && !empty($_GET['ns_dig'])) {
    // Split the GET variable into an array
    $ns_dig = explode(',', $_GET['ns_dig']);
} else {
    // Default value if 'ns_dig' is not provided
    $ns_dig = ['8.8.8.8', '8.8.4.4'];
}

// Example array of domains
$domains = ['domain' => 'example.com'];

// Execute the dig command to get the name servers for the domain
$first = shell_exec(escapeshellcmd("dig @" . escapeshellarg($ns_dig[0]) . " -t ns " . escapeshellarg($domains['domain'])));

// Output the result
echo "<pre>$first</pre>";

// Repeat using the second ns_dig
$second = shell_exec(escapeshellcmd("dig @" . escapeshellarg($ns_dig[1]) . " -t ns " . escapeshellarg($domains['domain'])));

// Output the result
echo "<pre>$second</pre>";
?>