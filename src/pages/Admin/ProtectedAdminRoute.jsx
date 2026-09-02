import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({
  children
}) {
  const session =
    localStorage.getItem(
      'maison_heness_admin_session'
    );

  const token =
    localStorage.getItem(
      'maison_heness_admin_token'
    );

  /*
    TEMPORAIRE :

    Quand ton collègue aura terminé le rôle ADMIN,
    on vérifiera réellement le JWT + /api/me.

    Pour l'instant :
    - session réussie
    OU
    - JWT présent
  */

  const isAuthenticated =
    session === 'true' ||
    Boolean(token);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}