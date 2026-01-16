let totalDiagnosticos = 0;
    let totalEstudiantes = 0;
    let totalTEA = 0;

    const horasPedaPorTEA = 1;
    const minutosHoraPedagogica = 45;

    function agregarDiagnostico() {
        const diagnostico = document.getElementById("diagnosticoInd").value;
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.innerText = "";

        if (!diagnostico) {
            mensajeError.innerText = "Debe seleccionar un diagnóstico.";
            return;
        }

        // Contadores generales
        totalDiagnosticos++;
        totalEstudiantes++;

        // Regla especial TEA
        if (diagnostico === "TEA") {
            totalTEA++;
        }

        actualizarResumen();
    }

    function actualizarResumen() {
        const horasPedagogicasTEA = totalTEA * horasPedaPorTEA;
        const horasCronologicas = (horasPedagogicasTEA * minutosHoraPedagogica) / 60;

        document.getElementById("totalDiag").innerText = totalDiagnosticos;
        document.getElementById("totalEstudiantes").innerText = totalEstudiantes;

        document.getElementById("pedaTEA").innerText = horasPedagogicasTEA.toFixed(2);
        document.getElementById("pedaTotal").innerText = horasPedagogicasTEA.toFixed(2);
        document.getElementById("cronoTotal").innerText = horasCronologicas.toFixed(2);
    }