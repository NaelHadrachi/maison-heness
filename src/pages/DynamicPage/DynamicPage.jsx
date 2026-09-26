import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug } from '../../services/api';
import './DynamicPage.css';

// Detect template type from slug pattern
const getTemplateType = (slug) => {
  if (!slug) return 'default';
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.includes('article') || lowerSlug.includes('blog')) return 'article';
  if (lowerSlug.includes('cgu') || lowerSlug.includes('conditions') || lowerSlug.includes('legal') || lowerSlug.includes('mentions')) return 'legal';
  if (lowerSlug.includes('boutique') || lowerSlug.includes('produit')) return 'shop';
  if (lowerSlug.includes('highlight') || lowerSlug.includes('featured') || lowerSlug.includes('special')) return 'featured';

  return 'default';
};

/*
 * Theme configurations — Maison Heness
 * Same warm amber/bois palette throughout, but each template borrows its
 * structural language from a different kind of page:
 *   - article : long-form editorial (magazine-style column, pull quote rule)
 *   - legal   : dense reference document (quiet header, numbered clauses)
 *   - shop    : minimal luxury e-commerce (full-bleed hero, no card chrome)
 *   - featured: a single showcase moment (one big statement, restrained)
 *   - default : calm, general-purpose page
 */
const themeConfig = {
  article: {
    layout: 'editorial',
    container: 'max-w-2xl mx-auto px-6 py-16 md:py-20',
    hero: 'border-b border-[#c9a86a]/40 pb-10 mb-12',
    heroKicker: 'text-sm text-[#8b5a2b] italic mb-3',
    heroHeading: 'text-4xl md:text-5xl font-serif font-semibold text-[#3a2a17] leading-[1.1] mb-4',
    heroSubheading: 'text-lg text-[#6a4e23] font-light leading-relaxed max-w-lg',
    textSection: 'font-serif text-[17px] md:text-[19px] text-[#2b2117] leading-[1.8]',
    heading: 'font-serif text-2xl md:text-[28px] font-semibold text-[#3a2a17] mt-12 mb-4',
    dividerClass: 'w-full h-px bg-[#c9a86a]/50',
  },
  legal: {
    layout: 'document',
    container: 'max-w-3xl mx-auto px-6 py-12 md:py-16',
    hero: 'border-b-2 border-[#4b2d1c] pb-6 mb-10',
    heroKicker: 'text-sm text-[#8b6b3f] mb-2',
    heroHeading: 'text-2xl md:text-3xl font-semibold text-[#2b2117] mb-2',
    heroSubheading: 'text-sm text-[#6a4e23]',
    textSection: 'text-[15px] text-[#2b2117] leading-[1.75]',
    heading: 'text-xl font-semibold text-[#3a2a17] mt-10 mb-3 pl-4 border-l-2 border-[#c9a86a]',
    dividerClass: 'w-full h-px bg-[#e0d5bd]',
  },
  shop: {
    layout: 'showcase',
    container: 'max-w-6xl mx-auto px-5 md:px-8 py-14',
    hero: 'relative overflow-hidden mb-14',
    heroKicker: 'text-sm tracking-wide text-[#e3c596] mb-3',
    heroHeading: 'text-4xl md:text-6xl font-serif font-medium text-[#fff8f0] leading-[1.05] mb-5',
    heroSubheading: 'text-base md:text-lg text-[#f0dfc0] font-light max-w-md',
    textSection: 'text-[#2b2117] leading-relaxed',
    heading: 'text-2xl md:text-3xl font-serif font-medium text-[#3a2a17] mt-14 mb-6',
    dividerClass: 'w-full h-px bg-[#c9a86a]/40',
  },
  featured: {
    layout: 'showcase',
    container: 'max-w-5xl mx-auto px-6 py-16',
    hero: 'relative overflow-hidden mb-14 rounded-sm',
    heroKicker: 'text-sm text-[#e3c596] mb-3',
    heroHeading: 'text-4xl md:text-6xl font-serif font-semibold text-[#fff8f0] leading-[1.05] mb-5',
    heroSubheading: 'text-lg md:text-xl text-[#f0dfc0] font-light max-w-xl',
    textSection: 'text-[#2b2117] leading-relaxed',
    heading: 'text-2xl md:text-3xl font-serif font-semibold text-[#3a2a17] mt-12 mb-5',
    dividerClass: 'w-full h-px bg-[#c9a86a]/40',
  },
  default: {
    layout: 'simple',
    container: 'max-w-3xl mx-auto px-6 py-14',
    hero: 'mb-12',
    heroKicker: 'text-sm text-[#8b5a2b] mb-2',
    heroHeading: 'text-3xl md:text-4xl font-serif font-semibold text-[#3a2a17] mb-3',
    heroSubheading: 'text-base text-[#6a4e23] font-light',
    textSection: 'text-[#2b2117] leading-relaxed',
    heading: 'text-2xl font-serif font-semibold text-[#3a2a17] mt-10 mb-4',
    dividerClass: 'w-full h-px bg-[#e0d5bd]',
  },
};

