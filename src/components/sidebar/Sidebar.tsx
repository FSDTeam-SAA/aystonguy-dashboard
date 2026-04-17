"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Clapperboard,
  LayoutDashboard,
  LogOut,
  TruckElectric,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard Overview", href: "/", icon: LayoutDashboard },
  {
    name: "Media Management",
    href: "/media-management",
    icon: Clapperboard,
  },
  {
    name: "Categories Management",
    href: "/my-delivary",
    icon: TruckElectric,
  }
];

export function Sidebar() {
  const pathname = usePathname();
   const [, setOpen] = useState(false);

  return (
    <div className="flex h-screen sticky bottom-0 top-0 w-[350px] flex-col bg-[#000000] z-50 border border-[#00E5CC]/20 shadow-[0px_0px_5px_0px_#00E5CC_inset]">
      {/* Logo */}
      <div className="text-center border-b border-[#424242]">
        <h1 className="text-[64px] text-[#00FFFF] uppercase font-bold ">AYESTON</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 flex flex-col items-center justify-start px-3 overflow-y-auto mt-5">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-full mx-auto items-center justify-start gap-2 space-y-1 rounded-[4px] px-3 py-3 text-sm font-bold transition-all duration-200",
                isActive
                  ? "bg-[#00FFFF] text-black"
                  : "text-slate-300 hover:bg-[#00FFFF] hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  isActive ? "text-black" : ""
                )}
              />
              <span
                className={cn(
                  "font-semibold text-base leading-[120%] transition-colors duration-200 text-center",
                  isActive ? "text-black font-semibold" : ""
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

       {/* Logout fixed at bottom */}
      <div className="p-6">
        <div onClick={() => setOpen(true)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-600/50 hover:text-white cursor-pointer">
          <LogOut className="h-5 w-5" />
          <span className="font-normal text-base leading-none">Log Out</span>
        </div>
      </div>

      {/* <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
      /> */}
    </div>
  );
}
