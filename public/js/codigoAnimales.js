document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAñadirAnimal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const especie = document.getElementById('especie').value.trim();
        const edadValor = document.getElementById('edad').value.trim();
        const unidadEdad = document.getElementById('unidadEdad').value;
        const sexoSeleccionado = document.getElementById('sexo').value;
        const zona = document.getElementById('zona').value;
        const familiaCientifica = document.getElementById('familiaCientifica').value;

        // Validación básica
        if (!nombre || !especie || !sexoSeleccionado || !zona || !familiaCientifica) {
            alert('Por favor, rellena todos los campos.');
            return;
        }

        // Construir la edad
        let edadFinal = 'Desconocida';
        if (edadValor !== '') {
            const edadNum = parseInt(edadValor);
            if (isNaN(edadNum) || edadNum < 0) {
                alert('Edad inválida.');
                return;
            }

            const unidadesMap = {
                dias: 'día(s)',
                semanas: 'semana(s)',
                meses: 'mes(es)',
                anios: 'año(s)'
            };
            edadFinal = `${edadNum} ${unidadesMap[unidadEdad]}`;
        }

        let sexo = '';
        if (sexoSeleccionado === 'M') {
            sexo = 'Masculino';
        } else if (sexoSeleccionado === 'F') {
            sexo = 'Femenino';
        } else if (sexoSeleccionado === 'Desconocido') {
            sexo = 'Desconocido';
        } else {
            alert('Por favor, selecciona un sexo válido.');
            return;
        }
        // Enviar con fetch a /animales (se elige el nombre común y se envía el nombre científico)
        try {
            const res = await fetch('/animales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    especie,
                    edad: edadFinal,
                    sexo,
                    familiaCientifica,
                    zona
                })
            });

            if (res.ok) {
                alert('Animal añadido correctamente.');
                form.reset();
            } else {
                const errorMsg = await res.text();
                alert('Error al añadir el animal: ' + errorMsg);
            }
        } catch (err) {
            alert('Error en la solicitud: ' + err.message);
        }
    });
});
