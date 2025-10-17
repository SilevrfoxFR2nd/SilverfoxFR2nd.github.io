const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlayContent");

export async function loadPacks() {
  console.log("Hello from packLoader.js! loadPacks function is called !!");

  const resp = await fetch("./packs/index.json");
  const packs = await resp.json();

  const list = document.getElementById("packsList");
  if (!list) {
    console.warn("#packsList element not found. Skipping render.");
    return;
  }
  list.innerHTML = "";

  packs.forEach(pack => {
    const cell = document.createElement("div");
    cell.className = "pack-grid-item";

    // game icon
    const img = document.createElement("img");
    img.className = "pack-icon";
    img.src = `./packs/${pack.folder}/icon.png`; // fallback still works if missing
    img.alt = pack.name;
    cell.appendChild(img);

    // game name
    const label = document.createElement("div");
    label.className = "pack-name";
    label.textContent = pack.name;
    cell.appendChild(label);

    // click handler with log
    cell.addEventListener("click", () => {
      startPack(pack.folder);
    });

    list.appendChild(cell);
  });

}



async function startPack(folder) {
  console.log(`Hi ! The pack ID "${folder}" is now being loaded !`);
  document.getElementById("runtime").innerHTML = "";
  const newPage = await fetch(`../../packs/${folder}/index.html`);
  const html = await newPage.text();
    overlayContent.innerHTML = html;
    overlay.style.display = "flex";
  const closeBtn = overlayContent.querySelector("#closeOverlay");
    if (closeBtn) closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
        overlayContent.innerHTML = ""; // clear content for next time
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const reloadBtn = document.getElementById("reloadPacks");
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      console.log("[Hot Reload] Refreshing pack list…");
      loadPacks();
    });
  }

  // Call loadPacks once when DOM is ready
  loadPacks();
});




