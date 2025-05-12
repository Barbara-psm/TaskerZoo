document.addEventListener('DOMContentLoaded', function () {
    const formAñadirZona = document.getElementById('formAñadirZona');

    // Manejar el envío del formulario
    formAñadirZona.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombreZona = document.getElementById('nombreZona').value.trim();

        if (!nombreZona) {
            alert('Por favor, selecciona una zona');
            return;
        }

        try {
            const response = await fetch('/api/zonas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: nombreZona, estado: 'Abierta' })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al añadir zona');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });
});

// Función para cambiar el estado de una zona
async function cambiarEstadoZona(id, nuevoEstado) {
    if (!confirm(`¿Estás seguro de querer marcar esta zona como ${nuevoEstado.toLowerCase()}?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/zonas/${id}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: nuevoEstado })
        });

        if (!response.ok) {
            throw new Error('Error al cambiar el estado');
        }

        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cambiar el estado de la zona');
    }
}

// Función para eliminar una zona
async function eliminarZona(id) {
    if (!confirm('¿Estás seguro de querer eliminar esta zona permanentemente?')) {
        return;
    }

    try {
        const response = await fetch(`/api/zonas/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar zona');
        }

        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la zona');
    }
}