import { useState } from 'react';

function SorteoForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    plataforma: 'instagram',
    urlPublicacion: '',
    cuentasSorteo: '',
    requiereFollow: true,
    requiereLike: true,
    requiereComentario: true,
    comentarioMultiple: false,
    cantidadGanadores: 1,
    cantidadSuplentes: 1
  });

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración del Sorteo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Plataforma</label>
          <select
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">URL de la Publicación</label>
          <input
            type="url"
            name="urlPublicacion"
            value={formData.urlPublicacion}
            onChange={handleChange}
            placeholder="https://www.instagram.com/p/..."
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Cuentas del Sorteo</label>
          <textarea
            name="cuentasSorteo"
            value={formData.cuentasSorteo}
            onChange={handleChange}
            placeholder="@cuenta1, @cuenta2, @cuenta3"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Separa múltiples cuentas con comas</p>
        </div>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Condiciones</h3>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="requiereFollow"
                  checked={formData.requiereFollow}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Seguir cuenta(s)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="requiereLike"
                  checked={formData.requiereLike}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Dar "Me gusta"</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="requiereComentario"
                  checked={formData.requiereComentario}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Comentar</span>
              </label>
              
              {formData.requiereComentario && (
                <label className="flex items-center ml-6">
                  <input
                    type="checkbox"
                    name="comentarioMultiple"
                    checked={formData.comentarioMultiple}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Más comentarios = más posibilidades</span>
                </label>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Ganadores</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Ganadores principales</label>
                <input
                  type="number"
                  name="cantidadGanadores"
                  value={formData.cantidadGanadores}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm mb-1">Ganadores suplentes</label>
                <input
                  type="number"
                  name="cantidadSuplentes"
                  value={formData.cantidadSuplentes}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Realizar Sorteo'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SorteoForm;