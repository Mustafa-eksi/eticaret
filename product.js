const url = new URL(document.URL);
const product_id = url.searchParams.get("product_id");

fetch("http://127.0.0.1:3000/getproduct", {
    mode:"no-cors",
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({productid:product_id}),
}).then((v)=>v.json()).then((v)=>{
    console.log(v)
}).catch(err=>console.error(err))