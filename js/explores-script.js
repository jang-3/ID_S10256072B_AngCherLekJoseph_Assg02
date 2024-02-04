document.addEventListener('DOMContentLoaded', () => {

  const lottieLoad = document.getElementById('lottie-load');
  const containerElement = document.querySelector('.furniture-demo');
  const searchInput = document.querySelector('.search-container input[type="search"]');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)

  let settings = {
    method: "GET", //[cher] we will use post to send info
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65af172e5b0a0385a894cf2c",
      "Cache-Control": "no-cache"
    }
  }


  fetch("https://interbarter-22df.restdb.io/rest/username", settings)
    .then(response => response.json())
    .then(function(data) {
      const userId = urlParams.get("userId");
      const user = data.find(user => user._id === userId);
      document.querySelector('#expl').addEventListener('click', function(){
        window.location.href = `explores.html?userId=${userId}`;
      });
    
      document.querySelector('#notif').addEventListener('click', function(){
        window.location.href = `notifications.html?userId=${userId}`;
      });
  
      document.querySelector('.login').addEventListener('click', function(){
        window.location.href = `explores.html?userId=${user._id}`;
      });
    
      document.querySelector('.about-us').addEventListener('click', function(){
        window.location.href = `notifications.html?userId=${user._id}`;
      });

      document.querySelector('#logo-group').addEventListener('click', function(){
        window.location.href = `index.html`;
      });

      document.querySelector('#sidebar-logo').addEventListener('click', function(){
        window.location.href = `index.html`;
      });

      if (user) {
        const name = document.querySelector('#profile-name');
        if (name) {
          name.textContent = user.username;
        }
        const coinValue = document.querySelector('#coin-value');
        if (coinValue) {
          coinValue.textContent = user.coins;
        }
        const profilePic = document.querySelector('#profile-pic');
        if (profilePic) {
          profilePic.src = user.profileimagelink;
        }
      } else {
        console.log('User not found');
      }

  })

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
      newContainer.style.display = 'block';

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

      // Add event listener to new container
      newContainer.addEventListener('click', () => {
        const id = newContainer.dataset._id;
        window.open(`/furniture-details.html?id=${id}`);
      });

      // Append the new container-3 element to the furniture-demo element
      containerElement.appendChild(newContainer);
    });

    // Hide the original container
    if (lottieLoad) { lottieLoad.style.display = 'none'; }
    containerElement.querySelector('.container-3:first-of-type').style.display = 'none'

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show')
        }
      })
    })

    const hiddenElements = document.querySelectorAll('.container-3');
    hiddenElements.forEach((el) => observer.observe(el));
    const hiddenElements2 = document.querySelectorAll('.cloned-container-3');
    hiddenElements2.forEach((el2) => observer.observe(el2));

    // Add search functionality
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const furnitureTitles = document.querySelectorAll('.desc-title-1');

      furnitureTitles.forEach((title) => {
        if (title.textContent.toLowerCase().includes(searchTerm)) {
          title.parentElement.parentElement.style.display = 'flex';
          containerElement.querySelector('.container-3:first-of-type').style.display = 'none';
        } else {
          title.parentElement.parentElement.style.display = 'none';
          containerElement.querySelector('.container-3:first-of-type').style.display = 'none';
        }
      });
    });

  })
  
  .catch(error => console.error('Error:', error));

    // Button click event
    document.querySelector('#side-button').addEventListener('click', function(){
      var sidebar = document.querySelector('.sidebar');
      sidebar.style.left = '0px';
    });
    
    // Close button click event
    document.querySelector('#close-button').addEventListener('click', function(){
        var sidebar = document.querySelector('.sidebar');
        sidebar.style.left = '-500px';
    });
});






