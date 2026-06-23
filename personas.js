const listaPersonas = [];
const form = document.getElementById("form-personas");
const tbody = document.getElementById("tabla-body");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    // IMC = peso / (altura * altura)
    const imc = (peso / (altura * altura)).toFixed(2);

    const nuevaPersona = { id: Date.now(), nombre, apellido, edad, altura, peso, imc };
    listaPersonas.push(nuevaPersona);

    form.reset();
    actualizarTabla();
});

function actualizarTabla() {
    tbody.innerHTML = ""; 

    listaPersonas.forEach(persona => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona.altura} m</td>
            <td>${persona.peso} kg</td>
            <td><strong>${persona.imc}</strong></td>
            <td><button class="btn-delete" onclick="eliminarPersona(${persona.id})">Quitar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

window.eliminarPersona = function(id) {
    const indice = listaPersonas.findIndex(p => p.id === id);
    if (indice !== -1) {
        listaPersonas.splice(indice, 1);
        actualizarTabla();
    }
};