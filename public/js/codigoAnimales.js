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
        const sexo = document.getElementById('sexo').value;
        const zona = document.getElementById('zona').value;
        const familiaCientifica = document.getElementById('familiaCientifica').value;

        // Validación básica
        if (!nombre || !especie || !sexo || !zona || !familiaCientifica) {
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

        try {
            const res = await fetch('/animales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    especie,
                    edad: edadFinal,
                    sexo, // (envía M/F/Desconocido)
                    familiaCientifica,
                    zona
                })
            });

            if (res.ok) {
                form.reset();
                window.location.reload();
            } else {
                const errorMsg = await res.text();
                alert('Error al añadir el animal: ' + errorMsg);
            }
        } catch (err) {
            alert('Error en la solicitud: ' + err.message);
        }
    });

    // Filtro por zona
    const filtroZona = document.getElementById('filtroZona');
    if (filtroZona) {
        filtroZona.addEventListener('change', filtrarAnimalesPorZona);
    }

    function filtrarAnimalesPorZona() {
        const zonaSeleccionada = filtroZona.value.toLowerCase();
        const filasAnimales = document.querySelectorAll('#tablaAnimales tr');

        filasAnimales.forEach(fila => {
            if (fila.cells.length > 0) { // Asegurarse que es una fila con datos
                const zonaAnimal = fila.cells[5].textContent.toLowerCase().trim();

                if (zonaSeleccionada === '' || zonaAnimal.includes(zonaSeleccionada)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            }
        });
    }
});