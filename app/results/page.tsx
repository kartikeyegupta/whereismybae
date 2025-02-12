"use client";

import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const analysis = searchParams.get("analysis");

  // Parse the analysis JSON string into red flags
  let redFlags = [];
  try {
    const parsedData = JSON.parse(analysis || '{"red_flags": []}');
    redFlags = parsedData.red_flags || [];
  } catch (err) {
    console.error("Error parsing red flags:", err);
  }

  // We'll reference the container we want to screenshot
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#000000",
        scale: 3, // Increased for even better quality
      });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "my-red-flags.png";
      link.click();
    } catch (err) {
      console.error("Error capturing image:", err);
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex justify-center items-center bg-black overflow-hidden">
      {/* Floating background flags */}
      <div className="pointer-events-none select-none opacity-30">
        <div className="absolute text-5xl animate-float1 top-[110%] left-[10%]">🚩</div>
        <div className="absolute text-6xl animate-float2 top-[110%] left=[50%]">🚩</div>
        <div className="absolute text-4xl animate-float3 top-[110%] left-[80%]">🚩</div>
        <div className="absolute text-5xl animate-float4 top-[110%] left-[30%]">🚩</div>
        <div className="absolute text-6xl animate-float5 top-[110%] left-[70%]">🚩</div>
      </div>

      <main className="max-w-2xl w-full p-6 md:p-8 rounded-2xl shadow-2xl bg-black border border-black relative z-10">
        {/* Container we want to screenshot */}
        <div 
          ref={captureRef} 
          id="shareable-container" 
          className="mb-6 p-8 bg-gradient-to-b from-pink-900 to-black rounded-3xl border border-pink-500/30 relative"
        >
          {/* Decorative corner emojis */}
          <div className="absolute -top-2 -left-2 text-3xl rotate-[-15deg]">💝</div>
          <div className="absolute -top-2 -right-2 text-3xl rotate-[15deg]">💘</div>
          <div className="absolute -bottom-2 -left-2 text-3xl rotate-[15deg]">💖</div>
          <div className="absolute -bottom-2 -right-2 text-3xl rotate-[-15deg]">💗</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white tracking-tight drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
            My Red Flags 🚩
          </h1>

          <div className="space-y-6 flex-grow">
            {redFlags.map((flag: { title: string; description: string }, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
              >
                <h2 className="text-xl font-black text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚩</span> 
                  {flag.title}
                </h2>
                <p className="text-white font-bold text-md leading-snug mb ">{flag.description}</p>
              </div>
            ))}
          </div>

          {/* Added branding */}
          <div className="mt-5 text-center">
            <p className="text-white/60 text-lg font-medium">
              Find out yours at
            </p>
            <p className="text-pink-500 text-xl font-bold">
              whereismybae.com
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Button to download the image */}
          <button
            onClick={handleDownloadImage}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-xl transition-all"
          >
            Download
          </button>

          {/* Link to retake quiz */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-pink-500 active:bg-white/5 
            transition-all duration-300 font-medium border border-white/10 rounded-xl 
            hover:border-pink-500/50 px-4 py-2"
          >
            <ChevronLeft size={20} />
            Take Quiz Again
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes float1 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float2 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float3 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float4 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float5 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        .animate-float1 {
          animation: float1 10s linear infinite;
        }
        .animate-float2 {
          animation: float2 12s linear infinite;
        }
        .animate-float3 {
          animation: float3 14s linear infinite;
        }
        .animate-float4 {
          animation: float4 16s linear infinite;
        }
        .animate-float5 {
          animation: float5 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
