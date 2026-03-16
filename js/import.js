async function importCSV(){

const file = document.getElementById("csvfile").files[0];
const table = document.getElementById("table").value;

if(!file){
 alert("Pilih file CSV terlebih dahulu");
 return;
}

const reader = new FileReader();

reader.onload = async function(e){

const rows = e.target.result
.replace(/\r/g,"")
.split("\n")
.slice(1)
.filter(r => r.trim() !== "");

if(rows.length === 0){
 alert("CSV kosong");
 return;
}

const data = rows.map(r=>{

const c = r.split(",").map(v=>v.trim());

/* BARANG */
if(table === "barang"){
 return{
  sku:c[0],
  nama_produk:c[1],
  satuan:c[2],
  stok_awal:parseInt(c[3] || 0)
 };
}

/* OUTLET */
if(table === "outlet"){
 return{
  kode:c[0],
  nama:c[1]
 };
}

/* PEMBELIAN (STOK MASUK) */
if(table === "pembelian"){
 return{
  tanggal:c[0],
  no_po:c[1],
  sku:c[2],
  qty:parseInt(c[3] || 0)
 };
}

/* PENJUALAN (STOK KELUAR) */
if(table === "penjualan"){
 return{
  tanggal:c[0],
  no_po:c[1],
  outlet:c[2],
  sku:c[3],
  qty:parseInt(c[4] || 0)
 };
}

/* HARGA PRODUK */
if(table === "harga_produk"){
 return{
  sku:c[0],
  harga_beli:parseInt(c[1] || 0),
  harga_jual:parseInt(c[2] || 0)
 };
}

}).filter(d => d);

try{

const res = await fetch("/.netlify/functions/importCSV",{
 method:"POST",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({
  table:table,
  data:data
 })
});

const result = await res.json();

if(!res.ok){
 alert("Import gagal : " + result.error);
 return;
}

alert("Import berhasil");

}catch(err){

alert("Error koneksi ke server");

}

};

reader.readAsText(file);

}






/* ============================= */
/* DOWNLOAD TEMPLATE CSV */
/* ============================= */

function downloadTemplate(){

const table = document.getElementById("table").value;

let csv = "";

/* BARANG */
if(table === "barang"){
 csv = "sku,nama_produk,satuan,stok_awal\n";
}

/* OUTLET */
if(table === "outlet"){
 csv = "kode,nama\n";
}

/* PEMBELIAN */
if(table === "pembelian"){
 csv = "tanggal,no_po,sku,qty\n";
}

/* PENJUALAN */
if(table === "penjualan"){
 csv = "tanggal,no_po,outlet,sku,qty\n";
}

/* HARGA PRODUK */
if(table === "harga_produk"){
 csv = "sku,harga_beli,harga_jual\n";
}

const blob = new Blob([csv],{type:"text/csv"});
const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = table+"_template.csv";
a.click();

}