import CrearTarea from "./pages/AgregarTask";
import Proyectos from "./pages/Proyectos";
import Tareas from "./pages/Tareas";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PagePrincipal from "./pages/Principal";


function App() {
  
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<PagePrincipal/>}/>
            <Route path="/proyectos" element={<Proyectos/>}/>
            <Route path="/tareas" element={<Tareas/>}/>
            <Route path="/creartareas" element={<CrearTarea/>}/>
          </Routes>
          </BrowserRouter>
  );
}

export default App;
