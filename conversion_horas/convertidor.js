// Fórmula: (horas cronológicas * 60) / 45
function cronologicasAPedagogicas() {
    const horas = parseFloat(document.getElementById("horasCrono").value);
    if (isNaN(horas) || horas < 0) {
        document.getElementById("resultado1").innerText = "Ingrese un valor válido.";
        return;
    }
    const resultado = (horas * 60) / 45;
    // Para pedagógicas solemos usar decimales, pero redondeamos a 2.
    document.getElementById("resultado1").innerText = resultado.toFixed(2) + " horas pedagógicas";
}

// Fórmula: (horas pedagógicas * 45) / 60
function pedagogicasACronologicas() {
    const horas = parseFloat(document.getElementById("horasPeda").value);
    if (isNaN(horas) || horas < 0) {
        document.getElementById("resultado2").innerText = "Ingrese un valor válido.";
        return;
    }

    const totalMinutos = horas * 45;
    const hrs = Math.floor(totalMinutos / 60);
    const mins = Math.round(totalMinutos % 60);

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

    // También mostramos el decimal para referencia profesional
    const decimal = (totalMinutos / 60).toFixed(2);
    document.getElementById("resultado2").innerHTML = `<div>${textoResultado}</div><div style="font-size: 0.8em; opacity: 0.7; margin-top: 4px;">(${decimal} hrs cronológicas)</div>`;
}