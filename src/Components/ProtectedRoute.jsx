
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
