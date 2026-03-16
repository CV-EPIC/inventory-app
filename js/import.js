async function importCSV(){

const file = document.getElementById("csvfile").files[0];
const table = document.getElementById("table").value;

if(!file){
 alert("Pilih CSV dulu");
 return;
}

const reader = new FileReader();

reader.onload = async function(e){

 const rows = e.target.result
   .split("\n")
   .slice(1)
   .filter(r => r.trim() !== "");

 const data = rows.map(r=>{
 const c = r.split(",").map(v=>v.trim())

 if(table === "barang"){
 return{
  sku:c[0],
  nama_produk:c[1],
  satuan:c[2],
  stok_awal:c[3]
 }
}

 if(table === "outlet"){
 return{
  kode:c[0],
  nama:c[1]
 }
}

if(table === "pembelian"){
 return{
  tanggal:c[0],
  no_po:c[1],
  sku:c[2],
  qty:c[3]
 }
}

 if(table === "penjualan"){
 return{
  tanggal:c[0],
  no_po:c[1],
  outlet:c[2],
  sku:c[3],
  qty:c[4]
 }
}

 if(table === "harga_produk"){
 return{
  sku:c[0],
  harga_beli:c[1],
  harga_jual:c[2]
 }
}

})

if(data.length === 0){
 alert("CSV kosong")
 return
}

 await fetch("/.netlify/functions/importCSV",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({
   table:table,
   data:data
  })
 });

 alert("Import selesai");

};

reader.readAsText(file);

}

function downloadTemplate(){

const table = document.getElementById("table").value

let csv = ""

if(table === "barang"){
 csv = "sku,nama_produk,satuan\n"
}

if(table === "outlet"){
 csv = "kode_outlet,nama_outlet\n"
}

if(table === "penjualan"){
 csv = "tanggal,no_po,outlet,sku,qty\n"
}

if(table === "harga_produk"){
 csv = "sku,harga\n"
}
if(table === "pembelian"){
 csv = "tanggal,no_po,sku,qty\n"
}

const blob = new Blob([csv],{type:"text/csv"})
const url = window.URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = table+"_template.csv"
a.click()

}