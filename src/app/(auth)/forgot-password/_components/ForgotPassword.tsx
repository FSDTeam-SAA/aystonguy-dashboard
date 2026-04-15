"use client";
import React from "react";
import { Mail } from "lucide-react";

export function ForgotPasswordForm() {
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
          <div className="h-px bg-[#1a1a1a] -mx-9 mb-5" />

          {/* Subtitle */}
          <p className="text-center text-white text-[16px] mb-6 tracking-wide">
            Forgot Password
          </p>

          {/* Email */}
          <label className="text-[#aaa] text-[11px] tracking-widest uppercase mb-1.5 block">
            Enter your email
          </label>
          <div className="relative mb-6">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#00FFFF" }} />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#111] border border-[#222] rounded-lg py-3 pl-9 pr-3 text-[#888] text-sm outline-none transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}
              onFocus={e => e.target.style.borderColor = "#00FFFF"}
              onBlur={e => e.target.style.borderColor = "#222"}
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            className="w-full text-black font-semibold text-base tracking-widest rounded-lg py-3 transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "#00FFFF",
              fontFamily: "var(--font-oswald)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,255,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            Send OTP
          </button>

        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;