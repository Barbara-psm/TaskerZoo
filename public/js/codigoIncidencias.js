document.addEventListener('DOMContentLoaded', () => {
    // Configuración de Flatpickr para la fecha
    flatpickr('#fechaIncidencia', {
        dateFormat: 'Y-m-d',
        locale: 'es',
        defaultDate: new Date()
    });

    // Modal de confirmación
    const modal = document.createElement('div');
    modal.id = 'confirmarEliminarIncidenciaModal';
    modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-lg font-bold mb-4">¿Estás seguro?</h3>
            <p class="mb-6">Esta acción no se puede deshacer.</p>
            <div class="flex justify-end gap-3">
                <button id="cancelarEliminarIncidencia" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancelar
                </button>
                <button id="confirmarEliminarIncidencia" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Confirmar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    let incidenciaIdAEliminar = null;

    // Mostrar modal al hacer clic en eliminar
    window.eliminarIncidencia = (id) => {
        incidenciaIdAEliminar = id;
        modal.classList.remove('hidden');
    };

    // Cancelar eliminación
    document.getElementById('cancelarEliminarIncidencia').addEventListener('click', () => {
        modal.classList.add('hidden');
        incidenciaIdAEliminar = null;
    });

    // Confirmar eliminación
    document.getElementById('confirmarEliminarIncidencia').addEventListener('click', async () => {
        if (!incidenciaIdAEliminar) {
            modal.classList.add('hidden');
            return;
        }

        try {
            const response = await fetch(`/api/incidencias/${incidenciaIdAEliminar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Eliminar el elemento de la vista
                const elemento = document.getElementById(`incidencia-${incidenciaIdAEliminar}`);
                if (elemento) {
                    elemento.remove();
                }
            } else {
                throw new Error(data.error || 'Error al eliminar la incidencia');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        } finally {
            modal.classList.add('hidden');
            incidenciaIdAEliminar = null;
        }
    });

    // Formulario para reportar incidencias
    const formIncidencia = document.getElementById('formReportarIncidencia');
    if (formIncidencia) {
        formIncidencia.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(formIncidencia);
            const descripcion = formData.get('descripcion');
            const zona = formData.get('zona');
            const fecha = formData.get('fecha');
            const estado = formData.get('estado') || 'pendiente'; // Valor por defecto

            // Validación básica
            if (!descripcion || !zona || !fecha) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }

            try {
                const response = await fetch('/api/incidencias', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        descripcion,
                        zona,
                        fecha,
                        estado
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Incidencia reportada correctamente.');
                    formIncidencia.reset();
                    window.location.reload(); // Recargar para mostrar la nueva incidencia
                } else {
                    throw new Error(data.error || 'Error al reportar la incidencia');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al reportar: ' + error.message);
            }
        });
    }

    // Función para resolver incidencia
    window.resolverIncidencia = async (id) => {
        try {
            const response = await fetch(`/api/incidencias/${id}/resolver`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Actualizar la vista sin recargar
                const incidenciaElement = document.getElementById(`incidencia-${id}`);
                if (incidenciaElement) {
                    // Cambiar el estilo a "resuelta"
                    const estadoSpan = incidenciaElement.querySelector('span');
                    estadoSpan.classList.remove('bg-red-100', 'text-red-800');
                    estadoSpan.classList.add('bg-green-100', 'text-green-800');
                    estadoSpan.textContent = 'Resuelta';

                    // Ocultar el botón de resolver
                    const resolverBtn = incidenciaElement.querySelector('[onclick^="resolverIncidencia"]');
                    if (resolverBtn) {
                        resolverBtn.remove();
                    }

                    // Cambiar el borde izquierdo
                    incidenciaElement.classList.remove('border-red-500');
                    incidenciaElement.classList.add('border-green-500');
                }
            } else {
                throw new Error(data.error || 'Error al resolver la incidencia');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al resolver la incidencia: ' + error.message);
        }
    };
});