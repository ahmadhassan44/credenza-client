"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth.context";
import { authService } from "@/services/auth.service";
import authApi from "@/services/api/auth";
import { useRouter } from "next/navigation";
import router from "next/router";

interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  company: string;
  profilePicture: string;
}

const initialProfile: ProfileData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  occupation: "",
  company: "",
  firstName: "",
  lastName: "",
  profilePicture: "/credenzaLogo.svg",
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  console.log("User from context:", user);

  // Load user profile data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        if (user) {
          setProfile({
            ...profile,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            // Keep other fields as is until we have API to fetch them
          });
        } else {
          // If user is not in context, try to fetch it from API
          const userData = await authService.getProfile();
          if (userData) {
            setProfile({
              ...profile,
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updatePayload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      };
      console.log("[Profile] Sending update payload:", updatePayload);
      const updatedUser = await authApi.updateProfile(updatePayload);
      console.log("[Profile] Received updated user from API:", updatedUser);
      // Update localStorage with new user info to prevent logout
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    setSaving(true);
    setError(null);
    try {
      await authApi.deleteProfile();
      // Clear localStorage and redirect to login
      localStorage.clear();
      router.push("/login");
    } catch (e) {
      setError("Failed to delete account");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl w-full mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="rounded-full bg-zinc-700 h-24 w-24"></div>
          <div className="h-4 bg-zinc-700 rounded w-24"></div>
          <div className="h-3 bg-zinc-700 rounded w-32"></div>
          <div className="space-y-3 w-full max-w-md">
            <div className="h-3 bg-zinc-700 rounded"></div>
            <div className="h-3 bg-zinc-700 rounded"></div>
            <div className="h-3 bg-zinc-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          className="w-24 h-24 border-4 border-zinc-700"
          src={profile.profilePicture}
          alt="Profile Picture"
        />
        <Text className="text-white" fontSize="xl" fontWeight="semibold">
          {profile.firstName} {profile.lastName}
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
              id="firstName"
              name="firstName"
              value={profile.firstName}
              className="bg-zinc-800 text-white border-zinc-700"
              disabled={!editing}
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
              id="lastName"
              name="lastName"
              value={profile.lastName}
              className="bg-zinc-800 text-white border-zinc-700"
              disabled={!editing}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            value={profile.email}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
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
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          )}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={saving}
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
