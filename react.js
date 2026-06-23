const { useState } = React;

function AppPersonas() {
    const [personas, setPersonas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', edad: '', altura: '', peso: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const alt = parseFloat(formData.altura);
        const pes = parseFloat(formData.peso);
        const imcCalculado = (pes / (alt * alt)).toFixed(2);

        const nuevaPersona = {
            id: Date.now(),
            nombre: formData.nombre,
            apellido: formData.apellido,
            edad: formData.edad,
            altura: alt,
            peso: pes,
            imc: imcCalculado
        };

        setPersonas([...personas, nuevaPersona]);
        setFormData({ nombre: '', apellido: '', edad: '', altura: '', peso: '' });
    };

    const handleEliminar = (id) => {
        setPersonas(personas.filter(p => p.id !== id));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                </div>
                <div>
                    <label>Edad:</label>
                    <input type="number" name="edad" value={formData.edad} onChange={handleChange} required min="0" />
                </div>
                <div>
                    <label>Altura (en metros):</label>
                    <input type="number" name="altura" step="0.01" value={formData.altura} onChange={handleChange} required min="0" />
                </div>
                <div>
                    <label>Peso (en kg):</label>
                    <input type="number" name="peso" step="0.1" value={formData.peso} onChange={handleChange} required min="0" />
                </div>
                <button type="submit">Agregar Persona (React)</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>IMC</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nombre}</td>
                            <td>{p.apellido}</td>
                            <td>{p.edad}</td>
                            <td>{p.altura} m</td>
                            <td>{p.peso} kg</td>
                            <td><strong>{p.imc}</strong></td>
                            <td>
                                <button className="btn-delete" onClick={() => handleEliminar(p.id)}>
                                    Quitar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppPersonas />);