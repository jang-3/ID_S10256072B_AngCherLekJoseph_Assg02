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
    method: "GET", //[cher] we will use post to send info
    headers: {
    "Content-Type": "application/json",
    "x-apikey": "65af172e5b0a0385a894cf2c",
    "Cache-Control": "no-cache"
    }
}


//[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
document.getElementById("submit").addEventListener("click", function() {
    fetch("https://interbarter-22df.restdb.io/rest/username", settings)
        .then(response => response.json())
        .then(function(data) {
            let userName = document.getElementById("username")["value"];
            let password = document.getElementById("password")["value"];
            if userName == data[0].userName
        });
});
