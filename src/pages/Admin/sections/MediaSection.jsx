import React, { useEffect, useState } from 'react';
import { fetchMinioFiles, uploadProductImage } from '../../../services/api';

export default function MediaSection({ 
  token, 
  setNotice = () => {}, 
  setError = () => {} 
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const safeSetError = (msg) => typeof setError === 'function' && setError(msg);
  const safeSetNotice = (msg) => typeof setNotice === 'function' && setNotice(msg);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const data = await fetchMinioFiles(token);
      setFiles(data?.files || []);
    } catch (err) {
      safeSetError(err.message || 'Impossible de charger la liste des médias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // GESTION MULTI-FICHIERS AMÉLIORÉE
  const handleFileUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);

    try {
      setUploading(true);
      safeSetError(null);

      // Upload en parallèle de tous les fichiers sélectionnés
      const results = await Promise.allSettled(
        filesArray.map((file) => uploadProductImage(token, file))
      );

      // Analyse des résultats
      const fulfilled = results.filter((r) => r.status === 'fulfilled');
      const rejected = results.filter((r) => r.status === 'rejected');

      if (fulfilled.length > 0 && rejected.length === 0) {
        safeSetNotice(
          `${fulfilled.length} image(s) téléversée(s) avec succès.`
        );
      } else if (fulfilled.length > 0 && rejected.length > 0) {
        safeSetNotice(
          `${fulfilled.length}/${filesArray.length} image(s) téléversée(s).`
        );
        safeSetError(
          `${rejected.length} fichier(s) n'ont pas pu être envoyés.`
        );
      } else if (rejected.length > 0) {
        safeSetError('Échec du téléversement de toutes les images.');
      }

      // Rechargement de la bibliothèque
      await loadFiles();
    } catch (err) {
      safeSetError(err.message || 'Erreur lors du téléversement.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-[#2e1f16]">Médias</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gérez et téléversez les images produits directement sur le bucket MinIO.
        </p>
      </div>

      {/* Zone d'upload */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#2e1f16]">Téléverser des images produits</h3>
        <label
          htmlFor="media-upload"
          className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#f9f9f9] p-6 text-center transition-colors hover:bg-[#edf2f7]"
        >
          <span className="text-sm font-semibold text-[#2e1f16]">
            {uploading ? '⏳ Téléversement en cours...' : '📁 Choisir une ou plusieurs images'}
          </span>
          <span className="mt-1 text-xs text-gray-500">Formats : JPG, PNG, WEBP, SVG</span>
        </label>
        <input
          id="media-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          multiple
        />
      </div>

      {/* Galerie de médias */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-sm font-semibold text-[#2e1f16]">
            Bibliothèque ({files.length} fichier{files.length > 1 ? 's' : ''})
          </h3>
          <button
            onClick={loadFiles}
            className="text-xs font-semibold text-[#8a6e52] hover:underline"
          >
            🔄 Rafraîchir
          </button>
        </div>

        {loading ? (
          <p className="py-6 text-center text-sm text-gray-500">Chargement des fichiers...</p>
        ) : files.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">Aucun fichier trouvé sur le bucket.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {files.map((file) => (
              <div
                key={file.name}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden rounded-md bg-white">
                  <img
                    src={file.url}
                    alt={file.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 truncate text-xs font-medium text-gray-700" title={file.name}>
                  {file.name.replace(/^uploads\//, '')}
                </p>
                <p className="text-[10px] text-gray-400">
                  {file.size ? (file.size / 1024).toFixed(1) : 0} KB
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}