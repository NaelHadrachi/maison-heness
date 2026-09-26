export default function BuilderPreview({ builderPage }) {
  const previewSections = builderPage?.sections ?? [];
  const blockClasses = 'rounded-[24px] border border-[#eadcc2] bg-[#fffdf8] p-4';

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] bg-[#3a2a17] px-5 py-6 text-[#fff8f0] shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e3c596]">Aperçu</p>
        <h3 className="mt-3 font-serif text-3xl font-semibold">{builderPage.title || 'Titre de la page'}</h3>
        {builderPage.seoDescription && <p className="mt-2 text-sm text-[#f0dfc0]">{builderPage.seoDescription}</p>}
      </div>

      {previewSections.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[#eadcc2] p-6 text-sm text-[#5c4a3c]">
          Aucune section ajoutée.
        </div>
      ) : (
        previewSections.map((section) => {
          switch (section.type) {
            case 'hero':
              return (
                <div key={section.id} className={`${blockClasses} bg-[#f9f4ee]`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6e52]">Hero</p>
                  <h4 className="mt-3 font-serif text-3xl text-[#2d241d]">{section.content?.heading || 'Titre principal'}</h4>
                  {section.content?.subheading && <p className="mt-2 text-[#5c4a3c]">{section.content.subheading}</p>}
                </div>
              );
            case 'heading':
              return (
                <div key={section.id} className={blockClasses}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6e52]">Heading</p>
                  <h4 className="mt-3 font-serif text-2xl text-[#2d241d]">{section.content?.text || 'Sous-titre'}</h4>
                </div>
              );
            case 'text':
              return (
                <div key={section.id} className={blockClasses}>
                  <p className="text-sm leading-relaxed text-[#2b2117] whitespace-pre-wrap">{section.content?.text || 'Votre texte ici...'}</p>
                </div>
              );
            case 'richText':
              return (
                <div key={section.id} className={blockClasses}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6e52]">Rich text</p>
                  <div className="mt-3 text-sm leading-relaxed text-[#2b2117]" dangerouslySetInnerHTML={{ __html: section.content?.html || '<p>Votre contenu HTML.</p>' }} />
                </div>
              );
            case 'divider':
              return <div key={section.id} className="my-2 h-px bg-[#c9a86a]" />;
            case 'cta':
              return (
                <div key={section.id} className={`${blockClasses} bg-[#f7efe3]`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6e52]">CTA</p>
                  <h4 className="mt-3 font-serif text-2xl text-[#2d241d]">{section.content?.heading || 'Une question ?'}</h4>
                  <p className="mt-2 text-sm text-[#5c4a3c]">{section.content?.description || 'Description...'}</p>
                </div>
              );
            case 'image':
              return (
                <div key={section.id} className={blockClasses}>
                  <img src={section.content?.url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'} alt={section.content?.alt || 'Image'} className="h-64 w-full rounded-xl object-cover" />
                </div>
              );
            default:
              return null;
          }
        })
      )}
    </div>
  );
}