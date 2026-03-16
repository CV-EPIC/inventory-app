async function loadPersediaan(){

const tbody = document.getElementById("bodyPersediaan");
if(!tbody) return;

try{

const res = await fetch("/.netlify/functions/getPersediaan");
const data = await res.json();

tbody.innerHTML = "";

let totalSKU = 0;
let totalStok = 0;
let hampirHabis = 0;

data.forEach(row=>{

let status = "Aman";

if(row.stok < 10){
 status = "Hampir Habis";
 hampirHabis++;
}

totalSKU++;
totalStok += Number(row.stok);

tbody.innerHTML += `
<tr>
<td>${row.sku}</td>
<td>${row.nama_produk}</td>
<td>${row.stok_awal}</td>
<td>${row.stok_masuk}</td>
<td>${row.stok_keluar}</td>
<td>${row.stok}</td>
<td>${status}</td>
</tr>
`;

});

updateKPI(totalSKU,totalStok,hampirHabis);

}catch(err){

console.error(err);

}

}



function updateKPI(totalSKU,totalStok,hampirHabis){

const kpi = document.querySelectorAll(".kpi-card .value");

if(kpi.length >= 4){

kpi[0].innerText = totalSKU;
kpi[1].innerText = totalStok;
kpi[2].innerText = 10;
kpi[3].innerText = hampirHabis;

}

}


document.addEventListener("DOMContentLoaded",loadPersediaan);