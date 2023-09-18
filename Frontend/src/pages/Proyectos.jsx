import { useEffect, useState } from "react";
import Layaout from "../components/layaout";
import { Link } from 'react-router-dom';
import { VerProyectos } from "../api/llamadas";

function Proyectos() {
    const [proyectos, setproyectos] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga

    const obtenerProyectos = async () => {
        try {
            const response = await VerProyectos();
            const data = response.data.Proyectos;
            console.log(data);
            setproyectos(data);
            setLoading(false); // Actualizar el indicador de carga a falso
        } catch (error) {
            console.error('Error al obtener las tareas', error);
        }
    };

    useEffect(() => {
        obtenerProyectos();
    }, []);


    return (
        <div className="container mx-auto p-4">
            <Layaout/>
            <h1 className="text-3xl font-semibold mb-4">Mis Proyectos</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proyectos.map((proyecto) => (
                        <div key={proyecto.id} className="bg-white shadow-md rounded p-4">
                            <h1 className="text-xl font-semibold">{proyecto.nombre}</h1>
                
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <Link to='/crearproyecto'>Agregar Proyecto</Link>
                </button>
            </div>

        </div>
    );
}

export default Proyectos;
