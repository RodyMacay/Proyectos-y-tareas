
import { useForm } from 'react-hook-form';
import { CrearTask } from './api/llamadas';
import {useNavigate} from 'react-router-dom'

function CrearTarea() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const res= await CrearTask(data);
      reset(); // Limpiar el formulario después de enviarlo con éxito
      console.log(res.data.message);
      navigate('/tareas')
    } catch (error) {
      console.error('Error al crear la tarea', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Crear Tarea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
  
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-600 text-sm font-medium mb-1">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            {...register('titulo', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-600 text-sm font-medium mb-1">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            {...register('descripcion', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Crear Tarea
        </button>
  
      </form>
    </div>
  );
}

export default CrearTarea;
