// 1. Cargamos los atletas desde la base de datos única y compartida
let personas = JSON.parse(localStorage.getItem('atletas_fitzone_compartido')) || [];

const form = document.querySelector("form");
const tbody = document.querySelector("tbody");

// 2. Función para guardar en la base de datos única
function guardarEnLocalStorage() {
    localStorage.setItem('atletas_fitzone_compartido', JSON.stringify(personas));
}

// 3. Función para dibujar la tabla en la pantalla con el cartel de "Aún no hay personas"
function renderTable() {
    if (!tbody) return; 
    tbody.innerHTML = ""; // Limpiamos la tabla antes de redibujar

    // SI LA LISTA ESTÁ VACÍA: Mostramos el mensaje amigable ocupando todas las columnas
    if (personas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="7" style="text-align: center; color: #888888; font-style: italic; padding: 25px;">
                Aún no hay personas registradas. ¡Utilizá el formulario para ingresar el primer atleta!
            </td>
        `;
        tbody.appendChild(tr);
        return; // Cortamos la función acá para que no intente recorrer nada más
    }

    // SI HAY DATOS: Los dibuja normalmente en la tabla
    personas.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.apellido}</td>
            <td>${p.edad} años</td>
            <td>${p.altura} m</td>
            <td>${p.peso} kg</td>
            <td><strong>${p.imc}</strong></td>
            <td>
                <button class="btn-delete" onclick="eliminarPersona(${p.id})">Dar de Baja</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 4. Registrar un nuevo atleta (Manejador del Formulario)
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Buscamos los inputs de forma segura (por ID o por Atributo Name)
        const inputNombre = document.getElementById("nombre") || document.querySelector('input[name="nombre"]');
        const inputApellido = document.getElementById("apellido") || document.querySelector('input[name="apellido"]');
        const inputEdad = document.getElementById("edad") || document.querySelector('input[name="edad"]');
        const inputAltura = document.getElementById("altura") || document.querySelector('input[name="altura"]');
        const inputPeso = document.getElementById("peso") || document.querySelector('input[name="peso"]');

        // Validación de seguridad por si algún campo no coincide con el HTML
        if (!inputNombre || !inputApellido || !inputEdad || !inputAltura || !inputPeso) {
            console.error("Error: No se encontró alguno de los campos en el HTML. Revisá los id o name.");
            return;
        }

        // Reemplazamos comas por puntos en altura y peso para evitar errores matemáticos (ej: 1,63 -> 1.63)
        const alturaTexto = inputAltura.value.replace(',', '.');
        const pesoTexto = inputPeso.value.replace(',', '.');

        const nombre = inputNombre.value;
        const apellido = inputApellido.value;
        const edad = inputEdad.value;
        const alt = parseFloat(alturaTexto);
        const pes = parseFloat(pesoTexto);
        
        // Validación de que sean números reales y válidos
        if (isNaN(alt) || isNaN(pes) || alt === 0) {
            alert("Por favor, ingresá valores numéricos válidos en altura y peso.");
            return;
        }

        // Cálculo exacto del Índice de Masa Corporal (IMC) con 2 decimales
        const imcCalculado = (pes / (alt * alt)).toFixed(2);

        const nuevaPersona = {
            id: Date.now(), // ID único basado en el tiempo exacto en milisegundos
            nombre,
            apellido,
            edad,
            altura: alt,
            peso: pes,
            imc: imcCalculado
        };

        // Guardamos, actualizamos la base de datos del navegador y limpiamos los campos
        personas.push(nuevaPersona);
        guardarEnLocalStorage(); 
        renderTable();           
        form.reset(); 
    });
}

// 5. Función global para dar de baja / eliminar un atleta de la lista
window.eliminarPersona = function(id) {
    personas = personas.filter(p => p.id !== id);
    guardarEnLocalStorage(); // Sincronizamos con el localStorage
    renderTable();           // Volvemos a dibujar (si queda vacía, reaparece el cartel)
};

// 6. Primera carga: Ejecutamos el dibujo de la tabla apenas se abre la página
renderTable();