async function loadPenjualan() {
  const bulan = document.getElementById("bulan").value;
  const tahun = document.getElementById("tahun").value;

  const res = await fetch(`/api/getPenjualanBulanIni?month=${bulan}&year=${tahun}`);
  const data = await res.json();

  const tbody = document.querySelector("#tablePenjualan tbody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
    `;

    tbody.appendChild(tr);
  });
}