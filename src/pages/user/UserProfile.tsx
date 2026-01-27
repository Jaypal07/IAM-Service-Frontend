import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User as UserIcon, Mail, Calendar, Camera } from "lucide-react";
import { useUser } from "@/features/user/hooks/useUser";
import { Avatar } from "@/components/Avatar";
import { AvatarSelector } from "@/features/user/components/AvatarSelector";

// Helper function to format date as dd-mm-yyyy
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function UserProfile() {
  const { profile, loading, updateProfile } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (profile && !isEditing) {
      setFormData({
        name: profile.name,
      });
    }
  }, [profile, isEditing]);

  const handleSave = async () => {
    setError(null);
    setSuccess(false);

    if (!formData.name || formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    try {
      setIsSaving(true);
      await updateProfile({
        name: formData.name.trim(),
      });
      
      setSuccess(true);
      setIsEditing(false);

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch {
      setError("Failed to update profile. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-600">
        No user data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              User Profile
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              View and manage your account information
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing((v) => !v)}
            disabled={isSaving}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>Profile updated successfully</AlertDescription>
          </Alert>
        )}

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative group">
                <Avatar 
                  user={{
                    id: profile.id,
                    name: profile.name,
                    image: profile.image
                  }}
                  size="xl"
                />
                {isEditing && (
                  <AvatarSelector>
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8" />
                    </button>
                  </AvatarSelector>
                )}
              </div>
              <div>
                <CardTitle className="text-xl">
                  {profile.name ?? "Unnamed User"}
                </CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {profile.email}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap items-center">
                  <Badge variant={profile.enabled ? "default" : "secondary"}>
                    {profile.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isEditing ? (
              <ViewSection user={profile} />
            ) : (
              <EditSection
                formData={formData}
                setFormData={setFormData}
                email={profile.email}
                onSave={handleSave}
                isSaving={isSaving}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function ViewSection({ user }: { user: any }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <InfoItem
        icon={<UserIcon className="h-4 w-4" />}
        label="Name"
        value={user.name ?? "Unnamed User"}
      />
      <InfoItem
        icon={<Mail className="h-4 w-4" />}
        label="Email"
        value={user.email}
      />
      <InfoItem
        icon={<Calendar className="h-4 w-4" />}
        label="Joined At"
        value={formatDate(user.createdAt)}
      />
    </div>
  );
}



function EditSection({
  formData,
  setFormData,
  email,
  onSave,
  isSaving,
}: {
  formData: { name: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string }>>;
  email: string;
  onSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isSaving}
        />
        <p className="text-xs text-zinc-500">Minimum 2 characters</p>
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} disabled />
        <p className="text-xs text-zinc-500">Email cannot be changed</p>
      </div>

      <div className="space-y-3">
        <Label>Avatar</Label>
        <div className="flex items-center gap-4">
          <AvatarSelector>
            <Button variant="outline" type="button" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              Change Avatar
            </Button>
          </AvatarSelector>
          <p className="text-xs text-zinc-500">Style saved locally on this device</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}


function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-indigo-500">{icon}</div>
      <div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
        <p className="font-medium text-zinc-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default UserProfile;
