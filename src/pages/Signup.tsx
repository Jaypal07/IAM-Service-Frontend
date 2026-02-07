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
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import OAuth2Buttons from "@/components/OAuth2Buttons";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { APP_ROUTES } from "@/constants";

function SignUp() {
  const { formData, loading, error, handleChange, handleSubmit } = useRegister();

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
            <CardTitle className="text-2xl font-bold">
              Create your account
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Get started with secure, modern authentication
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
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={loading}
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
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
              <p className="text-xs text-zinc-500">
                Minimum 8 characters
              </p>
            </div>

            {/* Sign Up Button */}
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-500"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Please wait...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">
                  Or
                </span>
              </div>
            </div>

            {/* Social Sign Up */}
            <OAuth2Buttons />

            {/* Login Link */}
            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{' '}
              <Link
                to={APP_ROUTES.LOGIN}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400 hidden md:block">
          By creating an account, you agree to our security and privacy
          practices
        </p>
      </motion.div>
    </div>
  );
}

export default SignUp;

