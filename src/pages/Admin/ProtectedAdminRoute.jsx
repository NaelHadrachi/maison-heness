import { Navigate } from 'react-router-dom';
import { ADMIN_TOKEN_KEY, ADMIN_PROFILE_KEY } from '../../utils/adminHelpers';

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const rawProfile = localStorage.getItem(ADMIN_PROFILE_KEY);

  let isAdmin = false;
  try {
    const profile = JSON.parse(rawProfile || '{}');
    if (token && profile && profile.role === 'ADMIN') {
      isAdmin = true;
    }
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_PROFILE_KEY);
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}