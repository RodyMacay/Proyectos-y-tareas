import { useEffect, useState } from "react";
import { VerTareas } from "./api/llamadas";
import Layaout from "./components/layaout";
import { Link } from 'react-router-dom';

function Tareas() {
    const [tareas, settareas] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga

    const obtenerTareas = async () => {
        try {
            const response = await VerTareas();
            const tareasData = response.data.tareas;
            console.log(tareasData);
            settareas(tareasData);
            setLoading(false); // Actualizar el indicador de carga a falso
        } catch (error) {
            console.error('Error al obtener las tareas', error);
        }
    };

    useEffect(() => {
        obtenerTareas();
    }, []);


    return (
        <div className="container mx-auto p-4">
            <Layaout/>
            <h1 className="text-3xl font-semibold mb-4">Mis tareas</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tareas.map((tarea) => (
                        <div key={tarea.id} className="bg-white shadow-md rounded p-4">
                            <h1 className="text-xl font-semibold">{tarea.titulo}</h1>
                            <div className="mt-2">
                                {tarea.done === false ? (
                                    <span className="bg-red-500 text-white py-1 px-2 rounded-full">Tarea Pendiente ⏰</span>
                                ) : (
                                    <span className="bg-green-500 text-white py-1 px-2 rounded-full">Tarea Realizada ✅</span>
                                )}
                            </div>
                            <p className="mt-2 text-gray-700">{tarea.descripcion}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                                {tarea.done === true ? (
                                    <button className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">⏰</button>
                                ) : (
                                    <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">✅</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button className="border-solid bg-green-600 py-5 p">
                    <Link to='/creartareas'>Agregar Tareas</Link>
                </button>
            </div>
        </div>
    );
}

export default Tareas;
