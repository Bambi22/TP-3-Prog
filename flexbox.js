const productos = [
    { id: 1, nombre: "Laptop Pro", categoria: "Tecnología", stock: 15 },
    { id: 2, nombre: "Teclado Mecánico", categoria: "Accesorios", stock: 5 },
    { id: 3, nombre: "Monitor 4K", categoria: "Tecnología", stock: 3 },
    { id: 4, nombre: "Mouse Gamer", categoria: "Accesorios", stock: 22 },
    { id: 5, nombre: "Auriculares BT", categoria: "Audio", stock: 8 },
    { id: 6, nombre: "Micrófono Estudio", categoria: "Audio", stock: 12 }
];

let destacarAltos = false;
const container = document.getElementById("flex-container");
const button = document.getElementById("btn-toggle-filter");

function renderCards() {
    container.innerHTML = ""; 

    productos.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card";
        
        if (destacarAltos && prod.stock > 10) {
            card.classList.add("highlighted");
        }

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p><strong>Categoría:</strong> ${prod.categoria}</p>
            <p><strong>Stock:</strong> ${prod.stock} unidades</p>
        `;
        container.appendChild(card);
    });
}

button.addEventListener("click", () => {
    destacarAltos = !destacarAltos;
    button.textContent = destacarAltos ? "Mostrar todos normal" : "Destacar elementos con stock alto";
    renderCards();
});

renderCards();