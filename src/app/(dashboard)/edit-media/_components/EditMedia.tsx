"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  Upload,
  X,
  Plus,
  Video,
  Image as ImageIcon,
  Scissors,
  FileVideo,
  FileImage,
} from "lucide-react";

// ─── Drop Zone ────────────────────────────────────────────────────────────────
interface DropZoneProps {
  label: string;
  accept: string;
  hint: string;
  icon: React.ReactNode;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}
function DropZone({ label, accept, hint, icon, file, onFile, onClear }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onClick={() => !file && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative w-full rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center py-10 gap-3 cursor-pointer
        ${dragging ? "border-cyan-400" : "border-cyan-500/40 bg-[#FFFFFF1A]"}`}
    >
      {file ? (
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#00FFFF33] flex items-center justify-center">
            {icon}
          </div>
          <p className="text-cyan-400 text-sm font-semibold">{file.name}</p>
          <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-3 h-3" /> Remove
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-[60px] h-[60px] rounded-lg bg-[#00FFFF33] border border-[#00FFFF] flex items-center justify-center">
            <Upload className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-cyan-400 text-sm font-semibold">Click to upload or drag and drop</p>
          <p className="text-gray-500 text-xs">{hint}</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); }} />
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-[#00FFFF] bg-[#000000B2] p-5 shadow-[0px_0px_10px_0px_#0000001A]">
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <h2 className="text-[#00FFFF] text-[24px] font-medium mb-4 leading-[120%]">{title}</h2>
      {children}
    </div>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = ["Entertainment", "Comedy", "Music", "Sports", "Education", "News", "Lifestyle", "Tech"];

// ─── Main Component ───────────────────────────────────────────────────────────
type MediaType = "Video" | "Image" | "Clips";

export default function EditMedia() {
  const [mediaType, setMediaType] = useState<MediaType>("Video");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Viral Video"]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const mediaTypes: { type: MediaType; icon: React.ReactNode; sub: string }[] = [
    { type: "Video", icon: <Video className="w-7 h-7 text-cyan-400" />, sub: "MP4, MOV, AVI" },
    { type: "Image", icon: <ImageIcon className="w-7 h-7 text-cyan-400" />, sub: "PNG, JPG, GIF" },
    { type: "Clips", icon: <Scissors className="w-7 h-7 text-cyan-400" />, sub: "Short videos" },
  ];

  const handleSaveDraft = () => alert("Saved as draft!");
  const handlePublish = () => {
    if (!title) { alert("Please enter a title."); return; }
    alert("Published successfully!");
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden">

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[36px] font-medium text-[#00FFFF] leading-[120%] mb-3">Media</h1>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            {/* <Home className="w-3 h-3" /> */}
            <span className="text-white font-medium text-base">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-base">Media Management</span>
            <ChevronRight className="w-4 h-4 text-white" />
            <span className="text-[#00FFFF] font-medium text-base">Add New Media</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-[#FFFFFF33] p-6 rounded-xl">
          {/* ── Media Type ── */}
          <Section title="Media Type">
            <div className="grid grid-cols-3 gap-3">
              {mediaTypes.map(({ type, icon, sub }) => (
                <button
                  key={type}
                  onClick={() => setMediaType(type)}
                  className={`relative flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 transition-all duration-200 overflow-hidden
                    ${mediaType === type
                      ? "border-[#00FFFF] bg-[#00FFFF1A] shadow-[0px_0px_10px_0px_#0000001A]"
                      : "border-[#00FFFF] bg-[#000000B2] hover:border-cyan-400/40 hover:bg-[#0a1a24]"
                    }`}
                >
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-[#071c2a] border border-cyan-500/30 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="relative z-10 text-center">
                    <p className="text-[#00FFFF] text-base font-medium">{type}</p>
                    <p className="text-[#FFFFFF] text-[14px] leading-[100%]">{sub}</p>
                  </div>
                  {mediaType === type && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                </button>
              ))}
            </div>
          </Section>

          {/* ── Upload Section ── */}
          {mediaType === "Video" && (
            <>
              <Section title="Video File">
                <DropZone
                  label="Video"
                  accept="video/*"
                  hint="MP4, MOV, AVI (max 500MB)"
                  icon={<FileVideo className="w-6 h-6 text-cyan-400" />}
                  file={videoFile}
                  onFile={setVideoFile}
                  onClear={() => setVideoFile(null)}
                />
              </Section>
              <Section title="Thumbnail">
                <DropZone
                  label="Thumbnail"
                  accept="image/*"
                  hint="PNG, JPG (recommended 1280x720)"
                  icon={<FileImage className="w-6 h-6 text-cyan-400" />}
                  file={thumbnail}
                  onFile={setThumbnail}
                  onClear={() => setThumbnail(null)}
                />
              </Section>
            </>
          )}

          {mediaType === "Image" && (
            <Section title="Image File">
              <DropZone
                label="Image"
                accept="image/*"
                hint="PNG, JPG, GIF, SVG (max 10MB)"
                icon={<FileImage className="w-6 h-6 text-cyan-400" />}
                file={imageFile}
                onFile={setImageFile}
                onClear={() => setImageFile(null)}
              />
            </Section>
          )}

          {mediaType === "Clips" && (
            <>
              <Section title="Clip File">
                <DropZone
                  label="Clip"
                  accept="video/*"
                  hint="MP4, MOV (max 100MB) — short clips only"
                  icon={<FileVideo className="w-6 h-6 text-cyan-400" />}
                  file={videoFile}
                  onFile={setVideoFile}
                  onClear={() => setVideoFile(null)}
                />
              </Section>
              <Section title="Thumbnail">
                <DropZone
                  label="Thumbnail"
                  accept="image/*"
                  hint="PNG, JPG (recommended 1280x720)"
                  icon={<FileImage className="w-6 h-6 text-cyan-400" />}
                  file={thumbnail}
                  onFile={setThumbnail}
                  onClear={() => setThumbnail(null)}
                />
              </Section>
            </>
          )}

          {/* ── Meta ── */}
          <Section title="">
            <div className="flex flex-col gap-4">
              {/* Title + Category */}
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label className="text-[#00FFFF] text-base font-medium mb-1.5 block">Title</label>
                  <input
                    type="text"
                    placeholder="Enter media title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0000001A] border border-[#00FFFF] rounded-[8px] px-3 h-[48px] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[#00FFFF] text-base font-medium mb-1.5 block">Category</label>
                  <div className="relative">
                    <button
                      onClick={() => setCatOpen(!catOpen)}
                      className="w-full flex items-center justify-between bg-[#0000001A] border border-[#00FFFF] rounded-[8px] px-3 h-[48px] text-sm text-left hover:border-cyan-400/50 transition-all focus:outline-none"
                    >
                      <span className={category ? "text-white" : "text-gray-600"}>{category || "Select category"}</span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform ${catOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {catOpen && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-[#0d1f2e] border border-cyan-500/25 rounded-xl z-50 overflow-hidden shadow-xl shadow-black/60">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => { setCategory(c); setCatOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${category === c ? "text-cyan-400 bg-cyan-400/10" : "text-gray-300 hover:bg-white/5"}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[#00FFFF] text-base font-medium mb-1.5 block">Description</label>
                <input
                  type="text"
                  placeholder="Enter media description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0000001A] border border-[#00FFFF] rounded-[8px] px-3 h-[48px] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-[#00FFFF] text-base font-medium mb-1.5 block">Tags</label>
                <div className="w-full bg-[#0000001A] border border-[#00FFFF] rounded-[8px] px-3 py-2 flex flex-wrap items-center gap-2 min-h-[48px]">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 bg-cyan-400/20 text-cyan-300 text-xs px-2.5 py-1 rounded-full font-medium">
                      {t}
                      <button onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={tags.length === 0 ? "Add tags" : ""}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
                    className="flex-1 min-w-[80px] bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
                <button
                  onClick={addTag}
                  className="mt-2 flex items-center gap-1 bg-[#0d1f2e] border border-cyan-500/25 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
          </Section>

          {/* ── Footer Actions ── */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={handleSaveDraft}
              className="relative py-3 rounded-full border border-cyan-500/40 text-sm font-bold text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all overflow-hidden group"
            >
              <span className="relative z-10">Save as draft</span>
            </button>
            <button
              onClick={handlePublish}
              className="py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}