async function loadDashboard(){

const cards = document.querySelectorAll(".kpi-card .value");

if(cards.length === 0) return;

try{

const res = await fetch("/api/getPersediaan");
const data = await res.json();

if(!Array.isArray(data)){
 console.error("API bukan array",data);
 return;
}

let totalProduk = data.length;
let totalStok = 0;
let hampirHabis = 0;

data.forEach(r=>{

totalStok += Number(r.stok);

if(Number(r.stok) < 10){
 hampirHabis++;
}

});

cards[0].innerText = totalProduk;
cards[1].innerText = totalStok;
cards[2].innerText = hampirHabis;

const penjualan = await fetch("/api/getPenjualanBulanIni");
const result = await penjualan.json();

cards[3].innerText = result.total || 0;

}catch(err){
console.error(err);
}

}