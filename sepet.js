function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
let sepetCookie = getCookie("sepet");
if(sepetCookie) {
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
            var td1 = document.createElement("td");
            td1.textContent = v.products[i].urun_ismi;
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
                document.cookie = "sepet="+sepet.join(",")+"; expires="+date.toUTCString()+"; path=/; SameSite=Strict";
                document.getElementById("tr"+i).remove(); // satırı silme
                let yeni_tutar = 0.0;
                v.products.map(e=>{
                    if(sepet.includes(e._id)) yeni_tutar+=parseFloat(e.fiyat)
                }) // silindikten sonraki tutarı hesapla
                footd.textContent = yeni_tutar.toFixed(2) + " ₺";
            });
            td3.appendChild(sepettenCikar);
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