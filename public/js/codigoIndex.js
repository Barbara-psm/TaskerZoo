document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('introTaskerZoo'); // Logo de taskerzoo que se desvanece
    const introText = intro.querySelector('h1'); // Texto que se desvanece
    const btnEntrar = document.getElementById('btnEntrar'); // Botón para acceder a la gestión interna
    const formularioSignUp = document.getElementById('formularioSignUp'); // Div con el formulario para el registo de empleado
    const formSignUp = document.getElementById('formSignUp'); // Formulario para el registro de empleado
    const formularioLogin = document.getElementById('formularioLogin'); // Div con el formulario para el login
    const formLogin = document.getElementById('formLogin'); // Formulario para el inicio de sesión
    const mensajeErrorRegistro = document.getElementById('mensajeErrorRegistro'); // Línea para mostrar el tipo de error del registro
    const mensajeErrorLogin = document.getElementById('mensajeErrorLogin'); // Línea para mostrar el tipo de error del registro
    const irAlLogin = document.getElementById('irAlLogin'); // Enlace para ir al formulario de login desde el de registro
    const irAlSignup = document.getElementById('irAlSignup'); // Enlace para ir al formulario de registro desde el de login

    // Fade in
    setTimeout(() => {
        introText.classList.add('opacity-100');
    }, 100); // Pequeño delay para asegurar carga

    // Esperar 3 segundos, luego fade out
    setTimeout(() => {
        introText.classList.remove('opacity-100');
        introText.classList.add('opacity-0');
    }, 3100);

    // Mostrar el botón Entrar
    setTimeout(() => {
        intro.classList.add('hidden');
        btnEntrar.classList.remove('hidden');
        setTimeout(() => {
            btnEntrar.classList.add('opacity-100');
        }, 100);
    }, 4100);

    // Función para leer cookies (similar a Cookies.get())
    function getCookie(nombre) {
        const valor = `; ${document.cookie}`;
        const partes = valor.split(`; ${nombre}=`);
        if (partes.length === 2) return partes.pop().split(';').shift();
    }

    // funcion mejorada para leer cookies?
    // function getCookie(name) {
    //     const cookies = document.cookie.split(';');
    //     for (let cookie of cookies) {
    //         const [cookieName, cookieValue] = cookie.trim().split('=');
    //         if (cookieName === name) return decodeURIComponent(cookieValue);
    //     }
    //     return null;
    // }

    btnEntrar.addEventListener('click', async function () {
        try {
            const respuesta = await fetch('/verificarSesion');
            const resultado = await respuesta.json();

            if (resultado.sesionActiva) {
                window.location.href = '/dashboard';
            } else {
                formularioLogin.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error verificando sesión:', error);
            formularioLogin.classList.remove('hidden');
        }
    });

    // Manejar el registro de empleados
    formSignUp.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = formSignUp.newUser.value.trim();
        const rol = formSignUp.newRol.value.trim();
        const email = formSignUp.newEmail.value.trim();
        const contraseña = formSignUp.newPassword.value.trim();
        const idZooName = localStorage.getItem('nombreZoo');

        if (!nombre || !email || !contraseña) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const respuesta = await fetch('/registrarEmpleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, rol, email, contraseña, idZooName })
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.message);
            }

            // Ocultar el formulario de registro
            formularioSignUp.classList.add('hidden');

            // Mostrar el formulario de login
            formularioLogin.classList.remove('hidden');

            alert('Empleado creado exitosamente.');
        } catch (error) {
            console.error('Error al registrar empleado:', error);
            mensajeErrorRegistro.innerHTML = "Este correo no está disponible";
        }
    });

    // Manejar el inicio de sesión del empleado
    formLogin.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = formLogin.empleadoEmail.value.trim();
        const contraseña = formLogin.empleadoPassword.value.trim();

        if (!email || !contraseña) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            const respuesta = await fetch('/loginEmpleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, contraseña })
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.message);
            }

            window.location.href = '/dashboard';

        } catch (error) {
            console.error('Error al iniciar sesión', error);
            mensajeErrorLogin.innerHTML = "No se ha podido iniciar sesión";
        }
    });

    // Ir a login desde registro
    irAlLogin.addEventListener('click', function () {
        formularioSignUp.classList.add('hidden');
        formularioLogin.classList.remove('hidden');
    });

    // Ir a signup desde login
    irAlSignup.addEventListener('click', function () {
        formularioLogin.classList.add('hidden');
        formularioSignUp.classList.remove('hidden');
    });

});