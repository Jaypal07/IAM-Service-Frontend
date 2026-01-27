import { Button } from "./ui/button";
import { NavLink } from "react-router";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { UserMenu } from "./UserMenu";

function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              Auth Service
            </span>
          </NavLink>

          {/* Main Nav Items - Left Side (Public only) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/features" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                Features
              </NavLink>
              <NavLink to="/pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                Pricing
              </NavLink>
            </div>
          )}
        </div>

        {/* Right side links */}
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25">
                  Get Started
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
