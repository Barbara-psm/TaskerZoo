document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAñadirAnimal');
    let animalIdAEliminar = null;

    // Modal de confirmación
    const modal = document.getElementById('confirmarEliminarAnimalModal');
    const btnCancelar = document.getElementById('cancelarEliminarAnimal');
    const btnConfirmar = document.getElementById('confirmarEliminarAnimal');

    // Mostrar modal al hacer clic en eliminar
    window.eliminarAnimal = (id) => {
        animalIdAEliminar = id;
        modal.classList.remove('hidden');
    };

    // Cancelar eliminación
    btnCancelar.addEventListener('click', () => {
        modal.classList.add('hidden');
        animalIdAEliminar = null;
    });

    // Confirmar eliminación
    btnConfirmar.addEventListener('click', async () => {
        if (!animalIdAEliminar) {
            modal.classList.add('hidden');
            return;
        }

        try {
            const response = await fetch(`/animales/${animalIdAEliminar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Recargar la página para ver los cambios
                window.location.reload();
            } else {
                throw new Error(data.error || 'Error al eliminar el animal');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        } finally {
            modal.classList.add('hidden');
            animalIdAEliminar = null;
        }
    });

    // Formulario para añadir un animal
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
                window.location.reload(); // Recargar para mostrar el nuevo animal
            } else {
                const errorMsg = await res.text();
                alert('Error al añadir el animal: ' + errorMsg);
            }
        } catch (err) {
            alert('Error en la solicitud: ' + err.message);
        }
    });

    // Filtros (mirar)
    const filtroNombre = document.getElementById('filtroNombre');
    const filtroZona = document.getElementById('filtroZona');

    if (filtroNombre && filtroZona) {
        [filtroNombre, filtroZona].forEach(input => {
            input.addEventListener('input', filtrarAnimales);
        });
    }

    function filtrarAnimales() {
        
    }
});