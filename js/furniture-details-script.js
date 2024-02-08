document.addEventListener('DOMContentLoaded', () => {
  const lottieLoad = document.getElementById('lottie-load');
  const urlParams = new URLSearchParams(window.location.search); // Get sent data from URL
  const id = urlParams.get('fid');
  let settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65af172e5b0a0385a894cf2c",
      "Cache-Control": "no-cache"
    }
  }
  fetch("https://interbarter-22df.restdb.io/rest/username", settings)
    .then(response => response.json())
    .then(function(data) {
      const userId = urlParams.get('id');
      const user = data.find(user => user._id === userId);
      document.querySelector('#expl').addEventListener('click', function(){ // Add links to navigation bar
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

      if (user) { // Update profile values
        const name2 = document.querySelector('#profile-name');
        if (name2) {
          name2.textContent = user.username;
        }
        const coinValues = document.querySelectorAll('.coin-value');
        coinValues.forEach(coinValue => {
          if (coinValue) {
            coinValue.textContent = user.coins;
          }
        });
        const profilePic = document.querySelector('#profile-pic');
        if (profilePic) {
          profilePic.src = user.profileimagelink;
        }
      } else {
        console.log('User not found');
      }

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
          const user = data.find(user => user._id === id);
          if (user) {
              const name = document.querySelector('#product-seller'); // Get data and put data of product into the page
              if (name) {
                name.textContent = user.name;
              }
              const coinValue = document.querySelector('#product-price');
              if (coinValue) {
                coinValue.textContent = `${user.cost} Coins`;
              }
              const furniturePic = document.querySelector('#product-img');
              if (furniturePic) {
                furniturePic.src = user.imagelink;
              }
              const furnitureDesc = document.querySelector('#desc-desc');
              if (furnitureDesc) {
                furnitureDesc.textContent = user.description;
              }
              const width = document.querySelector('#width');
              if (width) {
                width.textContent = user.width;
              }
              const depth = document.querySelector('#depth');
              if (depth) {
                depth.textContent = user.depth;
              }
              const height = document.querySelector('#height');
              if (height) {
                height.textContent = user.height;
              }
              const producttitle = document.querySelector('#product-title');
              if (producttitle) {
                producttitle.textContent = user.furnituretitle;
              }

              var threeDEmbedd = document.getElementById('threed'); // Add 3D Model
              console.log(user.threedembed); 
              if (user.threedembed) {
                document.querySelector('#threed-embed').innerHTML = user.threedembed;
                threeDEmbedd.style.display = 'flex';

              } else {
                threeDEmbedd.style.display = 'none';

              }
          }
        });

        // Hide the original container
        if (lottieLoad) { lottieLoad.style.display = 'none'; }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            } else {
              entry.target.classList.remove('show')
            }
          })
        })
        const hiddenElements = document.querySelectorAll('.selected');
        hiddenElements.forEach((el) => observer.observe(el));
      })
      .catch(error => console.error('Error:', error));

      // Get the purchase button
      const purchaseButton = document.querySelector('#purchase-button');

      // Add click event listener to the button
      purchaseButton.addEventListener('click', () => {
        // Get the current user
        const userId = urlParams.get('id');
        const user = data.find(user => user._id === userId);
        if (user) {
          user.coins = parseFloat(user.coins);
          // continue with the rest of the code that uses the `user` variable
        } else {
          console.error('Error: User not found');
        }

        // Get the price of the current item
        const price = parseFloat(document.querySelector('#product-price').textContent);

        // Check if the user has enough coins
        if (user.coins >= price) {

          // Deduct the price from the user's coins
          user.coins -= price;
          alert('Thank you for your purchase.');

          // Send a POST request to update the user's coins
          fetch(`https://interbarter-22df.restdb.io/rest/username`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-apikey": "65af172e5b0a0385a894cf2c",
              "Cache-Control": "no-cache"
            },
            body: JSON.stringify(user)
          })
          .then(response => response.json())
          .then(updatedUser => {
            
            // Update the UI with the new coins value
            const coinValue = document.querySelector('#coin-value');
            if (coinValue) {
              coinValue.textContent = `${updatedUser.coins} Coins`;
            }
          })

          let settings2 = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-apikey": "65af172e5b0a0385a894cf2c",
              "Cache-Control": "no-cache"
            }
          }

          fetch("https://interbarter-22df.restdb.io/rest/username", settings2) // Update Seller's Clover Coins
            .then(response => response.json())
            .then(function(data) {
              const name = document.querySelector('#product-seller').textContent; 
              const user = data.find(user => user.username === name);
              const price = parseFloat(document.querySelector('#product-price').textContent);
              if (user) {
                parseFloat(user.coins) += price; 
                return fetch(`https://interbarter-22df.restdb.io/rest/username`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "65af172e5b0a0385a894cf2c",
                    "Cache-Control": "no-cache"
                  },
                  body: JSON.stringify(user)
                });
              }
            })
        } else {
          alert('User does not have enough coins');
        }
      });
    })
    .catch(error => console.error('Error:', error));
  // Button click event (Mobile)
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