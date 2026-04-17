"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Network,
  XCircle,
} from "lucide-react";
import AddCategoryModal from "./Addcategorymodal";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  items: number;
  icon: string;
  active: boolean;
};

const initialCategories: Category[] = [
  { id: 1, name: "Entertainment", items: 2, icon: "🧑‍🎓", active: true },
  { id: 2, name: "Comedy", items: 111, icon: "😂", active: true },
];

function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = (name: string, icon: string) => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name, items: 0, icon, active: true },
    ]);
    setAddOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[36px] font-medium text-[#00FFFF] leading-[120%] mb-3">
            Media
          </h1>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            <span className="text-white font-medium text-base">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-white" />
            <span className="text-[#00FFFF] font-medium text-base">
              Media Management
            </span>
          </div>
        </div>
        <Link href="">
          <button onClick={() => setAddOpen(true)} className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black text-base font-bold px-4 h-[52px] rounded-md transition-all duration-200 shadow-lg shadow-cyan-400/20 cursor-pointer">
            <Plus className="w-5 h-5" />
            Add New Media
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-cyan-400/40 bg-[#0a1022]/60 p-4 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-3xl">
                {cat.icon.startsWith("data:") ? (
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  cat.icon
                )}
              </div>
              <div className="flex gap-2">
                <button
                  aria-label="Edit category"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 transition hover:bg-cyan-500/20"
                >
                  <Pencil className="h-4 w-4 text-cyan-300" />
                </button>
                <button
                  aria-label="Delete category"
                  onClick={() => setDeleteId(cat.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 transition hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-cyan-300">
              {cat.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Network className="h-4 w-4" />
                <span>{String(cat.items).padStart(2, "0")} items</span>
              </div>
              {cat.active && (
                <span className="inline-flex rounded-full border border-cyan-400/60 px-3 py-1 text-xs text-cyan-300">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={handleAdd}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteId !== null}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <DialogContent className="max-w-md rounded-2xl border border-cyan-400/40 bg-[#0a1022]/95 text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-cyan-300">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-white/70">
              You want to delete this categories from your Admin Dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="flex-1 rounded-xl border-cyan-400/60 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 rounded-xl bg-cyan-300 font-semibold text-slate-900 hover:bg-cyan-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoriesManagement;
