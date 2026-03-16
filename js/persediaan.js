async function loadPersediaan(){

const res = await fetch("/.netlify/functions/getPersediaan")
const data = await res.json()

const tbody = document.getElementById("bodyPersediaan")

tbody.innerHTML=""

data.forEach(row=>{

let status="Aman"

if(row.stok<10){
 status="Hampir Habis"
}

tbody.innerHTML+=`
<tr>
<td>${row.sku}</td>
<td>${row.nama_produk}</td>
<td>${row.stok_awal}</td>
<td>${row.stok_masuk}</td>
<td>${row.stok_keluar}</td>
<td>${row.stok}</td>
<td>${status}</td>
</tr>
`

})

}

loadPersediaan()