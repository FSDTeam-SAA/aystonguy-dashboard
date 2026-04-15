import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg-image.jpg')", // 👉 public folder e image rakhbi
      }}
    >
      {children}
    </div>
  );
}

export default Layout;