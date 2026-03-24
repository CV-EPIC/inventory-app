// ============================
// LOAD COMPONENT
// ============================

async function loadSidebar() {
  try {
    const res = await fetch("/components/sidebar.html");
    if (!res.ok) throw new Error("Sidebar not found");

    const html = await res.text();
    document.getElementById("sidebar").innerHTML = html;

  } catch (err) {
    console.error("Sidebar error:", err);
  }
}

async function loadTopbar() {
  try {
    const res = await fetch("/components/topbar.html");
    if (!res.ok) throw new Error("Topbar not found");

    const html = await res.text();
    document.getElementById("topbar").innerHTML = html;

  } catch (err) {
    console.error("Topbar error:", err);
  }
}

// ============================
// LOAD PAGE
// ============================

async function loadPage(page) {
  console.log("LOAD PAGE:", page);

  try {
    const res = await fetch(`/pages/${page}.html`);
    if (!res.ok) throw new Error("Page not found");

    const html = await res.text();

    // inject content dulu
    document.getElementById("content").innerHTML = html;

    // jalankan script khusus page
    runPageScript(page);

    // set menu aktif
    setActiveMenu(page);

  } catch (err) {
    console.error("Page load error:", err);

    document.getElementById("content").innerHTML =
      "<h2 style='padding:20px'>Page tidak ditemukan</h2>";
  }
}

// ============================
// HANDLE SCRIPT PER PAGE
// ============================

function runPageScript(page) {

  if (page === "dashboard" && typeof loadDashboard === "function") {
    loadDashboard();
  }

  if (page === "persediaan" && typeof loadPersediaan === "function") {
    loadPersediaan();
  }

  // nanti bisa tambah:
  // if (page === "penjualan") loadPenjualan();
}

// ============================
// ACTIVE MENU
// ============================

function setActiveMenu(page) {
  const menus = document.querySelectorAll(".sidebar li");

  menus.forEach(menu => {
    menu.classList.remove("active");

    if (menu.dataset.page === page) {
      menu.classList.add("active");
    }
  });
}

// ============================
// START APP
// ============================

async function startApp() {
  await loadSidebar();
  await loadTopbar();

  loadPage("dashboard");
}

startApp();