
    let totalNEET = 0;
    let totalNEEP = 0;

    const maxNEET = 5;

    // Horas pedagógicas
    const horasPedaPorNEET = 8 / 5; // 1.6 horas pedagógicas por NEET
    const horasPedaPorNEEP = 3;

    const minutosHoraPedagogica = 45;

    // Función para formatear horas decimales a "Xh Ym"
    function formatearHoras(decimal) {
    const horas = Math.floor(decimal);
        const minutos = Math.round((decimal - horas) * 60);
        if (minutos === 0) return `${horas}h`;
        return `${horas}h ${minutos}m`;
    }

    let registros = [];

    // Actualizar cuando cambie el JEC
    document.getElementById("jec")?.addEventListener("change", actualizarResumen);

    function agregarEstudiante() {
        const tipo = document.getElementById("tipoEstudiante").value;
        const mensajeError = document.getElementById("mensajeError");
        if (mensajeError) mensajeError.innerText = "";

        if (!tipo) {
            if (mensajeError) mensajeError.innerText = "Debe seleccionar un tipo de estudiante.";
            return;
        }

        if (tipo === "NEET") {
            if (totalNEET >= maxNEET) {
                if (mensajeError) mensajeError.innerText = "Máximo 5 estudiantes NEET.";
                return;
            }
            totalNEET++;
        }

        if (tipo === "NEEP") {
            totalNEEP++;
        }

        actualizarResumen();
    }

    function limpiarMatricula() {
        totalNEET = 0;
        totalNEEP = 0;
        actualizarResumen();
        const mensajeError = document.getElementById("mensajeError");
        if (mensajeError) mensajeError.innerText = "";
    }

    function quitarEstudiante() {
        const tipo = document.getElementById("tipoEstudiante").value;
        const mensajeError = document.getElementById("mensajeError");
        if (mensajeError) mensajeError.innerText = "";

        if (!tipo) {
            if (mensajeError) mensajeError.innerText = "Debe seleccionar un tipo para quitar.";
            return;
        }

        if (tipo === "NEET") {
            if (totalNEET > 0) {
                totalNEET--;
            } else {
                if (mensajeError) mensajeError.innerText = "No hay más estudiantes NEET para quitar.";
            }
        }

        if (tipo === "NEEP") {
            if (totalNEEP > 0) {
                totalNEEP--;
            } else {
                if (mensajeError) mensajeError.innerText = "No hay más estudiantes NEEP para quitar.";
            }
        }

        actualizarResumen();
    }

    function actualizarResumen() {
        const jecSelect = document.getElementById("jec");
        const jecValue = jecSelect ? jecSelect.value : "";
        
        // Bloque base de horas diferencial según la tabla (NEET 1-5 o base PIE)
        let baseNEET = 0;
        if (jecValue === "SI") baseNEET = 8;
        else if (jecValue === "NO") baseNEET = 6;
        
        // Horas pedagógicas
        // Se asignan las horas mínimas si hay una tabla seleccionada
        const pedaNEET = baseNEET;
        const pedaNEEP = totalNEEP * horasPedaPorNEEP;
        const pedaTotal = pedaNEET + pedaNEEP;

        // Horas cronológicas
        const cronoNEET = (pedaNEET * minutosHoraPedagogica) / 60;
        const cronoNEEP = (pedaNEEP * minutosHoraPedagogica) / 60;
        const cronoTotal = cronoNEET + cronoNEEP;

        const elNeet = document.getElementById("neet");
        const elNeep = document.getElementById("neep");
        const elTotal = document.getElementById("total");

        if (elNeet) elNeet.innerText = totalNEET;
        if (elNeep) elNeep.innerText = totalNEEP;
        if (elTotal) elTotal.innerText = totalNEET + totalNEEP;

        const elPedaNeet = document.getElementById("pedaNeet");
        const elPedaNeep = document.getElementById("pedaNeep");
        const elPedaTotal = document.getElementById("pedaTotal");

        if (elPedaNeet) elPedaNeet.innerText = pedaNEET.toFixed(2);
        if (elPedaNeep) elPedaNeep.innerText = pedaNEEP.toFixed(2);
        if (elPedaTotal) elPedaTotal.innerText = pedaTotal.toFixed(2);

        const elCronoNeet = document.getElementById("cronoNeet");
        const elCronoNeep = document.getElementById("cronoNeep");
        const elCronoTotal = document.getElementById("cronoTotal");

        if (elCronoNeet) elCronoNeet.innerText = formatearHoras(cronoNEET);
        if (elCronoNeep) elCronoNeep.innerText = formatearHoras(cronoNEEP);
        if (elCronoTotal) elCronoTotal.innerText = formatearHoras(cronoTotal);
    }
