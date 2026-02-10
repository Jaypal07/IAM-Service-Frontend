import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage your application preferences
          </p>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how the application looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  theme === "light" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-muted bg-transparent"
                }`}
              >
                <Sun className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  theme === "dark" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-muted bg-transparent"
                }`}
              >
                <Moon className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  theme === "system" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-muted bg-transparent"
                }`}
              >
                <Monitor className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts and emails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="marketing-emails">Marketing emails</Label>
                <span className="text-sm text-muted-foreground text-zinc-500">
                  Receive emails about new features and promotions.
                </span>
              </div>
              <Switch id="marketing-emails" disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="security-emails">Security emails</Label>
                <span className="text-sm text-muted-foreground text-zinc-500">
                  Receive emails about your account security.
                </span>
              </div>
              <Switch id="security-emails" checked disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
