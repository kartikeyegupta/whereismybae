"use client";

import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const analysis = searchParams.get("analysis");

  // Parse the analysis string into red flags
  const redFlags = analysis
    ?.split("\n")
    .filter((line) => line.includes(":"))
    .slice(0, 3) || [];

  // We'll reference the container we want to screenshot
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;

    try {
      // Use html2canvas to capture the container
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#000000", // Ensure black background if your container is black
        scale: 2, // Increase resolution for a clearer image
      });
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "my-red-flags.png"; // Default filename
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white tracking-tight">
          Your Top Red Flags 🚩
        </h1>

        {/* Container we want to screenshot */}
        <div ref={captureRef} id="shareable-container" className="mb-6">
          {/* You could add a special header or styling specifically for the shareable container */}
          <div className="space-y-6">
            {redFlags.map((flag, index) => {
              const [title, description] = flag.split(":").map((str) => str.trim());
              const cleanTitle = title.replace(/\*\*/g, "");
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 mb-2"
                >
                  <h2 className="text-2xl font-bold text-pink-500 mb-2">🚩 {cleanTitle}</h2>
                  <p className="text-white/80">{description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Button to download the image */}
          <button
            onClick={handleDownloadImage}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-xl transition-all"
          >
            Download Red Flags (Share on Instagram)
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
