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

      // Aumentar la duración efectiva para que el progreso sea más lento
      const duracionAjustada = duracion * 1.5; // Incrementar duración en un 50%
      const progresoActual = Math.min(tiempoTranscurrido / duracionAjustada, 1);

      // Actualizar el progreso de forma gradual
      setProgreso(progresoActual * 100);

      // Actualizar más frecuente al principio, más lento al final
      const debeCambiar =
        timestamp - ultimoTiempo > 50 + Math.pow(progresoActual, 2) * 450;

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
    <div className="container bg-white p-4 rounded shadow-lg">
      {/* Cabecera */}
      <div className="text-center mb-4">
        <h2 className="h4 font-weight-bold mb-3">
          {estado === "preparando" && "🎉 ¡Preparando el sorteo del año! 🎉"}
          {estado === "barajando" && "🔄 ¡Barajando a los participantes! 🔄"}
          {estado === "seleccionando" && "🏆 ¡Eligiendo a los ganadores! 🏆"}
          {estado === "completado" && "🎊 ¡El sorteo ha finalizado! 🎊"}
        </h2>

        {/* Barra de progreso */}
        {(estado === "barajando" || estado === "preparando") && (
          <div className="progress mb-3" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
              role="progressbar"
              style={{
                width: `${progreso}%`,
                transition: "width 0.3s ease-in-out",
                background: `linear-gradient(45deg, 
                  #007bff 25%, 
                  #0056b3 25%, 
                  #0056b3 50%, 
                  #007bff 50%, 
                  #007bff 75%, 
                  #0056b3 75%, 
                  #0056b3)`,
                backgroundSize: "40px 40px",
                animation: "progress-bar-move 1s linear infinite"
              }}
            ></div>
          </div>
        )}

        <style>
          {`
            @keyframes progress-bar-move {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: 40px 0;
              }
            }
          `}
        </style>

        {/* Plataforma y tipo de sorteo */}
        <p className="text-muted">
          {datosSorteo?.plataforma && (
            <>
              {datosSorteo.plataforma === "instagram" && "📷"}
              {datosSorteo.plataforma === "facebook" && "👍"}
              {datosSorteo.plataforma === "youtube" && "▶️"}
              {datosSorteo.plataforma === "tiktok" && "🎵"}
              {" ¡Sorteo exclusivo en "}
              {datosSorteo.plataforma.charAt(0).toUpperCase() +
                datosSorteo.plataforma.slice(1)}
              {"!"}
            </>
          )}
        </p>
      </div>

      {/* Área de barajado */}
      <div
        className="position-relative overflow-hidden rounded bg-light border mb-4"
        style={{
          height: "300px",
          background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Participantes que se muestran durante el barajado */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 p-3">
          {participantesVisibles.map((participante, index) => (
            <div
              key={`participante-${index}-${participante.nombre}`}
              className={`p-3 rounded shadow-sm text-center transition-all ${
                destacado === index
                  ? "bg-primary text-white scale-110"
                  : "bg-white text-dark"
              }`}
              style={{
                transform: destacado === index ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease, background-color 0.3s ease",
              }}
            >
              <p className="font-weight-bold mb-1">{participante.nombre}</p>
              {participante.comentario && (
                <p className="small text-truncate">
                  {participante.comentario.substring(0, 30)}
                  {participante.comentario.length > 30 ? "..." : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Texto de estado */}
      <div className="text-center mb-4">
        {estado === "preparando" && (
          <p className="text-muted">🔍 Analizando cuidadosamente a los participantes...</p>
        )}
        {estado === "barajando" && (
          <p className="text-muted">
            🔄 ¡Barajando a {participantesPool.current.length} participantes!
          </p>
        )}
        {estado === "seleccionando" && (
          <p className="text-muted font-weight-bold">
            🎉 ¡Ya tenemos {ganadores.length} ganador
            {ganadores.length !== 1 ? "es" : ""}! 🎉
          </p>
        )}
      </div>
    </div>
  );
}

export default ProcesoSorteo;
