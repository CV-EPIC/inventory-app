async function loadDashboard() {
  try {

    // ambil filter global (dari index nanti)
    const bulan = document.getElementById("filterBulan")?.value || 1;
    const tahun = document.getElementById("filterTahun")?.value || 2026;

    const res = await fetch(`https://inventory-app-cyan-theta.vercel.app/api/getPenjualanBulanIni?month=${bulan}&year=${tahun}`);
    const data = await res.json();

    let total = 0;

    data.forEach(row => {
      total += Number(row[4] || 0); // qty
    });

    document.getElementById("totalPenjualan").innerText = total;

  } catch (err) {
    console.error("Dashboard error:", err);
  }
}