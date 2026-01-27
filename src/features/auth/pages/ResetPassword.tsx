/**
 * Reset Password Page
 * Confirm password reset with token from URL
 */

import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { useResetPassword } from '../hooks/usePasswordReset';
import { APP_ROUTES } from '@/constants';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
  } = useResetPassword(token);

  useEffect(() => {
    if (!token) {
      navigate(APP_ROUTES.LOGIN);
    }
  }, [token, navigate]);

  if (success) {
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
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Password Reset!</CardTitle>
              <CardDescription className="text-zinc-600 dark:text-zinc-400">
                Your password has been successfully reset
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => navigate(APP_ROUTES.LOGIN)}
                className="w-full bg-indigo-600 hover:bg-indigo-500"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
              <Lock className="h-12 w-12 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Enter your new password below
            </CardDescription>

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
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-500"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Resetting...
                </span>
              ) : (
                'Reset Password'
              )}
            </Button>

            <div className="text-center">
              <Link
                to={APP_ROUTES.LOGIN}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
