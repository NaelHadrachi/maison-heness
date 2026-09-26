import BuilderStack from '../builder/BuilderStack';
import BuilderPreview from '../builder/BuilderPreview';

export default function PageBuilderSection({
  builderPage,
  setBuilderPage,
  handleBuilderPageSubmit,
  handleAddBuilderSection,
  handleRemoveBuilderSection,
  handleMoveBuilderSection,
  handleBuilderFieldChange,
  setActiveSection,
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-[#2e1f16]">Constructeur de pages</h2>
        <p className="mt-1 text-sm text-gray-500">Composez et prévisualisez vos pages section par section.</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-[#2e1f16]">Pile des sections</h3>
        <BuilderStack
          builderPage={builderPage}
          handleRemoveBuilderSection={handleRemoveBuilderSection}
          handleMoveBuilderSection={handleMoveBuilderSection}
          handleBuilderFieldChange={handleBuilderFieldChange}
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-[#2e1f16]">Aperçu en direct</h3>
        <BuilderPreview builderPage={builderPage} />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-[#2e1f16]">Sections disponibles</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {['hero', 'heading', 'text', 'richText', 'cta', 'features', 'image', 'gallery'].map((type) => (
            <button
              key={type}
              onClick={() => handleAddBuilderSection(type)}
              className="flex items-center justify-center rounded-lg border border-gray-100 bg-[#f9f9f9] p-4 text-center text-sm font-semibold text-[#2d241d] transition-colors hover:bg-[#edf2f7]"
            >
              {type === 'richText' ? 'Texte enrichi' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[#2e1f16]">Paramètres de la page</h3>
        <form onSubmit={handleBuilderPageSubmit} className="space-y-4">
          <div>
            <label htmlFor="pageTitle" className="block text-sm font-medium text-gray-700">Titre de la page</label>
            <input
              type="text"
              id="pageTitle"
              value={builderPage.title}
              onChange={(e) => setBuilderPage((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="mt-1.5 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#2e1f16] focus:outline-none focus:ring-1 focus:ring-[#2e1f16]"
            />
          </div>
          <div>
            <label htmlFor="pageSlug" className="block text-sm font-medium text-gray-700">Slug (URL)</label>
            <input
              type="text"
              id="pageSlug"
              value={builderPage.slug}
              onChange={(e) => setBuilderPage((prev) => ({ ...prev, slug: e.target.value }))}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#2e1f16] focus:outline-none focus:ring-1 focus:ring-[#2e1f16]"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setActiveSection('pages')}
              className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#2e1f16] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15]"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}