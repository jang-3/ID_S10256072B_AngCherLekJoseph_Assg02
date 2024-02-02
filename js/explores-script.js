document.addEventListener('DOMContentLoaded', () => {
  const containerElement = document.querySelector('.furniture-demo');

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
      const newContainer = document.createElement('div');
      newContainer.classList.add('cloned-container-3');

      // Copy the contents of the original container to the new container
      const clone = containerElement.querySelector('.container-3').cloneNode(true);
      newContainer.appendChild(clone);

      // Set dataset properties from JSON object
      for (const [key, value] of Object.entries(item)) {
        newContainer.dataset[key] = value;
      }

      // Set the price text content
      const newPrice = newContainer.querySelector('.price');
      newPrice.textContent = `${item.cost} Coins`;

      // Set the desc title text content
      const newDescTitle = newContainer.querySelector('.desc-title-1');
      newDescTitle.textContent = item.furnituretitle;

      // Set the desc text content
      const newDescText = newContainer.querySelector('#desc-1');
      if (newDescText) {
        newDescText.textContent = item.name;
      }

      const newImageLink = newContainer.querySelector('.explore-img');
      if (newImageLink) {
        newImageLink.src = item.imagelink;
      }

      // Append the new container-3 element to the furniture-demo element
      containerElement.appendChild(newContainer);
    });

    // Hide the original container
    containerElement.querySelector('.container-3:first-of-type').style.display = 'none';
  })
  .catch(error => console.error('Error:', error));
});