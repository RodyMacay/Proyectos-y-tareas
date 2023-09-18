import { useState, useEffect } from "react";
import { crearNuevoMazo, elegirCarta } from "./api_cartas";
import Layaout from "./components/layaout";

const Juego = () => {
  // Estados para mantener la información del juego.
  const [idBaraja, setIdBaraja] = useState("");
  const [puntuacionJugador, setPuntuacionJugador] = useState(0);
  const [puntuacionComputadora, setPuntuacionComputadora] = useState(0);
  const [puntuacionRondaActual, setPuntuacionRondaActual] = useState(0);
  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasPc, setCartasPc] = useState([]);
  const [mensaje, setmensaje] = useState("")
  const [plantarJugador, setPlantarJugador] = useState(false)
  const [botonPlantar, setbotonPlantar] = useState(false)
  const [empezarJuego, setEmpezarJuego] = useState(true)

  // useEffect para preparar el juego al cargar la aplicación.
  useEffect(() => {
    async function prepararJuego() {
      try {
        // Creamos una nueva baraja y guardamos su id
        const nuevaBaraja = await crearNuevoMazo();
        setIdBaraja(nuevaBaraja.deck_id);
      } catch (error) {
        console.error(error.message);
      }
    }

    prepararJuego();
  }, []);

  const empezar = async () => {
    setEmpezarJuego(false);
    setbotonPlantar(true);
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorCarta = obtenerValorCarta(carta.value);
      setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
      setCartasJugador((prevCartas) => [...prevCartas, carta.image]);
      setPuntuacionRondaActual((prevPuntuacionActual) => prevPuntuacionActual + valorCarta);
      console.log("Cartas del jugador:", carta);
    }
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorcarta = obtenerValorCarta(carta.value);
      setPuntuacionComputadora((prevPuntuacionPc) => prevPuntuacionPc + valorcarta);
      setCartasPc((prevCartasPc) => [...prevCartasPc, carta.image]);
      console.log("Cartas de la Pc:", carta);
    }
  };
  const determinarGanador = () => {
    if (puntuacionJugador===21){
      setmensaje("Tienes 21, has ganado!")
    }else if (puntuacionComputadora===21){
      setmensaje("Has perdido, la computadora a echo 21")
    } else if (puntuacionJugador > 21) {
      setmensaje("Su puntuación es mayor a 21, has perdido");
    } else if (puntuacionComputadora > 21) {
      setmensaje("La computadora ha perdido, tu ganas!");
    } else if (puntuacionJugador === puntuacionComputadora) {
      setmensaje("Hubo un empate");
    } else if (puntuacionJugador > puntuacionComputadora) {
      setmensaje("¡Felicitaciones! Has ganado");
    } else {
      setmensaje("Que mal, has perdido");
    }
  }

  // Función para que el jugador tome una carta.
  const tomarCarta = async () => {
    try {
      // Elegimos una carta de la baraja utilizando su ID.
      const carta = await elegirCarta(idBaraja);

      const valorCarta = obtenerValorCarta(carta.value);
      const nuevaPuntuacionRonda = puntuacionRondaActual + valorCarta

      if (nuevaPuntuacionRonda > 21) {
        setmensaje("Su puntuacion es mayor a 21, has perdido")
        setbotonPlantar(false)
        setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
        setPuntuacionRondaActual(nuevaPuntuacionRonda);
        setCartasJugador([...cartasJugador, carta.image]);
      } else {
        setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
        setPuntuacionRondaActual(nuevaPuntuacionRonda);
        setCartasJugador([...cartasJugador, carta.image]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  // Función para que la computadora tome una carta automáticamente.
  const tomarCartaComputadora = async () => {
    if (puntuacionComputadora) {
      try {
        const carta = await elegirCarta(idBaraja);
        const valorCarta = obtenerValorCarta(carta.value);
        setPuntuacionComputadora(puntuacionComputadora + valorCarta);
        setCartasPc([...cartasPc, carta.image])

      } catch (error) {
        console.error(error.message);
      }
    }
  }


  useEffect(() => {
    if (plantarJugador && puntuacionComputadora < 17) {
      const interval = setInterval(() => {
        tomarCartaComputadora();
      }, 800);

      return () => clearInterval(interval);
    } else if (plantarJugador) {
      determinarGanador(); // Llamamos a determinarGanador() cuando la computadora se planta.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantarJugador, puntuacionComputadora]);

  const plantar = async () => {
    setPuntuacionJugador(puntuacionRondaActual);
    setPuntuacionRondaActual(0);
    setPlantarJugador(true)
    setbotonPlantar(false)
    await tomarCartaComputadora(); // Permitir que la computadora complete su turno.
  };


  // Función para reiniciar el juego.
  const reiniciarJuego = async () => {
    try {
      // Creamos una nueva baraja y guardamos su ID.
      const nuevaBaraja = await crearNuevoMazo();
      setIdBaraja(nuevaBaraja.deck_id);

      setPuntuacionJugador(0);
      setPuntuacionComputadora(0);
      setPuntuacionRondaActual(0);
      setCartasJugador([]);
      setCartasPc([]);
      setmensaje("");
      setEmpezarJuego(true); 
      setPlantarJugador(false); 
      setbotonPlantar(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para obtener el valor de una carta en puntos (considerando que las figuras valen 10 y el As 11).
  const obtenerValorCarta = (valorCarta) => {
    switch (valorCarta) {
      case "KING":
      case "QUEEN":
      case "JACK":
        return 10;
      case "ACE":
        return 1;
      default:
        return parseInt(valorCarta);
    }
  };



  // Renderización de la interfaz del juego.
  return (
    <div className="backdrop-blur-sm">
      <Layaout/>
      <h1 className="text-white text-center font-archivo outline outline-offset-2 outline-blue-500 text-3xl font-extrabold uppercase"
      >Juego del 21</h1>
      <h2 className="my-8 text-orange-600 text-3xl font-extrabold uppercase">
        Tu puntuación: {puntuacionJugador}
        </h2>
      <h2 className="my-8 text-orange-600 text-3xl font-extrabold uppercase">
        Puntuación de la computadora: {puntuacionComputadora}
        </h2>

      <h3 className="text-orange-600 text-3xl font-extrabold uppercase" >
        Cartas del jugador:
        </h3>
      <div className="flex justify-center space-x-2 mb-4">
        {cartasJugador.map((carta, index) => (
          // Mostramos las cartas tomadas por el jugador.
          <img key={index} src={carta} alt="cartasJugador" className="w-24 h-auto" />
        ))}
      </div>
      <h3 className="text-orange-600 text-3xl font-extrabold uppercase">
        Cartas de la PC:
        </h3>
      <div className="flex justify-center space-x-2 mb-4">
        {cartasPc.map((carta, index) => (
          // Mostramos las cartas tomadas por la computadora
          <img key={index} src={carta} alt="cartaPc" className="w-24 h-auto" />
        ))}
      </div>
      <h3 className=" my-8 text-indigo-950 text-3xl font-extrabold uppercase ">
    {/*     Puntuación de la ronda actual: {puntuacionRondaActual} */}
        </h3>

      <div className="mb-4">
        <button
          onClick={empezar}
          disabled={!empezarJuego}
          className="text-3xl font-extrabold uppercase  pointer-events-auto mx-4 transition ease-in-out delay-110 bg hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-gradient-to-r rounded-sm  from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 outline outline-offset-2 outline-blue-500 ...">
          Empezar
        </button>
        <button
          onClick={tomarCarta}
          disabled={!botonPlantar}
          className="text-3xl font-extrabold uppercase  pointer-events-auto transition ease-in-out delay-110 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-gradient-to-r rounded-sm from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 outline outline-offset-2 outline-blue-500 ...">
          Tomar carta
        </button>
        <button
          onClick={plantar}
          disabled={!botonPlantar}
          className=" text-3xl font-extrabold uppercase pointer-events-auto mx-4 transition ease-in-out delay-110 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-gradient-to-r rounded-sm from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 outline outline-offset-2 outline-blue-500 ...">
          Plantar
        </button>
        <button
          onClick={reiniciarJuego}
          disabled={botonPlantar}
          className="text-3xl font-extrabold uppercase  pointer-events-auto transition ease-in-out delay-110 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-gradient-to-r rounded-sm from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 outline outline-offset-2 outline-blue-500 ...">
          Reiniciar juego
        </button>
      </div>
      <div className="pointer-events-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <h1 className="text-black uppercase text-2xl font-extrabold">{mensaje}</h1>
      </div>
    </div>
  );

}

export default Juego;
