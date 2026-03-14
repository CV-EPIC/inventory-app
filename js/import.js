async function importCSV(){

reader.onload = async function(e){

const rows = e.target.result.split("\n")

const data = rows.map(r=>{
const c = r.split(",")

return{
tanggal:c[0],
no_po:c[1],
outlet:c[2],
sku:c[3],
qty:parseInt(c[4])
}

})

await fetch("/.netlify/functions/importPenjualan",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

alert("Import selesai")

}

reader.readAsText(file)

}