// Animation transition is not by me, it is from Beyond Fireship on Youtube and modified by me.
// https://www.youtube.com/watch?v=T33NN_pPeNI

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

// End of Animation Transition

let settings = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": "65af172e5b0a0385a894cf2c",
    "Cache-Control": "no-cache"
  }
};

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  fetch("https://interbarter-22df.restdb.io/rest/username", settings)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      let user = data.find(user => user.username === userName && user.password === password);
      if (user) {
        alert("You are logged in!");
        window.location.href = `explores.html?userId=${user._id}`;
      } else {
        alert("Wrong username or password");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    });
});