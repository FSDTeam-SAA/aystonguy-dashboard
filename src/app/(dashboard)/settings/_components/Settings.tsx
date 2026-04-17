"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

function Settings() {
  // Profile state
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@ayeston.com");

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    // TODO: call API
    console.log("Saving profile:", { name, email, avatar });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    // TODO: call API
    console.log("Changing password");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-cyan-300 md:text-4xl">
          Settings
        </h1>
        <nav className="flex items-center gap-2 text-sm">
          <span className="font-medium text-white/80">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-cyan-300" />
          <span className="text-cyan-300 underline underline-offset-2">
            Settings
          </span>
        </nav>
      </div>

      {/* ---------- PROFILE SECTION ---------- */}
      <div className="mb-6 rounded-2xl border border-cyan-400/40 bg-[#0F1018] p-6 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
        <div className="mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-cyan-300" />
          <h2 className="text-lg font-semibold text-cyan-300">Profile</h2>
        </div>

        {/* Avatar row */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-cyan-400/30 bg-red-500">
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <label htmlFor="avatar-upload">
              <span className="inline-block cursor-pointer rounded-lg border border-cyan-400/60 bg-transparent px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/10">
                Change Avatar
              </span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <p className="mt-1 text-xs text-white/50">
              JPG, PNG or GIF (max 2MB)
            </p>
          </div>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-cyan-300">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Admin User"
              className="h-11 rounded-lg border-cyan-400/30 bg-[#0f172a]/50 text-white placeholder:text-white/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-cyan-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ayeston.com"
              className="h-11 rounded-lg border-cyan-400/30 bg-[#0f172a]/50 text-white placeholder:text-white/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSaveProfile}
            className="rounded-lg bg-cyan-300 px-5 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* ---------- SECURITY SECTION ---------- */}
      <div className="rounded-2xl border border-cyan-400/40 bg-[#0F1018] p-6 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
        <div className="mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5 text-cyan-300" />
          <h2 className="text-lg font-semibold text-cyan-300">Security</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PasswordField
            id="current-password"
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            show={showCurrent}
            onToggle={() => setShowCurrent(!showCurrent)}
          />
          <PasswordField
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={setNewPassword}
            show={showNew}
            onToggle={() => setShowNew(!showNew)}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
          />
        </div>

        {/* Info box */}
        <div className="mt-6 rounded-lg border border-cyan-400/30 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-100/80">
          Password must be at least 8 characters long and include uppercase,
          lowercase, numbers, and special characters.
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleChangePassword}
            className="rounded-lg bg-cyan-300 px-5 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Password Field ---------- */
function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-cyan-300">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 rounded-lg border-cyan-400/30 bg-[#0f172a]/50 pr-10 text-white placeholder:text-white/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white/90"
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Settings;