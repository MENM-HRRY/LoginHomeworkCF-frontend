document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const themeToggle = document.getElementById('themeToggle');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');

    // Variables globales para partículas
    let titleParticles = [];

    // Función para cambiar tema
    themeToggle.addEventListener('change', function() {
        document.documentElement.classList.toggle('dark-mode');
    });

    // Función para mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        if (type === 'password') {
            togglePasswordBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
            `;
        } else {
            togglePasswordBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                </svg>
            `;
        }
    });

    // Validaciones en "blur"
    nombreInput.addEventListener('blur', validateNombre);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Actualización de fuerza de la contraseña en tiempo real
    passwordInput.addEventListener('input', updatePasswordStrength);

    // Enviar formulario
    form.addEventListener('submit', handleSubmit);

    // Función para validar el nombre
    function validateNombre() {
        const value = nombreInput.value.trim();
        const nombreError = document.getElementById('nombreError');
        const fullNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+ [a-zA-ZáéíóúÁÉÍÓÚñÑ]+/;

        if (!value) {
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreError.classList.add('visible');
            nombreError.textContent = 'El nombre completo es requerido';
            return false;
        } else if (!fullNameRegex.test(value)) {
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreError.classList.add('visible');
            nombreError.textContent = 'Ingrese nombre y apellido';
            return false;
        } else {
            nombreInput.classList.remove('error');
            nombreInput.classList.add('valid');
            nombreError.classList.remove('visible');
            return true;
        }
    }

    // Función para validar el email
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            emailError.classList.add('visible');
            emailError.textContent = 'El correo electrónico es requerido';
            return false;
        } else if (!emailRegex.test(value)) {
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            emailError.classList.add('visible');
            emailError.textContent = 'Ingrese un correo electrónico válido';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
            emailError.classList.remove('visible');
            return true;
        }
    }

    // Función para actualizar la fuerza de la contraseña
    function updatePasswordStrength() {
        const value = passwordInput.value;
        const hasLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        let strength = 0;

        if (hasLength) strength++;
        if (hasUpperCase) strength++;
        if (hasLowerCase) strength++;
        if (hasNumbers) strength++;
        if (hasSpecialChars) strength++;

        let strengthPercent = (strength / 5) * 100;
        strengthMeter.style.width = strengthPercent + '%';

        if (value.length === 0) {
            strengthMeter.style.backgroundColor = '#eee';
            strengthText.textContent = '';
            strengthText.style.color = '#666';
        } else if (strength <= 2) {
            strengthMeter.style.backgroundColor = 'var(--color-error)';
            strengthText.textContent = 'Débil';
            strengthText.style.color = 'var(--color-error)';
        } else if (strength <= 3) {
            strengthMeter.style.backgroundColor = 'var(--color-warning)';
            strengthText.textContent = 'Media';
            strengthText.style.color = 'var(--color-warning)';
        } else if (strength <= 4) {
            strengthMeter.style.backgroundColor = 'var(--color-info)';
            strengthText.textContent = 'Buena';
            strengthText.style.color = 'var(--color-info)';
        } else {
            strengthMeter.style.backgroundColor = 'var(--color-success)';
            strengthText.textContent = 'Excelente';
            strengthText.style.color = 'var(--color-success)';
        }

        const passwordGuide = document.getElementById('passwordGuide');
        passwordGuide.innerHTML = `
            <span class="${hasLength ? 'valid-criteria' : 'invalid-criteria'}">
                ● Al menos 8 caracteres (${hasLength ? '✔️' : '❌'})
            </span>
            <span class="${hasUpperCase ? 'valid-criteria' : 'invalid-criteria'}">
                ● Al menos una letra MAYÚSCULA (${hasUpperCase ? '✔️' : '❌'})
            </span>
            <span class="${hasLowerCase ? 'valid-criteria' : 'invalid-criteria'}">
                ● Al menos una letra minúscula (${hasLowerCase ? '✔️' : '❌'})
            </span>
            <span class="${hasNumbers ? 'valid-criteria' : 'invalid-criteria'}">
                ● Al menos un número (${hasNumbers ? '✔️' : '❌'})
            </span>
            <span class="${hasSpecialChars ? 'valid-criteria' : 'invalid-criteria'}">
                ● Al menos un carácter especial (!@#$%^&*) (${hasSpecialChars ? '✔️' : '❌'})
            </span>
        `;
    }

    // Función para validar la contraseña
    function validatePassword() {
        const value = passwordInput.value;
        const passwordError = document.getElementById('passwordError');

        if (value.length < 8) {
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            passwordError.classList.add('visible');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            return false;
        } else {
            passwordInput.classList.remove('error');
            passwordInput.classList.add('valid');
            passwordError.classList.remove('visible');
            return true;
        }
    }

    // Función para mostrar el mensaje de bienvenida
    function mostrarMensajeBienvenida(nombre) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        welcomeMessage.innerHTML = `<h2>¡Bienvenido/a,<br>${nombre}!</h2>
                                    <p>Acceso exitoso: ${now.toLocaleDateString('es-ES', options)}</p>`;
        form.style.display = 'none';
        welcomeMessage.classList.add('visible');
    }

