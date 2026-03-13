function importCSV(){

const file = document.getElementById("csvFile").files[0]

if(!file){
alert("Pilih file CSV dulu")
return
}

const reader = new FileReader()

reader.onload = function(e){

const text = e.target.result

const rows = text.split("\n").map(r=>r.split(","))

console.log(rows)

}

reader.readAsText(file)

}