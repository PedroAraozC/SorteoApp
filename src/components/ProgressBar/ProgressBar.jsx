import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando proceso...');

  useEffect(() => {
    // Configuramos el intervalo para incrementar el progreso
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        // Calculamos el nuevo valor de progreso
        const newProgress = oldProgress + 1;
        
        // Actualizamos el mensaje de estado según el progreso
        if (newProgress === 25) {
          setStatus('Procesando datos...');
        } else if (newProgress === 50) {
          setStatus('Analizando información...');
        } else if (newProgress === 75) {
          setStatus('Preparando resultados...');
        } else if (newProgress === 100) {
          setStatus('¡Resultados listos!');
          clearInterval(interval);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Progreso del Proceso</h2>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{progress}%</span>
        <span>{status}</span>
      </div>
      
      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
          ¡El proceso ha finalizado exitosamente!
        </div>
      )}
    </div>
  );
}