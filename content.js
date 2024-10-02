// Function to extract product information from the page
function getProductInfo() {
  const productTitle = document.getElementById("productTitle")?.innerText || "Unknown Product";
  const description = document.getElementById("feature-bullets")?.innerText || '';

  console.log("Product Title:", productTitle); // Debugging
  console.log("Product Description:", description); // Debugging

  return {
      title: productTitle,
      description: description
  };
}

// Function to check if the product is eco-friendly based on keywords
function isEcoFriendly(description) {
  const ecoKeywords = [
      "eco-friendly",
      "biodegradable",
      "sustainable",
      "recycled",
      "organic",
      "green",
      "compostable",
      "natural",
      "environmentally friendly"
  ];

  // Check for keywords in a case-insensitive manner
  return ecoKeywords.some(keyword => description.toLowerCase().includes(keyword));
}

// Function to create and display eco-friendly badge
function createEcoBadge(isEco) {
  const badge = document.createElement("div");
  badge.className = "eco-badge"; // Add class for styling
  badge.innerHTML = isEco ? "✅ Eco-Friendly" : "❌ Not Eco-Friendly";

  badge.style.backgroundColor = isEco ? "green" : "red";
  badge.style.position = 'absolute'; // Position the badge absolutely
  badge.style.top = '20px'; // Adjust the position
  badge.style.right = '20px'; // Adjust the position

  // Make badge draggable
  badge.onmousedown = function(event) {
      let shiftX = event.clientX - badge.getBoundingClientRect().left;
      let shiftY = event.clientY - badge.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
          badge.style.left = pageX - shiftX + 'px';
          badge.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      badge.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          badge.onmouseup = null;
      };
  };

  document.body.appendChild(badge);
  console.log("Badge Created:", badge); // Debugging
}

// Function to check current product and create the badge
function checkCurrentProduct() {
  const productInfo = getProductInfo();
  if (productInfo.title) {
      const ecoFriendly = isEcoFriendly(productInfo.description);
      createEcoBadge(ecoFriendly);
      return ecoFriendly ? "✅ Eco-Friendly" : "❌ Not Eco-Friendly";
  } else {
      return "No product information found.";
  }
}

// Adding a listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkProduct") {
      const result = checkCurrentProduct();
      sendResponse({ result: result });
  }
});
