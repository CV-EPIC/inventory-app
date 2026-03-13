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

const res = await fetch("pages/" + page + ".html")
const html = await res.text()

document.getElementById("content").innerHTML = html

lucide.createIcons()

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