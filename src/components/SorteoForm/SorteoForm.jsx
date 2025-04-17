import { useState, useEffect } from 'react';

function SorteoForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    plataforma: 'instagram',
    urlPublicacion: '',
    cuentasSorteo: '',
    requiereFollow: false,
    requiereLike: false,
    requiereComentario: false,
    comentarioMultiple: false,
    cantidadGanadores: 1,
    cantidadSuplentes: 1
  });
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (formData.urlPublicacion) {
      setPreviewError(false); // Reiniciar el estado de error al cambiar la URL
    }
  }, [formData.urlPublicacion]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold mb-4">Configuración del Sorteo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Plataforma</label>
          <select
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <div className="mb-3" >
          <label className="form-label">Link de la Publicación</label>
          <input
            type="url"
            name="urlPublicacion"
            value={formData.urlPublicacion}
            onChange={handleChange}
            placeholder="https://www.instagram.com/p/..."
            className="form-control"
            required
          />
          {formData.urlPublicacion && (
            <div className="mt-3">
              <label className="form-label">Vista previa:</label>
              {!previewError ? (
                <iframe
                  src={formData.urlPublicacion}
                  title="Vista previa de la publicación"
                  className="w-100"
                  style={{ height: '400px', border: 'none' }}
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="alert alert-warning" role="alert">
                  No se puede cargar la vista previa de la publicación. Verifica la URL o abre el enlace directamente.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Cuentas que realizan el sorteo</label>
          <textarea
            name="cuentasSorteo"
            value={formData.cuentasSorteo}
            onChange={handleChange}
            placeholder="@cuenta1, @cuenta2, @cuenta3"
            className="form-control"
            rows="2"
            required
          />
          <small className="form-text text-muted">
            Separa múltiples cuentas con comas
          </small>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <h5 className="mb-2">Condiciones</h5>
            <div className="form-check">
              <input
                type="checkbox"
                name="requiereFollow"
                checked={formData.requiereFollow}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Seguir cuenta(s)</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="requiereLike"
                checked={formData.requiereLike}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Dar "Me gusta"</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="requiereComentario"
                checked={formData.requiereComentario}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Comentar</label>
            </div>
            {formData.requiereComentario && (
              <div className="form-check ms-3">
                <input
                  type="checkbox"
                  name="comentarioMultiple"
                  checked={formData.comentarioMultiple}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">
                  Más comentarios = más posibilidades
                </label>
              </div>
            )}
          </div>

          <div className="col-md-6">
            <h5 className="mb-2">Ganadores</h5>
            <div className="mb-3">
              <label className="form-label">Ganadores principales</label>
              <input
                type="number"
                name="cantidadGanadores"
                value={formData.cantidadGanadores}
                onChange={handleChange}
                min="1"
                max="100"
                className="form-control"
              />
            </div>
            <div>
              <label className="form-label">Ganadores suplentes</label>
              <input
                type="number"
                name="cantidadSuplentes"
                value={formData.cantidadSuplentes}
                onChange={handleChange}
                min="0"
                max="100"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Realizar Sorteo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SorteoForm;