import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { APP_ROUTES } from "@/constants";
import toast from "react-hot-toast";

/**
 * OAuth Failure Callback Handler
 * Handles failed OAuth2 authentication and redirects to login
 */
function OAuthFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show error notification
    toast.error("OAuth login failed. Please try again.");

    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate(APP_ROUTES.LOGIN);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <XCircle className="h-20 w-20 text-red-600" />
        
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          OAuth Login Failed
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400">
          We couldn't sign you in with your OAuth provider. This might be due to:
        </p>

        <ul className="text-sm text-zinc-600 dark:text-zinc-400 text-left list-disc list-inside space-y-1">
          <li>Account permissions were denied</li>
          <li>Authentication was cancelled</li>
          <li>Network or server issues</li>
        </ul>

        <div className="mt-4 flex flex-col gap-2 w-full">
          <Button
            onClick={() => navigate(APP_ROUTES.LOGIN)}
            className="w-full bg-indigo-600 hover:bg-indigo-500"
          >
            Back to Login
          </Button>
          
          <p className="text-xs text-zinc-500">
            Redirecting automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

export default OAuthFailure;
