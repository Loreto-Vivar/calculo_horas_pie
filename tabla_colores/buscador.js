const selectorTabla = document.getElementById("selectorTabla");
const buscadorHC = document.getElementById("buscadorHC");
const buscadorHA = document.getElementById("buscadorHA");
const contenedoresTabla = document.querySelectorAll("[data-tabla]");

selectorTabla.addEventListener("change", () => {
    const seleccion = selectorTabla.value;

    contenedoresTabla.forEach(contenedor => {
        contenedor.style.display =
            contenedor.dataset.tabla === seleccion ? "block" : "none";
    });

    // Limpiar y habilitar/deshabilitar buscadores
    buscadorHC.value = "";
    buscadorHA.value = "";
    buscadorHC.disabled = seleccion === "";
    buscadorHA.disabled = seleccion === "";
    document.body.classList.remove("buscando");
});

function filtrarTabla(valor, columnaIndex) {
    const contenedorActivo = document.querySelector(
        "[data-tabla]:not([style*='display: none'])"
    );

    // Validación: Evitar letras, vacíos y números negativos
    const numValor = parseFloat(valor);
    if (valor !== "" && (isNaN(numValor) || numValor < 0)) {
        const resultadoError = document.getElementById('resultado2');
        if (resultadoError) {
            resultadoError.innerHTML = '<span style="color: #d9534f;">⚠️ Ingresa un número positivo.</span>';
        }
        return;
    }

    if (valor !== "") {
        document.body.classList.add("buscando");
    } else {
        document.body.classList.remove("buscando");
    }

    if (!contenedorActivo) return;

    const filas = contenedorActivo.querySelectorAll(".tabla tbody tr");

    filas.forEach(fila => {
        const textoCelda = fila.cells[columnaIndex].innerText.trim();
        fila.style.display = (valor === "" || textoCelda === valor) ? "" : "none";
    });
}

// Buscador por HC (Horas Cronológicas - Columna 0)
buscadorHC.addEventListener("input", () => {
    buscadorHA.value = ""; 
    filtrarTabla(buscadorHC.value.trim(), 0);
});

// Buscador por HA (Horas Académicas - Columna 1)
buscadorHA.addEventListener("input", () => {
    buscadorHC.value = ""; 
    filtrarTabla(buscadorHA.value.trim(), 1);
});

