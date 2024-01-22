var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://interbarter-22df.restdb.io/rest/username",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "<your CORS apikey here>",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  