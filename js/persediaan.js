async function loadPersediaan(){

const tbody = document.getElementById("bodyPersediaan");
if(!tbody) return;

const res = await fetch("/api/getPersediaan");
const data = await res.json();

tbody.innerHTML="";

let totalSKU=0;
let totalStok=0;
let hampirHabis=0;

data.forEach(r=>{

let status="Aman";

if(r.stok<10){
 status="Hampir Habis";
 hampirHabis++;
}

totalSKU++;
totalStok+=Number(r.stok);

tbody.innerHTML+=`
<tr>
<td>${r.sku}</td>
<td>${r.nama_produk}</td>
<td>${r.stok_awal}</td>
<td>${r.stok_masuk}</td>
<td>${r.stok_keluar}</td>
<td>${r.stok}</td>
<td>${status}</td>
</tr>
`;

});

const kpi=document.querySelectorAll(".kpi-card .value");

kpi[0].innerText=totalSKU;
kpi[1].innerText=totalStok;
kpi[3].innerText=hampirHabis;

}

setTimeout(loadPersediaan,300);