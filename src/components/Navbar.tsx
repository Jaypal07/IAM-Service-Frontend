import { useState } from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              I
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              IAM Service
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
          <a
            href="https://github.com/Jaypal07/IAM-Service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title="View Source on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <div className="hidden md:flex items-center gap-3">
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

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <NavLink 
                to="/features" 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md"
              >
                Features
              </NavLink>
              <NavLink 
                to="/pricing" 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md"
              >
                Pricing
              </NavLink>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                </Button>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
