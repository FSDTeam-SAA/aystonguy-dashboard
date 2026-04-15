"use client";
import React, { useEffect } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

export function SuccessScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.push("/dashboard"); // redirect logic এখানে
      console.log("Redirecting to dashboard...");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        style={{
          border: "1px solid #00FFFF",
          boxShadow: "0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(0,255,255,0.1)",
          borderRadius: "22px",
          padding: "1.5px",
          display: "inline-block",
        }}
      >
        <div className="bg-[#000000] rounded-[20px] p-9 w-[440px]">

          {/* Brand */}
          <h1
            className="text-center text-[36px] font-bold tracking-[4px] mb-2"
            style={{ color: "#00FFFF", textShadow: "0 0 20px rgba(0,255,255,0.6)" }}
          >
            AYESTON
          </h1>

          {/* Divider */}
          <div className="h-px bg-[#1a1a1a] -mx-9 mb-8" />

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glow dots */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#00FFFF",
                    top: `${50 + 42 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                    left: `${50 + 42 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: 0.7,
                    width: i % 2 === 0 ? "10px" : "6px",
                    height: i % 2 === 0 ? "10px" : "6px",
                  }}
                />
              ))}
              {/* Main circle */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#00FFFF",
                  boxShadow: "0 0 30px rgba(0,255,255,0.5)",
                }}
              >
                <ShieldCheck size={44} className="text-black" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Success Text */}
          <h2
            className="text-center text-white text-[22px] font-bold mb-3"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Successful!
          </h2>
          <p className="text-center text-[#aaa] text-sm leading-relaxed mb-6 px-4">
            Your account is ready to use. You will be redirected to the Dashboard page in a few seconds
          </p>

          {/* Loader */}
          <div className="flex justify-center">
            <Loader2
              size={28}
              className="animate-spin"
              style={{ color: "#00FFFF" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;