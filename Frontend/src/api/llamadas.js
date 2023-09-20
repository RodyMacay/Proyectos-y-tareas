import axio from "./axios"

/* export const AuthLogin = (user) => axios.post("/api/auth/login", user) */
export const VerProyectos = () => axio.get('/proyectos/')
export const VerTareas = () => axio.get("/tareas/")
export const CrearTask = (datos) => axio.post('/creartareas/', datos)
export const Eliminartask = (idtask) => axio.delete(`/eliminartareas/${idtask}`)