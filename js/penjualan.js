async function loadPenjualan() {
  try {
    document.querySelector("#tablePenjualan tbody").innerHTML =
  `<tr><td colspan="6" style="text-align:center">Loading...</td></tr>`;

    const bulan = document.getElementById("filterBulan")?.value || 1;
    const tahun = document.getElementById("filterTahun")?.value || 2026;

    const res = await fetch(`/api/getPenjualanBulanIni?month=${bulan}&year=${tahun}`);
    const data = await res.json();

    

    if (!data || data.length === 0) {
      document.querySelector("#tablePenjualan tbody").innerHTML =
        `<tr><td colspan="6" style="text-align:center">Tidak ada data</td></tr>`;
      return;
    }

    let totalQty = 0;
    let transaksi = new Set();
    let produkCount = {};

    let rows = "";

    data.forEach(row => {

      const [tgl, no, outlet, produk, qty, sku] = row;

      const qtyNum = Number(qty || 0);

      totalQty += qtyNum;
      transaksi.add(no);

      // hitung produk
      produkCount[produk] = (produkCount[produk] || 0) + qtyNum;

      rows += `
        <tr>
          <td>${tgl}</td>
          <td>${no}</td>
          <td>${outlet}</td>
          <td>${produk}</td>
          <td>${qtyNum.toLocaleString()}</td>
          <td>${sku}</td>
        </tr>
      `;
    });

    // ================= KPI =================
    document.getElementById("totalQty").innerText = totalQty.toLocaleString();
    document.getElementById("totalTransaksi").innerText = transaksi.size;

    // ================= TOP PRODUK =================
    const sortedProduk = Object.entries(produkCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    let htmlTop = "";

    sortedProduk.forEach((item, index) => {
      htmlTop += `<li>${index + 1}. ${item[0]} (${item[1]})</li>`;
    });

    document.getElementById("topProdukList").innerHTML = htmlTop;

    // ================= TABLE =================
    const table = document.querySelector("#tablePenjualan tbody");
    table.innerHTML = rows;

    // ================= DATATABLE =================
    if ($.fn.DataTable.isDataTable('#tablePenjualan')) {
      $('#tablePenjualan').DataTable().destroy();
    }

    $('#tablePenjualan').DataTable({
      pageLength: 10,
      order: [[0, "desc"]]
    });

  } catch (err) {
    console.error("Penjualan error:", err);
  }
}