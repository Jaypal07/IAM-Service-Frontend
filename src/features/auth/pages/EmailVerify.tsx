/**
 * Email Verification Page
 * Handles email verification via token from URL query params
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as authApi from '../api/auth.api';
import { APP_ROUTES, SUCCESS_MESSAGES } from '@/constants';
import { getErrorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';

export const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      await authApi.verifyEmail(token);
      setStatus('success');
      setMessage(SUCCESS_MESSAGES.EMAIL_VERIFIED);
      toast.success(SUCCESS_MESSAGES.EMAIL_VERIFIED);
    } catch (error) {
      setStatus('error');
      setMessage(getErrorMessage(error));
      toast.error(getErrorMessage(error));
    }
  };

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
              {status === 'loading' && (
                <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              )}
              {status === 'error' && (
                <XCircle className="h-16 w-16 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {status === 'loading' && 'Verifying Email...'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              {message || 'Please wait while we verify your email address'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {status === 'success' && (
              <Button
                onClick={() => navigate(APP_ROUTES.LOGIN)}
                className="w-full bg-indigo-600 hover:bg-indigo-500"
              >
                Continue to Login
              </Button>
            )}

            {status === 'error' && (
              <div className="space-y-2">
                <Link to={APP_ROUTES.LOGIN}>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Go to Login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