// Variable global para almacenar la posición del mouse sobre el canvas
let mouse = { x: null, y: null };

function initTitleParticles() {
    const canvas = document.getElementById('titleParticles');
    const ctx = canvas.getContext('2d');
    const header = document.querySelector('header');

    // Dimensiones ajustadas
    const customWidth = header.offsetWidth * 1.5;
    const customHeight = header.offsetHeight;
    canvas.width = customWidth;
    canvas.height = customHeight;

    // Asegurar que el canvas detecte eventos del mouse
    canvas.style.pointerEvents = "auto";

    // Ocultar el h1 original
    const title = document.querySelector('h1');
    title.style.visibility = 'hidden';

    // Eventos del mouse
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Crear un canvas oculto para dibujar el texto
    const offscreen = document.createElement('canvas');
    offscreen.width = customWidth;
    offscreen.height = customHeight;
    const offCtx = offscreen.getContext('2d');

    const fontSize = 40; // Tamaño ajustado
    offCtx.fillStyle = 'white';
    offCtx.font = `bold ${fontSize}px sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText("Registro de Usuario", customWidth / 2, customHeight / 2);

    // Obtener datos de píxeles del texto
    const imageData = offCtx.getImageData(0, 0, customWidth, customHeight);
    const data = imageData.data;

    // Crear partículas
    titleParticles = [];
    const step = 4;
    const colors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

    for (let y = 0; y < customHeight; y += step) {
        for (let x = 0; x < customWidth; x += step) {
            const index = (y * customWidth + x) * 4;
            const alpha = data[index + 3];
            if (alpha > 128) {
                titleParticles.push({
                    x: x + Math.random() * 10 - 5, // Pequeño desplazamiento inicial
                    y: y + Math.random() * 10 - 5,
                    targetX: x,
                    targetY: y,
                    size: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * Math.PI * 2, // Ángulo inicial aleatorio
                    speed: Math.random() * 2 + 1,
                    flying: false // Bandera para saber si están en "modo libélula"
                });
            }
        }
    }

    animateParticles(ctx);
}

function animateParticles(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    titleParticles.forEach(particle => {
        if (mouse.x !== null && mouse.y !== null) {
            const dxm = particle.x - mouse.x;
            const dym = particle.y - mouse.y;
            const dist = Math.sqrt(dxm * dxm + dym * dym);
            const influenceRadius = 120;

            if (dist < influenceRadius) {
                // Movimiento estilo libélula
                particle.angle += Math.random() * 0.5 - 0.25; // Oscilación aleatoria
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.flying = true; // Se activa el modo "libélula"
            }
        } else if (particle.flying) {
            // Regresan rápidamente a su posición original cuando el mouse se va
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            particle.x += dx * 0.2; // Regreso más rápido
            particle.y += dy * 0.2;
            if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                particle.flying = false; // Desactiva el efecto libélula
            }
        } else {
            // Movimiento de ajuste fino para mantener la cohesión del texto
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            particle.x += dx * 0.1; // Ajuste más rápido
            particle.y += dy * 0.1;
        }

        // Dibujar la partícula
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(() => animateParticles(ctx));
}


    // Función para manejar el envío del formulario
    function handleSubmit(e) {
        e.preventDefault();
        const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isNombreValid) {
            nombreInput.focus();
            return;
        }
        if (!isEmailValid) {
            emailInput.focus();
            return;
        }
        if (!isPasswordValid) {
            passwordInput.focus();
            return;
        }
        
        // Ejecutar partículas y mostrar bienvenida
        initTitleParticles();
        mostrarMensajeBienvenida(nombreInput.value);
    }
});
