document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const tablaDatos = document.getElementById('tablaDatos');
    const jecSelect = document.getElementById('jec');
    const infoJecSection = document.getElementById('infoJecSection');
    const tablaCONJEC = document.getElementById('tablaCONJEC');
    const tablaSINJEC = document.getElementById('tablaSINJEC');

    // ===============================
    // DATOS OCULTOS DE ESTABLECIMIENTOS
    // ===============================
    const escuelas = [
        {
            rbd: "7872",
            nombre: "COLEGIO BICENTENARIO DE DIFUSIÓN ARTÍSTICA LOS ULMOS",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "7874",
            nombre: "ESCUELA RURAL CAÑITAS",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "7896",
            nombre: "ESCUELA RURAL ESTAQUILLA",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "7897",
            nombre: "ESCUELA RURAL MANUEL GATICA ARRIAGADA",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "7898",
            nombre: "ESCUELA RURAL EL MELI",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "7905",
            nombre: "ESCUELA RURAL PARAGUAY CHICO",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "22012",
            nombre: "LICEO BICENTENARIO PUNTA DE RIELES",
            comuna: "LOS MUERMOS",
        },
        {
            rbd: "22309",
            nombre: "COLEGIO INGLÉS MABEL CONDEMARIN",
            comuna: "LOS MUERMOS",
        },
        //Puerto Varas
        {
            rbd: "7725",
            nombre: "ESCUELA RURAL COLONIA RÍO SUR",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "7722",
            nombre: "COLEGIO ROSITA NOVARO DE NOVARO",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "7740",
            nombre: "ESCUELA RURAL EPSON ENSENADA",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "7724",
            nombre: "COLEGIO NUEVA BRAUNAU",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "7723",
            nombre: "ESCUELA GRUPO ESCOLAR",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "22519",
            nombre: "COLEGIO MIRADOR DEL LAGO",
            comuna: "PUERTO VARAS",
        },
        {
            rbd: "7720",
            nombre: "LICEO PEDRO AGUIRRE CERDA",
            comuna: "PUERTO VARAS",
        },
        //Fresia
        {
            rbd: "7924",
            nombre: "ESCUELA RURAL SAN ANDRÉS",
            comuna: "FRESIA",
        },
        {
            rbd: "7929",
            nombre: "ESCUELA BASICA AGRICOLA HUEMPELEO",
            comuna: "FRESIA",
        },
        {
            rbd: "7941",
            nombre: "LICEO CARLOS IBAÑEZ DEL CAMPO",
            comuna: "FRESIA",
        },
        {
            rbd: "22105",
            nombre: "ESCUELA BÁSICA FRESIA",
            comuna: "FRESIA",
        },
        //Frutillar
        {
            rbd: "7973",
            nombre: "LICEO INDUSTRIAL CHILENO ALEMÁN ",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "7975",
            nombre: "ESCUELA ARTURO ALESSANDRI PALMA",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "7976",
            nombre: "ESCUELA BERNARDO PHILIPPI",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "7977",
            nombre: "ESCUELA RURAL LOS LINARES DE CASMA",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "7982",
            nombre: "ESCUELA RURAL PARAGUAY",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "11548",
            nombre: "ESCUELA CLAUDIO MATTE",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "22022",
            nombre: "LICEO IGNACIO CARRERA PINTO",
            comuna: "FRUTILLAR",
        },
        {
            rbd: "22493",
            nombre: "ESCUELA VICENTE PÉREZ ROSALES",
            comuna: "FRUTILLAR",
        },
        // Llanquihue
        {
            rbd: "7956",
            nombre: "LICEO POLITÉCNICO HOLANDA",
            comuna: "LLANQUIHUE",
        },
        {
            rbd: "7958",
            nombre: "ESCUELA INÉS GALLARDO ALVARADO",
            comuna: "LLANQUIHUE",
        },
        {
            rbd: "7959",
            nombre: "ESCUELA GABRIELA MISTRAL",
            comuna: "LLANQUIHUE",
        },
        {
            rbd: "7961",
            nombre: "ESCUELA RURAL LOS PELLINES",
            comuna: "LLANQUIHUE",
        },
        {
            rbd: "7962",
            nombre: "ESCUELA RURAL LONCOTORO",
            comuna: "LLANQUIHUE",
        },
        {
            rbd: "7967",
            nombre: "ESCUELA RURAL COLEGUAL",
            comuna: "LLANQUIHUE",
        }
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

    if (inputRBD) {
        inputRBD.addEventListener("input", (e) => {
            // Eliminar cualquier carácter que no sea número o guion
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
                
                // Desbloquear secciones
                seccionRegistro.classList.remove("bloqueado");
                seccionTabla.classList.remove("bloqueado");
            } else {
                inputNombre.value = "";
                rbdOculto.value = "";
                comunaOculta.value = "";
                dependenciaOculta.value = "";
                
                // Bloquear secciones
                seccionRegistro.classList.add("bloqueado");
                seccionTabla.classList.add("bloqueado");
            }
        });
    }

    //----CIERRE DE SECCIÓN DE VINCULAR RBD CON ESTABLECIMIENTO ----


