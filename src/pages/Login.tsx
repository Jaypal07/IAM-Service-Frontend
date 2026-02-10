import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Link, useLocation } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import OAuth2Buttons from "@/components/OAuth2Buttons";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { APP_ROUTES } from "@/constants";
import { useEffect } from "react";

function Login() {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.demo === 'admin') {
      handleChange('email', 'admin@example.com');
      handleChange('password', 'admin');
    } else if (location.state?.demo === 'user') {
      handleChange('email', 'user@example.com');
      handleChange('password', 'password');
    }
  }, [location.state]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Sign in to your account to continue
            </CardDescription>

            {/* Error Section */}
            {error && (
              <div className="mt-4">
                <Alert variant="destructive">
                  <CheckCircle2Icon className="h-4 w-4" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={APP_ROUTES.FORGOT_PASSWORD}
                  className="text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            {/* Login Button */}
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Please wait...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            {/* Demo / Recruiter Access Section */}
            <div className="pt-2">
               <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">
                      Recruiter / Demo Access
                    </span>
                  </div>
                </div>
            
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      handleChange('email', 'admin@example.com');
                      handleChange('password', 'admin');
                    }}
                    className="h-auto py-2 flex flex-col items-center gap-1 border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all"
                  >
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">Admin Demo</span>
                    <span className="text-[10px] text-zinc-500 font-mono">admin / admin</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      handleChange('email', 'user@example.com');
                      handleChange('password', 'password');
                    }}
                    className="h-auto py-2 flex flex-col items-center gap-1 border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:border-emerald-300 transition-all"
                  >
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">User Demo</span>
                    <span className="text-[10px] text-zinc-500 font-mono">user / password</span>
                  </Button>
                </div>
            </div>

            {/* Social Login */}
            <OAuth2Buttons />

            {/* Sign Up Link */}
            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don't have an account?{' '}
              <Link
                to={APP_ROUTES.SIGNUP}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer - Hide on small screens to prevent scroll */}
        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400 hidden md:block">
          Secured with modern encryption and token based authentication
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

