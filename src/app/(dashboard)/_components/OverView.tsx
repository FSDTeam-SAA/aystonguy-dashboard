import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Video, Image as ImageIcon, Film, LayoutGrid, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    title: "Total Videos",
    value: "1,248",
    trend: "+12.5%",
    icon: <Video className="w-5 h-5 text-cyan-400" />,
    borderColor: "border-cyan-500/40",
    bgColor: "bg-cyan-950/30", 
    textColor: "text-cyan-400",
  },
  {
    title: "Total Images",
    value: "3,567",
    trend: "+8.3%",
    icon: <ImageIcon className="w-5 h-5 text-green-400" />,
    borderColor: "border-green-500/40",
    bgColor: "bg-green-950/30",
    textColor: "text-green-400",
  },
  {
    title: "Total Clips",
    value: "892",
    trend: "+8.3%",
    icon: <Film className="w-5 h-5 text-gray-400" />,
    borderColor: "border-gray-500/40",
    bgColor: "bg-gray-900/50",
    textColor: "text-gray-400",
  },
  {
    title: "Categories",
    value: "02",
    trend: "+2",
    icon: <LayoutGrid className="w-5 h-5 text-cyan-400" />,
    borderColor: "border-cyan-500/40",
    bgColor: "bg-cyan-950/30",
    textColor: "text-cyan-400",
  },
];

function OverView() {
  return (
    <div className="bg-transparent text-white">
      {/* Header Section */}
      <div className="mb-8 px-2">
        <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Welcome back, Admin! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            // shadow-2xl এবং stat.shadowColor সরিয়ে দেওয়া হয়েছে যাতে গ্লো বাইরে না ছড়ায়
            className={`relative overflow-hidden rounded-2xl border-[1.5px] ${stat.borderColor} ${stat.bgColor} transition-all duration-300 shadow-[0px_0px_10px_0px_#0000001A]`}
          >            
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-6">
                {/* Icon Container */}
                <div className={`p-2 rounded-xl border ${stat.borderColor} bg-black/60`}>
                  {stat.icon}
                </div>
                {/* Trend Percentage */}
                <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.textColor}`}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {stat.trend}
                </div>
              </div>

              <div>
                <h2 className={`text-3xl font-black tracking-tighter mb-1 ${stat.textColor}`}>
                  {stat.value}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  {stat.title}
                </p>
              </div>

              {/* ছবির সেই হালকা স্পার্কল বা স্টার ইফেক্ট দেওয়ার জন্য একটি ডেকোরেশন */}
              <div className="absolute right-4 bottom-4 opacity-40">
                 <div className="w-6 h-[0.5px] bg-white absolute rotate-45 blur-[1px]" />
                 <div className="w-6 h-[0.5px] bg-white absolute -rotate-45 blur-[1px]" />
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverView;