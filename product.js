const url = new URL(document.URL);
const product_id = url.searchParams.get("product_id");
var sepeteekle = document.getElementById("product_sepet");
var sepetcikar = document.getElementById("product_sepet_cikar")

let sepet = getCookie("sepet");
let sepetArr = [];
let sepettemi = false;
if(sepet) {
    sepetArr = sepet.split(",");
    sepettemi = sepetArr.includes(product_id)
}

if(sepettemi) {
    sepetcikar.classList.remove("invisible");
    sepeteekle.classList.add("invisible");
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}  

sepeteekle.addEventListener('click', ()=>{
    var date = new Date();
    date.setDate(date.getDate()+30);
    if(sepet && !sepettemi) {
        sepetArr.push(product_id);
        document.cookie = "sepet="+sepetArr.join(",")+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
    }else {
        document.cookie = "sepet="+product_id+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
    }
    sepetcikar.classList.remove("invisible");
    sepeteekle.classList.add("invisible");
})

sepetcikar.addEventListener('click', ()=>{
    var date = new Date();
    date.setDate(date.getDate()+30);
    if(sepet) {
        sepetArr = sepetArr.filter(v => v !== product_id); // arrayden ürünü silme
        document.cookie = "sepet="+sepetArr.join(",")+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
    }
    sepetcikar.classList.add("invisible");
    sepeteekle.classList.remove("invisible");
})

fetch("http://127.0.0.1:3000/getProduct", {
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({productid:product_id}),
}).then((v)=>v.json()).then((v)=>{
    document.getElementById("title").textContent = v.urun_ismi;
    document.getElementById("main_category").textContent = v.ana_kategori + " > " + v.ilgili_kategori;
    document.getElementById("price").textContent = v.fiyat + " ₺";
    var tbody = document.getElementById("product-tbody");

    for(let ozellik in v.ozellikler) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.scope = "row";
        th.textContent = ozellik;
        var td = document.createElement("td");
        td.textContent = v.ozellikler[ozellik];
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}).catch(err=>console.error(err))