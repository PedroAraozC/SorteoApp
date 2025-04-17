import { useState } from "react";
import SorteoForm from "./components/SorteoForm/SorteoForm";
import ProcesoSorteo from "./components/ProcesoSorteo/ProcesoSorteo";
import ResultadosSorteo from "./components/ResultadosSorteo/ResultadosSorteo";
import "./App.css"; // Cambia a un archivo CSS personalizado

function App() {
  const [etapa, setEtapa] = useState("configuracion"); // configuracion, procesando, resultados
  const [isLoading, setIsLoading] = useState(false);
  const [datosSorteo, setDatosSorteo] = useState(null);
  const [resultados, setResultados] = useState(null);

  // Simula la obtención de participantes de la API
  const obtenerParticipantes = async (formData) => {
    // En un caso real, aquí harías una llamada a tu API
    setIsLoading(true);

    try {
      // Simulamos una demora de red
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Genera participantes de prueba aleatorios
      const cantidad = Math.floor(Math.random() * 300) + 50; // Entre 50 y 350 participantes
      const participantes = [];

      for (let i = 0; i < cantidad; i++) {
        participantes.push({
          id: i,
          nombre: `@usuario${Math.floor(Math.random() * 10000)}`,
          perfil: `https://www.instagram.com/usuario${Math.floor(
            Math.random() * 10000
          )}`,
          comentario:
            Math.random() > 0.3
              ? `¡Quiero participar! #sorteo ${
                  Math.random() > 0.5 ? "🎉" : "🤞"
                }`
              : "",
        });
      }

      return participantes;
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja el envío del formulario de configuración
  const handleFormSubmit = async (formData) => {
    setDatosSorteo(formData);

    try {
      // Obtenemos los participantes
      const participantes = await obtenerParticipantes(formData);

      // Cambiamos a la etapa de procesamiento
      setEtapa("procesando");

      // En un caso real, aquí enviarías los datos a tu API
      console.log(
        "Iniciando sorteo con:",
        formData,
        "Participantes:",
        participantes.length
      );

      // Pasamos los participantes al componente de procesamiento
      return participantes;
    } catch (error) {
      console.error("Error al obtener participantes:", error);
      alert("Ocurrió un error al obtener los participantes");
    }
  };

  // Maneja la finalización del sorteo
  const handleSorteoCompleto = (resultadosSorteo) => {
    setResultados(resultadosSorteo);
    setEtapa("resultados");
  };

  // Reinicia el proceso
  const handleReiniciar = () => {
    setEtapa("configuracion");
    setDatosSorteo(null);
    setResultados(null);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Cabecera */}
        <header className="header">
          <h1 className="title">Sorteos</h1>
          <p className="subtitle">Realiza sorteos transparentes y profesionales</p>
        </header>

        <div className="main-content">
          {etapa === "configuracion" && (
            <div className="form-container">
              <SorteoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          )}

          {etapa === "procesando" && datosSorteo && (
            <div className="processing-container">
              <ProcesoSorteo
                participantes={[
                  { id: 1, nombre: '@user123', perfil: 'https://instagram.com/user123', comentario: '¡Quiero participar! #sorteo 🎉' },
                  { id: 2, nombre: '@maria_89', perfil: 'https://instagram.com/maria_89', comentario: '¡Me encantaría ganar! #sorteo 🤞' },
                  { id: 3, nombre: '@juan2023', perfil: 'https://instagram.com/juan2023', comentario: 'Participando #sorteo ✨' },
                  { id: 4, nombre: '@gaming_pro', perfil: 'https://instagram.com/gaming_pro', comentario: '¡Aquí estoy! #sorteo 🎮' },
                  { id: 5, nombre: '@laura.smith', perfil: 'https://instagram.com/laura.smith', comentario: '¡Suerte a todos! #sorteo 🍀' }
                ]}
                duracion={5000}
                onSorteoCompleto={handleSorteoCompleto}
                datosSorteo={datosSorteo}
              />
            </div>
          )}

          {etapa === "resultados" && resultados && (
            <div className="results-container">
              <ResultadosSorteo
                resultados={resultados}
                onReiniciar={handleReiniciar}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} Sorteos - Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
