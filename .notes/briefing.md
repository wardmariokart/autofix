# Full stack developer / AI
Thanks for taking this take-home exercise. The goal is to create a simple program that fixes a security vulnerability. Don’t spend more than 3 hours on it.
The following PHP code snippet has a vulnerability on line 15: using backticks in PHP can lead to remote code execution.

```php
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
$first = `dig @$ns_dig[0] -t ns $domains[domain]`;

// Output the result
echo "<pre>$first</pre>";

// Repeat using the second ns_dig
$second = `dig @$ns_dig[1] -t ns $domains[domain]`;

// Output the result
echo "<pre>$second</pre>";
?>
```

Write a program in your preferred language that:

- Uses an LLM to fix the given vulnerability
- Outputs the diff between the original version and the fixed version
- Keeps the diff as short as possible, we only want to solve the issue on line 15

Also provide a proof of concept payload for the vulnerability that prints ‘hello world’.














