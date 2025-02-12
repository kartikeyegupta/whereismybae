"use client";

import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useRef, Suspense } from "react";

function ResultsContent() {
  const searchParams = useSearchParams();
  const analysis = searchParams.get("analysis");
  const theme = searchParams.get("theme") || "cute";

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
        scale: 3,
        windowWidth: 1080,
        windowHeight: 1920,
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

  // Theme configurations
  const themes = {
    cute: {
      background: "#FFE5F1",
      border: "pink-400",
      text: "pink-600",
      cardBg: "white",
      cardBorder: "pink-300",
      cardText: "pink-700",
      buttonBg: "pink-400",
      buttonHoverBg: "pink-500",
      buttonBorder: "pink-300",
      decorations: ["✨", "💖", "🌸", "✨"],
    },
    masculine: {
      background: "#FFE5E5",
      border: "red-500",
      text: "red-700",
      cardBg: "white",
      cardBorder: "red-400",
      cardText: "red-800",
      buttonBg: "red-500",
      buttonHoverBg: "red-600",
      buttonBorder: "red-400",
      decorations: ["🔥", "💪", "⚡", "🎯"],
    },
    neutral: {
      background: "#F0F0F0",
      border: "gray-400",
      text: "gray-700",
      cardBg: "white",
      cardBorder: "gray-300",
      cardText: "gray-700",
      buttonBg: "gray-500",
      buttonHoverBg: "gray-600",
      buttonBorder: "gray-400",
      decorations: ["⭐", "✦", "★", "✧"],
    }
  };

  const currentTheme = themes[theme as keyof typeof themes] || themes.cute;

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
          className={`mb-6 p-8 bg-[${currentTheme.background}] rounded-[45px] border-4 border-dashed border-${currentTheme.border} relative aspect-[9/16] w-full max-w-md mx-auto overflow-hidden`}
        >
          {/* Add decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 left-4 text-3xl rotate-[-15deg]">{currentTheme.decorations[0]}</div>
            <div className="absolute top-6 right-6 text-3xl rotate-[15deg]">{currentTheme.decorations[1]}</div>
            <div className="absolute bottom-20 left-6 text-3xl rotate-[15deg]">{currentTheme.decorations[2]}</div>
            <div className="absolute bottom-24 right-8 text-3xl rotate-[-20deg]">{currentTheme.decorations[3]}</div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-8 text-center text-${currentTheme.text} tracking-tight rotate-[-2deg]`}>
            My Red Flags 🚩
          </h1>

          <div className="space-y-6 flex-grow">
            {redFlags.map((flag: { title: string; description: string }, index: number) => (
              <div
                key={index}
                className={`p-6 rounded-[25px] bg-${currentTheme.cardBg} border-2 border-${currentTheme.cardBorder} shadow-lg rotate-[1deg] hover:rotate-[-1deg] transition-transform`}
              >
                <h2 className={`text-xl font-black text-${currentTheme.text} mb-3 flex items-center gap-2`}>
                  <span className="text-2xl">🚩</span> 
                  {flag.title}
                </h2>
                <p className={`text-${currentTheme.cardText} font-medium text-md leading-snug`}>{flag.description}</p>
              </div>
            ))}
          </div>

          {/* Updated branding */}
          <div className="mt-5 text-center">
            <p className={`text-${currentTheme.text}/80 text-lg font-medium rotate-[-1deg]`}>
              Find out yours at
            </p>
            <p className={`text-${currentTheme.text} text-xl font-bold rotate-[2deg] mt-1`}>
              {currentTheme.decorations[0]} whereismybae.com {currentTheme.decorations[0]}
            </p>
          </div>
        </div>

        {/* Update the buttons to match the cute theme */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleDownloadImage}
            className={`bg-${currentTheme.buttonBg} hover:bg-${currentTheme.buttonHoverBg} text-white font-medium py-3 px-6 rounded-full transition-all border-2 border-${currentTheme.buttonBorder} shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {currentTheme.decorations[0]} Download {currentTheme.decorations[0]}
          </button>

          <Link
            href="/"
            className={`flex items-center gap-2 text-${currentTheme.buttonBg} hover:text-${currentTheme.buttonHoverBg} 
            transition-all duration-300 font-medium border-2 border-${currentTheme.buttonBorder} rounded-full 
            hover:border-${currentTheme.buttonHoverBg} px-6 py-3 hover:scale-105`}
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

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
