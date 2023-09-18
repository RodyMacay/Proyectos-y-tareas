import CrearTarea from "./AgregarTask";
import Juego from "./Juego";
import Proyectos from "./Proyectos";
import Tareas from "./Tareas";
import { Route, Routes, BrowserRouter } from "react-router-dom";


function App() {
  
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Juego/>}/>
            <Route path="/proyectos" element={<Proyectos/>}/>
            <Route path="/tareas" element={<Tareas/>}/>
            <Route path="/creartareas" element={<CrearTarea/>}/>
          </Routes>
          </BrowserRouter>
  );
}

export default App;
