import { Outlet } from "react-router";

/**
 * User Layout
 * Note: Route protection is handled by ProtectedRoute in routing config
 * This component just renders the outlet for nested routes
 */
function UserLayout() {
  return <Outlet />;
}

export default UserLayout;
