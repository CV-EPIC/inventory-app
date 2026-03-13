document.addEventListener("input", function(e){

if(e.target.id !== "globalSearch") return;

const keyword = e.target.value.toLowerCase();

const rows = document.querySelectorAll("table tbody tr");

rows.forEach(row=>{

const text = row.innerText.toLowerCase();

row.style.display = text.includes(keyword) ? "" : "none";

});

});