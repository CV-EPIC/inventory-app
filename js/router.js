/* ============================
   ROUTER SYSTEM
============================ */

async function loadSidebar(){

const res = await fetch("components/sidebar.html");
const html = await res.text();

document.getElementById("sidebar").innerHTML = html;

lucide.createIcons();

}


/* ============================
   LOAD PAGE
============================ */

async function loadPage(page){

try{

const res = await fetch("pages/" + page + ".html");

if(!res.ok){
throw new Error("Page not found");
}

const html = await res.text();

document.getElementById("content").innerHTML = html;
if(page === "dashboard"){
 loadDashboard();
}

if(page === "persediaan"){
 loadPersediaan();
}
lucide.createIcons();

setActiveMenu(page);

}catch(err){

document.getElementById("content").innerHTML =
"<h2 style='padding:20px'>Page tidak ditemukan</h2>";

}

}

/* ============================
   START APP
============================ */

async function startApp(){

await loadSidebar()

await loadTopbar()

loadPage("dashboard")

}

startApp()
console.log("APP START");

/* ============================
   TOP BAR
============================ */
async function loadTopbar(){

const res = await fetch("components/topbar.html");

const html = await res.text();

document.getElementById("topbar").innerHTML = html;

lucide.createIcons();

}

/* ============================
   MENU AKTIF
============================ */

function setActiveMenu(page){

const menus = document.querySelectorAll(".sidebar li")

menus.forEach(menu=>{

menu.classList.remove("active")

if(menu.dataset.page === page){

menu.classList.add("active")

}

})

}