const createSectionRenderers = (theme, templateType) => ({
  hero: (section) => {
    // Document-style header: no image band, just quiet typography and a rule.
    if (theme.layout === 'document') {
      return (
        <header key={section.id} className={theme.hero}>
          {section.content?.subheading && (
            <p className={theme.heroKicker}>{section.content.subheading}</p>
          )}
          {section.content?.heading && (
            <h1 className={theme.heroHeading}>{section.content.heading}</h1>
          )}
        </header>
      );
    }

    // Editorial header: headline sits directly on the page, framed by a rule.
    if (theme.layout === 'editorial') {
      return (
        <header key={section.id} className={theme.hero}>
          {section.content?.subheading && (
            <p className={theme.heroKicker}>{section.content.subheading}</p>
          )}
          {section.content?.heading && (
            <h1 className={theme.heroHeading}>{section.content.heading}</h1>
          )}
        </header>
      );
    }

    // Showcase header: full-bleed dark band — used by shop & featured.
    if (theme.layout === 'showcase') {
      return (
        <section
          key={section.id}
          className={`${theme.hero} bg-[#3a2a17]`}
        >
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                templateType === 'shop'
                  ? 'linear-gradient(120deg, #4b2d1c 0%, #6a4e23 55%, #4b2d1c 100%)'
                  : 'linear-gradient(135deg, #4b2d1c 0%, #8b5a2b 60%, #c9a86a 100%)',
            }}
          />
          <div className="relative min-h-[380px] md:min-h-[440px] flex items-center px-8 md:px-14">
            <div className="max-w-xl">
              {section.content?.subheading && (
                <p className={theme.heroKicker}>{section.content.subheading}</p>
              )}
              {section.content?.heading && (
                <h1 className={theme.heroHeading}>{section.content.heading}</h1>
              )}
            </div>
          </div>
        </section>
      );
    }

    // Simple default header.
    return (
      <header key={section.id} className={theme.hero}>
        {section.content?.subheading && (
          <p className={theme.heroKicker}>{section.content.subheading}</p>
        )}
        {section.content?.heading && <h1 className={theme.heroHeading}>{section.content.heading}</h1>}
      </header>
    );
  },

  heading: (section) => (
    <section key={section.id}>
      {section.content?.text && <h2 className={theme.heading}>{section.content.text}</h2>}
    </section>
  ),

  text: (section) => (
    <section key={section.id} className="py-4">
      {section.content?.text && (
        <p className={`${theme.textSection} whitespace-pre-wrap`}>{section.content.text}</p>
      )}
    </section>
  ),

  richText: (section) => (
    <section
      key={section.id}
      className={`${theme.textSection} py-4 prose-headings:font-serif prose-headings:text-[#3a2a17] prose-strong:text-[#3a2a17] prose-strong:font-semibold prose-a:text-[#6a4e23] prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#3a2a17] prose-ul:text-[#2b2117] prose-ol:text-[#2b2117] prose-blockquote:border-l-2 prose-blockquote:border-[#c9a86a] prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-[#6a4e23]`}
      dangerouslySetInnerHTML={{ __html: section.content?.html || '' }}
    />
  ),

  image: (section) => (
    <section key={section.id} className="my-10">
      {section.content?.url && (
        <figure>
          <img
            src={section.content.url}
            alt={section.content?.alt || 'Image'}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          {section.content?.caption && (
            <figcaption className="text-sm text-[#8b5a2b] italic pt-3 mt-3 border-t border-[#e0d5bd]">
              {section.content.caption}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  ),

  // Shop-style grid: flat, bordered, no card shadows — closer to an
  // Aesop/COS product grid than a generic SaaS card kit.
  gallery: (section) => (
    <section key={section.id} className="my-12">
      {section.content?.title && <h2 className={theme.heading}>{section.content.title}</h2>}
      {section.content?.images && section.content.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#e0d5bd]">
          {section.content.images.map((image, index) => (
            <div key={index} className="aspect-square bg-[#f6f0e6] overflow-hidden group">
              <img
                src={image.url}
                alt={image.alt || `Image ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  ),

  video: (section) => (
    <section key={section.id} className="my-10">
      {section.content?.title && <h2 className={theme.heading}>{section.content.title}</h2>}
      {section.content?.url && (
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={section.content.url}
            title={section.content?.title || 'Vidéo'}
            className="absolute top-0 left-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </section>
  ),

  divider: (section) => (
    <section key={section.id} className="my-10">
      <div className={theme.dividerClass} />
    </section>
  ),

  // Understated call-to-action: one accent line, no scale-on-hover, no
  // gradient card — the offer speaks for itself.
  cta: (section) => (
    <section
      key={section.id}
      className="my-12 py-10 px-8 md:px-12 border-t-2 border-b-2 border-[#c9a86a] text-center"
    >
      {section.content?.heading && (
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#3a2a17] mb-3">
          {section.content.heading}
        </h2>
      )}
      {section.content?.description && (
        <p className="text-[#6a4e23] max-w-md mx-auto mb-6">{section.content.description}</p>
      )}
      {section.content?.buttonText && section.content?.buttonUrl && (
        <a
          href={section.content.buttonUrl}
          className="inline-block px-8 py-3 bg-[#3a2a17] text-[#fff8f0] font-medium tracking-wide hover:bg-[#6a4e23] transition-colors duration-300"
        >
          {section.content.buttonText}
        </a>
      )}
    </section>
  ),

  // Legal pages read as numbered clauses; other templates read as a
  // plain feature list with a left rule instead of a boxed card.
  features: (section) => {
    if (templateType === 'legal') {
      return (
        <section key={section.id} className="my-8">
          {section.content?.title && <h2 className={theme.heading}>{section.content.title}</h2>}
          {section.content?.items && section.content.items.length > 0 && (
            <ol className="space-y-5">
              {section.content.items.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-sm text-[#8b6b3f] font-medium pt-0.5 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    {item.title && (
                      <h3 className="text-base font-semibold text-[#3a2a17] mb-1">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-[15px] text-[#2b2117] leading-[1.75]">{item.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      );
    }

    return (
      <section key={section.id} className="my-12">
        {section.content?.title && <h2 className={theme.heading}>{section.content.title}</h2>}
        {section.content?.items && section.content.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.content.items.map((item, index) => (
              <div key={index} className="border-l-2 border-[#c9a86a] pl-5">
                {item.title && (
                  <h3 className="text-base font-semibold text-[#3a2a17] mb-2">{item.title}</h3>
                )}
                {item.description && (
                  <p className="text-[#4a3a24] leading-relaxed text-[15px]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  },
});

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPageBySlug(slug);
        setPage(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement de la page');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug]);

  const templateType = getTemplateType(slug);
  const theme = themeConfig[templateType];
  const sectionRenderers = createSectionRenderers(theme, templateType);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f0e6] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-10 h-10 border-2 border-[#e0d5bd] border-t-[#6a4e23] rounded-full animate-spin" />
          <p className="text-[#6a4e23]">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6f0e6] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2 className="text-xl font-serif font-semibold text-[#8b1a1a] mb-2">Une erreur est survenue</h2>
          <p className="text-[#6a4e23]">{error}</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-[#f6f0e6] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2 className="text-xl font-serif font-semibold text-[#3a2a17] mb-2">Page non trouvée</h2>
          <p className="text-[#6a4e23]">La page demandée n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f0e6]">
      <div className={theme.container}>
        {page.sections && page.sections.length > 0 ? (
          page.sections.map((section) => {
            const renderer = sectionRenderers[section.type];
            return renderer ? renderer(section) : null;
          })
        ) : (
          <div className="text-center py-16">
            <p className="text-[#6a4e23]">Aucun contenu disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}