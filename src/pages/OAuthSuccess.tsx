import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/features/auth/store/auth.store";
import * as authApi from "@/features/auth/api/auth.api";
import { APP_ROUTES, SUCCESS_MESSAGES } from "@/constants";

/**
 * OAuth Success Callback Handler
 * Handles successful OAuth2 authentication by refreshing the token
 * and redirecting to dashboard
 */
function OAuthSuccess() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const handleOAuthSuccess = async () => {
      try {
        // Backend has set refresh token as httpOnly cookie
        // Call refresh endpoint to get access token
        const tokenResponse = await authApi.refresh();

        if (!tokenResponse?.accessToken) {
          throw new Error("No access token returned");
        }

        if (!isMounted) return;

        // Update auth store with user data and token
        setAuth(tokenResponse.accessToken, tokenResponse.user);

        toast.success(SUCCESS_MESSAGES.LOGIN);
        navigate(APP_ROUTES.DASHBOARD);
      } catch (error) {
        console.error("OAuth login failed:", error);

        if (!isMounted) return;

        toast.error("OAuth login failed. Please try again.");
        navigate(APP_ROUTES.LOGIN);
      }
    };

    handleOAuthSuccess();

    return () => {
      isMounted = false;
    };
  }, [setAuth, navigate]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black">
      <Spinner />
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
        Completing OAuth login...
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Please wait while we authenticate you
      </p>
    </div>
  );
}

export default OAuthSuccess;
