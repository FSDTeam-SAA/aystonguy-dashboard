"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

type AddCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, icon: string) => void;
};

function AddCategoryModal({
  open,
  onOpenChange,
  onSubmit,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [fileName, setFileName] = useState("");

  const resetForm = () => {
    setName("");
    setIcon("");
    setFileName("");
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim(), icon || "📁");
    resetForm();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setIcon(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogOverlay className="bg-[#00000099] backdrop-blur-[2px]" />

      <DialogContent className="max-w-md rounded-[16px] border border-[#00FFFF] bg-[#0F1018] text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-cyan-300">
            Create New Category
          </DialogTitle>
        </DialogHeader> 

        <div className="space-y-5 py-2">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="category-name" className="text-sm text-white/90">
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="e.g., Entertainment"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-lg border-cyan-400/30 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
            />
          </div>

          {/* Icon / Emoji Upload */}
          <div className="space-y-2">
            <Label className="text-sm text-white/90">Icon/Emoji</Label>
            <label
              htmlFor="icon-upload"
              className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-cyan-400/40 bg-transparent transition hover:bg-cyan-500/5"
            >
              {icon && icon.startsWith("data:") ? (
                <img
                  src={icon}
                  alt="preview"
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <Upload className="h-5 w-5 text-cyan-300" />
              )}
              <span className="text-sm text-white/70">
                {fileName || "Upload"}
              </span>
              <input
                id="icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
            className="flex-1 rounded-xl border-cyan-400/60 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 rounded-xl bg-cyan-300 font-semibold text-slate-900 hover:bg-cyan-400 disabled:opacity-50"
          >
            Add Categories
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryModal;
