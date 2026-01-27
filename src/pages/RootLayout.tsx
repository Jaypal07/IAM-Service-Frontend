import { Outlet } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/features/auth/store/auth.store";

function RootLayout() {
  const hydrate = useAuthStore((state) => state.hydrate);

  // Hydrate auth state on app initialization
  useEffect(() => {
    console.log('🔄 Hydrating auth state...');
    hydrate();
    
    const state = useAuthStore.getState();
    console.log('📊 Auth state after hydration:', {
      isAuthenticated: state.isAuthenticated,
      hasToken: !!state.accessToken,
      hasUser: !!state.user,
      user: state.user?.email
    });
  }, [hydrate]);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
}

export default RootLayout;
