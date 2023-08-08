var darkmode_btn = document.getElementById("darkmode");

changeMode(readTheme());

async function getProducts() {
  return await fetch("http://127.0.0.1:3001/getAllProducts", {method:"GET"}).then(v=>{
    console.log(v.body);
    return v.json()
  }).catch((err)=>{console.error(err)});
}

let product_grids = document.querySelectorAll(".product-grid");
if(product_grids.length !== 0) {
  getProducts().then(d=>{
    product_grids.forEach(e => listProducts(d, e));
  })
}
function listProducts(products, element) {
	element.innerHTML = "";
	for(let i = 0; i < products.length; i++) {
		var card = document.createElement("div");
		card.classList.add("card", "card-style");
		card.onclick = ()=> {
			console.log("clicked")
			window.location.href = "./pages/product.html?product_id="+products[i]._id;
		}
			var img = document.createElement("img");
			img.classList.add("card-img-top");
			img.src = "http://localhost:3001/"+(products[i].index+1)+".png";
			card.appendChild(img);
			
			var card_body = document.createElement("div");
			card_body.classList.add("card-body");
				var name = document.createElement("h5");
				name.classList.add("card-title");
				name.innerText = products[i].urun_ismi;
				card_body.appendChild(name);

				var price = document.createElement("p");
				price.classList.add("card-text");
				price.innerText = products[i].fiyat + "₺";
				card_body.appendChild(price);
			card.appendChild(card_body);
		element.appendChild(card);
	}
}

function readTheme() {
    const value = `; ${document.cookie}`;
	const parts = value.split(`; theme=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
function changeCookie(mode) {
    var date = new Date();
    date.setDate(date.getDate()+30);
    document.cookie = "theme="+mode+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
}
function changeMode(mode) {
    changeCookie(mode);
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", mode);
    darkmode_btn.classList.remove("btn-"+mode);
    darkmode_btn.classList.add(mode === "dark" ? "btn-light" : "btn-dark");
    darkmode_btn.innerText = mode === "dark" ? "☀️" : "🌙";
}

darkmode_btn.addEventListener('click',()=>changeMode(darkmode_btn.innerText === "🌙" ? "dark" : "light"))