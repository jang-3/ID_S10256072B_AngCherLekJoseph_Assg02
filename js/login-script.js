const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show')
      }
    }), {
      root: document.documentElement,
      rootMargin: "0px 0px 0px 0px"
    }
});

const hiddenElements = document.querySelectorAll('.content > *');
hiddenElements.forEach((el) => observer.observe(el));
const hiddenElements2 = document.querySelectorAll('.selected');
hiddenElements2.forEach((el2) => observer.observe(el2));
const hiddenElements3 = document.querySelectorAll('.selected-up');
hiddenElements3.forEach((el3) => observer.observe(el3));

let settings = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": "65af172e5b0a0385a894cf2c",
    "Cache-Control": "no-cache" }
};

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  fetch("https://interbarter-22df.restdb.io/rest/username", settings) // Change the endpoint to "/rest/users/login" or the correct collection name
    .then(response => response.json())
    .then(function(data) {
      let userName = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      if (userName == data.username && password == data.password) {
        alert("You are logged in!");
      } else {
        alert("Wrong username or password");
      }
    });
});