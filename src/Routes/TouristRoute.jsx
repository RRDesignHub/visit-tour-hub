import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useRole } from "../Hooks/useRole";
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";

export const TouristRoute = ({children}) => {
  const { user, loading} = useAuth();
  const [userRole, roleLoading] = useRole();
  const location = useLocation();
  
  if (loading || roleLoading) return <LoadingSpinner />;
  if (user && userRole.isTourist) return children;

  return <Navigate to="/" state={location.pathname} />;
}
