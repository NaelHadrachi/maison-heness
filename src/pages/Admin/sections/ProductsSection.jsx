import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  fetchMinioFiles,
} from '../../../services/api';

export default function AdminProductsSection({ token }) {
  const [products, setProducts] = useState([]);
  const [minioFiles, setMinioFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    weightInKg: '',
    categoryId: '',
    badge: '',
    image: '',
  });

  const tokenWarning = !token;

  // Charger la liste des fichiers MinIO pour le menu déroulant
  const loadMinioFiles = useCallback(async () => {
    if (!token) return;
    setLoadingFiles(true);
    try {
      const data = await fetchMinioFiles(token);
      setMinioFiles(Array.isArray(data?.files) ? data.files : []);
    } catch (err) {
      console.error('Erreur lors du chargement des fichiers MinIO:', err);
    } finally {
      setLoadingFiles(false);
    }
  }, [token]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminProducts(token);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des produits.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProducts();
    loadMinioFiles();
  }, [loadProducts, loadMinioFiles]);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      stock: '',
      weightInKg: '',
      categoryId: '',
      badge: '',
      image: '',
    });
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || product.title || '',
      slug: product.slug || '',
      description: product.description || '',
      price: product.price ? product.price.toString() : '',
      stock: product.stock !== undefined ? product.stock.toString() : '0',
      weightInKg: product.weightInKg !== undefined && product.weightInKg !== null ? product.weightInKg.toString() : '0.5',
      categoryId: product.categoryId || '',
      badge: product.badge || '',
      image: product.image || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Avertissement : Le jeton d\'authentification est requis.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      weightInKg: parseFloat(formData.weightInKg) || 0.5,
    };

    try {
      if (editingId) {
        await updateAdminProduct(editingId, token, payload);
        setSuccessMessage(`Le produit "${formData.name}" a été mis à jour.`);
      } else {
        await createAdminProduct(token, payload);
        setSuccessMessage(`Le produit "${formData.name}" a été créé avec succès.`);
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, productName) => {
    if (!id) return;
    if (!token) {
      setError('Avertissement : Vous devez être authentifié pour supprimer un produit.');
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${productName || 'ce produit'}" ?`)) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await deleteAdminProduct(id, token);
      setSuccessMessage('Le produit a été supprimé avec succès.');
      if (editingId === id) resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression du produit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Gestion du Catalogue Produits
      </h2>

      {tokenWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <p className="text-yellow-800 font-semibold">⚠️ Avertissement de sécurité</p>
          <p className="text-yellow-700 text-sm mt-1">Jeton administrateur manquant.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
          <p className="text-red-800 font-semibold">Erreur</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded">
          <p className="text-green-800 font-semibold">✓ Succès</p>
          <p className="text-green-700 text-sm mt-1">{successMessage}</p>
        </div>
      )}

      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {editingId ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom du produit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Huile d'olive Bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ex: huile-olive-bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="14.90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poids (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.001"
                required
                value={formData.weightInKg}
                onChange={(e) => setFormData({ ...formData, weightInKg: e.target.value })}
                placeholder="Ex: 0.281, 0.520, 1.110"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID de la Catégorie <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                placeholder="ID Prisma (ex: clx...)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Badge (optionnel)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ex: Nouveau, Best-Seller"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Menu déroulant pour l'image MinIO */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image du produit (MinIO)
            </label>
            <div className="space-y-2">
              <select
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                disabled={loadingFiles}
              >
                <option value="">-- Sélectionner une image depuis MinIO --</option>
                {minioFiles.map((file) => (
                  <option key={file.name} value={file.url}>
                    {file.name.replace(/^uploads\//, '')} ({Math.round(file.size / 1024)} KB)
                  </option>
                ))}
              </select>

              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>Ou saisissez/collez directement une URL :</span>
                <button
                  type="button"
                  onClick={loadMinioFiles}
                  className="text-blue-600 hover:underline"
                >
                  🔄 Rafraîchir la liste
                </button>
              </div>

              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {formData.image && (
              <div className="mt-3 flex items-center space-x-4">
                <img
                  src={formData.image}
                  alt="Aperçu"
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-xs text-gray-500">Aperçu de l'image sélectionnée</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez votre produit..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? '⏳ Traitement...' : editingId ? '💾 Mettre à jour' : '✓ Ajouter'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
              >
                ✕ Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des produits */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">📦 Liste des Produits</h3>

        {loading && <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-800">⏳ Chargement...</div>}

        {!loading && products.length === 0 && (
          <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">Aucun produit disponible.</div>
        )}

        {!loading && products.length > 0 && (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Poids</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, idx) => (
                  <tr
                    key={prod.id || prod._id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {prod.image ? (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                          Sans img
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {prod.name || prod.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        {prod.price} €
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className={`px-3 py-1 rounded-full font-semibold ${
                        prod.stock > 0 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {prod.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">
                        {prod.weightInKg !== undefined && prod.weightInKg !== null ? `${prod.weightInKg} kg` : '0.5 kg'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center space-x-2">
                      <button
                        onClick={() => handleEditClick(prod)}
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                      >
                        ✏️ Éditer
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}