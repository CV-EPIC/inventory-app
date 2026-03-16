async function loadDashboard(){

const el = document.getElementById("totalProduk");

if(!el){
 return; // jika bukan halaman dashboard
}

const res = await fetch("/.netlify/functions/kpiDashboard");
const data = await res.json();

document.getElementById("totalProduk").innerText = data.totalProduk || 0;
document.getElementById("totalStok").innerText = data.totalStok || 0;
document.getElementById("stokTipis").innerText = data.stokTipis || 0;
document.getElementById("penjualanBulan").innerText = data.penjualan || 0;

}

setTimeout(loadDashboard,200);