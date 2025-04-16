import { useState } from "react";
import SorteoForm from "./components/SorteoForm/SorteoForm";
import ProcesoSorteo from "./components/ProcesoSorteo/ProcesoSorteo";
import ResultadosSorteo from "./components/ResultadosSorteo/ResultadosSorteo";
import "./index.css";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabecera */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">
            Sorteous
          </h1>
          <p className="text-gray-600">
            Realiza sorteos transparentes y profesionales
          </p>
        </header>

        {/* Contenedor principal con efecto de transición */}
        <div className="transition-all duration-500 ease-in-out">
          {etapa === "configuracion" && (
            <div className="transform transition-all duration-500 ease-in-out">
              <SorteoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          )}

          {etapa === "procesando" && datosSorteo && (
            <div className="transform transition-all duration-500 ease-in-out">
              <ProcesoSorteo
                participantes={[]} // Se llena desde handleFormSubmit
                duracion={5000}
                onSorteoCompleto={handleSorteoCompleto}
                datosSorteo={datosSorteo}
              />
            </div>
          )}

          {etapa === "resultados" && resultados && (
            <div className="transform transition-all duration-500 ease-in-out">
              <ResultadosSorteo
                resultados={resultados}
                onReiniciar={handleReiniciar}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sorteous - Todos los derechos
            reservados
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
