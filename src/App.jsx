import { useState } from 'react';
import './App.css';
import SorteoForm from './components/SorteoForm/SorteoForm';
import ResultadosSorteo from './components/ResultadosSorteo/ResultadosSorteo';

function App() {
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);

  const realizarSorteo = (datosSorteo) => {
    setLoading(true);
    
    // Simulamos una carga para representar el proceso de obtención de datos
    setTimeout(() => {
      // Esta sería la lógica que se conectaría con el backend para obtener resultados reales
      // Aquí solo simulamos unos resultados para demostración
      const ganadoresSimulados = Array(datosSorteo.cantidadGanadores).fill().map((_, index) => ({
        id: index + 1,
        nombre: `Usuario_${Math.floor(Math.random() * 1000)}`,
        perfil: `https://${datosSorteo.plataforma}.com/usuario_${Math.floor(Math.random() * 1000)}`,
        comentario: datosSorteo.requiereComentario ? `¡Quiero participar! #${Math.floor(Math.random() * 100)}` : null
      }));
      
      const suplentesSimulados = Array(datosSorteo.cantidadSuplentes).fill().map((_, index) => ({
        id: index + 1,
        nombre: `Usuario_Suplente_${Math.floor(Math.random() * 1000)}`,
        perfil: `https://${datosSorteo.plataforma}.com/usuario_${Math.floor(Math.random() * 1000)}`,
        comentario: datosSorteo.requiereComentario ? `¡Me encantaría ganar! #${Math.floor(Math.random() * 100)}` : null
      }));
      
      setResultados({
        ganadores: ganadoresSimulados,
        suplentes: suplentesSimulados,
        datosSorteo
      });
      
      setLoading(false);
    }, 2000);
  };

  const reiniciarSorteo = () => {
    setResultados(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Aplicación de Sorteos</h1>
        <p className="text-gray-600">Realiza sorteos para tus redes sociales de forma rápida y transparente</p>
      </header>

      {!resultados ? (
        <SorteoForm onSubmit={realizarSorteo} isLoading={loading} />
      ) : (
        <ResultadosSorteo resultados={resultados} onReiniciar={reiniciarSorteo} />
      )}
    </div>
  );
}

export default App;