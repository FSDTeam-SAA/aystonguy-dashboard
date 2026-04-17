"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Play,
  Eye,
  ThumbsUp,
  Share2,
  Video,
  Image,
  Scissors,
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "All Categories",
  "Entertainment",
  "Comedy",
  "Music",
  "Sports",
  "Education",
  "News",
];

const MEDIA_ITEMS = [
  {
    id: 1,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
    date: "Aug 3, 2024",
    author: "David",
    type: "video",
    featured: true,
    size: "large",
    overlay: "INTERNATIONAL MSME DAY!",
  },
  {
    id: 2,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
    category: "COMEDY",
    duration: "3:20",
    views: "2.8k",
    likes: "1.9k",
    date: "Aug 3, 2024",
    author: "David",
    type: "video",
    featured: false,
    size: "large",
    overlay: null,
  },
  {
    id: 3,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "4:10",
    views: "3.2k",
    likes: "2.4k",
    date: "Aug 5, 2024",
    author: "Sarah",
    type: "video",
    featured: false,
    size: "large",
    overlay: null,
  },
  {
    id: 4,
    title: "Street Art Chronicles",
    thumbnail:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "0:24",
    views: "3.2k",
    likes: "1.1k",
    date: "Aug 6, 2024",
    author: "Mike",
    type: "clip",
    featured: false,
    size: "large",
    overlay: null,
  },
  {
    id: 5,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
    date: "Aug 3, 2024",
    author: "David",
    type: "video",
    featured: false,
    size: "small",
    overlay: "INTERNATIONAL MSME DAY!",
  },
  {
    id: 6,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
    date: "Aug 3, 2024",
    author: "David",
    type: "video",
    featured: false,
    size: "small",
    overlay: "INTERNATIONAL MSME DAY!",
  },
  {
    id: 7,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
    date: "Aug 3, 2024",
    author: "David",
    type: "video",
    featured: false,
    size: "small",
    overlay: "INTERNATIONAL MSME DAY!",
  },
  {
    id: 8,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop",
    category: "ENTERTAINMENT",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
    date: "Aug 8, 2024",
    author: "Lily",
    type: "video",
    featured: false,
    size: "small",
    overlay: "INTERNATIONAL MSME DAY!",
  },
];

const CATEGORY_COLOR: Record<string, string> = {
  ENTERTAINMENT: "bg-cyan-400 text-black",
  COMEDY: "bg-green-400 text-black",
  MUSIC: "bg-purple-400 text-white",
  SPORTS: "bg-orange-400 text-white",
  EDUCATION: "bg-blue-400 text-white",
  NEWS: "bg-red-400 text-white",
};

