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
    <div className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          {user && (
            <Avatar 
              user={{
                id: user.id,
                name: user.name,
                image: user.image
              }}
              size="md"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Account Overview
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">
                <span className="text-zinc-500 font-medium">Name</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">
                <span className="text-zinc-500 font-medium">Email</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-zinc-500 font-medium">Account Type</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">{user?.provider || 'LOCAL'} Account</span>
              </div>
              <div className="pt-2">
                <Link to="/dashboard/profile">
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-zinc-500 mb-2">
                Manage your account settings and session.
              </p>
              <div className="grid gap-3">
                {/* <Button variant="outline" size="sm" className="justify-start gap-2" onClick={() => window.open('https://github.com', '_blank')}>
                  <Activity className="h-3.5 w-3.5" />
                  View Activity Log
                </Button> */}
                <Button variant="destructive" size="sm" className="justify-start gap-2" onClick={handleLogout}>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Logout Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
