async function loadKPI(){

const res = await fetch('/.netlify/functions/kpiDashboard');
const data = await res.json();

document.getElementById("sales").innerText = data.sales;
document.getElementById("trx").innerText = data.transaksi;
document.getElementById("qty").innerText = data.qty;

}

loadKPI();