async function loadKPI(){

const res = await fetch("/.netlify/functions/kpiDashboard");
const data = await res.json();

document.getElementById("totalProduk").innerText = data.totalProduk;
document.getElementById("totalStok").innerText = data.totalStok;
document.getElementById("stokTipis").innerText = data.stokTipis;
document.getElementById("penjualanBulan").innerText = data.penjualan;


}

loadKPI();