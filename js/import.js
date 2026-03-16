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
  const c = r.split(",").map(v=>v.trim());

  return{
   col1:c[0],
   col2:c[1],
   col3:c[2],
   col4:c[3],
   col5:c[4]
  }

 });

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