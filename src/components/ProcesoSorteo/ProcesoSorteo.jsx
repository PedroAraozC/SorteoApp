import { useState, useEffect, useRef } from "react";

function ProcesoSorteo({
  participantes,
  duracion = 3000,
  onSorteoCompleto,
  datosSorteo,
}) {
  const [estado, setEstado] = useState("preparando"); // preparando, barajando, seleccionando, completado
  const [participantesVisibles, setParticipantesVisibles] = useState([]);
  const [destacado, setDestacado] = useState(null);
  const [ganadores, setGanadores] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [progreso, setProgreso] = useState(0);

  const participantesPool = useRef([...participantes]);
  const timerRef = useRef(null);
  const animacionRef = useRef(null);

  // Al montar el componente, comenzamos la secuencia
  useEffect(() => {
    const iniciar = async () => {
      setEstado("preparando");
      // Esperar un momento para mostrar la pantalla "preparando"
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Iniciar barajado aleatorio
      iniciarBarajado();
    };

    iniciar();

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(animacionRef.current);
    };
  }, []);

  // Función para iniciar el barajado visual
  const iniciarBarajado = () => {
    setEstado("barajando");

    // Mostrar grupo inicial de participantes
    mostrarParticipantesAleatorios();

    // Establecer intervalo para cambiar participantes visibles rápidamente
    let startTime = null;
    let ultimoTiempo = 0;

    const animar = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const tiempoTranscurrido = timestamp - startTime;
      const progresoActual = Math.min(tiempoTranscurrido / duracion, 1);

      setProgreso(progresoActual * 100);

      // Actualizar más frecuente al principio, más lento al final
      const debeCambiar =
        timestamp - ultimoTiempo > 50 + Math.pow(progresoActual, 2) * 450; // 50ms al inicio, hasta 500ms al final

      if (debeCambiar) {
        mostrarParticipantesAleatorios();
        ultimoTiempo = timestamp;
      }

      if (progresoActual < 1) {
        animacionRef.current = requestAnimationFrame(animar);
      } else {
        // Terminó el barajado, seleccionar ganadores
        seleccionarGanadores();
      }
    };

    animacionRef.current = requestAnimationFrame(animar);
  };

  // Muestra un conjunto aleatorio de participantes
  const mostrarParticipantesAleatorios = () => {
    // Mezclar el array de participantes
    const mezclados = [...participantesPool.current].sort(
      () => Math.random() - 0.5
    );

    // Tomar entre 5 y 12 participantes (dependiendo del viewport)
    const cantidad =
      window.innerWidth < 640 ? 5 : window.innerWidth < 1024 ? 8 : 12;

    setParticipantesVisibles(mezclados.slice(0, cantidad));

    // A veces destacar uno aleatoriamente para efecto visual
    if (Math.random() > 0.5) {
      setDestacado(Math.floor(Math.random() * cantidad));
    } else {
      setDestacado(null);
    }
  };

  // Selección final de ganadores
  const seleccionarGanadores = () => {
    setEstado("seleccionando");

    // Mezclar todos los participantes
    const todosParticipantes = [...participantesPool.current].sort(
      () => Math.random() - 0.5
    );

    // Extraer ganadores según configuración
    const cantidadGanadores = datosSorteo.cantidadGanadores || 1;
    const cantidadSuplentes = datosSorteo.cantidadSuplentes || 0;

    const ganadoresSeleccionados = todosParticipantes.slice(
      0,
      cantidadGanadores
    );
    const suplentesSeleccionados = todosParticipantes.slice(
      cantidadGanadores,
      cantidadGanadores + cantidadSuplentes
    );

    // Mostrar primero los ganadores
    setParticipantesVisibles(ganadoresSeleccionados);
    setGanadores(ganadoresSeleccionados);
    setSuplentes(suplentesSeleccionados);

    // Programar la finalización
    timerRef.current = setTimeout(() => {
      setEstado("completado");
      onSorteoCompleto({
        ganadores: ganadoresSeleccionados.map((g, i) => ({
          ...g,
          id: i + 1,
        })),
        suplentes: suplentesSeleccionados.map((s, i) => ({
          ...s,
          id: i + 1,
        })),
        datosSorteo,
      });
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Cabecera */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {estado === "preparando" && "Preparando sorteo..."}
          {estado === "barajando" && "Barajando participantes"}
          {estado === "seleccionando" && "¡Seleccionando ganadores!"}
          {estado === "completado" && "¡Sorteo completado!"}
        </h2>

        {/* Barra de progreso */}
        {(estado === "barajando" || estado === "preparando") && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        )}

        {/* Plataforma y tipo de sorteo */}
        <p className="text-gray-600">
          {datosSorteo?.plataforma && (
            <>
              {datosSorteo.plataforma === "instagram" && "📷"}
              {datosSorteo.plataforma === "facebook" && "👍"}
              {datosSorteo.plataforma === "youtube" && "▶️"}
              {datosSorteo.plataforma === "tiktok" && "🎵"}
              {" Sorteo en "}
              {datosSorteo.plataforma.charAt(0).toUpperCase() +
                datosSorteo.plataforma.slice(1)}
            </>
          )}
        </p>
      </div>

      {/* Área de barajado */}
      <div className="relative h-64 sm:h-80 md:h-96 mb-8 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border">
        {/* Participantes que se muestran durante el barajado */}
        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 sm:gap-3 p-4">
          {participantesVisibles.map((participante, index) => (
            <div
              key={`participante-${index}-${participante.nombre}`}
              className={`
                transform transition-all duration-300 ease-in-out
                ${destacado === index ? "scale-110 z-10" : "scale-100"}
                ${
                  estado === "seleccionando" && ganadores.includes(participante)
                    ? "scale-110 z-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-white"
                }
                px-4 py-2 rounded-lg shadow-md
              `}
            >
              <p className="font-bold">{participante.nombre}</p>
              {participante.comentario && (
                <p className="text-xs truncate max-w-xs">
                  {participante.comentario.substring(0, 30)}
                  {participante.comentario.length > 30 ? "..." : ""}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Efecto de brillo que se mueve a través del área */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          style={{
            transform: `translateX(${-100 + progreso}%)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>
      </div>

      {/* Texto de estado */}
      <div className="text-center mb-6">
        {estado === "preparando" && (
          <p className="text-gray-600 animate-pulse">
            Analizando participantes...
          </p>
        )}

        {estado === "barajando" && (
          <p className="text-gray-600">
            Barajando {participantesPool.current.length} participantes...
          </p>
        )}

        {estado === "seleccionando" && (
          <p className="text-gray-600 font-medium animate-pulse">
            ¡Tenemos {ganadores.length} ganador
            {ganadores.length !== 1 ? "es" : ""}!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProcesoSorteo;
