async function loadDashboard(){

const cards = document.querySelectorAll(".kpi-card .value");

if(cards.length === 0) return;

try{

const res = await fetch("/.netlify/functions/getPersediaan");
const data = await res.json();

let totalProduk = data.length;
let totalStok = 0;
let hampirHabis = 0;

data.forEach(row=>{

totalStok += Number(row.stok);

if(row.stok < 10){
 hampirHabis++;
}

});

cards[0].innerText = totalProduk;
cards[1].innerText = totalStok;
cards[2].innerText = hampirHabis;

loadPenjualanBulanIni(cards);

}catch(err){

console.error(err);

}

}



async function loadPenjualanBulanIni(cards){

try{

const res = await fetch("/.netlify/functions/getPenjualanBulanIni");
const data = await res.json();

if(cards.length >= 4){
 cards[3].innerText = data.total || 0;
}

}catch(err){

console.log(err);

}

}



document.addEventListener("DOMContentLoaded",loadDashboard);