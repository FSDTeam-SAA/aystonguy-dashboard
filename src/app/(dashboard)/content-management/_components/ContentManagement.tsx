"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Plus,
  Pencil,
  Play,
  Eye,
  AlertTriangle,
} from "lucide-react";
import SelectMediaModal, { Video } from "./Selectmediamodal";

const ALL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail: "https://picsum.photos/seed/video1/400/400",
    category: "ENTERTAINMENT",
    duration: "5:35",
  },
  {
    id: 2,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail: "https://picsum.photos/seed/video2/400/400",
    category: "Comedy",
    duration: "3:45",
    author: "David",
    date: "Aug 3, 2024",
  },
  {
    id: 3,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail: "https://picsum.photos/seed/video3/400/400",
    category: "ENTERTAINMENT",
    duration: "4:20",
  },
  {
    id: 4,
    title: "Street Style Dance Moves",
    thumbnail: "https://picsum.photos/seed/video4/400/400",
    category: "ENTERTAINMENT",
    duration: "0:24",
    views: "3.2k",
  },
  {
    id: 5,
    title: "Travel Diaries: Hidden Gems",
    thumbnail: "https://picsum.photos/seed/video5/400/400",
    category: "ENTERTAINMENT",
    duration: "7:10",
  },
  {
    id: 6,
    title: "Tech Unboxing Gone Wrong",
    thumbnail: "https://picsum.photos/seed/video6/400/400",
    category: "Comedy",
    duration: "2:30",
  },
];

function ContentManagement() {
  const [activeTab, setActiveTab] = useState<"feature" | "hero">("feature");
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [heroModalOpen, setHeroModalOpen] = useState(false);

  const [featureVideos, setFeatureVideos] = useState<Video[]>(
    ALL_VIDEOS.slice(0, 4),
  );
  const [heroVideo, setHeroVideo] = useState<Video>({
    id: 99,
    title: "Hero Video",
    thumbnail: "https://picsum.photos/seed/hero/1600/800",
    category: "ENTERTAINMENT",
  });

  const handleAddToFeatures = (selected: Video[]) => {
    const existingIds = new Set(featureVideos.map((v) => v.id));
    const newVideos = selected.filter((v) => !existingIds.has(v.id));
    setFeatureVideos((prev) => [...prev, ...newVideos]);
    setFeatureModalOpen(false);
  };

  const handleSetHero = (selected: Video[]) => {
    if (selected.length > 0) setHeroVideo(selected[0]);
    setHeroModalOpen(false);
  };

  return (
    <div className="">
      {/* Header */}
      <div>
        <h1 className="text-[36px] font-medium text-[#00FFFF] leading-[120%] mb-3">
          Content Management
        </h1>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
          <span className="text-white font-medium text-base">Dashboard</span>
          <ChevronRight className="w-4 h-4 text-white" />
          <span className="text-[#00FFFF] font-medium text-base">
            Content Management
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-[#0a1022]/60 p-1 mt-10">
        <button
          onClick={() => setActiveTab("feature")}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
            activeTab === "feature"
              ? "bg-cyan-300 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              : "text-white/80 hover:text-white"
          }`}
        >
          Feature content Management
        </button>
        <button
          onClick={() => setActiveTab("hero")}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
            activeTab === "hero"
              ? "bg-cyan-300 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              : "text-white/80 hover:text-white"
          }`}
        >
          Hero content Management
        </button>
      </div>

      {/* FEATURE SECTION */}
      {activeTab === "feature" && (
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-cyan-300">
              Feature content Management
            </h2>
            <Button
              onClick={() => setFeatureModalOpen(true)}
              className="rounded-full bg-cyan-300 px-5 font-semibold text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add New Content
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featureVideos.map((video) => (
              <FeatureCard key={video.id} video={video} />
            ))}
          </div>

          {featureVideos.length === 0 && (
            <div className="py-16 text-center text-white/50">
              No featured content yet. Click Add New Content to get started.
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      {activeTab === "hero" && (
        <div>
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 text-xl font-semibold text-cyan-300">
                Hero content Management
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span className="text-white/90">
                  Only one video can exist in hero section
                </span>
              </div>
            </div>
            <Button
              onClick={() => setHeroModalOpen(true)}
              className="rounded-full bg-cyan-300 px-5 font-semibold text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Replace Hero Video
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <img
              src={heroVideo.thumbnail}
              alt={heroVideo.title}
              className="h-[340px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-black/30 backdrop-blur-sm transition hover:scale-110">
                <Play className="h-7 w-7 fill-white text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <SelectMediaModal
        open={featureModalOpen}
        onOpenChange={setFeatureModalOpen}
        mode="multi"
        title="Select Media for Features"
        description="Choose media from your library to display in the features section"
        videos={ALL_VIDEOS}
        submitLabel="Add to Features"
        onSubmit={handleAddToFeatures}
      />
      <SelectMediaModal
        open={heroModalOpen}
        onOpenChange={setHeroModalOpen}
        mode="single"
        title="Select Video for Hero"
        description="Choose a video from your library to display in the hero section"
        videos={ALL_VIDEOS}
        submitLabel="Add to Features"
        onSubmit={handleSetHero}
      />
    </div>
  );
}

/* ---------- Feature Card (inline sub-component) ---------- */
function FeatureCard({ video }: { video: Video }) {
  return (
    <div>
      <div className="relative mb-3 overflow-hidden rounded-xl border border-cyan-400/20">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover"
        />
        {/* Category badge */}
        <span className="absolute right-3 top-3 rounded-full bg-cyan-300/90 px-3 py-1 text-xs font-semibold text-slate-900">
          {video.category}
        </span>
        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black/20 backdrop-blur-sm">
            <Play className="h-5 w-5 fill-white text-white" />
          </div>
        </div>
        {/* Duration */}
        {video.duration && (
          <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
            {video.duration}
          </span>
        )}
        {/* Views */}
        {video.views && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
            <Eye className="h-3 w-3" /> {video.views}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium leading-snug text-white">
        {video.title}
      </h3>
      {video.author && video.date && (
        <p className="mt-1 text-xs text-white/50">
          {video.date} by {video.author}
        </p>
      )}
    </div>
  );
}

export default ContentManagement;