// ===============================
// Mostrar/Ocultar tablas según selección de JEC
// ===============================

    jecSelect.addEventListener('change', () => {
        const value = jecSelect.value;
        // La sección de información de referencia se mantiene oculta permanentemente
        // según requerimiento del usuario.
        infoJecSection.classList.add('oculta');
        tablaCONJEC.classList.add('oculta');
        tablaSINJEC.classList.add('oculta');
    });

    // Función para formatear horas decimales a "Xh Ym"
    function formatearHoras(decimal) {
        const horas = Math.floor(decimal);
        const minutos = Math.round((decimal - horas) * 60);
        if (minutos === 0) return `${horas}h`;
        return `${horas}h ${minutos}m`;
    }

    let registros = [];

    // Función para actualizar los totales en el tfoot
    function actualizarTotales() {
        const totales = registros.reduce((acc, reg) => {
            acc.neet += reg.neet;
            acc.neep += reg.neep;
            acc.neepEx += reg.neepExcepcionales;
            acc.tneep += reg.totalNeep;
            acc.postulados += reg.totalPostulados;
            acc.apoyo += reg.totalHorasApoyo;
            acc.cronoDif += reg.horasCronoDif;
            acc.lectDif += reg.horasLectivasDif;
            acc.cronoProf += reg.horasCronoProf;
            acc.pedagProf += reg.pedagProfDec;
            return acc;
        }, { neet: 0, neep: 0, neepEx: 0, tneep: 0, postulados: 0, apoyo: 0, cronoDif: 0, lectDif: 0, cronoProf: 0, pedagProf: 0 });

        document.getElementById('totalNEET').textContent = totales.neet;
        document.getElementById('totalNEEP').textContent = totales.neep;
        document.getElementById('totalNEEPEx').textContent = totales.neepEx;
        document.getElementById('totalTNEEP').textContent = totales.tneep;
        document.getElementById('totalPostulados').textContent = totales.postulados;
        document.getElementById('totalApoyo').textContent = `${totales.apoyo}h`;
        document.getElementById('totalCronoDif').textContent = formatearHoras(totales.cronoDif);
        document.getElementById('totalLectDif').textContent = `${totales.lectDif}h`;
        document.getElementById('totalCronoProf').textContent = formatearHoras(totales.cronoProf);
        document.getElementById('totalPedagProf').textContent = formatearHoras(totales.pedagProf);
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores
        const curso = document.getElementById('curso').value;
        const jec = document.getElementById('jec').value;
        // Obtener valores y asegurar que sean positivos
        const neet = Math.max(0, parseInt(document.getElementById('neet').value) || 0);
        const neep = Math.max(0, parseInt(document.getElementById('neep').value) || 0);
        const neepExcepcionales = Math.max(0, parseInt(document.getElementById('neepExcepcionales').value) || 0);

        // Validación extra para NEET (Máximo 5)
        if (neet > 5) {
            alert('El número de estudiantes NEET no puede ser mayor a 5.');
            return;
        }

        // Calcular total NEEP (NEEP + NEEP Excepcionales)
        const totalNeep = neep + neepExcepcionales;

        // Calcular total postulados
        const totalPostulados = neet + totalNeep;

        // --- Lógica de cálculo de horas ---
        let totalHorasApoyo, horasCronoDif, horasLectivasDif, horasCronoProf, pedagProfDec, horasPedagProf;

        if (jec === 'SI') {
            totalHorasApoyo = 10 + (totalNeep * 3);
            horasCronoDif = 6 + (totalNeep * 2.25);
            horasLectivasDif = 8 + (totalNeep * 3);
            horasCronoProf = 4 + (totalNeep * 0.75);
            pedagProfDec = (5 + totalNeep) + 0.25; // h + 15m
            horasPedagProf = `${5 + totalNeep}h 15m`;
        } else {
            totalHorasApoyo = 7 + (totalNeep * 3);
            horasCronoDif = 4.5 + (totalNeep * 2.25);
            horasLectivasDif = 6 + (totalNeep * 3);
            horasCronoProf = 2.5 + (totalNeep * 0.75);
            pedagProfDec = (3 + totalNeep) + 0.25; // h + 15m
            horasPedagProf = `${3 + totalNeep}h 15m`;
        }

        const registro = {
            id: Date.now(),
            curso, jec, neet, neep, neepExcepcionales,
            totalNeep, totalPostulados, totalHorasApoyo,
            horasCronoDif, horasLectivasDif, horasCronoProf,
            pedagProfDec, horasPedagProf
        };

        registros.push(registro);

        // Crear fila
        const fila = document.createElement('tr');
        fila.dataset.id = registro.id;

        fila.innerHTML = `
            <td><strong>${curso}</strong></td>
            <td>${jec}</td>
            <td class="cell-neet">${neet}</td>
            <td class="cell-neep">${neep}</td>
            <td class="cell-neep">${neepExcepcionales}</td>
            <td class="cell-total">${totalNeep}</td>
            <td class="cell-total-postulados">${totalPostulados}</td>
            <td>${totalHorasApoyo}h</td>
            <td>${formatearHoras(horasCronoDif)}</td>
            <td class="cell-lectivas">${horasLectivasDif}h</td>
            <td>${formatearHoras(horasCronoProf)}</td>
            <td>${horasPedagProf}</td>
            <td>
                <button class="btn-delete" title="Eliminar registro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </td>
        `;

        // Agregar evento de eliminación
        fila.querySelector('.btn-delete').addEventListener('click', () => {
            if(confirm('¿Estás seguro de eliminar este registro?')) {
                registros = registros.filter(r => r.id !== registro.id);
                fila.style.opacity = '0';
                fila.style.transform = 'translateX(20px)';
                fila.style.transition = 'all 0.3s';
                setTimeout(() => {
                    fila.remove();
                    actualizarTotales();
                }, 300);
            }
        });

        // Agregar a la tabla
        tablaDatos.appendChild(fila);
        actualizarTotales();

        // Limpiar formulario y mantener tablas ocultas
        formulario.reset();
        infoJecSection.classList.add('oculta');
        tablaCONJEC.classList.add('oculta');
        tablaSINJEC.classList.add('oculta');
        document.getElementById('curso').focus();
    });

    // --- Exportar a Excel ---
    document.getElementById('btnExportExcel').addEventListener('click', () => {
        if (registros.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        // Obtener datos del establecimiento
        const rbd = document.getElementById("rbdOculto").value || document.getElementById("RBD").value || "N/A";
        const nombre = document.getElementById("escuelaNombre").value || "N/A";
        const comuna = document.getElementById("comunaOculta").value || "N/A";

        // 1. Crear tabla temporal con bordes CSS
        const table = document.createElement('table');
        const cellStyle = 'border: 1px solid black; padding: 5px; text-align: center;';
        const headerStyle = 'border: 1px solid black; padding: 5px; background-color: #818cf8; color: white; font-weight: bold; text-align: center;';
        const titleStyle = 'border: 1px solid black; padding: 10px; font-size: 16pt; font-weight: bold; text-align: center;';

        let html = `
            <tr><td colspan="12" style="${titleStyle}">GESTIÓN DE HORAS APOYO PIE</td></tr>
            <tr><td colspan="12"></td></tr>
            <tr><td colspan="12" style="background-color: #f1f5f9; font-weight: bold; border: 1px solid black;">INFORMACIÓN DEL ESTABLECIMIENTO</td></tr>
            <tr>
                <td style="${cellStyle} font-weight: bold;">RBD:</td><td colspan="3" style="${cellStyle}">${rbd}</td>
                <td style="${cellStyle} font-weight: bold;">NOMBRE:</td><td colspan="3" style="${cellStyle}">${nombre}</td>
                <td style="${cellStyle} font-weight: bold;">COMUNA:</td><td colspan="3" style="${cellStyle}">${comuna}</td>
            </tr>
            <tr><td colspan="12"></td></tr>
            <tr>
                <th style="${headerStyle}">Cursos</th>
                <th style="${headerStyle}">JEC</th>
                <th style="${headerStyle}">NEET</th>
                <th style="${headerStyle}">NEEP</th>
                <th style="${headerStyle}">NEEP Exc.</th>
                <th style="${headerStyle}">Tot. NEEP</th>
                <th style="${headerStyle}">Postulados</th>
                <th style="${headerStyle}">Horas Apoyo</th>
                <th style="${headerStyle}">Crono Dif</th>
                <th style="${headerStyle}">Lect Dif</th>
                <th style="${headerStyle}">Crono Prof</th>
                <th style="${headerStyle}">Lect Prof</th>
            </tr>
        `;

        // Añadir registros de la tabla
        registros.forEach(reg => {
            html += `
                <tr>
                    <td style="${cellStyle}">${reg.curso}</td>
                    <td style="${cellStyle}">${reg.jec}</td>
                    <td style="${cellStyle}">${reg.neet}</td>
                    <td style="${cellStyle}">${reg.neep}</td>
                    <td style="${cellStyle}">${reg.neepExcepcionales}</td>
                    <td style="${cellStyle}">${reg.totalNeep}</td>
                    <td style="${cellStyle}">${reg.totalPostulados}</td>
                    <td style="${cellStyle}">${reg.totalHorasApoyo}h</td>
                    <td style="${cellStyle}">${formatearHoras(reg.horasCronoDif)}</td>
                    <td style="${cellStyle}">${reg.horasLectivasDif}h</td>
                    <td style="${cellStyle}">${formatearHoras(reg.horasCronoProf)}</td>
                    <td style="${cellStyle}">${reg.horasPedagProf}</td>
                </tr>
            `;
        });

        // Fila de Totales
        const totalNEET = registros.reduce((s, r) => s + r.neet, 0);
        const totalNEEP = registros.reduce((s, r) => s + r.neep, 0);
        const totalNEEPEx = registros.reduce((s, r) => s + r.neepExcepcionales, 0);
        const totalTNEEP = registros.reduce((s, r) => s + r.totalNeep, 0);
        const totalPostulados = registros.reduce((s, r) => s + r.totalPostulados, 0);
        const totalApoyo = registros.reduce((s, r) => s + r.totalHorasApoyo, 0);

        html += `
            <tr style="background-color: #f1f5f9; font-weight: bold;">
                <td colspan="2" style="${cellStyle}">TOTALES</td>
                <td style="${cellStyle}">${totalNEET}</td>
                <td style="${cellStyle}">${totalNEEP}</td>
                <td style="${cellStyle}">${totalNEEPEx}</td>
                <td style="${cellStyle}">${totalTNEEP}</td>
                <td style="${cellStyle}">${totalPostulados}</td>
                <td style="${cellStyle}">${totalApoyo}h</td>
                <td colspan="4" style="${cellStyle}">Cálculos detallados en reporte adjunto</td>
            </tr>
        `;

        table.innerHTML = html;
        const ws = XLSX.utils.table_to_sheet(table);

        // Estilos de columnas
        ws['!cols'] = [
            {wch: 15}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 10}, 
            {wch: 10}, {wch: 12}, {wch: 12}, {wch: 12}, {wch: 10}, 
            {wch: 12}, {wch: 12}
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Registros");
        XLSX.writeFile(wb, `Reporte_Horas_${rbd}.xlsx`);
    });

    // --- Exportar a PDF ---
    document.getElementById('btnExportPDF').addEventListener('click', () => {
        if (registros.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'pt', 'a4'); // 'l' para landscape (horizontal)

        // Obtener datos del establecimiento
        const rbd = document.getElementById("rbdOculto").value || document.getElementById("RBD").value || "N/A";
        const nombre = document.getElementById("escuelaNombre").value || "N/A";
        const comuna = document.getElementById("comunaOculta").value || "N/A";

        // Título del PDF
        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59); // var(--text-main)
        doc.text("GESTIÓN DE HORAS APOYO PIE", 40, 40);
        
        // Información del establecimiento
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85); // Slate 700
        doc.text(`RBD: ${rbd}`, 40, 65);
        doc.text(`ESTABLECIMIENTO: ${nombre}`, 40, 80);
        doc.text(`COMUNA: ${comuna}`, 40, 95);

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139); // var(--text-muted)
        doc.text("Generado el: " + new Date().toLocaleString(), 40, 115);

        doc.autoTable({
            html: '#tablaMaestra',
            startY: 130,
            styles: { 
                fontSize: 8,
                cellPadding: 6,
                valign: 'middle',
                halign: 'center',
                font: 'helvetica'
            },
            headStyles: { 
                fillColor: [129, 140, 248], // var(--primary)
                textColor: 255,
                fontStyle: 'bold'
            },
            footStyles: {
                fillColor: [241, 245, 249],
                textColor: [15, 23, 42],
                fontStyle: 'bold'
            },
    
            // Excluimos la columna de "Acciones"
            columns: [
                { header: 'Cursos', dataKey: 0 },
                { header: 'JEC', dataKey: 1 },
                { header: 'NEET', dataKey: 2 },
                { header: 'NEEP', dataKey: 3 },
                { header: 'NEEP Exc.', dataKey: 4 },
                { header: 'Tot. NEEP', dataKey: 5 },
                { header: 'Postulados', dataKey: 6 },
                { header: 'T. Apoyo', dataKey: 7 },
                { header: 'Crono Dif', dataKey: 8 },
                { header: 'Lect Dif', dataKey: 9 },
                { header: 'Crono Prof', dataKey: 10 },
                { header: 'Lect Prof', dataKey: 11 }
            ]
        });

        doc.save(`Reporte_Horas_${rbd.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    });

    // --- Borrar Todo ---
    const btnClearAll = document.getElementById('btnClearAll');
    if (btnClearAll) {
        btnClearAll.addEventListener('click', () => {
            if (registros.length === 0) {
                alert('No hay registros para borrar');
                return;
            }

            if (confirm('¿Estás seguro/a de borrar todos los registros?')) {
                registros = [];
                tablaDatos.innerHTML = '';
                actualizarTotales();
            }
        });
    }
});
