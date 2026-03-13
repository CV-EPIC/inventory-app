async function importCSV(){

const file = document.getElementById("csvFile").files[0]

const reader = new FileReader()

reader.onload = async function(e){

const text = e.target.result

const rows = text.split("\n").slice(1)

const data = rows.map(r=>{

const c = r.split(",")

return{
tanggal:c[0],
no_po:c[1],
outlet:c[2],
qty:parseInt(c[4]),
sku:c[5]
}

})

await fetch("/.netlify/functions/importPenjualan",{
method:"POST",
body:JSON.stringify(data)
})

alert("Import selesai")

}

reader.readAsText(file)

}