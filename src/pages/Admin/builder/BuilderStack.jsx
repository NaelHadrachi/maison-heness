import { useState } from 'react';

const SECTION_TYPE_LABELS = {
  hero: 'Hero',
  heading: 'Titre',
  text: 'Texte',
  richText: 'Texte enrichi',
  divider: 'Séparateur',
  cta: 'CTA',
  features: 'Fonctionnalités',
  image: 'Image',
  gallery: 'Galerie',
};

const getBuilderContentValue = (section, field, fallback = '') => {
  return section?.content?.[field] ?? fallback;
};

export default function BuilderStack({
  builderPage,
  handleRemoveBuilderSection,
  handleMoveBuilderSection,
  handleBuilderFieldChange,
}) {
  const [draggedSectionId, setDraggedSectionId] = useState(null);

  if (!builderPage.sections || builderPage.sections.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#d8c7a7] bg-[#faf5ee] p-5 text-sm text-[#5f4d3c]">
        Aucune section dans la page.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {builderPage.sections.map((section, idx) => (
        <div
          key={section.id}
          draggable
          onDragStart={() => setDraggedSectionId(section.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggedSectionId && draggedSectionId !== section.id) {
              handleMoveBuilderSection(draggedSectionId, section.id);
            }
            setDraggedSectionId(null);
          }}
          className="rounded-[20px] border border-[#eadcc2] bg-[#fffdf8] p-3 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6e52]">
                {SECTION_TYPE_LABELS[section.type] || section.type}
              </p>
              <p className="text-sm font-semibold text-[#2d241d]">Section #{idx + 1}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveBuilderSection(section.id)}
              className="rounded-full border border-[#d7c3a3] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a5b42] hover:bg-[#f7f0e4]"
            >
              Supprimer
            </button>
          </div>

          {section.type === 'hero' && (
            <div className="space-y-2">
              <input
                value={getBuilderContentValue(section, 'heading', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'heading', e.target.value)}
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="Titre principal"
              />
              <textarea
                value={getBuilderContentValue(section, 'subheading', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'subheading', e.target.value)}
                rows="2"
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="Sous-titre"
              />
            </div>
          )}

          {section.type === 'heading' && (
            <input
              value={getBuilderContentValue(section, 'text', '')}
              onChange={(e) => handleBuilderFieldChange(section.id, 'text', e.target.value)}
              className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
              placeholder="Titre de section"
            />
          )}

          {section.type === 'text' && (
            <textarea
              value={getBuilderContentValue(section, 'text', '')}
              onChange={(e) => handleBuilderFieldChange(section.id, 'text', e.target.value)}
              rows="4"
              className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
              placeholder="Contenu"
            />
          )}

          {section.type === 'richText' && (
            <textarea
              value={getBuilderContentValue(section, 'html', '<p>Votre contenu HTML.</p>')}
              onChange={(e) => handleBuilderFieldChange(section.id, 'html', e.target.value)}
              rows="5"
              className="w-full rounded-md border border-[#e4d3b5] font-mono px-3 py-2 text-sm"
              placeholder="Code HTML"
            />
          )}

          {section.type === 'divider' && <div className="h-px w-full bg-[#c9a86a]" />}

          {section.type === 'cta' && (
            <div className="space-y-2">
              <input
                value={getBuilderContentValue(section, 'heading', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'heading', e.target.value)}
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="Titre du CTA"
              />
              <textarea
                value={getBuilderContentValue(section, 'description', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'description', e.target.value)}
                rows="2"
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="Description"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  value={getBuilderContentValue(section, 'buttonText', '')}
                  onChange={(e) => handleBuilderFieldChange(section.id, 'buttonText', e.target.value)}
                  className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                  placeholder="Texte du bouton"
                />
                <input
                  value={getBuilderContentValue(section, 'buttonUrl', '')}
                  onChange={(e) => handleBuilderFieldChange(section.id, 'buttonUrl', e.target.value)}
                  className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                  placeholder="URL"
                />
              </div>
            </div>
          )}

          {section.type === 'image' && (
            <div className="space-y-2">
              <input
                value={getBuilderContentValue(section, 'url', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'url', e.target.value)}
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="URL de l'image"
              />
              <input
                value={getBuilderContentValue(section, 'alt', '')}
                onChange={(e) => handleBuilderFieldChange(section.id, 'alt', e.target.value)}
                className="w-full rounded-md border border-[#e4d3b5] px-3 py-2 text-sm"
                placeholder="Texte alternatif"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}