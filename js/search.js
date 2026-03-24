function initGlobalSearch() {
  const input = document.getElementById("globalSearch");

  if (!input) return;

  input.addEventListener("keyup", function () {

    const value = this.value;

    // PENJUALAN
    if ($.fn.DataTable.isDataTable('#tablePenjualan')) {
      $('#tablePenjualan').DataTable().search(value).draw();
    }

    // PERSEDIAAN (nanti)
    if ($.fn.DataTable.isDataTable('#tablePersediaan')) {
      $('#tablePersediaan').DataTable().search(value).draw();
    }

  });
}