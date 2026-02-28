import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.type !== allowedRole) {
    return <Navigate to="/courses" />;
  }

  return children;
}

export default RoleRoute;
