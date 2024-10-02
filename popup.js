// Adding an event listener for the button click
document.getElementById('checkProduct').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send a message to the content script to check the current product
    chrome.tabs.sendMessage(tab.id, { action: "checkProduct" }, (response) => {
        const resultDiv = document.getElementById('result');

        // Check if we received a response
        if (chrome.runtime.lastError || !response) {
            resultDiv.innerText = "Error: Unable to get product information.";
            resultDiv.className = ""; // Clear class if there's an error
            return;
        }

        // Display the result in the popup
        resultDiv.innerText = response.result;

        // Add a class based on the result
        if (response.result.includes("Eco-Friendly")) {
            resultDiv.className = "eco-friendly"; // Add eco-friendly class
        } else if (response.result.includes("Not Eco-Friendly")) {
            resultDiv.className = "not-eco-friendly"; // Add not eco-friendly class
        } else {
            resultDiv.className = ""; // Clear class if no product info
        }
    });
});
