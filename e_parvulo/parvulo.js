document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const tablaDatos = document.getElementById('tablaDatos');
    const diagnosticoSelect = document.getElementById('diagnostico');
    const infoJecSection = document.getElementById('infoJecSection');
    const tablaCONJEC = document.getElementById('tablaCONJEC');
    const tablaSINJEC = document.getElementById('tablaSINJEC');

    // ===============================
    // DATOS OCULTOS DE ESTABLECIMIENTOS
    // ===============================

    //FRESIA
    const escuelas = [
        {
            rbd: "35132",
            nombre: "CORAZON DE ANGEL",
            comuna: "FRESIA",
        },
        {
            rbd:"35133",
            nombre:"EL RINCON DEL SABER",
            comuna:"FRESIA",
        },

    //FRUTILLAR
        {
            rbd: "35134",
            nombre: "FRUTILLITA",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "35135",
            nombre: "PEQUEÑOS ANGELITOS",
            comuna: "FRUTILLAR",
        },
    //LLANQUIHUE
        {
            rbd: "35145",
            nombre: "MI PEQUEÑO PARAÍSO",
            comuna: "LLANQUIHUE",
        },
    //LOS MUERMOS
        {
            rbd: "35137",
            nombre: "DUENDECITOS/CUMBRES ALTAS",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "35140",
            nombre: "VENTANITAS DE COLORES",
            comuna: "LOS MUERMOS",
        },
        {
            rbd:"35138",
            nombre:"SEMILLITAS DE AMOR",
            comuna:"LOS MUERMOS",
        },
        {
            rbd:"35139",
            nombre:"BROTECITOS DE MELI",
            comuna:"LOS MUERMOS",
        },
    
    //PUERTO VARAS
        {
            rbd: "35153",
            nombre: "ARCOIRIS",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "35154",
            nombre: "MURTITAS",
            comuna: "PUERTO VARAS",
        },
        {
            rbd:"35155",
            nombre:"MI NUEVA AVENTURA",
            comuna:"PUERTO VARAS",
        },
        {
            rbd:"35156",
            nombre:"SALA CUNA PRINCESA LICARAYEN",
            comuna:"PUERTO VARAS",
        },


        
    ];

    // ===============================
    // VINCULAR RBD CON ESTABLECIMIENTO
    // ===============================
    const inputRBD = document.getElementById("RBD");
    const inputNombre = document.getElementById("escuelaNombre");
    const rbdOculto = document.getElementById("rbdOculto");
    const comunaOculta = document.getElementById("comunaOculta");
    const dependenciaOculta = document.getElementById("dependenciaOculta");
    const seccionRegistro = document.getElementById("seccionRegistro");
    const seccionTabla = document.getElementById("seccionTabla");
    const seccionFiltro = document.getElementById("seccionFiltro");

    if (inputRBD) {
        inputRBD.addEventListener("input", (e) => {
            const valorLimpio = e.target.value.replace(/[^0-9-]/g, '');
            e.target.value = valorLimpio;

            const valor = valorLimpio.trim();
            const encontrada = escuelas.find(
                esc => esc.rbd.toLowerCase() === valor.toLowerCase()
            );

            if (encontrada) {
                inputNombre.value = encontrada.nombre;
                rbdOculto.value = encontrada.rbd || "";
                comunaOculta.value = encontrada.comuna || "";
                dependenciaOculta.value = encontrada.dependencia || "";
                
                seccionRegistro.classList.remove("bloqueado");
                seccionTabla.classList.remove("bloqueado");
                if (seccionFiltro) seccionFiltro.classList.remove("bloqueado");
            } else {
                inputNombre.value = "";
                rbdOculto.value = "";
                comunaOculta.value = "";
                dependenciaOculta.value = "";
                seccionRegistro.classList.add("bloqueado");
                seccionTabla.classList.add("bloqueado");
                if (seccionFiltro) seccionFiltro.classList.add("bloqueado");
            }
        });
    }

    // ==========================================
    // VALIDACIÓN: SOLO LETRAS EN CAMPOS DE NOMBRE
    // ==========================================
    const soloLetras = (e) => {
        // Permitimos letras (incluyendo tildes y ñ) y espacios
        const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g;
        e.target.value = e.target.value.replace(regex, "");
    };

    const camposSoloLetras = [
        "encargadoNivel",
        "escuelaNombre",
        "profesionalRegistra",
        "nombreParvulo",
        "apellidoParvulo",
        "profesionalAtiende",
        "redesAsistencia"
    ];

    camposSoloLetras.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", soloLetras);
        }
    });

    // Validación para RUN (Solo números, guion automático después de 8 dígitos y K)
    const inputRun = document.getElementById("runParvulo");
    if (inputRun) {
        inputRun.addEventListener("input", (e) => {
            // Eliminar caracteres no válidos y convertir a mayúsculas
            let valor = e.target.value.replace(/[^0-9kK]/g, "").toUpperCase();
            
            // Limitar a un máximo de 9 caracteres base (8 cuerpo + 1 DV)
            if (valor.length > 9) {
                valor = valor.slice(0, 9);
            }

            // Colocar guion automático después de los 8 dígitos
            if (valor.length > 8) {
                valor = valor.slice(0, 8) + "-" + valor.slice(8);
            }
            
            e.target.value = valor;
        });

        // Formateo adicional al perder el foco (ayuda con RUTs de 7 dígitos)
        inputRun.addEventListener("blur", (e) => {
            let valor = e.target.value.replace(/[^0-9kK]/g, "").toUpperCase();
            if (valor.length > 1 && !e.target.value.includes("-")) {
                // Insertar guion antes del último carácter 
                e.target.value = valor.slice(0, -1) + "-" + valor.slice(-1);
            }
        });
    }

    let registros = [];
    let registrosFiltrados = [];

    function renderizarTabla(datos, contenedorId, totalId) {
        const contenedor = document.getElementById(contenedorId);
        const totalElem = document.getElementById(totalId);
        
        if (!contenedor) return;
        contenedor.innerHTML = '';

        datos.forEach(registro => {
            const fila = document.createElement('tr');
            fila.dataset.id = registro.id;
            fila.innerHTML = `
                <td>${registro.run}</td>
                <td>${registro.nombre}</td>
                <td>${registro.apellido}</td>
                <td>${registro.fechaNac}</td>
                <td>${registro.sexo}</td>
                <td>${registro.diagnostico}</td>
                <td>${registro.diagConfirmado}</td>
                <td>${registro.profesionalAtiende}</td>
                <td>${registro.redes}</td>
                <td>${registro.observaciones}</td>
                <td>
                    <button class="btn-delete" title="Eliminar registro">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </td>
            `;

            fila.querySelector('.btn-delete').addEventListener('click', () => {
                if(confirm('¿Estás seguro de eliminar este registro?')) {
                    registros = registros.filter(r => r.id !== registro.id);
                    // Si estamos en la tabla filtrada, también actualizamos el filtro
                    aplicarFiltros();
                    actualizarTablaPrincipal();
                }
            });

            contenedor.appendChild(fila);
        });

        if (totalElem) {
            totalElem.textContent = datos.length;
            totalElem.style.animation = 'none';
            totalElem.offsetHeight; 
            totalElem.style.animation = null;
        }
    }

    function actualizarTablaPrincipal() {
        renderizarTabla(registros, 'tablaDatos', 'totalPárvulos');
    }

    function aplicarFiltros() {
        const diagConf = document.getElementById('filtroDiagConfirmado').value;
        const sexoConf = document.getElementById('filtroSexo').value;

        registrosFiltrados = registros.filter(r => {
            // Filtro por confirmación
            const cumpleDiag = diagConf === '' || r.diagConfirmado === diagConf;

            // Filtro por sexo
            const cumpleSexo = sexoConf === '' || r.sexo === sexoConf;

            return cumpleDiag && cumpleSexo;
        });

        renderizarTabla(registrosFiltrados, 'tablaDatosFiltro', 'totalPárvulosFiltro');
    }

    // Event listeners para filtros
    const idsFiltros = [
        'filtroDiagConfirmado', 'filtroSexo'
    ];
    
    idsFiltros.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', aplicarFiltros);
        }
    });

    // Botón Limpiar Filtros
    document.getElementById('btnLimpiarFiltros')?.addEventListener('click', () => {
        idsFiltros.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.value = '';
        });
        aplicarFiltros();
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const runVal = document.getElementById('runParvulo').value;
        if (!runVal.includes("-")) {
            alert("El RUN debe incluir guion (ejemplo: 12345678-K)");
            return;
        }

        const registro = {
            id: Date.now(),
            run: document.getElementById('runParvulo').value,
            nombre: document.getElementById('nombreParvulo').value,
            apellido: document.getElementById('apellidoParvulo').value,
            fechaNac: document.getElementById('fechaNacimiento').value,
            sexo: document.getElementById('sexo').value,
            diagnostico: document.getElementById('diagnostico').value,
            diagConfirmado: document.getElementById('diagnosticoEspecialista').value,
            profesionalAtiende: document.getElementById('profesionalAtiende').value,
            redes: document.getElementById('redesAsistencia').value || "No registra",
            observaciones: document.getElementById('observaciones').value || "-"
        };

        registros.push(registro);
        actualizarTablaPrincipal();
        aplicarFiltros(); // Actualizar también la tabla de filtros si hay filtros activos

        formulario.reset();
        document.getElementById('runParvulo').focus();
    });

    // --- Exportar a Excel ---
    function exportarExcel(datos, nombreArchivo) {
        if (datos.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        const rbd = document.getElementById("rbdOculto").value || document.getElementById("RBD").value || "N/A";
        const nombre = document.getElementById("escuelaNombre").value || "N/A";
        const comuna = document.getElementById("comunaOculta").value || "N/A";
        const nivel = document.getElementById("nivelEducativo").value || "N/A";
        const encargadoNivel = document.getElementById("encargadoNivel").value || "N/A";
        const profesionalRegistra = document.getElementById("profesionalRegistra").value || "N/A";

        // 1. Crear un elemento tabla temporal en el DOM (invisible)
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        
        // 2. Estilo de bordes para las celdas (usaremos una clase o estilo directo)
        const cellStyle = 'border: 1px solid black; padding: 5px;';
        const headerStyle = 'border: 1px solid black; padding: 5px; background-color: #f2f2f2; font-weight: bold;';

        let html = `
            <tr><td colspan="10" style="font-size: 16pt; font-weight: bold; text-align: center;">REGISTRO DE EDUCACIÓN PARVULARIA - ESTUDIO CFT</td></tr>
            <tr><td colspan="10"></td></tr>
            <tr>
                <td colspan="5" style="${headerStyle}">DATOS DE LA INSTITUCIÓN</td>
                <td colspan="5" style="${headerStyle}">DETALLES DEL REGISTRO</td>
            </tr>
            <tr>
                <td style="${cellStyle} font-weight: bold;">ESTABLECIMIENTO:</td><td colspan="4" style="${cellStyle}">${String(nombre).toUpperCase()}</td>
                <td style="${cellStyle} font-weight: bold;">FECHA REPORTE:</td><td colspan="4" style="${cellStyle}">${new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
                <td style="${cellStyle} font-weight: bold;">RBD:</td><td colspan="4" style="${cellStyle}">${String(rbd).toUpperCase()}</td>
                <td style="${cellStyle} font-weight: bold;">NIVEL EDUCATIVO:</td><td colspan="4" style="${cellStyle}">${String(nivel).toUpperCase()}</td>
            </tr>
            <tr>
                <td style="${cellStyle} font-weight: bold;">COMUNA:</td><td colspan="4" style="${cellStyle}">${String(comuna).toUpperCase()}</td>
                <td style="${cellStyle} font-weight: bold;">ENCARGADO/A NIVEL:</td><td colspan="4" style="${cellStyle}">${String(encargadoNivel).toUpperCase()}</td>
            </tr>
            <tr>
                <td style="${cellStyle} font-weight: bold;">PROFESIONAL REGISTRA:</td><td colspan="9" style="${cellStyle}">${String(profesionalRegistra).toUpperCase()}</td>
            </tr>
            <tr><td colspan="10"></td></tr>
            <tr style="background-color: #f7960d; color: white;">
                <th style="${headerStyle}">RUN</th>
                <th style="${headerStyle}">NOMBRES</th>
                <th style="${headerStyle}">APELLIDOS</th>
                <th style="${headerStyle}">FECHA NAC.</th>
                <th style="${headerStyle}">SEXO</th>
                <th style="${headerStyle}">DIAGNÓSTICO</th>
                <th style="${headerStyle}">CONF.</th>
                <th style="${headerStyle}">ESPECIALISTA</th>
                <th style="${headerStyle}">REDES APOYO</th>
                <th style="${headerStyle}">OBSERVACIONES</th>
            </tr>
        `;

        // 3. Agregar filas de estudiantes
        datos.forEach(r => {
            html += `
                <tr>
                    <td style="${cellStyle}">${r.run}</td>
                    <td style="${cellStyle}">${r.nombre}</td>
                    <td style="${cellStyle}">${r.apellido}</td>
                    <td style="${cellStyle}">${r.fechaNac}</td>
                    <td style="${cellStyle}">${r.sexo}</td>
                    <td style="${cellStyle}">${r.diagnostico}</td>
                    <td style="${cellStyle}">${r.diagConfirmado}</td>
                    <td style="${cellStyle}">${r.profesionalAtiende}</td>
                    <td style="${cellStyle}">${r.redes}</td>
                    <td style="${cellStyle}">${r.observaciones}</td>
                </tr>
            `;
        });

        // 4. Agregar fila de total
        html += `
            <tr><td colspan="10"></td></tr>
            <tr>
                <td colspan="8"></td>
                <td style="${headerStyle}">TOTAL PÁRVULOS:</td>
                <td style="${headerStyle}">${datos.length}</td>
            </tr>
        `;

        table.innerHTML = html;

        // 5. Convertir la tabla HTML a un worksheet de Excel
        const ws = XLSX.utils.table_to_sheet(table);

        // Ajustar anchos de columna
        const wscols = [
            {wch: 15}, // RUN
            {wch: 22}, // Nombres
            {wch: 22}, // Apellidos
            {wch: 15}, // F. Nac
            {wch: 12}, // Sexo
            {wch: 30}, // Diagnóstico
            {wch: 12}, // Confirmado
            {wch: 25}, // Especialista
            {wch: 25}, // Redes
            {wch: 40}  // Observaciones
        ];
        ws['!cols'] = wscols;

        // 6. Crear libro y descargar
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte_Parvulo");
        XLSX.writeFile(wb, `${nombreArchivo}_${rbd}.xlsx`);
    }

    document.getElementById('btnExportExcel').addEventListener('click', () => exportarExcel(registros, "Registro_Parvulo"));
    document.getElementById('btnExportExcelFiltro').addEventListener('click', () => exportarExcel(registrosFiltrados, "Registro_Parvulo_Filtrado"));

    // --- Exportar a PDF ---
    function exportarPDF(datos, nombreArchivo, tituloExtra = "") {
        if (datos.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'pt', 'a4');

        const rbd = document.getElementById("rbdOculto").value || document.getElementById("RBD").value || "N/A";
        const nombre = document.getElementById("escuelaNombre").value || "N/A";
        const comuna = document.getElementById("comunaOculta").value || "N/A";
        const nombreEncargadoNivel = document.getElementById("encargadoNivel").value || "N/A";
        const nombreEncargado = document.getElementById("profesionalRegistra").value || "N/A";

        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59);
        doc.text("REGISTRO DE EDUCACIÓN PARVULARIA" + tituloExtra, 40, 40);
        
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        doc.text(`RBD: ${String(rbd).toUpperCase()}`, 40, 65);
        doc.text(`ESTABLECIMIENTO: ${String(nombre).toUpperCase()}`, 40, 80);
        doc.text(`COMUNA: ${String(comuna).toUpperCase()}`, 40, 95);
        doc.text(`ENCARGADO/A DEL NIVEL: ${String(nombreEncargadoNivel).toUpperCase()}`, 40, 110);
        doc.text(`ENCARGADO/A DE REGISTRO: ${String(nombreEncargado).toUpperCase()}`, 40, 125);

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text("Generado el: " + new Date().toLocaleString(), 40, 160);

        const tableData = datos.map(r => [
            r.run, r.nombre, r.apellido, r.fechaNac, r.sexo, r.diagnostico, r.diagConfirmado, r.profesionalAtiende, r.redes, r.observaciones
        ]);

        doc.autoTable({
            head: [["RUN", "Nombres", "Apellidos", "F. Nac", "Sexo", "Diag.", "Conf.", "Prof.", "Redes", "Obs."]],
            body: tableData,
            startY: 180,
            styles: { fontSize: 7, cellPadding: 4, halign: 'center' },
            headStyles: { fillColor: [247, 150, 13], textColor: 255 },
            foot: [["", "", "", "", "", "", "", "", "TOTAL:", datos.length]],
            footStyles: { fillColor: [247, 150, 13], textColor: 255, halign: 'center' }
        });

        doc.save(`${nombreArchivo}.pdf`);
    }

    document.getElementById('btnExportPDF').addEventListener('click', () => exportarPDF(registros, "Registro_Parvulo"));
    document.getElementById('btnExportPDFFiltro').addEventListener('click', () => exportarPDF(registrosFiltrados, "Registro_Parvulo_Filtrado", " (FILTRADO)"));

    // --- Borrar Todo ---
    const btnClearAll = document.getElementById('btnClearAll');
    if (btnClearAll) {
        btnClearAll.addEventListener('click', () => {
            if (confirm('¿Estás seguro/a de limpiar solo la información de los antecedentes? (Los registros de la tabla se mantendrán)')) {
                if (inputRBD) inputRBD.value = '';
                if (inputNombre) inputNombre.value = '';
                const nivelEducativo = document.getElementById('nivelEducativo');
                if (nivelEducativo) nivelEducativo.selectedIndex = 0;
                const encargadoNivel = document.getElementById('encargadoNivel');
                if (encargadoNivel) encargadoNivel.value = '';
                const profesionalRegistra = document.getElementById('profesionalRegistra');
                if (profesionalRegistra) profesionalRegistra.value = '';

                if (rbdOculto) rbdOculto.value = '';
                if (comunaOculta) comunaOculta.value = '';
                if (dependenciaOculta) dependenciaOculta.value = '';

                if (seccionRegistro) seccionRegistro.classList.add("bloqueado");
                alert('Información de antecedentes limpiada. Los registros en la tabla se conservan.');
            }
        });
    }
});
