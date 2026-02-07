import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { APP_ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to={APP_ROUTES.HOME || "/"}>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
