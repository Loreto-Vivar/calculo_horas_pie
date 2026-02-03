const selectorTabla = document.getElementById("selectorTabla");
const buscadorHC = document.getElementById("buscadorHC");
const buscadorHA = document.getElementById("buscadorHA");
const btnLimpiarHC = document.getElementById("limpiarHC");
const btnLimpiarHA = document.getElementById("limpiarHA");
const contenedoresTabla = document.querySelectorAll("[data-tabla]");

selectorTabla.addEventListener("change", () => {
    const seleccion = selectorTabla.value;

    contenedoresTabla.forEach(contenedor => {
        contenedor.style.display =
            contenedor.dataset.tabla === seleccion ? "block" : "none";
    });

    // Reset buscadores
    limpiarBuscadores();
    
    buscadorHC.disabled = seleccion === "";
    buscadorHA.disabled = seleccion === "";
    
    document.body.classList.remove("buscando");
    
    // Limpiar mensajes de no resultados
    document.querySelectorAll(".no-resultados").forEach(m => m.remove());
});

function limpiarBuscadores() {
    buscadorHC.value = "";
    buscadorHA.value = "";
    btnLimpiarHC.classList.remove("visible");
    btnLimpiarHA.classList.remove("visible");
}

function filtrarTabla(valor, columnaIndex, inputId) {
    const contenedorActivo = document.querySelector(
        "[data-tabla]:not([style*='display: none'])"
    );

    const resultadoError = document.getElementById('resultado2');
    if (resultadoError) resultadoError.innerHTML = '';

    // Validación: Evitar letras, vacíos y números negativos
    const numValor = parseFloat(valor);
    if (valor !== "" && (isNaN(numValor) || numValor < 0)) {
        if (resultadoError) {
            resultadoError.innerHTML = '<span style="color: #d9534f; font-size: 0.8rem; margin-top: 5px; display: block;">⚠️ Ingresa un número positivo.</span>';
        }
        return;
    }

    // Manejar visibilidad del botón de limpiar
    const btnLimpiar = inputId === "buscadorHC" ? btnLimpiarHC : btnLimpiarHA;
    if (valor !== "") {
        btnLimpiar.classList.add("visible");
    } else {
        btnLimpiar.classList.remove("visible");
    }

    if (!contenedorActivo) return;

    const filas = contenedorActivo.querySelectorAll(".tabla tbody tr");
    let encontrados = 0;

    filas.forEach(fila => {
        const celda = fila.cells[columnaIndex].innerText.trim();
        const coincide = valor === "" || celda === valor;
        fila.style.display = coincide ? "" : "none";
        if (coincide && valor !== "") encontrados++;
    });

    if (valor !== "") {
        document.body.classList.add("buscando");

        let mensajeNoResultados = contenedorActivo.querySelector(".no-resultados");
        if (encontrados === 0) {
            if (!mensajeNoResultados) {
                mensajeNoResultados = document.createElement("p");
                mensajeNoResultados.className = "no-resultados";
                mensajeNoResultados.innerText = "No se encontraron resultados para esta búsqueda.";
                contenedorActivo.appendChild(mensajeNoResultados);
            }
        } else if (mensajeNoResultados) {
            mensajeNoResultados.remove();
        }
    } else {
        document.body.classList.remove("buscando");
        const mensajeNoResultados = contenedorActivo.querySelector(".no-resultados");
        if (mensajeNoResultados) mensajeNoResultados.remove();
    }
}


buscadorHC.addEventListener("input", () => {
    buscadorHA.value = ""; 
    btnLimpiarHA.classList.remove("visible");
    filtrarTabla(buscadorHC.value.trim(), 0, "buscadorHC");
});

buscadorHA.addEventListener("input", () => {
    buscadorHC.value = ""; 
    btnLimpiarHC.classList.remove("visible");
    filtrarTabla(buscadorHA.value.trim(), 1, "buscadorHA");
});

btnLimpiarHC.addEventListener("click", () => {
    buscadorHC.value = "";
    btnLimpiarHC.classList.remove("visible");
    filtrarTabla("", 0, "buscadorHC");
});

btnLimpiarHA.addEventListener("click", () => {
    buscadorHA.value = "";
    btnLimpiarHA.classList.remove("visible");
    filtrarTabla("", 1, "buscadorHA");
});
