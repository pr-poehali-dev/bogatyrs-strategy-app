import { useState, useEffect } from "react";

const SPLASH_BG = "https://cdn.poehali.dev/projects/e15b018a-f237-42dc-87a3-3d9e8ab0a300/files/e7aa2d40-f05b-4777-bd41-bd9d179d5060.jpg";

interface SplashProps {
  onEnter: () => void;
}

export default function Splash({ onEnter }: SplashProps) {
  const [phase, setPhase] = useState<"loading" | "ready" | "exit">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("ready"), 300);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setPhase("exit");
    setTimeout(onEnter, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.6s ease-in-out",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={SPLASH_BG}
          alt="splash"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,26,0.3) 0%, rgba(13,14,26,0.0) 30%, rgba(13,14,26,0.7) 70%, rgba(13,14,26,1) 100%)",
          }}
        />
        {/* Particle runes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
          >
            {["᚛", "ᚙ", "᚜", "ᚑ", "ᚈ", "ᚂ"][i]}
          </div>
        ))}
      </div>

      {/* Top badge */}
      <div className="relative z-10 pt-16 flex flex-col items-center">
        <div
          className="px-4 py-1.5 rounded-full text-xs font-heading tracking-widest uppercase mb-4"
          style={{
            background: "rgba(255,78,26,0.2)",
            border: "1px solid rgba(255,78,26,0.4)",
            color: "#FF7A4D",
            opacity: phase === "loading" ? 0 : 1,
            transform: phase === "loading" ? "translateY(-10px)" : "translateY(0)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          AR — Возрождение
        </div>
      </div>

      {/* Center logo */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Emblem */}
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 animate-glow-pulse"
          style={{
            background: "linear-gradient(135deg, rgba(245,200,66,0.15), rgba(245,200,66,0.05))",
            border: "2px solid rgba(245,200,66,0.4)",
            boxShadow: "0 0 40px rgba(245,200,66,0.2)",
            opacity: phase === "loading" ? 0 : 1,
            transform: phase === "loading" ? "scale(0.8)" : "scale(1)",
            transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
          }}
        >
          <span className="text-5xl">⚔️</span>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: phase === "loading" ? 0 : 1,
            transform: phase === "loading" ? "translateY(20px)" : "translateY(0)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <h1
            className="font-heading font-bold text-5xl tracking-widest leading-none mb-2"
            style={{
              background: "linear-gradient(135deg, #FFE580 0%, #F5C842 40%, #C8981A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            СКАЗАНИЕ
          </h1>
          <div
            className="h-px w-full mb-2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(245,200,66,0.6), transparent)",
            }}
          />
          <p className="font-body text-sm tracking-[0.25em] uppercase text-foreground/50">
            Пошаговая стратегия
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 w-full px-8 pb-14 flex flex-col items-center gap-6">
        {/* Loading bar */}
        {phase === "loading" && (
          <div className="w-full space-y-2 animate-fade-in">
            <div className="flex justify-between text-xs font-heading text-muted-foreground">
              <span>Загрузка мира...</span>
              <span style={{ color: "#F5C842" }}>{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div
              className="h-1 w-full rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${Math.min(100, progress)}%`,
                  background: "linear-gradient(90deg, #C8981A, #F5C842, #FFE580)",
                  boxShadow: "0 0 10px rgba(245,200,66,0.5)",
                }}
              />
            </div>
          </div>
        )}

        {/* Enter button */}
        {phase === "ready" && (
          <div
            className="w-full flex flex-col items-center gap-4"
            style={{
              animation: "fade-in 0.5s ease-out forwards",
            }}
          >
            <button
              onClick={handleEnter}
              className="btn-gold w-full py-4 rounded-2xl text-lg tracking-widest relative overflow-hidden"
              style={{
                boxShadow: "0 0 30px rgba(245,200,66,0.35)",
              }}
            >
              <span className="relative z-10">НАЧАТЬ СКАЗАНИЕ</span>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </button>

            <div className="flex items-center gap-4">
              <button
                className="font-heading text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Продолжить
              </button>
              <div className="w-1 h-1 rounded-full bg-border" />
              <button
                className="font-heading text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Настройки
              </button>
            </div>
          </div>
        )}

        {/* Version */}
        <p className="text-xs font-body text-muted-foreground/40 tracking-widest">
          v1.0.0 · СКАЗАНИЕ © 2026
        </p>
      </div>
    </div>
  );
}
