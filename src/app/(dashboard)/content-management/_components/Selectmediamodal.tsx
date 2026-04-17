"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Eye, Check } from "lucide-react";

export type Video = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  duration?: string;
  views?: string;
  author?: string;
  date?: string;
};

type SelectMediaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "multi" | "single";
  title: string;
  description: string;
  videos: Video[];
  submitLabel?: string;
  onSubmit: (selected: Video[]) => void;
};

function SelectMediaModal({
  open,
  onOpenChange,
  mode,
  title,
  description,
  videos,
  submitLabel = "Add to Features",
  onSubmit,
}: SelectMediaModalProps) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIds([]);
    }
  }, [open]);

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    if (mode === "single") {
      setSelectedIds([id]);
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const handleSubmit = () => {
    const selected = videos.filter((v) => selectedIds.includes(v.id));
    if (selected.length === 0) return;
    onSubmit(selected);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl border border-cyan-400/40 bg-[#0a1022]/95 text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-cyan-300">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-lg border-cyan-400/30 bg-[#0f172a]/60 pl-10 text-white placeholder:text-white/50 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
          />
        </div>

        {/* Grid */}
        <div className="grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-10 text-center text-sm text-white/50">
              No media found.
            </div>
          ) : (
            filtered.map((video) => {
              const isSelected = selectedIds.includes(video.id);
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => toggleSelect(video.id)}
                  className={`group overflow-hidden rounded-xl border-2 text-left transition ${
                    isSelected
                      ? "border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                      : "border-transparent hover:border-cyan-400/40"
                  }`}
                >
                  <div className="relative aspect-square">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Category badge */}
                    <span className="absolute right-2 top-2 rounded-full bg-cyan-300/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900">
                      {video.category}
                    </span>
                    {/* Selection indicator */}
                    {isSelected && (
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-slate-900">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    )}
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black/20 backdrop-blur-sm">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </div>
                    </div>
                    {/* Duration */}
                    {video.duration && (
                      <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                        {video.duration}
                      </span>
                    )}
                    {/* Views */}
                    {video.views && (
                      <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                        <Eye className="h-3 w-3" /> {video.views}
                      </span>
                    )}
                  </div>
                  <div className="bg-[#0a1022] p-2">
                    <p className="truncate text-xs font-medium text-white">
                      {video.title}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border-cyan-400/60 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedIds.length === 0}
            className="flex-1 rounded-xl bg-cyan-300 font-semibold text-slate-900 hover:bg-cyan-400 disabled:opacity-50"
          >
            {submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectMediaModal;