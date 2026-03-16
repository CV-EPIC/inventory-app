async function loadPersediaan(){

const tbody = document.getElementById("bodyPersediaan");

if(!tbody){
 return; // jika halaman persediaan belum dimuat
}

const res = await fetch("/.netlify/functions/getPersediaan");
const data = await res.json();

tbody.innerHTML = "";

data.forEach(row=>{

let status = "Aman";

if(row.stok_sisa < 10){
 status = "Hampir Habis";
}

tbody.innerHTML += `
<tr>
<td>${row.sku}</td>
<td>${row.nama_produk}</td>
<td>${row.stok_awal}</td>
<td>${row.stok_masuk}</td>
<td>${row.stok_keluar}</td>
<td>${row.stok_sisa}</td>
<td>${status}</td>
</tr>
`;

});

}

setTimeout(loadPersediaan,200);