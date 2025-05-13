"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  company: string;
  profilePicture: string;
}

const initialProfile: ProfileData = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 234 567 8901",
  address: "123 Main St, City, Country",
  occupation: "Product Manager",
  company: "Credenza Inc.",
  profilePicture: "/credenzaLogo.svg",
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          className="w-24 h-24 border-4 border-zinc-700"
          src={profile.profilePicture}
          alt="Profile Picture"
        />
        <Text className="text-white" fontSize="xl" fontWeight="semibold">
          {profile.name}
        </Text>
        <Text color="textSecondary">
          {profile.occupation} at {profile.company}
        </Text>
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            onChange={handleChange}
          />
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
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            value={profile.phone}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="address">
            Address
          </label>
          <Input
            id="address"
            name="address"
            value={profile.address}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="occupation">
            Occupation
          </label>
          <Input
            id="occupation"
            name="occupation"
            value={profile.occupation}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1" htmlFor="company">
            Company
          </label>
          <Input
            id="company"
            name="company"
            value={profile.company}
            className="bg-zinc-800 text-white border-zinc-700"
            disabled={!editing}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="flex gap-4 justify-end mt-4">
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
        {success && <span className="text-green-400 ml-2">Saved!</span>}
      </div>
    </div>
  );
}
