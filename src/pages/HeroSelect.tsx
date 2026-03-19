import { useState } from "react";
import { Hero } from "@/types/game";
import { BASE_HEROES } from "@/data/heroes";

interface HeroSelectProps {
  onSelect: (hero: Hero) => void;
}

const ROLE_DESC: Record<string, string> = {
  "Воин":   "Высокая защита, стойкость в бою",
  "Маг":    "Мощная атака, магия рун",
  "Лучник": "Скорость и точность удара",
};

export default function HeroSelect({ onSelect }: HeroSelectProps) {
  const [active, setActive] = useState<Hero>(BASE_HEROES[0]);
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => onSelect(active), 700);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col max-w-md mx-auto overflow-hidden"
      style={{ background: "hsl(150 40% 5%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${active.rarityColor}, transparent 70%)`, transition: "background 0.5s" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-4 px-6 text-center">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(134,239,172,0.45)" }}>
          Начало сказания
        </p>
        <h1 className="font-heading font-bold text-3xl gold-text tracking-wide">Выбери Богатыря</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Он станет твоим героем в настольной битве</p>
      </div>

      {/* Hero portrait */}
      <div className="relative z-10 flex justify-center px-6 flex-shrink-0">
        <div
          className="relative w-56 rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            boxShadow: `0 0 40px ${active.rarityColor}40, 0 0 80px ${active.rarityColor}15`,
            border: `2px solid ${active.rarityColor}50`,
            opacity: confirming ? 0 : 1,
            transform: confirming ? "scale(1.08)" : "scale(1)",
            transition: "all 0.6s ease",
          }}
        >
          <img src={active.img} alt={active.name} className="w-full h-72 object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(2,13,5,0.9) 0%, rgba(2,13,5,0.2) 50%, transparent 100%)" }} />
          {/* Role badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg font-heading text-xs font-bold"
            style={{ background: active.rarityColor + "25", color: active.rarityColor, border: `1px solid ${active.rarityColor}40` }}>
            {active.role}
          </div>
          {/* Name */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="font-heading font-bold text-2xl leading-tight" style={{ color: active.rarityColor }}>
              {active.name}
            </h2>
            <p className="font-body text-xs text-muted-foreground">{active.title}</p>
          </div>
        </div>
      </div>

      {/* Hero selector tabs */}
      <div className="relative z-10 flex gap-3 px-6 mt-5 justify-center">
        {BASE_HEROES.map((hero) => (
          <button key={hero.id} onClick={() => setActive(hero)}
            className="relative rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0"
            style={{
              width: 70, height: 88,
              border: active.id === hero.id ? `2px solid ${hero.rarityColor}` : "2px solid rgba(74,222,128,0.12)",
              boxShadow: active.id === hero.id ? `0 0 16px ${hero.rarityColor}50` : "none",
              transform: active.id === hero.id ? "scale(1.05)" : "scale(1)",
            }}>
            <img src={hero.img} alt={hero.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: active.id === hero.id ? "none" : "rgba(2,13,5,0.5)" }} />
            <div className="absolute bottom-0 left-0 right-0 py-1 text-center"
              style={{ background: "rgba(2,13,5,0.85)" }}>
              <p className="font-heading text-[9px] font-bold leading-tight px-0.5 truncate"
                style={{ color: active.id === hero.id ? hero.rarityColor : "rgba(134,239,172,0.5)" }}>
                {hero.name.split(" ")[0]}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats & description */}
      <div className="relative z-10 flex-1 px-6 mt-4 overflow-y-auto">
        {/* Description */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 text-center">
          {active.description}
        </p>

        {/* Base stats */}
        <div className="game-card p-4 rune-border mb-4">
          <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Начальные характеристики</p>
          <div className="space-y-2">
            {[
              { label: "Здоровье", val: active.baseHp,      color: "#4ade80",  icon: "❤️" },
              { label: "Атака",    val: active.baseAttack,  color: "#34d399",  icon: "⚔️" },
              { label: "Защита",   val: active.baseDefense, color: "#6ee7b7",  icon: "🛡️" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-sm w-5">{s.icon}</span>
                <span className="font-body text-xs text-muted-foreground w-20">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(74,222,128,0.1)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${s.val}%`, background: s.color }} />
                </div>
                <span className="font-heading font-bold text-xs w-8 text-right" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
          {/* Special */}
          <div className="mt-3 pt-3 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(74,222,128,0.1)" }}>
            <span className="text-lg">{active.specialIcon}</span>
            <div>
              <p className="font-heading text-xs font-bold" style={{ color: active.rarityColor }}>Особый навык</p>
              <p className="font-body text-xs text-muted-foreground">{active.specialSkill}</p>
            </div>
          </div>
        </div>

        <p className="font-body text-xs text-center text-muted-foreground mb-2"
          style={{ color: "rgba(134,239,172,0.3)" }}>
          {ROLE_DESC[active.role]}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 pb-10 pt-3 flex-shrink-0">
        <button onClick={handleConfirm}
          className="w-full py-4 rounded-2xl font-heading tracking-widest text-base relative overflow-hidden transition-all"
          style={{
            background: `linear-gradient(135deg, ${active.rarityColor}dd, ${active.rarityColor}88)`,
            color: "#052e16",
            boxShadow: `0 0 30px ${active.rarityColor}30`,
            opacity: confirming ? 0.7 : 1,
            transform: confirming ? "scale(0.97)" : "scale(1)",
          }}>
          <span className="relative z-10 font-bold">
            {confirming ? "Избираю богатыря..." : `Избрать ${active.name.split(" ")[0]}`}
          </span>
        </button>
      </div>
    </div>
  );
}
