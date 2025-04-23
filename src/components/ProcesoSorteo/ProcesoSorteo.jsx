import { useEffect, useState } from 'react';

export default function ProcesoSorteo({ participantes, duracion, onSorteoCompleto, datosSorteo }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando proceso...');
  const [etapa, setEtapa] = useState('iniciando');

  useEffect(() => {
    // Configuramos el total de pasos basados en la duración proporcionada
    const pasoTiempo = duracion / 100;
    
    // Configuramos el intervalo para incrementar el progreso
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        // Calculamos el nuevo valor de progreso
        const newProgress = oldProgress + 1;
        
        // Actualizamos el mensaje de estado según el progreso
        if (newProgress === 20) {
          setStatus('Recopilando participantes...');
          setEtapa('recopilando');
        } else if (newProgress === 40) {
          setStatus('Verificando requisitos...');
          setEtapa('verificando');
        } else if (newProgress === 60) {
          setStatus('Seleccionando ganadores...');
          setEtapa('seleccionando');
        } else if (newProgress === 80) {
          setStatus('Finalizando sorteo...');
          setEtapa('finalizando');
        } else if (newProgress === 100) {
          setStatus('¡Resultados listos!');
          setEtapa('completado');
          clearInterval(interval);
          
          // Cuando termine, llamamos a la función onSorteoCompleto con los resultados
          const ganadores = seleccionarGanadores(participantes, datosSorteo.cantidadGanadores);
          const suplentes = seleccionarGanadores(
            participantes.filter(p => !ganadores.includes(p)), 
            datosSorteo.cantidadSuplentes
          );
          
          setTimeout(() => {
            onSorteoCompleto({ 
              ganadores, 
              suplentes, 
              datosSorteo,
              totalParticipantes: participantes.length
            });
          }, 1000);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, pasoTiempo);
    
    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [participantes, duracion, onSorteoCompleto, datosSorteo]);
  
  // Función para seleccionar ganadores aleatoriamente
  const seleccionarGanadores = (listaParticipantes, cantidad) => {
    const ganadores = [];
    const tempParticipantes = [...listaParticipantes];
    
    for (let i = 0; i < cantidad && tempParticipantes.length > 0; i++) {
      const indiceAleatorio = Math.floor(Math.random() * tempParticipantes.length);
      ganadores.push(tempParticipantes[indiceAleatorio]);
      tempParticipantes.splice(indiceAleatorio, 1);
    }
    
    return ganadores;
  };
  
  return (
    <div className="container bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold text-center mb-4">Realizando Sorteo</h2>
      
      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="progress mb-2" style={{ height: '25px' }}>
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
            role="progressbar" 
            style={{ width: `${progress}%` }}
            aria-valuenow={progress} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>
        
        <div className="d-flex justify-content-between">
          <span>{progress}%</span>
          <span className="fw-bold">{status}</span>
        </div>
      </div>
      
      {/* Visualización de la etapa actual */}
      <div className="p-3 bg-light rounded mb-4">
        <h3 className="h5 mb-3">Estado del proceso</h3>
        
        <div className="d-flex flex-column gap-2">
          <div className={`d-flex align-items-center ${etapa === 'iniciando' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'iniciando' ? 'bg-primary' : 'bg-secondary'}`}>1</span>
            <span>Iniciando proceso</span>
          </div>
          
          <div className={`d-flex align-items-center ${etapa === 'recopilando' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'recopilando' || etapa === 'verificando' || etapa === 'seleccionando' || etapa === 'finalizando' || etapa === 'completado' ? 'bg-primary' : 'bg-secondary'}`}>2</span>
            <span>Recopilando participantes ({participantes.length})</span>
          </div>
          
          <div className={`d-flex align-items-center ${etapa === 'verificando' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'verificando' || etapa === 'seleccionando' || etapa === 'finalizando' || etapa === 'completado' ? 'bg-primary' : 'bg-secondary'}`}>3</span>
            <span>Verificando requisitos</span>
          </div>
          
          <div className={`d-flex align-items-center ${etapa === 'seleccionando' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'seleccionando' || etapa === 'finalizando' || etapa === 'completado' ? 'bg-primary' : 'bg-secondary'}`}>4</span>
            <span>Seleccionando {datosSorteo.cantidadGanadores} ganador(es) y {datosSorteo.cantidadSuplentes} suplente(s)</span>
          </div>
          
          <div className={`d-flex align-items-center ${etapa === 'finalizando' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'finalizando' || etapa === 'completado' ? 'bg-primary' : 'bg-secondary'}`}>5</span>
            <span>Finalizando sorteo</span>
          </div>
          
          <div className={`d-flex align-items-center ${etapa === 'completado' ? 'text-primary fw-bold' : ''}`}>
            <span className={`badge rounded-pill me-2 ${etapa === 'completado' ? 'bg-primary' : 'bg-secondary'}`}>6</span>
            <span>Presentando resultados</span>
          </div>
        </div>
      </div>
      
      {/* Información del sorteo */}
      <div className="p-3 bg-light rounded">
        <h3 className="h5 mb-3">Información del sorteo</h3>
        <p>
          <strong>Plataforma:</strong> {datosSorteo.plataforma.charAt(0).toUpperCase() + datosSorteo.plataforma.slice(1)}
        </p>
        <p>
          <strong>Cuenta(s):</strong> {datosSorteo.cuentasSorteo}
        </p>
        <p>
          <strong>Ganadores a seleccionar:</strong> {datosSorteo.cantidadGanadores} principal(es) y {datosSorteo.cantidadSuplentes} suplente(s)
        </p>
        <p className="mb-0">
          <strong>Total de participantes:</strong> {participantes.length}
        </p>
      </div>
    </div>
  );
}