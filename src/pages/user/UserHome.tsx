import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShieldCheck, Activity, UserCircle } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar } from "@/components/Avatar";
import { Link } from "react-router";
import { useEffect } from "react";
import { StatCard } from "@/components/dashboard/StatCard";

function UserHome() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();

  // Debug: Log user object to see all available fields
  useEffect(() => {
    console.log('👤 User data in dashboard:', user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="mb-6 flex items-center gap-4">
        {user && (
          <Avatar 
            user={{
              id: user.id,
              name: user.name,
              image: user.image
            }}
            size="lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Here's what's happening with your account today.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Account Status" 
          value={user?.enabled ? "Active" : "Disabled"} 
          icon={<ShieldCheck className="h-5 w-5 text-indigo-600" />} 
        />
        <StatCard 
          title="Roles" 
          value={user?.roles?.map(r => {
            if (r.name === 'ROLE_OWNER') return 'Owner';
            if (r.name === 'ROLE_ADMIN') return 'Admin';
            if (r.name === 'ROLE_USER') return 'User';
            return r.name;
          }).join(', ') || "No Roles"} 
          icon={<Users className="h-5 w-5 text-green-600" />} 
        />
        <StatCard
          title="Permissions"
          value={user?.permissions?.length ? `${user.permissions.length}` : "0"}
          icon={<Activity className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Auth Provider"
          value={user?.provider || "LOCAL"}
          icon={<UserCircle className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 font-medium">Name</span>
              <span className="text-zinc-900 dark:text-zinc-100">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 font-medium">Email</span>
              <span className="text-zinc-900 dark:text-zinc-100">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-500 font-medium">Account Type</span>
              <span className="text-zinc-900 dark:text-zinc-100">{user?.provider || 'LOCAL'} Account</span>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/profile">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-500 mb-4">
              Access your personalized settings and account management tools.
            </p>
            <div className="grid gap-4">
              <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('https://github.com', '_blank')}>
                <Activity className="h-4 w-4" />
                View Activity Log
              </Button>
              <Button variant="destructive" className="justify-start gap-2" onClick={handleLogout}>
                <ShieldCheck className="h-4 w-4" />
                Logout Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserHome;
