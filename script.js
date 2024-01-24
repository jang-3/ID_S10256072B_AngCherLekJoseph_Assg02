const APIKEY = "65af172e5b0a0385a894cf2c";

document.getElementById("contact-submit").addEventListener("click", function (e) {
  // Prevent default action of the button 
  e.preventDefault();

  //[STEP 2]: Let's retrieve form data
  // For now, we assume all information is valid
  // You are to do your own data validation
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  //[STEP 3]: Get form va lues when the user clicks on send
  // Adapted from restdb API
  let jsondata = {
    "username": username,
    "password": password
  };

  //[STEP 4]: Create our AJAX settings. Take note of API key
  let settings = {
    method: "POST", //[cher] we will use post to send info
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(jsondata),
    beforeSend: function () {
      //@TODO use loading bar instead
      // Disable our button or show loading bar
      document.getElementById("submit").disabled = true;
      // Clear our form using the form ID and triggering its reset feature
      document.getElementById("add-contact-form").reset();
    }
  }

  //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
  fetch("https://interactivedev-adbb.restdb.io/rest/contact", settings)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("contact-submit").disabled = false;
      //@TODO update frontend UI 
      document.getElementById("add-update-msg").style.display = "block";
      setTimeout(function () {
        document.getElementById("add-update-msg").style.display = "none";
      }, 3000);
      // Update our table 
      getContacts();
    });
});//end click 



$("#login-form").submit(function(event) {
  event.preventDefault();

  var username = $("#username").val();
  var password = $("#password").val();

  var data = {
    username: username,
    password: password
  };

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://interbarter-22df.restdb.io/rest/username",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "<your CORS apikey here>",
      "cache-control": "no-cache"
    },
    "data": JSON.stringify(data)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});


window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
