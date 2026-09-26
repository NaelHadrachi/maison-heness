import React from 'react';

const sidebarSections = [
  { 
    key: 'overview', 
    label: 'Vue d’ensemble',
    category: 'Général',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ) 
  },
  { 
    key: 'orders', 
    label: 'Commandes',
    category: 'Boutique',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
      </svg>
    ) 
  },
  { 
    key: 'shipping', 
    label: 'Livraison',
    category: 'Boutique',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5h15c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125H2.25A1.125 1.125 0 011.125 15.75V5.625C1.125 5.004 1.629 4.5 2.25 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 7.5h1.875c.621 0 1.125.504 1.125 1.125v4.5a1.125 1.125 0 01-1.125 1.125h-1.875V7.5z" />
      </svg>
    ) 
  },
  { 
    key: 'products', 
    label: 'Produits',
    category: 'Boutique',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ) 
  },
  { 
    key: 'pages', 
    label: 'Pages',
    category: 'Contenu',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ) 
  },
  { 
    key: 'builder', 
    label: 'Éditeur de pages',
    category: 'Contenu',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ) 
  },
  { 
    key: 'media', 
    label: 'Médias',
    category: 'Contenu',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ) 
  },
  { 
    key: 'users', 
    label: 'Utilisateurs',
    category: 'Système',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ) 
  },
];

export default function AdminSidebar({ activeSection, setActiveSection }) {
  const categories = Array.from(new Set(sidebarSections.map((s) => s.category)));

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col justify-between border-r border-[#d2b48c]/30 bg-[#4b2d1c] p-4 text-[#f5e7d9] shadow-xl">
      <div className="flex flex-col overflow-y-auto">
        {/* En-tête Sidebar unifié */}
        <div className="mb-6 flex items-center gap-3 px-2 pb-4 border-b border-[#d2b48c]/20">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5c3a21] text-[#f3d9a0] shadow-sm">
            <span className="font-serif font-bold text-lg">P</span>
          </div>
          <div>
            <h2 className="font-serif text-base font-bold tracking-wide text-[#f3d9a0]">Administration</h2>
            <p className="text-[11px] text-[#d2b48c]/80">La Providence Backoffice</p>
          </div>
        </div>

        {/* Navigation groupée */}
        <nav className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#d2b48c]/70">
                {category}
              </p>
              {sidebarSections
                .filter((s) => s.category === category)
                .map((section) => {
                  const isActive = activeSection === section.key;
                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#5c3a21] text-[#f3d9a0] shadow-sm ring-1 ring-[#d2b48c]/30'
                          : 'text-[#f5e7d9]/80 hover:bg-[#5c3a21]/50 hover:text-[#f3d9a0]'
                      }`}
                    >
                      <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#f3d9a0]' : 'text-[#d2b48c]/70 group-hover:text-[#f3d9a0]'}`}>
                        {section.icon}
                      </span>
                      {section.label}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>
      </div>

      {/* Pied de Sidebar */}
      <div className="border-t border-[#d2b48c]/20 pt-4 mt-auto">
        <a
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d2b48c]/30 bg-white/5 py-2 px-3 text-xs font-semibold text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour au site
        </a>
      </div>
    </aside>
  );
}