const productos = [
    { id: 1, nombre: "Proteína Whey Isolada", categoria: "Suplementos", stock: 15 },
    { id: 2, nombre: "Creatina Monohidratada", categoria: "Suplementos", stock: 5 },
    { id: 3, nombre: "Cinto Powerlifting de Cuero", categoria: "Equipamiento", stock: 3 },
    { id: 4, nombre: "Straps de Agarre Pro", categoria: "Accesorios", stock: 22 },
    { id: 5, nombre: "Goma de Alta Resistencia", categoria: "Accesorios", stock: 8 },
    { id: 6, nombre: "Pre-Entreno Explosivo", categoria: "Suplementos", stock: 12 }
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
    button.textContent = destacarAltos ? "Mostrar stock estándar" : "Destacar stock alto (Suplementos Premium)";
    renderCards();
});

renderCards();