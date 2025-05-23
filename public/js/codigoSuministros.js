document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el campo hidden 'tipo' cuando se selecciona un suministro
    const selectSuministro = document.getElementById('nombreSuministro');
    const inputTipo = document.getElementById('tipoSuministro');

    selectSuministro.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        inputTipo.value = selectedOption.dataset.tipo || '';
    });

    // Manejo del formulario
    const form = document.getElementById('formAñadirSuministro');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                // Obtener valores del formulario
                const nombre = selectSuministro.value.trim();
                const tipo = inputTipo.value;
                const cantidadValor = document.getElementById('cantidadSuministro').value;
                const unidadCantidad = document.getElementById('unidadSuministro').value;

                // Validar y construir la cantidad
                let cantidadFinal = 'No especificada';
                if (cantidadValor !== '') {
                    const cantidadNum = parseFloat(cantidadValor);
                    if (isNaN(cantidadNum)) {
                        alert('La cantidad debe ser un número válido.');
                        return;
                    }
                    if (cantidadNum < 0) {
                        alert('La cantidad no puede ser negativa.');
                        return;
                    }

                    // Formatear el número para quitar decimales innecesarios (ej: 5.00 -> 5)
                    const cantidadFormateada = cantidadNum % 1 === 0 ? cantidadNum.toString() : cantidadNum.toFixed(2);
                    cantidadFinal = `${cantidadFormateada} ${unidadCantidad}`;
                }

                // Verificar si el suministro ya existe
                const existe = await verificarSuministroExistente(nombre);
                if (existe) {
                    alert('Este suministro ya existe en la base de datos.');
                    return;
                }

                // Crear objeto para enviar
                const suministroData = {
                    nombre,
                    tipo,
                    cantidad: cantidadFinal
                };

                const res = await fetch('/suministros', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(suministroData)
                });

                if (!res.ok) {
                    throw new Error('Error al guardar el suministro');
                }

                form.reset();
                window.location.reload();

            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar el suministro');
            }
        });
    }

    // Crear modal solo si no existe
    const modal = document.createElement('div');
    modal.id = 'confirmarEliminarSuministroModal';
    modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-lg font-bold mb-4">¿Estás seguro?</h3>
            <p class="mb-6">Esta acción no se puede deshacer.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarEliminarSuministro" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancelar
                </button>
                <button id="confirmarEliminarSuministro" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Confirmar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    let suministroIdAEliminar = null;

    // Función para mostrar el modal de confirmación
    window.eliminarSuministro = (id) => {
        suministroIdAEliminar = id;
        modal.classList.remove('hidden');
    };

    // Cancelar eliminación
    document.getElementById('cancelarEliminarSuministro').addEventListener('click', () => {
        modal.classList.add('hidden');
        suministroIdAEliminar = null;
    });

    // Confirmar eliminación
    document.getElementById('confirmarEliminarSuministro').addEventListener('click', async () => {
        if (!suministroIdAEliminar) {
            modal.classList.add('hidden');
            return;
        }

        try {
            const response = await fetch(`/api/suministros/${suministroIdAEliminar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Recargar la página para reflejar los cambios
                window.location.reload();
            } else {
                throw new Error(data.error || 'Error al eliminar el suministro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        } finally {
            modal.classList.add('hidden');
            suministroIdAEliminar = null;
        }
    });
});

// Función para verificar si un suministro ya existe
async function verificarSuministroExistente(nombre) {
    try {
        const res = await fetch(`/suministros/verificar?nombre=${encodeURIComponent(nombre)}`);
        const data = await res.json();
        return data.existe;
    } catch (error) {
        console.error('Error al verificar suministro:', error);
        return false;
    }
}

// Función para eliminar suministro (mostrar modal)
function eliminarSuministro(id) {
    const modal = document.getElementById('confirmarEliminarModal');
    suministroAEliminar = id;
    modal.classList.remove('hidden');
}

// Función para editar suministro
function editarSuministro(id) {
    const nuevaCantidad = prompt('Ingrese la nueva cantidad (incluya la unidad, ej: "10 kg"):');

    if (nuevaCantidad !== null && nuevaCantidad.trim() !== '') {
        fetch(`/suministros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: nuevaCantidad })
        })
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error al actualizar el suministro');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el suministro');
            });
    }
}