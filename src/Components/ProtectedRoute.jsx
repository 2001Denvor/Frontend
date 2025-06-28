import { useAuth } from './AuthContext'; // adjust path as needed
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  // Redirect to user dashboard if role doesn't match
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/user/dashboard" />;
  }

  // Otherwise, render the children
  return children;
};

export default ProtectedRoute;
