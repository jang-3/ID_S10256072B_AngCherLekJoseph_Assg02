
// This smooth scroll code is not by me. It is by Manuel Otto on Stack Overflow.
// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript

function init(){
	new SmoothScroll(document,20,35)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}

// End of smooth scroll code

// Sticky Bar Code is not by me, it is from w3schools and modified by me.
// https://www.w3schools.com/howto/howto_js_navbar_sticky.asp

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

// End of Sticky Bar Code

// Animation transition is not by me, it is from Beyond Fireship on Youtube and modified by me.
// https://www.youtube.com/watch?v=T33NN_pPeNI

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show')
    }
  })
})

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
}

  fetch("https://interbarter-22df.restdb.io/rest/seller", settings) // Editing the Furniture card data (#container-3)
	.then(response => response.json())
	.then(function(data) {
		const containers = document.querySelectorAll('#container-3');
		for (let i = 0; i < containers.length && i < data.length; i++) {
		console.log(data[i]);
		let name = containers[i].querySelector('#desc-1');
		if (name) {
			name.textContent = data[i].name;
		}
		let image = containers[i].querySelector('#explore-img');
		if (image) {
			image.src = data[i].imagelink;
		}
		let title = containers[i].querySelector('#desc-title-1');
		if (title) {
			title.textContent = data[i].furnituretitle;
		}
		let price = containers[i].querySelector('.image-price .price');
		if (price) {
		  price.textContent = `${data[i].cost} Coins`;
		}
		}
	})