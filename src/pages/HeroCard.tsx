import { useRef, useState } from "react";
import { PlayerHero } from "@/types/game";

interface HeroCardProps {
  hero: PlayerHero;
  onRestart: () => void;
}

const C = {
  moss:   "#4ade80",
  rune:   "#86efac",
  forest: "#16a34a",
  muted:  "rgba(134,239,172,0.4)",
};

function CardPreview({ hero }: { hero: PlayerHero }) {
  return (
    <div id="hero-card-export"
      className="relative rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        width: 280, height: 420,
        background: "linear-gradient(160deg, #021a0a 0%, #052e16 40%, #021a0a 100%)",
        border: `2px solid ${hero.rarityColor}60`,
        boxShadow: `0 0 40px ${hero.rarityColor}30, inset 0 0 40px rgba(0,0,0,0.5)`,
        fontFamily: "'Oswald', sans-serif",
      }}>

      {/* Background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 280 420">
        <pattern id="runes" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#4ade80" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="#4ade80" strokeWidth="0.5" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="#4ade80" strokeWidth="0.5" />
        </pattern>
        <rect width="280" height="420" fill="url(#runes)" />
      </svg>

      {/* Corner ornaments */}
      {[
        { top: 8, left: 8, rotate: 0 },
        { top: 8, right: 8, rotate: 90 },
        { bottom: 8, right: 8, rotate: 180 },
        { bottom: 8, left: 8, rotate: 270 },
      ].map((pos, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" className="absolute"
          style={{ ...pos, opacity: 0.5 }}>
          <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill={hero.rarityColor} />
        </svg>
      ))}

      {/* Hero image */}
      <img src={hero.img} alt={hero.name}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ objectPosition: "top center" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(2,13,5,0.97) 30%, rgba(2,13,5,0.4) 60%, rgba(2,13,5,0.1) 100%)" }} />

      {/* Top: game title */}
      <div className="absolute top-4 left-0 right-0 flex flex-col items-center">
        <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: C.muted }}>СКАЗАНИЕ · AR–ВОЗРОЖДЕНИЕ</p>
      </div>

      {/* Role badge */}
      <div className="absolute top-10 right-4 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
        style={{ background: hero.rarityColor + "25", color: hero.rarityColor, border: `1px solid ${hero.rarityColor}40` }}>
        {hero.role}
      </div>

      {/* Hero portrait in card center */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 28 }}>
        <div className="relative w-28 h-36 rounded-xl overflow-hidden"
          style={{ border: `2px solid ${hero.rarityColor}50`, boxShadow: `0 0 20px ${hero.rarityColor}30` }}>
          <img src={hero.img} alt={hero.name} className="w-full h-full object-cover" style={{ objectPosition: "top" }} />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Name */}
        <h2 className="font-bold text-xl leading-tight text-center mb-0.5"
          style={{ color: hero.rarityColor, textShadow: `0 0 20px ${hero.rarityColor}60` }}>
          {hero.name}
        </h2>
        <p className="text-[11px] tracking-widest text-center mb-3"
          style={{ color: C.muted, fontFamily: "'Golos Text', sans-serif" }}>
          {hero.title} · Уровень {hero.level}
        </p>

        {/* Divider */}
        <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, transparent, ${hero.rarityColor}50, transparent)` }} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { icon: "❤️", label: "HP",   val: hero.hp      },
            { icon: "⚔️", label: "АТК",  val: hero.attack  },
            { icon: "🛡️", label: "ЗЩТ",  val: hero.defense },
          ].map(s => (
            <div key={s.label} className="text-center rounded-lg py-1.5"
              style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.12)" }}>
              <p className="text-base leading-none">{s.icon}</p>
              <p className="font-bold text-lg leading-tight mt-0.5" style={{ color: C.moss }}>{s.val}</p>
              <p className="text-[9px] tracking-wider" style={{ color: C.muted, fontFamily: "'Golos Text', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Special skill */}
        <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl"
          style={{ background: `${hero.rarityColor}10`, border: `1px solid ${hero.rarityColor}25` }}>
          <span className="text-sm">{hero.specialIcon}</span>
          <p className="text-[11px] font-bold tracking-wider" style={{ color: hero.rarityColor }}>{hero.specialSkill}</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroCard({ hero, onRestart }: HeroCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    // Имитируем скачивание (в реальном проекте — html2canvas или аналог)
    await new Promise(r => setTimeout(r, 1200));
    setDownloading(false);
    setDownloaded(true);

    // Создаём текстовую карточку как fallback
    const lines = [
      "╔══════════════════════════════╗",
      "║  СКАЗАНИЕ · AR–ВОЗРОЖДЕНИЕ  ║",
      "╠══════════════════════════════╣",
      `║  ${hero.name.padEnd(28)}║`,
      `║  ${hero.title.padEnd(28)}║`,
      `║  Уровень: ${String(hero.level).padEnd(20)}║`,
      "╠══════════════════════════════╣",
      `║  ❤️  HP:      ${String(hero.hp).padEnd(15)}║`,
      `║  ⚔️  Атака:   ${String(hero.attack).padEnd(15)}║`,
      `║  🛡️  Защита:  ${String(hero.defense).padEnd(15)}║`,
      "╠══════════════════════════════╣",
      `║  ${hero.specialIcon} ${hero.specialSkill.padEnd(27)}║`,
      "╚══════════════════════════════╝",
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${hero.name.replace(/ /g, "_")}_карточка.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col max-w-md mx-auto overflow-hidden"
      style={{ background: "hsl(150 40% 5%)" }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 40%, ${hero.rarityColor}08 0%, transparent 65%)` }} />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-10 px-5 pb-4 text-center">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-1" style={{ color: C.muted }}>
          Сказание завершено
        </p>
        <h1 className="font-heading font-bold text-2xl gold-text">Твой Богатырь</h1>
        <p className="font-body text-sm text-muted-foreground">Карточка готова для настольной игры</p>
      </div>

      {/* Card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-2 overflow-y-auto pb-4 px-5">
        <div className="animate-scale-in">
          <CardPreview hero={hero} />
        </div>

        {/* Final stats summary */}
        <div className="w-full max-w-xs mt-5 game-card p-4 rune-border">
          <p className="font-heading text-xs tracking-widest uppercase text-center mb-3" style={{ color: C.muted }}>
            Итоговые характеристики
          </p>
          <div className="space-y-2">
            {[
              { icon: "❤️", label: "Здоровье", val: hero.hp,      color: "#4ade80"  },
              { icon: "⚔️", label: "Атака",    val: hero.attack,  color: "#34d399"  },
              { icon: "🛡️", label: "Защита",   val: hero.defense, color: "#6ee7b7"  },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-sm">{s.icon}</span>
                <span className="font-body text-xs text-muted-foreground w-20">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(74,222,128,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
                </div>
                <span className="font-heading font-bold text-sm w-8 text-right" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 flex items-center justify-center gap-2"
            style={{ borderTop: "1px solid rgba(74,222,128,0.1)" }}>
            <span className="text-base">{hero.specialIcon}</span>
            <span className="font-heading text-sm font-bold" style={{ color: hero.rarityColor }}>{hero.specialSkill}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 px-5 pb-10 pt-2 flex-shrink-0 space-y-3">
        <button onClick={handleDownload} disabled={downloading}
          className="w-full py-4 rounded-2xl font-heading tracking-widest text-base font-bold relative overflow-hidden transition-all"
          style={{
            background: downloaded
              ? `linear-gradient(135deg, #14532d, #15803d)`
              : `linear-gradient(135deg, ${C.forest}, ${C.moss})`,
            color: "#052e16",
            boxShadow: `0 0 25px ${C.moss}25`,
          }}>
          {downloaded ? "✦ Карточка сохранена!" : downloading ? "Подготовка..." : "⬇ Скачать карточку"}
        </button>

        <button onClick={onRestart}
          className="w-full py-3 rounded-2xl font-heading tracking-widest text-sm transition-all"
          style={{
            background: "transparent",
            color: C.muted,
            border: "1px solid rgba(74,222,128,0.12)",
          }}>
          Начать заново
        </button>
      </div>
    </div>
  );
}
