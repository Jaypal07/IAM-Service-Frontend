/**
 * Forgot Password Page
 * Request password reset email
 */

import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { useForgotPassword } from '../hooks/usePasswordReset';
import { APP_ROUTES } from '@/constants';

export const ForgotPassword = () => {
  const { email, setEmail, loading, error, success, handleSubmit } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto mb-4">
              <Mail className="h-12 w-12 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Enter your email and we'll send you a reset link
            </CardDescription>

            {success && (
              <div className="mt-4">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                  <AlertTitle className="text-green-800 dark:text-green-200">
                    Check your email! If an account exists with this email, you'll receive a password reset link.
                  </AlertTitle>
                </Alert>
              </div>
            )}

            {error && (
              <div className="mt-4">
                <Alert variant="destructive">
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <Button
              disabled={loading || success}
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-500"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <div className="text-center">
              <Link
                to={APP_ROUTES.LOGIN}
                className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
