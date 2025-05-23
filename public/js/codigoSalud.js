document.addEventListener('DOMContentLoaded', () => {
    let registroIdAEliminar = null;

    // Modal de confirmación
    const modal = document.getElementById('confirmModal');
    const btnCancelar = document.getElementById('cancelModal');
    const btnConfirmar = document.getElementById('confirmModalBtn');

    // Mostrar modal al hacer clic en eliminar
    window.eliminarRegistroSalud = (id) => {
        registroIdAEliminar = id;
        modal.classList.remove('hidden');
        document.getElementById('modalTitle').textContent = 'Eliminar Registro';
        document.getElementById('modalMessage').textContent = '¿Estás seguro de eliminar este registro de salud? Esta acción no se puede deshacer.';
    };

    // Cancelar eliminación
    btnCancelar.addEventListener('click', () => {
        modal.classList.add('hidden');
        registroIdAEliminar = null;
    });

    // Confirmar eliminación
    btnConfirmar.addEventListener('click', async () => {
        if (!registroIdAEliminar) {
            modal.classList.add('hidden');
            return;
        }

        try {
            const response = await fetch(`/api/registros-salud/${registroIdAEliminar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error(data.error || 'Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar: ' + error.message);
        } finally {
            modal.classList.add('hidden');
            registroIdAEliminar = null;
        }
    });

    // Formulario para añadir registro de salud
    const formSalud = document.getElementById('formSalud');
    if (formSalud) {
        formSalud.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Obtener valores correctamente
            const formData = new FormData(formSalud);
            const animalId = formData.get('animalId');
            const tipoRevision = formData.get('tipoRevision');
            const observaciones = formData.get('observaciones');

            // Validación
            if (!tipoRevision || !observaciones) {
                alert('Por favor complete todos los campos obligatorios');
                return;
            }

            // Validación adicional para vista general
            if (!animalId && formSalud.querySelector('select[name="animalId"]')) {
                alert('Por favor seleccione un animal');
                return;
            }

            try {
                const response = await fetch('/api/registros-salud', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        animalId: animalId || formSalud.querySelector('input[name="animalId"]')?.value,
                        tipoRevision,
                        observaciones
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    formSalud.reset();
                    window.location.reload();
                } else {
                    throw new Error(data.error || 'Error al guardar el registro');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar: ' + error.message);
            }
        });
    }
});