function StarParticles() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.7 ? "w-3 h-3" : "w-1.5 h-1.5",
    delay: `${Math.random() * 3}s`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute ${s.size} opacity-60`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="animate-pulse">
            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function MediaCard({
  item,
  showMeta = true,
}: {
  item: (typeof MEDIA_ITEMS)[0];
  showMeta?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLOR[item.category] || "bg-cyan-400 text-black";

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-gray-900 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />

        {/* Overlay text (MSME style) */}
        {item.overlay && (
          <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded leading-tight uppercase tracking-wide">
            {item.overlay}
          </div>
        )}

        {/* Delete icon (top left, on hover) */}
        {hovered && (
          <div className="absolute top-2 left-2 z-10">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#00FFFF1A] border border-[#00FFFF]">
              <Link href={`/edit-media/${item?.id}`}>
                <button className="p-1 rounded hover:bg-cyan-500/80 transition-all">
                  <Pencil className="w-3.5 h-3.5 text-white" />
                </button>
              </Link>

              <button className="p-1 rounded hover:bg-red-500/80 transition-all">
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Category badge */}
        <span
          className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${catColor}`}
        >
          {item.category}
        </span>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-10 h-10 rounded-full bg-white/20 border-2 border-white/70 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${hovered ? "scale-110 bg-white/30" : ""}`}
          >
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Meta */}
      {showMeta && (
        <div className="p-2">
          <p className="text-white text-[24px] font-semibold leading-[28px] line-clamp-1">
            {item.title}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-gray-400 text-[10px]">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 !text-base" />
              {item.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3 text-base" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1 ml-auto cursor-pointer hover:text-cyan-400 transition-colors">
              <Share2 className="w-3 h-3 text-base" />
              Share
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ item }: { item: (typeof MEDIA_ITEMS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLOR[item.category] || "bg-cyan-400 text-black";

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hovered && (
          <div className="absolute top-2 left-2 z-10">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#00FFFF1A] border border-[#00FFFF]">
              <Link href={`/edit-media/${item?.id}`}>
                <button className="p-1 rounded hover:bg-cyan-500/80 transition-all">
                  <Pencil className="w-3.5 h-3.5 text-white" />
                </button>
              </Link>
              <button className="p-1 rounded hover:bg-red-500/80 transition-all">
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        <span
          className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${catColor}`}
        >
          {item.category}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-12 h-12 rounded-full bg-white/20 border-2 border-white/70 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${hovered ? "scale-110 bg-white/30" : ""}`}
          >
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-[24px] font-semibold leading-[28px] line-clamp-1">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

function MediumCard({ item }: { item: (typeof MEDIA_ITEMS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLOR[item.category] || "bg-cyan-400 text-black";

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Action buttons (top left, on hover) */}
        {hovered && (
          <div className="absolute top-2 left-2 z-10">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#00FFFF1A] border border-[#00FFFF]">
              <Link href={`/edit-media/${item?.id}`}>
                <button className="p-1 rounded hover:bg-cyan-500/80 transition-all">
                  <Pencil className="w-3.5 h-3.5 text-white" />
                </button>
              </Link>

              <button className="p-1 rounded hover:bg-red-500/80 transition-all">
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        <span
          className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${catColor}`}
        >
          {item.category}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-10 h-10 rounded-full bg-white/20 border-2 border-white/70 flex items-center justify-center backdrop-blur-sm transition-all ${hovered ? "scale-110" : ""}`}
          >
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-2">
        <p className="text-white text-[24px] font-semibold leading-[28px] line-clamp-1">
          {item.title}
        </p>
        <p className="text-[#D0D5DD] text-[18px] mt-0.5">
          {item.date} by {item.author}
        </p>
      </div>
    </div>
  );
}

export default function MediaManagement() {
  const [activeTab, setActiveTab] = useState("All Media");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [catOpen, setCatOpen] = useState(false);

  const tabs = [
    { label: "All Media", icon: null },
    { label: "Videos", icon: <Video className="w-3.5 h-3.5" /> },
    { label: "Images", icon: <Image className="w-3.5 h-3.5" /> },
    { label: "Clips", icon: <Scissors className="w-3.5 h-3.5" /> },
  ];

  const largeItems = MEDIA_ITEMS.filter((m) => m.size === "large");
  const smallItems = MEDIA_ITEMS.filter((m) => m.size === "small");
  const featured = largeItems[0];
  const medium = largeItems.slice(1);

  return (
    <div className="bg-transparent relative overflow-hidden font-sans">
      {/* Starfield background */}
      <div className="absolute inset-0 " />
      <StarParticles />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[36px] font-medium text-[#00FFFF] leading-[120%] mb-3">
              Media
            </h1>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
              <span className="text-white font-medium text-base">
                Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-white" />
              <span className="text-[#00FFFF] font-medium text-base">
                Media Management
              </span>
            </div>
          </div>
          <Link href="/add-media">
            <button className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black text-base font-bold px-4 h-[52px] rounded-md transition-all duration-200 shadow-lg shadow-cyan-400/20 cursor-pointer">
              <Plus className="w-5 h-5" />
              Add New Media
            </button>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            {/* Search Icon */}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-50" />

            {/* Input */}
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#00FFFF1A] border border-white/10 rounded-lg h-[52px] pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 bg-[#00FFFF1A] border border-white/10 rounded-lg h-[52px] px-4 text-sm text-gray-300 hover:border-cyan-400/40 transition-all min-w-[360px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>{category}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="absolute top-full mt-2 right-0 bg-[#0d1f2e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl shadow-black/50">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setCatOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${category === c ? "text-cyan-400 bg-cyan-400/10" : "text-gray-300 hover:bg-white/5"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 bg-[#1A1A1A]/80 p-1.5 rounded-full w-fit backdrop-blur-sm border border-white/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400 text-black shadow-md shadow-cyan-400/30 scale-[1.02]"
                    : "text-white hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center justify-center">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Top Featured Row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {/* Featured large card */}
          <div className="col-span-1">
            <FeaturedCard item={featured} />
          </div>

          {/* Medium cards */}
          {medium.map((item) => (
            <div key={item.id} className="col-span-1">
              <MediumCard item={item} />
            </div>
          ))}
        </div>

        {/* Bottom Small Cards Row */}
        <div className="grid grid-cols-4 gap-3">
          {smallItems.map((item) => (
            <MediaCard key={item.id} item={item} showMeta={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
