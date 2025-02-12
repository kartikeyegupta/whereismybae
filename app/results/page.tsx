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
      // Temporarily remove the dashed border for the screenshot
      const container = captureRef.current;
      const originalBorder = container.style.border;
      container.style.border = 'none';

      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#000000",
        scale: 3,
        windowWidth: 1080,
        windowHeight: 1920,
      });

      // Restore the original border
      container.style.border = originalBorder;

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
      decorations: ["✧", "✦", "✧", "✦"],
    },
    masculine: {
      background: "radial-gradient(circle at center, #2d0808 0%, #1a0000 100%)",
      border: "red-500",
      text: "red-500",
      cardBg: "black",
      cardBorder: "red-500",
      cardText: "gray-200",
      buttonBg: "red-500",
      buttonHoverBg: "red-600",
      buttonBorder: "red-400",
      decorations: ["◆", "◇", "◆", "◇"],
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
      decorations: ["●", "○", "●", "○"],
    }
  };

  const currentTheme = themes[theme as keyof typeof themes] || themes.cute;

  return (
    <div className="relative min-h-screen p-2 sm:p-4 md:p-8 flex justify-center items-center bg-black overflow-hidden">
      {/* Floating background flags */}
      <div className="pointer-events-none select-none opacity-30">
        <div className="absolute text-5xl animate-float1 top-[110%] left-[10%]">🚩</div>
        <div className="absolute text-6xl animate-float2 top-[110%] left=[50%]">🚩</div>
        <div className="absolute text-4xl animate-float3 top-[110%] left-[80%]">🚩</div>
        <div className="absolute text-5xl animate-float4 top-[110%] left-[30%]">🚩</div>
        <div className="absolute text-6xl animate-float5 top-[110%] left-[70%]">🚩</div>
      </div>

      <main className="max-w-2xl w-full p-3 sm:p-6 md:p-8 rounded-2xl shadow-2xl bg-black border border-black relative z-10">
        {/* Container we want to screenshot */}
        <div 
          ref={captureRef} 
          id="shareable-container" 
          style={{
            background: theme === 'masculine' ? currentTheme.background : currentTheme.background,
          }}
          className={`mb-3 sm:mb-6 p-3 sm:p-8 rounded-[20px] sm:rounded-[45px] border-4 border-dashed border-${currentTheme.border} relative aspect-[9/16] w-full max-w-md mx-auto overflow-hidden flex flex-col`}
        >
          {/* Updated decorative elements with adjusted positioning */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 text-xl sm:text-2xl opacity-50">{currentTheme.decorations[0]}</div>
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 text-xl sm:text-2xl opacity-50">{currentTheme.decorations[1]}</div>
            <div className="absolute bottom-16 sm:bottom-24 left-3 sm:left-6 text-xl sm:text-2xl opacity-50">{currentTheme.decorations[2]}</div>
            <div className="absolute bottom-16 sm:bottom-24 right-3 sm:right-6 text-xl sm:text-2xl opacity-50">{currentTheme.decorations[3]}</div>
          </div>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 mt-3 sm:mt-5 text-center text-${currentTheme.text} tracking-tight`}>
            My Red Flags 🚩
          </h1>

          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-3 sm:space-y-7">
              {redFlags.map((flag: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  className={`p-3 sm:p-6 rounded-[15px] sm:rounded-[25px] bg-${currentTheme.cardBg} border-2 border-${currentTheme.cardBorder} shadow-lg`}
                >
                  <h2 className={`text-base sm:text-xl font-black text-${currentTheme.text} mb-2 sm:mb-4 flex items-center gap-2`}>
                    <span className="text-lg sm:text-2xl">🚩</span> 
                    {flag.title}
                  </h2>
                  <p className={`text-${currentTheme.cardText} font-medium text-xs sm:text-md leading-relaxed`}>
                    {flag.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-10 text-center">
            <p className={`text-${currentTheme.text}/80 text-sm sm:text-lg font-medium`}>
              Find out yours at
            </p>
            <p className={`text-${currentTheme.text} text-base sm:text-xl font-bold mt-1`}>
              {currentTheme.decorations[0]} whereismybae.com {currentTheme.decorations[0]}
            </p>
          </div>
        </div>

        {/* Update the buttons with smaller padding on mobile */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <button
            onClick={handleDownloadImage}
            className={`bg-${currentTheme.buttonBg} hover:bg-${currentTheme.buttonHoverBg} text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all border-2 border-${currentTheme.buttonBorder} shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base`}
          >
            {currentTheme.decorations[0]} Download {currentTheme.decorations[0]}
          </button>

          <Link
            href="/"
            className={`flex items-center gap-2 text-${currentTheme.buttonBg} hover:text-${currentTheme.buttonHoverBg} 
            transition-all duration-300 font-medium border-2 border-${currentTheme.buttonBorder} rounded-full 
            hover:border-${currentTheme.buttonHoverBg} px-4 sm:px-6 py-2 sm:py-3 hover:scale-105 text-sm sm:text-base`}
          >
            <ChevronLeft size={18} />
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
