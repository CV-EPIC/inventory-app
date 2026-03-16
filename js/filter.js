function getFilter(){

const bulan = document.getElementById("filterBulan")?.value;
const tahun = document.getElementById("filterTahun")?.value;

return {bulan,tahun};

}

function onFilterChange(){

const page = window.currentPage;

if(page === "dashboard"){
 loadDashboard();
}

if(page === "persediaan"){
 loadPersediaan();
}

if(page === "penjualan"){
 loadPenjualan();
}

}

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("filterBulan")
?.addEventListener("change",onFilterChange);

document.getElementById("filterTahun")
?.addEventListener("change",onFilterChange);

});