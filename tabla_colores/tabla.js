const selectorTabla = document.getElementById("selectorTabla");
const buscadorHC = document.getElementById("buscadorHC");
const contenedoresTabla = document.querySelectorAll("[data-tabla]");

selectorTabla.addEventListener("change", () => {
    const seleccion = selectorTabla.value;

    contenedoresTabla.forEach(contenedor => {
        contenedor.style.display =
            contenedor.dataset.tabla === seleccion ? "block" : "none";
    });

    buscadorHC.value = "";
    buscadorHC.disabled = seleccion === "";
    document.body.classList.remove("buscando"); // Reset buscando state
});

buscadorHC.addEventListener("input", () => {
    const valor = buscadorHC.value.trim();
    const contenedorActivo = document.querySelector(
        "[data-tabla]:not([style*='display: none'])"
    );

    if (valor !== "") {
        document.body.classList.add("buscando");
    } else {
        document.body.classList.remove("buscando");
    }

    if (!contenedorActivo) return;

    const filas = contenedorActivo.querySelectorAll(".tabla tbody tr");

    filas.forEach(fila => {
        const hc = fila.cells[0].innerText.trim();
        fila.style.display =
            valor === "" || hc === valor ? "" : "none";
    });
});
