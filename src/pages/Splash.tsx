import { useState, useEffect } from "react";

const SPLASH_BG = "https://cdn.poehali.dev/projects/e15b018a-f237-42dc-87a3-3d9e8ab0a300/files/91c68618-7979-4174-a251-e90df649ff9b.jpg";

interface SplashProps {
  onEnter: () => void;
}

/* Slavic ornament SVG logo */
function SkazanieLogo() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="55" cy="55" r="52" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* Middle ring */}
      <circle cx="55" cy="55" r="44" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.35" />
      {/* Inner glow circle */}
      <circle cx="55" cy="55" r="36" fill="url(#innerGlow)" />
      {/* Cross-spear */}
      <line x1="55" y1="19" x2="55" y2="91" stroke="url(#spearGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="55" x2="91" y2="55" stroke="url(#spearGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Diagonal ornaments */}
      <line x1="29" y1="29" x2="81" y2="81" stroke="url(#spearGrad)" strokeWidth="1" opacity="0.4" />
      <line x1="81" y1="29" x2="29" y2="81" stroke="url(#spearGrad)" strokeWidth="1" opacity="0.4" />
      {/* Center diamond */}
      <polygon points="55,40 67,55 55,70 43,55" fill="url(#diamondGrad)" />
      <polygon points="55,44 63,55 55,66 47,55" fill="url(#innerDiamond)" />
      {/* Corner ornament dots */}
      <circle cx="55" cy="22" r="3" fill="url(#dotGrad)" />
      <circle cx="55" cy="88" r="3" fill="url(#dotGrad)" />
      <circle cx="22" cy="55" r="3" fill="url(#dotGrad)" />
      <circle cx="88" cy="55" r="3" fill="url(#dotGrad)" />
      {/* Small rune marks */}
      <circle cx="37" cy="37" r="2" fill="#4ade80" opacity="0.5" />
      <circle cx="73" cy="37" r="2" fill="#4ade80" opacity="0.5" />
      <circle cx="37" cy="73" r="2" fill="#4ade80" opacity="0.5" />
      <circle cx="73" cy="73" r="2" fill="#4ade80" opacity="0.5" />
      {/* Defs */}
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#052e16" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#022c22" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="spearGrad" x1="0" y1="0" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="diamondGrad" x1="43" y1="40" x2="67" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="innerDiamond" x1="47" y1="44" x2="63" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#052e16" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Splash({ onEnter }: SplashProps) {
  const [phase, setPhase] = useState<"loading" | "ready" | "exit">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("ready"), 400);
          return 100;
        }
        return p + Math.random() * 7 + 2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setPhase("exit");
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.7s ease-in-out",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={SPLASH_BG}
          alt="splash"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.38) saturate(1.3) hue-rotate(10deg)" }}
        />
        {/* Green atmospheric overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,44,22,0.55) 0%, rgba(1,20,10,0.1) 35%, rgba(1,20,10,0.75) 70%, rgba(1,10,5,0.98) 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(1,10,5,0.7) 100%)",
          }}
        />
        {/* Floating runes */}
        {["Ж", "Ф", "Ш", "Щ", "Ψ", "Ω", "Ѣ", "Ѫ"].map((r, i) => (
          <div
            key={i}
            className="absolute font-heading animate-float select-none pointer-events-none"
            style={{
              left: `${8 + i * 12}%`,
              top: `${10 + (i % 4) * 18}%`,
              fontSize: `${14 + (i % 3) * 4}px`,
              color: "#4ade80",
              opacity: 0.08 + (i % 3) * 0.04,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + i * 0.3}s`,
            }}
          >
            {r}
          </div>
        ))}
        {/* Glowing particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`p${i}`}
            className="absolute rounded-full animate-float pointer-events-none"
            style={{
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              left: `${5 + i * 8}%`,
              top: `${20 + (i % 5) * 14}%`,
              background: "#4ade80",
              opacity: 0.12 + (i % 4) * 0.05,
              boxShadow: "0 0 6px #4ade80",
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3.5 + i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Top area — version badge */}
      <div className="relative z-10 pt-14 flex flex-col items-center w-full px-6">
        <div
          className="px-4 py-1 rounded-full text-xs font-body tracking-widest"
          style={{
            background: "rgba(74,222,128,0.07)",
            border: "1px solid rgba(74,222,128,0.2)",
            color: "rgba(134,239,172,0.6)",
            letterSpacing: "0.2em",
          }}
        >
          ПОШАГОВАЯ СТРАТЕГИЯ
        </div>
      </div>

      {/* Center — Logo + Title */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center -mt-8">
        {/* Logo emblem */}
        <div
          style={{
            opacity: phase === "loading" ? 0 : 1,
            transform: phase === "loading" ? "scale(0.75) translateY(10px)" : "scale(1) translateY(0)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
            filter: "drop-shadow(0 0 20px rgba(74,222,128,0.35))",
          }}
        >
          <SkazanieLogo />
        </div>

        {/* Title block */}
        <div
          style={{
            opacity: phase === "loading" ? 0 : 1,
            transform: phase === "loading" ? "translateY(16px)" : "translateY(0)",
            transition: "all 0.7s ease 0.35s",
            marginTop: 16,
          }}
        >
          {/* Main title */}
          <h1
            className="font-heading font-bold leading-none"
            style={{
              fontSize: "clamp(2.2rem, 10vw, 3rem)",
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, #86efac 0%, #4ade80 45%, #16a34a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            СКАЗАНИЕ
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 my-2 justify-center">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.4))" }} />
            <span style={{ color: "rgba(74,222,128,0.5)", fontSize: 12 }}>✦</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(74,222,128,0.4), transparent)" }} />
          </div>

          {/* Subtitle */}
          <p
            className="font-heading tracking-[0.22em] uppercase"
            style={{
              fontSize: "clamp(0.65rem, 3.5vw, 0.8rem)",
              color: "rgba(134,239,172,0.55)",
            }}
          >
            AR · Возрождение
          </p>
        </div>
      </div>

      {/* Bottom — loading / enter */}
      <div className="relative z-10 w-full px-7 pb-12 flex flex-col items-center gap-5">
        {/* Loading */}
        {phase === "loading" && (
          <div className="w-full space-y-2 animate-fade-in">
            <div className="flex justify-between text-xs font-body" style={{ color: "rgba(134,239,172,0.45)", letterSpacing: "0.1em" }}>
              <span>Пробуждение древних...</span>
              <span style={{ color: "#4ade80" }}>{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div
              className="h-0.5 w-full rounded-full overflow-hidden"
              style={{ background: "rgba(74,222,128,0.1)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${Math.min(100, progress)}%`,
                  background: "linear-gradient(90deg, #14532d, #4ade80, #86efac)",
                  boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                }}
              />
            </div>
          </div>
        )}

        {/* Enter */}
        {phase === "ready" && (
          <div
            className="w-full flex flex-col items-center gap-4"
            style={{ animation: "fade-in 0.5s ease-out forwards" }}
          >
            <button
              onClick={handleEnter}
              className="w-full py-4 rounded-xl font-heading tracking-widest text-base relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #15803d, #16a34a)",
                color: "#dcfce7",
                border: "1px solid rgba(74,222,128,0.35)",
                boxShadow: "0 0 30px rgba(74,222,128,0.2), inset 0 1px 0 rgba(134,239,172,0.15)",
                letterSpacing: "0.2em",
              }}
            >
              <span className="relative z-10">ВОЙТИ В СКАЗАНИЕ</span>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(134,239,172,0.12) 50%, transparent 100%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
            </button>

            <div className="flex items-center gap-5">
              <button
                className="font-body text-sm transition-colors"
                style={{ color: "rgba(134,239,172,0.4)", letterSpacing: "0.08em" }}
              >
                Продолжить
              </button>
              <span style={{ color: "rgba(74,222,128,0.2)", fontSize: 10 }}>✦</span>
              <button
                className="font-body text-sm transition-colors"
                style={{ color: "rgba(134,239,172,0.4)", letterSpacing: "0.08em" }}
              >
                Настройки
              </button>
            </div>
          </div>
        )}

        <p
          className="font-body"
          style={{ fontSize: 10, color: "rgba(74,222,128,0.2)", letterSpacing: "0.15em" }}
        >
          v1.0.0 · СКАЗАНИЕ. AR–ВОЗРОЖДЕНИЕ © 2026
        </p>
      </div>
    </div>
  );
}
