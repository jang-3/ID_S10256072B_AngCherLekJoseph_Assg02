const containerElement = document.querySelector('.furniture-demoselected:last-child');

fetch("https://interbarter-22df.restdb.io/rest/seller", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": "65af172e5b0a0385a894cf2c",
    "Cache-Control": "no-cache"
  }
})
.then(response => response.json())
.then(data => {
  data.forEach((item, index) => {
    const newContainer = containerElement.cloneNode(true);
    newContainer.className = "container-3 selected"; // set the class to "container-3 selected"

    // Set dataset properties from JSON object
    for (const [key, value] of Object.entries(item)) {
      newContainer.dataset[key] = value;
    }

    // Set the price text content
    const newPrice = newContainer.querySelector('.price');
    newPrice.textContent = `${item.price} Coins`;

    // Set the desc title text content
    const newDescTitle = newContainer.querySelector('.desc-title-1');
    newDescTitle.textContent = item.title;

    // Set the desc text content
    const newDescText = newContainer.querySelector('.desc-1');
    newDescText.textContent = item.description;

    // Append the new container-3 element to the furniture-demo element
    containerElement.parentNode.appendChild(newContainer);
  });
})
.catch(error => console.error('Error:', error));