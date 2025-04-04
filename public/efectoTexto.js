// escena.js - Archivo para animar el nombre en el mensaje de bienvenida

// Función principal para animar el nombre
function animarNombre() {
    const welcomeMessageH2 = document.querySelector('#welcomeMessage h2');

    if (!welcomeMessageH2) return;

    // Obtener el texto sin etiquetas HTML
    const textoCompleto = welcomeMessageH2.textContent.trim();
    
    // Buscar la parte después de "¡Bienvenido/a,"
    const partes = textoCompleto.split(/\s*¡?Bienvenido\/a,?\s*/i);
    if (partes.length < 2) return;

    const nombreCompleto = partes[1].replace('!', '').trim();
    
    // Separar nombre y apellido
    const [nombre, apellido] = nombreCompleto.split(' '); // Asumiendo que el nombre y apellido están separados por un espacio

    // Reemplazar el mensaje original con el contenedor animado
    welcomeMessageH2.innerHTML = `¡Bienvenido/a,<br><span id="nombre-animado"></span><span id="exclamacion">!</span>`;

    const nombreAnimadoElement = document.getElementById('nombre-animado');

    // Agregar el nombre animado
    nombre.split('').forEach((letra, index) => {
        const span = document.createElement('span');
        span.className = 'letra-animada';
        span.textContent = letra;
        span.style.animationDelay = `${index * 0.1}s`;
        nombreAnimadoElement.appendChild(span);
    });

    // Agregar un espacio adicional entre el nombre y el apellido
    if (apellido) {
        const espacio = document.createElement('span');
        espacio.textContent = ' '; // Espacio adicional
        nombreAnimadoElement.appendChild(espacio);

        apellido.split('').forEach((letra, index) => {
            const span = document.createElement('span');
            span.className = 'letra-animada';
            span.textContent = letra;
            span.style.animationDelay = `${(nombre.length + index) * 0.1}s`; // Ajustar el retraso de animación
            nombreAnimadoElement.appendChild(span);
        });
    }
}

// Estilos para la animación
function agregarEstilosAnimacion() {
    if (document.getElementById('animacion-estilos')) return; // Evita agregar los estilos múltiples veces
    
    const estilos = document.createElement('style');
    estilos.id = 'animacion-estilos';
    estilos.textContent = `
        @keyframes aparecerLetra {
            0% { opacity: 0; transform: translateY(20px) rotateY(90deg); }
            100% { opacity: 1; transform: translateY(0) rotateY(0deg); }
        }

        .letra-animada {
            display: inline-block;
            opacity: 0;
            color: var(--color-primary, #3498db); /* Color del texto */
            text-shadow: 2px 2px 0 #333333, -2px -2px 0 #333333, 2px -2px 0 #333333, -2px 2px 0 #333333; /* Contorno en color carbón */
            animation: aparecerLetra 0.6s forwards;
            font-weight: bold;
        }

        #exclamacion {
            display: inline-block;
            opacity: 1; /* Asegúrate de que el símbolo ! sea visible desde el principio */
            color: var(--color-primary, #3498db); /* Color del símbolo */
            margin-left: 5px; /* Espacio entre el nombre y el símbolo */
            font-weight: bold; /* Asegúrate de que el símbolo tenga el mismo peso que el texto */
            text-shadow: 2px 2px 0 #333333, -2px -2px 0 #333333, 2px -2px 0 #333333, -2px 2px 0 #333333; /* Contorno en color carbón */
        }
    `;
    document.head.appendChild(estilos);
}

// Función para observar cambios en el mensaje de bienvenida
function observarMensajeBienvenida() {
    const targetNode = document.getElementById('welcomeMessage');
    if (!targetNode) return;

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.attributeName === 'class' && targetNode.classList.contains('visible')) {
                setTimeout(animarNombre, 300);
                observer.disconnect();
                break;
            }
        }
    });

    observer.observe(targetNode, { attributes: true });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    agregarEstilosAnimacion();
    observarMensajeBienvenida();
});