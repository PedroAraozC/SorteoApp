function ResultadosSorteo({ resultados, onReiniciar }) {
    const { ganadores, suplentes, datosSorteo } = resultados;
    
    const getIconoPlataforma = (plataforma) => {
      switch (plataforma) {
        case 'instagram':
          return '📷';
        case 'facebook':
          return '👍';
        case 'youtube':
          return '▶️';
        case 'tiktok':
          return '🎵';
        default:
          return '🌐';
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">¡Sorteo Realizado!</h2>
          <p className="text-gray-600">
            {getIconoPlataforma(datosSorteo.plataforma)} Sorteo en {datosSorteo.plataforma.charAt(0).toUpperCase() + datosSorteo.plataforma.slice(1)}
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Ganadores 🏆</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ganadores.map(ganador => (
              <div key={`ganador-${ganador.id}`} className="border p-4 rounded-lg bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{ganador.nombre}</h4>
                    <a href={ganador.perfil} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      Ver perfil
                    </a>
                  </div>
                  <div className="bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                    #{ganador.id}
                  </div>
                </div>
                
                {ganador.comentario && (
                  <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                    "{ganador.comentario}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {suplentes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Suplentes 🥈</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suplentes.map(suplente => (
                <div key={`suplente-${suplente.id}`} className="border p-4 rounded-lg bg-orange-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">{suplente.nombre}</h4>
                      <a href={suplente.perfil} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        Ver perfil
                      </a>
                    </div>
                    <div className="bg-orange-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                      #{suplente.id}
                    </div>
                  </div>
                  
                  {suplente.comentario && (
                    <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                      "{suplente.comentario}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Resumen del sorteo</h3>
          
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Plataforma:</span> {datosSorteo.plataforma}</li>
            <li><span className="font-medium">Cuentas:</span> {datosSorteo.cuentasSorteo}</li>
            <li>
              <span className="font-medium">Condiciones:</span>
              <ul className="ml-5 list-disc">
                {datosSorteo.requiereFollow && <li>Seguir cuenta(s)</li>}
                {datosSorteo.requiereLike && <li>Dar "Me gusta"</li>}
                {datosSorteo.requiereComentario && (
                  <li>
                    Comentar {datosSorteo.comentarioMultiple && "(más comentarios = más posibilidades)"}
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onReiniciar}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Realizar otro sorteo
          </button>
          
          <button
            onClick={() => { /* Implementar exportación */ }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Exportar resultados
          </button>
        </div>
      </div>
    );
  }
  
  export default ResultadosSorteo;