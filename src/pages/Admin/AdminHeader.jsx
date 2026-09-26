import { Link } from 'react-router-dom';

export default function AdminHeader({ onLogout, user }) {
  return (
    <header className="sticky top-0 z-30 flex-shrink-0 border-b border-[#d2b48c]/30 bg-[#4b2d1c] px-6 py-3 text-[#f5e7d9] shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        
        {/* Titre Backoffice & Badge */}
        <div className="flex items-center gap-3">
          <Link 
            to="/admin" 
            className="font-serif text-xl font-bold tracking-wide text-[#e3c596] transition hover:text-[#f7e5c5]"
          >
            La Providence <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#d2b48c] opacity-80">Pro</span>
          </Link>

          <span className="hidden h-4 w-px bg-[#d2b48c]/30 sm:block" aria-hidden="true" />

          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Espace Administrateur
          </div>
        </div>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-lg border border-[#d2b48c]/30 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:bg-white/10 hover:text-[#f3d9a0] md:flex"
            title="Voir la boutique en ligne"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Voir la boutique
          </Link>

          <Link
            to="/profil"
            className="flex items-center gap-2 rounded-full border border-[#d2b48c]/30 bg-white/5 py-1 px-3 text-xs font-medium text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c3a21] text-[10px] font-bold text-[#f3d9a0]">
              {user?.firstName ? user.firstName[0].toUpperCase() : 'A'}
            </div>
            <span className="hidden sm:inline">
              {user?.firstName || user?.email || 'Mon Profil'}
            </span>
          </Link>

          <button
            onClick={onLogout}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:border-red-400 hover:bg-red-900/50 hover:text-white"
            title="Se déconnecter"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
            </svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}