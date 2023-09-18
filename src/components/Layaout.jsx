import { Link } from 'react-router-dom';

function Layaout() {
  return (
    <div className="bg-blue-500 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to='/' className="hover:underline">Juego</Link>
        </li>
        <li>
          <Link to='/proyectos' className="hover:underline">Proyectos</Link>
        </li>
        <li>
          <Link to='/tareas' className="hover:underline">Tareas</Link>
        </li>
      </ul>
    </div>
  );
}

export default Layaout;
