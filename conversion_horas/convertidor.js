/**
 * Conversor de Horas Profesional
 * Lógica para intercambio entre horas pedagógicas (45 min) y cronológicas (60 min)
 */

// 1. Convertir de Cronológicas a Pedagógicas
function cronologicasAPedagogicas() {
    // Obtenemos el valor del input
    const input = document.getElementById("horasCrono");
    const horas = parseFloat(input.value);

    // Validación: Si no es número, es menor a 0 o está vacío
    if (isNaN(horas) || horas < 0) {
        document.getElementById("resultado1").innerHTML = 
            '<span style="color: #d9534f;">⚠️ Ingrese un número válido (0 o más).</span>';
        return;
    }

    // Fórmula: (Horas Crono * 60 minutos) / 45 minutos
    const resultado = (horas * 60) / 45;

    // Mostramos el resultado con 2 decimales
    document.getElementById("resultado1").innerText = 
        resultado.toFixed(2) + " horas pedagógicas";
}

// 2. Convertir de Pedagógicas a Cronológicas
function pedagogicasACronologicas() {
    const input = document.getElementById('horasPeda');
    const valor = parseFloat(input.value);

    // Validación: Evitar letras, vacíos y números negativos
    if (isNaN(valor) || valor < 0) {
        document.getElementById('resultado2').innerHTML = 
            '<span style="color: #d9534f;">⚠️ Por favor ingresa un número mayor a 0.</span>';
        return; 
    }

    // Cálculo de minutos totales (Cada hora pedagógica vale 45 min)
    const totalMinutos = valor * 45;
    
    // Calculamos horas enteras y minutos restantes para un formato más humano
    const hrs = Math.floor(totalMinutos / 60);
    const mins = Math.round(totalMinutos % 60);

    // Construcción del texto amigable (Horas y Minutos)
    let textoResultado = "";
    if (hrs > 0) {
        textoResultado += hrs + (hrs === 1 ? " hora" : " horas");
    }
    if (mins > 0) {
        if (textoResultado !== "") textoResultado += " y ";
        textoResultado += mins + (mins === 1 ? " minuto" : " minutos");
    }
    if (hrs === 0 && mins === 0) {
        textoResultado = "0 minutos";
    }

    // También calculamos el valor decimal puro para precisión profesional
    const decimal = (totalMinutos / 60).toFixed(2);

    // Inyectamos el resultado en el HTML con un diseño limpio
    document.getElementById("resultado2").innerHTML = `
        <div style="font-weight: bold; color: #2c3e50;">${textoResultado}</div>
        <div style="font-size: 0.85em; color: #7f8c8d; margin-top: 5px;">
            Equivale a ${decimal} horas cronológicas decimales.
        </div>
    `;
}

/**
 * TIP EXTRA: Esta función puedes llamarla desde el HTML con oninput 
 * para borrar signos negativos mientras el usuario escribe.
 */
function validarPositivo(input) {
    if (input.value < 0) {
        input.value = "";
    }
}