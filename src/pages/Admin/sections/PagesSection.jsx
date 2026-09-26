import { Link } from 'react-router-dom';
import { publishAdminPage, deleteAdminPage, createAdminPage } from '../../../services/api';
import { statusClasses, getPageStatus, toSlug } from '../../../utils/adminHelpers';

export default function PagesSection({ pages, token, openPageBuilder, setNotice, setError, loadDashboard }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2e1f16]">Pages</h2>
          <p className="mt-1 text-sm text-gray-500">Créez et publiez les pages de contenu du site.</p>
        </div>
        <span className="rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-semibold text-[#4a5568]">
          {`${pages.length} page${pages.length > 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-[#2e1f16]">Liste des pages</h3>
        </div>
        {pages.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-gray-500">Aucune page trouvée.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {pages.map((page) => (
              <div key={page.id} className="flex flex-col gap-3 p-5 transition-colors hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#2e1f16]">{page.title}</h4>
                  <p className="mt-0.5 text-xs text-gray-500">{`Slug: ${page.slug}`}</p>
                </div>
                <div className="flex gap-2 sm:shrink-0">
                  <button
                    onClick={async () => {
                      if (!token) return;
                      try {
                        await publishAdminPage(page.id, token);
                        setNotice('La page a été publiée.');
                        await loadDashboard();
                      } catch (err) {
                        setError(err.message || 'Erreur de publication.');
                      }
                    }}
                    className="flex-1 rounded-lg bg-[#f97316] px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-[#d65e10] sm:flex-none"
                  >
                    Publier
                  </button>
                  <button
                    onClick={() => openPageBuilder(page)}
                    className="flex-1 rounded-lg bg-[#2e1f16] px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-[#2c1f15] sm:flex-none"
                  >
                    Éditer dans le Builder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[#2e1f16]">Créer une nouvelle page simple</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!token) return;
            const form = e.target;
            const title = form.title.value.trim();
            const slug = form.slug.value.trim();
            const content = form.content.value.trim();

            try {
              await createAdminPage(token, {
                title,
                slug: slug || toSlug(title),
                content,
                published: false,
              });
              setNotice('La page a été créée.');
              form.reset();
              await loadDashboard();
            } catch (err) {
              setError(err.message || 'La création de la page a échoué.');
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre de la page</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1.5 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#2e1f16] focus:outline-none focus:ring-1 focus:ring-[#2e1f16]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#2e1f16] focus:outline-none focus:ring-1 focus:ring-[#2e1f16]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contenu</label>
            <textarea
              name="content"
              rows="3"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#2e1f16] focus:outline-none focus:ring-1 focus:ring-[#2e1f16]"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#2e1f16] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15]"
          >
            Créer la page
          </button>
        </form>
      </div>
    </div>
  );
}