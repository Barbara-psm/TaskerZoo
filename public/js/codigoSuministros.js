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

                // Éxito
                alert('Suministro añadido correctamente');
                form.reset();
                window.location.reload();

            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar el suministro');
            }
        });
    }
});