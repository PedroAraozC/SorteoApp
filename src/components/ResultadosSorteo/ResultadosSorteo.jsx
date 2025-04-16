function ResultadosSorteo({ resultados, onReiniciar }) {
  const { ganadores, suplentes, datosSorteo } = resultados;

  const getIconoPlataforma = (plataforma) => {
    switch (plataforma) {
      case "instagram":
        return "📷";
      case "facebook":
        return "👍";
      case "youtube":
        return "▶️";
      case "tiktok":
        return "🎵";
      default:
        return "🌐";
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-5xl font-extrabold mb-4">¡Sorteo Realizado!</h2>
        <p className="text-xl">
          {getIconoPlataforma(datosSorteo.plataforma)} Sorteo en{" "}
          <span className="font-semibold underline decoration-wavy decoration-yellow-400">
            {datosSorteo.plataforma.charAt(0).toUpperCase() +
              datosSorteo.plataforma.slice(1)}
          </span>
        </p>
      </div>

      {/* Ganadores */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-green-600 mb-6 flex items-center">
          🏆 Ganadores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ganadores.map((ganador) => (
            <div
              key={`ganador-${ganador.id}`}
              className="border border-green-300 p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-2xl text-green-800">
                    {ganador.nombre}
                  </h4>
                  <a
                    href={ganador.perfil}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Ver perfil
                  </a>
                </div>
                <div className="bg-green-600 text-white text-sm font-bold py-1 px-4 rounded-full shadow-md">
                  #{ganador.id}
                </div>
              </div>
              {ganador.comentario && (
                <div className="mt-4 text-sm text-gray-700 bg-white p-4 rounded-lg shadow-inner">
                  "{ganador.comentario}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Suplentes */}
      {suplentes.length > 0 && (
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-orange-600 mb-6 flex items-center">
            🥈 Suplentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {suplentes.map((suplente) => (
              <div
                key={`suplente-${suplente.id}`}
                className="border border-orange-300 p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-2xl text-orange-800">
                      {suplente.nombre}
                    </h4>
                    <a
                      href={suplente.perfil}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Ver perfil
                    </a>
                  </div>
                  <div className="bg-orange-600 text-white text-sm font-bold py-1 px-4 rounded-full shadow-md">
                    #{suplente.id}
                  </div>
                </div>
                {suplente.comentario && (
                  <div className="mt-4 text-sm text-gray-700 bg-white p-4 rounded-lg shadow-inner">
                    "{suplente.comentario}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen del sorteo */}
      <div className="mb-12 bg-gray-50 p-8 rounded-2xl shadow-md">
        <h3 className="font-semibold text-2xl mb-6 text-gray-800">
          📋 Resumen del sorteo
        </h3>
        <ul className="space-y-4 text-lg">
          <li>
            <span className="font-medium text-gray-700">Plataforma:</span>{" "}
            {datosSorteo.plataforma}
          </li>
          <li>
            <span className="font-medium text-gray-700">Cuentas:</span>{" "}
            {datosSorteo.cuentasSorteo}
          </li>
          <li>
            <span className="font-medium text-gray-700">Condiciones:</span>
            <ul className="ml-6 list-disc text-gray-600">
              {datosSorteo.requiereFollow && <li>Seguir cuenta(s)</li>}
              {datosSorteo.requiereLike && <li>Dar "Me gusta"</li>}
              {datosSorteo.requiereComentario && (
                <li>
                  Comentar{" "}
                  {datosSorteo.comentarioMultiple &&
                    "(más comentarios = más posibilidades)"}
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-6">
        <button
          onClick={onReiniciar}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          🔄 Realizar otro sorteo
        </button>
        <button
          onClick={() => {
            /* Implementar exportación */
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          📤 Exportar resultados
        </button>
      </div>
    </div>
  );
}

export default ResultadosSorteo;