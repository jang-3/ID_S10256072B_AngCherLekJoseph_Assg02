document.addEventListener('DOMContentLoaded', () => {
    
    const lottieLoad = document.getElementById('lottie-load');
  
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const id = urlParams.get('fid');
  
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
        const user = data.find(user => user._id === id);
        if (user) {
            const name = document.querySelector('#product-seller');
            if (name) {
              name.textContent = user.name;
            }
            const coinValue = document.querySelector('#product-price');
            if (coinValue) {
              coinValue.textContent = user.cost;
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
  
  
  