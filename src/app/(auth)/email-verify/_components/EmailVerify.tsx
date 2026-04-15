"use client";
import React, { useRef, useState } from "react";

export function OTPVerificationForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

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
          <p className="text-center text-white text-[16px] mb-8 tracking-wide">
            OTP Verification
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-white text-xl font-bold bg-[#000] rounded-lg outline-none transition-all"
                style={{
                  border: digit ? "1px solid #00FFFF" : "1px solid #00FFFF",
                  boxShadow: digit ? "0 0 10px rgba(0,255,255,0.3)" : "none",
                  fontFamily: "var(--font-oswald)",
                }}
                onFocus={e => (e.target.style.boxShadow = "0 0 12px rgba(0,255,255,0.5)")}
                onBlur={e => (e.target.style.boxShadow = digit ? "0 0 10px rgba(0,255,255,0.3)" : "none")}
              />
            ))}
          </div>

          {/* Verify Button */}
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
            Verify Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default OTPVerificationForm;