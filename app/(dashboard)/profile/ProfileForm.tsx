import router from "next/router";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth.context";
import { authService } from "@/services/auth.service";
import authApi from "@/services/api/auth";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  userId: string;
  contentCategory?: string;
  geographicLocationId?: string;
  lifecycleStage?: string;
  createdAt?: string;
  updatedAt?: string;
  user: User;
  profilePicture?: string;
}

const initialProfile: UserProfile = {
  id: "",
  name: "",
  email: "",
  userId: "",
  user: {
    email: "",
    firstName: "",
    lastName: "",
  },
  profilePicture: "/credenzaLogo.svg",
};

function extractNames(user: any) {
  let firstName = user?.firstName || "";
  let lastName = user?.lastName || "";

  if ((!firstName || !lastName) && user?.name) {
    const [first, ...rest] = user.name.split(" ");
    firstName = first || "";
    lastName = rest.join(" ") || "";
  }

  return { firstName, lastName };
}

export default function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        let userProfile: UserProfile | null = null;
        let localUser = null;

        if (typeof window !== "undefined") {
          const local = localStorage.getItem("user");

          if (local) localUser = JSON.parse(local);
        }

        let sourceUser = user || localUser;
        if (sourceUser) {
          const { firstName, lastName } = extractNames(sourceUser);
          userProfile = {
            ...initialProfile,
            user: {
              email: sourceUser.email || "",
              firstName,
              lastName,
            },
            email: sourceUser.email || "",
            name: `${firstName} ${lastName}`.trim(),
            profilePicture: sourceUser.profilePicture || "/credenzaLogo.svg",
          };
        } else {
          const userData = await authService.getProfile();
          if (userData) {
            let nestedUser: User;
            if (
              (userData as any).user &&
              typeof (userData as any).user === "object"
            ) {
              const u = (userData as any).user;
              const { firstName, lastName } = extractNames(u);
              nestedUser = {
                email: u.email || "",
                firstName,
                lastName,
                role: u.role,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt,
              };
              userProfile = {
                ...initialProfile,
                ...userData,
                user: nestedUser,
                email: nestedUser.email,
                name: `${firstName} ${lastName}`.trim(),
                profilePicture:
                  (userData as any).profilePicture || "/credenzaLogo.svg",
              };
            } else {
              const { firstName, lastName } = extractNames(userData);
              nestedUser = {
                email: userData.email || "",
                firstName,
                lastName,
                role: userData.role,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
              };
              userProfile = {
                ...initialProfile,
                ...userData,
                user: nestedUser,
                email: nestedUser.email,
                name: `${firstName} ${lastName}`.trim(),
                profilePicture:
                  (userData as any).profilePicture || "/credenzaLogo.svg",
              };
            }
          }
        }
        setProfile(userProfile);
      } catch {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    if (!loading && profile) {
      // console.log("PROFILE: ", profile);
    }
  }, [profile, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!profile) return;
    if (["firstName", "lastName", "email"].includes(name)) {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              user: {
                ...prev.user,
                [name]: value,
              },
              ...(name === "email" ? { email: value } : {}),
            }
          : prev,
      );
    } else {
      setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);
    try {
      const updatePayload = {
        email: profile.user.email,
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
      };
      const updatedUser = await authApi.updateProfile(updatePayload);

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;
    setSaving(true);
    setError(null);
    try {
      await authApi.deleteProfile();
      localStorage.clear();
      router.push("/login");
    } catch {
      setError("Failed to delete account");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="max-w-xl w-full mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="rounded-full bg-zinc-700 h-24 w-24" />
          <div className="h-4 bg-zinc-700 rounded w-24" />
          <div className="h-3 bg-zinc-700 rounded w-32" />
          <div className="space-y-3 w-full max-w-md">
            <div className="h-3 bg-zinc-700 rounded" />
            <div className="h-3 bg-zinc-700 rounded" />
            <div className="h-3 bg-zinc-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          alt="Profile Picture"
          className="w-24 h-24 border-4 border-zinc-700"
          src={profile.profilePicture ?? "/credenzaLogo.svg"}
        />
        <Text className="text-white" fontSize="xl" fontWeight="semibold">
          {profile.user.firstName} {profile.user.lastName}
        </Text>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              className="block text-sm text-zinc-400 mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              className="bg-zinc-800 text-white border-zinc-700"
              disabled={!editing}
              id="firstName"
              name="firstName"
              value={profile.user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-sm text-zinc-400 mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              className="bg-zinc-800 text-white border-zinc-700"
              disabled={!editing}
              id="lastName"
              name="lastName"
              value={profile.user.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="email">
            Email
          </label>
          <Input
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            id="email"
            name="email"
            value={profile.user.email}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-4 justify-end">
          {!editing ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleEdit}
            >
              Edit
            </Button>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          )}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={saving}
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </div>
        {success && <span className="text-green-400 ml-2">Saved!</span>}
        {error && <span className="text-red-400 ml-2">{error}</span>}
      </div>
    </div>
  );
}
