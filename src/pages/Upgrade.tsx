import { useState } from "react";
import { PlayerHero } from "@/types/game";

interface UpgradeProps {
  hero: PlayerHero;
  onFinish: (hero: PlayerHero) => void;
}

const C = {
  moss:   "#4ade80",
  rune:   "#86efac",
  forest: "#16a34a",
  muted:  "rgba(134,239,172,0.4)",
};

type StatKey = "hp" | "attack" | "defense";

const STAT_META: Record<StatKey, { label: string; icon: string; color: string; costPer: number }> = {
  hp:      { label: "Здоровье", icon: "❤️", color: "#4ade80",  costPer: 10 },
  attack:  { label: "Атака",    icon: "⚔️", color: "#34d399",  costPer: 15 },
  defense: { label: "Защита",   icon: "🛡️", color: "#6ee7b7",  costPer: 12 },
};

export default function Upgrade({ hero, onFinish }: UpgradeProps) {
  const [spent, setSpent] = useState<Record<StatKey, number>>({ hp: 0, attack: 0, defense: 0 });
  const [confirming, setConfirming] = useState(false);

  const totalSpent = Object.entries(spent).reduce((sum, [key, pts]) => {
    return sum + pts * STAT_META[key as StatKey].costPer;
  }, 0);
  const remaining = hero.points - totalSpent;

  const gained = (key: StatKey) => Math.floor(spent[key] * 1.0);

  const canAdd = (key: StatKey) => remaining >= STAT_META[key].costPer;
  const canRemove = (key: StatKey) => spent[key] > 0;

  const add = (key: StatKey) => {
    if (!canAdd(key)) return;
    setSpent(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };
  const remove = (key: StatKey) => {
    if (!canRemove(key)) return;
    setSpent(prev => ({ ...prev, [key]: prev[key] - 1 }));
  };

  const handleConfirm = () => {
    setConfirming(true);
    const upgraded: PlayerHero = {
      ...hero,
      hp:      hero.hp      + gained("hp"),
      attack:  hero.attack  + gained("attack"),
      defense: hero.defense + gained("defense"),
      level:   hero.level + (totalSpent > 300 ? 2 : totalSpent > 100 ? 1 : 0),
      points:  remaining,
    };
    setTimeout(() => onFinish(upgraded), 700);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col max-w-md mx-auto overflow-hidden"
      style={{ background: "hsl(150 40% 5%)" }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 10%, rgba(74,222,128,0.06) 0%, transparent 55%)" }} />

      {/* Header */}
      <div className="relative z-10 pt-10 px-5 pb-4">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: C.muted }}>
          Сказание · Прокачка
        </p>
        <h1 className="font-heading font-bold text-2xl gold-text">Укрепи Богатыря</h1>
        <p className="font-body text-sm text-muted-foreground">Распредели заработанные баллы</p>
      </div>

      {/* Hero + points */}
      <div className="relative z-10 px-5 mb-4">
        <div className="game-card p-4 rune-border flex items-center gap-4">
          <img src={hero.img} alt={hero.name}
            className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
            style={{ boxShadow: `0 0 16px ${hero.rarityColor}40` }} />
          <div className="flex-1">
            <p className="font-heading font-bold text-lg leading-tight" style={{ color: hero.rarityColor }}>{hero.name}</p>
            <p className="font-body text-xs text-muted-foreground mb-2">{hero.title} · Ур. {hero.level}</p>
            {/* Points display */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(74,222,128,0.1)" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(remaining / hero.points) * 100}%`, background: `linear-gradient(90deg, ${C.forest}, ${C.moss})` }} />
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-body text-xs text-muted-foreground">Потрачено: {totalSpent}</span>
              <span className="font-heading font-bold text-sm" style={{ color: remaining > 0 ? C.moss : "#f87171" }}>
                ✦ {remaining} баллов
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade sliders */}
      <div className="relative z-10 flex-1 px-5 space-y-3 overflow-y-auto pb-4">
        {(Object.entries(STAT_META) as [StatKey, typeof STAT_META[StatKey]][]).map(([key, meta]) => {
          const current = hero[key];
          const bonus = gained(key);
          const costPer = meta.costPer;
          return (
            <div key={key} className="game-card p-4 rune-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{meta.icon}</span>
                  <div>
                    <p className="font-heading font-bold text-sm" style={{ color: meta.color }}>{meta.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{costPer} баллов за +1</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-xl" style={{ color: meta.color }}>
                    {current}
                    {bonus > 0 && <span className="text-sm ml-1" style={{ color: C.moss }}>+{bonus}</span>}
                  </p>
                  {bonus > 0 && (
                    <p className="font-heading text-sm font-bold" style={{ color: C.moss }}>→ {current + bonus}</p>
                  )}
                </div>
              </div>

              {/* Stat bar */}
              <div className="h-2 w-full rounded-full overflow-hidden mb-3" style={{ background: "rgba(74,222,128,0.08)" }}>
                <div className="h-full rounded-full transition-all duration-300 relative"
                  style={{ width: `${Math.min(100, current + bonus)}%`, background: meta.color }}>
                  {bonus > 0 && (
                    <div className="absolute right-0 top-0 h-full rounded-full"
                      style={{ width: `${(bonus / (current + bonus)) * 100}%`, background: "rgba(255,255,255,0.35)" }} />
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button onClick={() => remove(key)} disabled={!canRemove(key)}
                  className="w-10 h-10 rounded-xl font-heading font-bold text-xl flex items-center justify-center transition-all"
                  style={{
                    background: canRemove(key) ? "rgba(74,222,128,0.1)" : "rgba(74,222,128,0.03)",
                    border: `1px solid ${canRemove(key) ? "rgba(74,222,128,0.3)" : "rgba(74,222,128,0.08)"}`,
                    color: canRemove(key) ? meta.color : "rgba(74,222,128,0.2)",
                  }}>
                  −
                </button>
                <div className="flex-1 flex gap-1 justify-center">
                  {[...Array(Math.min(10, spent[key] + (canAdd(key) ? 1 : 0)))].map((_, i) => (
                    <div key={i} onClick={() => i < spent[key] ? undefined : add(key)}
                      className="h-2 flex-1 rounded-full transition-all duration-200 cursor-pointer"
                      style={{ background: i < spent[key] ? meta.color : "rgba(74,222,128,0.1)", maxWidth: 16 }} />
                  ))}
                </div>
                <button onClick={() => add(key)} disabled={!canAdd(key)}
                  className="w-10 h-10 rounded-xl font-heading font-bold text-xl flex items-center justify-center transition-all"
                  style={{
                    background: canAdd(key) ? `linear-gradient(135deg, ${C.forest}, #14532d)` : "rgba(74,222,128,0.03)",
                    border: `1px solid ${canAdd(key) ? C.moss + "50" : "rgba(74,222,128,0.08)"}`,
                    color: canAdd(key) ? "#dcfce7" : "rgba(74,222,128,0.2)",
                  }}>
                  +
                </button>
              </div>
            </div>
          );
        })}

        {/* Summary */}
        {totalSpent > 0 && (
          <div className="game-card p-3 animate-fade-in"
            style={{ border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)" }}>
            <p className="font-heading text-xs tracking-widest uppercase text-center mb-2" style={{ color: C.muted }}>
              Итог улучшений
            </p>
            <div className="flex justify-around">
              {(Object.entries(spent) as [StatKey, number][]).filter(([, v]) => v > 0).map(([key, pts]) => (
                <div key={key} className="text-center">
                  <p className="text-lg">{STAT_META[key].icon}</p>
                  <p className="font-heading font-bold text-sm" style={{ color: STAT_META[key].color }}>+{pts}</p>
                  <p className="font-body text-xs text-muted-foreground">{STAT_META[key].label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="relative z-10 px-5 pb-10 pt-3 flex-shrink-0">
        <button onClick={handleConfirm}
          className="w-full py-4 rounded-2xl font-heading tracking-widest text-base font-bold transition-all"
          style={{
            background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`,
            color: "#052e16",
            boxShadow: `0 0 25px ${C.moss}25`,
            opacity: confirming ? 0.7 : 1,
          }}>
          {confirming ? "Применяю улучшения..." : "Получить карточку богатыря →"}
        </button>
        {remaining > 0 && totalSpent === 0 && (
          <p className="text-center font-body text-xs mt-2" style={{ color: C.muted }}>
            У тебя {hero.points} баллов — распредели их выше
          </p>
        )}
      </div>
    </div>
  );
}
