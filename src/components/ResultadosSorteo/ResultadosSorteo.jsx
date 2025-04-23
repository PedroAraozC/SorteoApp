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
    <div className="container bg-white p-4 rounded shadow-lg">
      {/* Encabezado */}
      <div className="text-center mb-4 bg-primary text-white p-4 rounded">
        <h2 className="h3 font-weight-bold mb-3">¡Sorteo Realizado!</h2>
        <p className="h5">
          {getIconoPlataforma(datosSorteo.plataforma)} Sorteo en{" "}
          <span className="font-italic">
            {datosSorteo.plataforma.charAt(0).toUpperCase() +
              datosSorteo.plataforma.slice(1)}
          </span>
        </p>
      </div>

      {/* Ganadores */}
      <div className="mb-4">
        <h3 className="h4 text-success mb-3">🏆 Ganadores</h3>
        <div className="row">
          {ganadores.map((ganador) => (
            <div key={`ganador-${ganador.id}`} className="col-md-6 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">{ganador.nombre}</h5>
                  <a
                    href={ganador.perfil}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Ver perfil
                  </a>
                  {ganador.comentario && (
                    <p className="card-text mt-2">"{ganador.comentario}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suplentes */}
      {suplentes.length > 0 && (
        <div className="mb-4">
          <h3 className="h4 text-warning mb-3">🥈 Suplentes</h3>
          <div className="row">
            {suplentes.map((suplente) => (
              <div key={`suplente-${suplente.id}`} className="col-md-6 mb-3">
                <div className="card border-warning">
                  <div className="card-body">
                    <h5 className="card-title text-warning">
                      {suplente.nombre}
                    </h5>
                    <a
                      href={suplente.perfil}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Ver perfil
                    </a>
                    {suplente.comentario && (
                      <p className="card-text mt-2">"{suplente.comentario}"</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen del sorteo */}
      <div className="mb-4 bg-light p-4 rounded">
        <h3 className="h5 mb-3">📋 Resumen del sorteo</h3>
        <ul className="list-unstyled">
          <li>
            <strong>Cuentas que realizan el sorteo:</strong> {datosSorteo.cuentasSorteo}
          </li>
          <li>
            <strong>Plataforma:</strong> {datosSorteo.plataforma}
          </li>
          <li>
            <strong>Condiciones:</strong>
            <ul>
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
      <div className="d-flex justify-content-center gap-3">
        <button onClick={onReiniciar} className="btn btn-secondary">
          🔄 Realizar otro sorteo
        </button>
        <button
          onClick={() => {
            /* Implementar exportación */
          }}
          className="btn btn-primary"
        >
          📤 Exportar resultados
        </button>
      </div>
    </div>
  );
}

export default ResultadosSorteo;