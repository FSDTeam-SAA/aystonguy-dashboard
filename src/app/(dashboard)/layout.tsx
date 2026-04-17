import Header from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg-image.jpg')", // 👉 public/images/bg.jpg
      }}
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full mt-[80px] p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;