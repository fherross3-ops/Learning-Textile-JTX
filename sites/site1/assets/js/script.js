// Variable global para almacenar el progreso
let progress = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para el menú responsivo
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Lógica para la evaluación
    const evaluationForm = document.getElementById('evaluation-form');
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q1 = document.getElementById('q1').value.trim().toLowerCase();
            const q2 = document.getElementById('q2').value.trim().toLowerCase();
            const correctAnswers = { q1: 'algodón', q2: 'lino' };
            
            let correctCount = 0;
            if (q1 === correctAnswers.q1) {
                correctCount++;
            }
            if (q2 === correctAnswers.q2) {
                correctCount++;
            }

            alert(`Evaluación completada. Respuestas correctas: ${correctCount} de 2.`);
            
            // Simulación de actualización de progreso
            updateProgress(25);
            console.log('Evaluación enviada al backend para registro.');
        });
    }

    // Lógica para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulario de contacto enviado. Se procesará su solicitud.');
            // Aquí se enviaría el formulario a un endpoint del backend.
            console.log('Formulario de contacto y archivo adjunto enviados al backend.');
        });
    }

    // Lógica para exportar a CSV
    const exportCsvButton = document.getElementById('export-csv');
    if (exportCsvButton) {
        exportCsvButton.addEventListener('click', () => {
            const data = [
                ['tipo', 'valor', 'fecha'],
                ['progreso_lectura', progress, new Date().toISOString()],
                ['evaluacion_completada', 'Sí', new Date().toISOString()]
            ];
            
            const csvContent = data.map(e => e.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'progreso-site1.csv');
            link.click();
            alert('Progreso exportado a CSV.');
        });
    }

    // Lógica para imprimir a PDF
    const printPdfButton = document.getElementById('print-pdf');
    if (printPdfButton) {
        printPdfButton.addEventListener('click', () => {
            // El backend del PDF se genera en el cliente con jspdf y html2canvas
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text('Reporte de Progreso', 10, 10);
            doc.text(`Progreso de lectura: ${progress}%`, 10, 20);
            doc.text('Evaluaciones: Completadas', 10, 30);
            doc.save('reporte-progreso.pdf');
        });
    }
});

// Función para actualizar la barra de progreso
function updateProgress(value) {
    progress += value;
    if (progress > 100) progress = 100;
    
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressBarFill && progressText) {
        progressBarFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% completado`;
    }
}

// Simulación de progreso de lectura
// Llama a esta función para simular avance en el sitio
window.addEventListener('scroll', () => {
    // Simula un avance del 10% cada 200px de scroll
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    
    const newProgress = Math.min(100, Math.round((scrollPosition / totalHeight) * 100));
    
    // Evita actualizaciones excesivas para una simulación simple
    if (newProgress > progress + 5) {
        updateProgress(newProgress - progress);
    }
});