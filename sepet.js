function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function switchdivs(switchfrom, switchto) { // switchfrom: html element (must not have "invisible" class), switchto: html element (must have "invisible" class)
    if(switchto.classList.contains("invisible") === false || switchfrom.classList.contains("invisible") === true) {
        return console.error("undefined behavior at switchdivs function.");
    }
    switchfrom.classList.add("invisible");
    switchto.classList.remove("invisible");
}

var sepetbos = document.getElementById("sepet_bos"); // visible at start
var sepetdolu = document.getElementById("sepet_dolu"); // invisible at start

let sepetCookie = getCookie("sepet");
if(sepetCookie) {
    // switch to sepet div
    switchdivs(sepetbos, sepetdolu);
    console.log(sepetCookie)
    let sepet = sepetCookie.split(",");
    fetch("http://127.0.0.1:3001/getProducts", {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({products:sepet}),
    }).then((v)=>v.json()).then((v)=>{
        var tbody = document.getElementById("sepet-tbody");
        let toplamTutar = 0.0;
        var table_foot = document.getElementById("table_foot");
        var footh = document.createElement("th");
        var footd = document.createElement("td");
        for(let i = 0; i < v.products.length; i++) {
            toplamTutar += parseFloat(v.products[i].fiyat);
            var tr = document.createElement("tr");
            tr.id = "tr"+i;
            var td0 = document.createElement("td");
            var image = document.createElement("img");
            image.src = "http://localhost:3001/"+(v.products[i].index+1)+".png";
            image.height = 100;
            image.width = 100;
            td0.appendChild(image);
            var td1 = document.createElement("td");
            var urunlink = document.createElement("a");
            urunlink.textContent = v.products[i].urun_ismi;
            urunlink.href = "http://localhost:8080/pages/product.html?product_id="+v.products[i]._id;
            td1.appendChild(urunlink);
            var td2 = document.createElement("td");
            td2.textContent = v.products[i].fiyat;
            var td3 = document.createElement("td");
            var sepettenCikar = document.createElement("button");
            sepettenCikar.textContent = "Sepetten Çıkar";
            sepettenCikar.classList.add("btn", "btn-danger");
            sepettenCikar.addEventListener('click', ()=>{
                var date = new Date();
                date.setDate(date.getDate()+30);
                sepet = sepet.filter(e => e !== v.products[i]._id); // arrayden ürünü silme
                if(sepet.length === 0) { // if last element is deleted
                    switchdivs(sepetdolu, sepetbos)
                }
                document.cookie = "sepet="+sepet.join(",")+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
                document.getElementById("tr"+i).remove(); // satırı silme
                let yeni_tutar = 0.0;
                v.products.map(e=>{
                    if(sepet.includes(e._id)) yeni_tutar+=parseFloat(e.fiyat)
                }) // silindikten sonraki tutarı hesapla
                footd.textContent = yeni_tutar.toFixed(2) + " ₺";
            });
            td3.appendChild(sepettenCikar);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        }
        footh.scope = "row";
        footh.textContent = "Toplam tutar";
        footd.textContent = toplamTutar.toFixed(2) + " ₺";
        table_foot.appendChild(footh);
        table_foot.appendChild(footd);
    });
}

var sepetbosalt = document.getElementById("sepetbosalt");
sepetbosalt.addEventListener("click", ()=>{
    var date = new Date();
    date.setDate(date.getDate()+30);
    document.cookie = "sepet=;expires="+date.toUTCString()+"; path=/; SameSite=Strict";
    // switch to sepetbos because sepet cookie is empty.
    switchdivs(sepetdolu, sepetbos); // FIXME: undefined behavior when trying to clear sepet while it is already empty
})