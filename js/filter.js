function initFilterGlobal() {
  const bulan = document.getElementById("filterBulan");
  const tahun = document.getElementById("filterTahun");

  if (!bulan || !tahun) return;

  bulan.addEventListener("change", triggerReload);
  tahun.addEventListener("change", triggerReload);
}

function triggerReload() {
  if (window.currentPage === "dashboard") {
    loadDashboard();
  }

  if (window.currentPage === "persediaan") {
    loadPersediaan();
  }
}