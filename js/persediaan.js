async function loadPersediaan(){

const tbody = document.getElementById("bodyPersediaan");

if(!tbody){
 return; // jika halaman persediaan belum dimuat
}

const res = await fetch("/.netlify/functions/getBarang");
const data = await res.json();

tbody.innerHTML = "";

data.forEach(row=>{

let status = "Aman";

if(row.stok_awal < 10){
 status = "Hampir Habis";
}

tbody.innerHTML += `
<tr>
<td>${row.sku}</td>
<td>${row.nama_produk}</td>
<td>${row.stok_awal}</td>
<td>${row.stok_awal}</td>
<td>${status}</td>
</tr>
`;

});

}

setTimeout(loadPersediaan,200);