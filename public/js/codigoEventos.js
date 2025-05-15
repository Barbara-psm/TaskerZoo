document.addEventListener('DOMContentLoaded', function () {
    // Configuración de Flatpickr para fecha
    flatpickr("#fechaEvento", {
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        locale: "es",
        minDate: "today"
    });

    // Configuración de Flatpickr para hora
    flatpickr("#horaEvento", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 15,
        defaultHour: 12
    });

    // Manejar el envío del formulario
    const formAñadirEvento = document.getElementById('formAñadirEvento');
    if (formAñadirEvento) {
        formAñadirEvento.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(formAñadirEvento);
            const data = {
                nombre: formData.get('nombre'),
                descripcion: formData.get('descripcion'),
                fecha: formData.get('fecha'),
                hora: formData.get('hora'),
                zona: formData.get('zona')
            };

            try {
                const response = await fetch('/eventos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const nuevoEvento = await response.json();
                    agregarEventoAlDOM(nuevoEvento);
                    formAñadirEvento.reset();
                } else {
                    throw new Error('Error al crear el evento');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al crear el evento. Por favor, inténtalo de nuevo.');
            }
        });
    }
});

// Función para agregar un nuevo evento al DOM
function agregarEventoAlDOM(evento) {
    const listaEventos = document.getElementById('listaEventos');

    // Formatear la fecha para mostrarla correctamente
    const fechaFormateada = new Date(evento.fecha).toLocaleDateString('es-ES');

    const eventoHTML = `
        <div class="bg-white rounded-lg shadow overflow-hidden border-l-4 border-[#477963]" id="evento-${evento._id}">
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-lg">${evento.nombre}</h3>
                    <button onclick="eliminarEvento('${evento._id}')" class="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
                <p class="text-gray-600 mt-2">${evento.descripcion}</p>
                <div class="mt-4 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>${fechaFormateada} a las ${evento.hora}</span>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${evento.zona}</span>
                </div>
            </div>
        </div>
    `;

    // Insertar el nuevo evento al principio de la lista
    listaEventos.insertAdjacentHTML('afterbegin', eventoHTML);
}

// Función para eliminar un evento
async function eliminarEvento(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) {
        return;
    }

    try {
        const response = await fetch(`/eventos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById(`evento-${id}`).remove();
        } else {
            throw new Error('Error al eliminar el evento');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el evento. Por favor, inténtalo de nuevo.');
    }
}