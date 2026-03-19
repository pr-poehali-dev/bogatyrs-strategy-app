import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "home" | "heroes" | "inventory" | "shop";

const HERO_IMG_1 = "https://cdn.poehali.dev/projects/e15b018a-f237-42dc-87a3-3d9e8ab0a300/files/aa7b128f-1bb8-49cd-b4f0-aaa8ba582f76.jpg";
const HERO_IMG_2 = "https://cdn.poehali.dev/projects/e15b018a-f237-42dc-87a3-3d9e8ab0a300/files/48c01b86-4254-44a7-8a38-06185593ccfe.jpg";

const heroes = [
  {
    id: 1,
    name: "Илья Муромец",
    title: "Богатырь Киевский",
    role: "Воин",
    rarity: "Легендарный",
    rarityColor: "#F5C842",
    level: 24,
    power: 4820,
    hp: 85,
    attack: 72,
    defense: 91,
    combo: 3,
    img: HERO_IMG_1,
    skills: ["Богатырский удар", "Щит Руси", "Трезубец"],
    active: true,
  },
  {
    id: 2,
    name: "Добрыня Никитич",
    title: "Змееборец",
    role: "Маг",
    rarity: "Эпический",
    rarityColor: "#A855F7",
    level: 19,
    power: 3640,
    hp: 62,
    attack: 88,
    defense: 55,
    combo: 4,
    img: HERO_IMG_2,
    skills: ["Огненный вихрь", "Заклятие змеи", "Огонь-комбо"],
    active: true,
  },
  {
    id: 3,
    name: "Алёша Попович",
    title: "Хитрец",
    role: "Лучник",
    rarity: "Редкий",
    rarityColor: "#3B82F6",
    level: 15,
    power: 2910,
    hp: 58,
    attack: 95,
    defense: 40,
    combo: 5,
    img: HERO_IMG_1,
    skills: ["Меткий выстрел", "Ловушка", "Стрела-комбо"],
    active: false,
  },
];

const inventoryItems = [
  { id: 1, name: "Меч Кладенец", type: "Оружие", rarity: "Легендарный", color: "#F5C842", icon: "Sword", power: "+340 Атака", equipped: true },
  { id: 2, name: "Щит Богатырский", type: "Броня", rarity: "Эпический", color: "#A855F7", icon: "Shield", power: "+210 Защита", equipped: true },
  { id: 3, name: "Зелье Силы", type: "Расходник", rarity: "Редкий", color: "#3B82F6", icon: "FlaskConical", power: "+50% к урону", equipped: false },
  { id: 4, name: "Кольчуга Стальная", type: "Броня", rarity: "Редкий", color: "#3B82F6", icon: "Shield", power: "+120 Защита", equipped: false },
  { id: 5, name: "Лук Тугой", type: "Оружие", rarity: "Обычный", color: "#6B7280", icon: "Target", power: "+180 Атака", equipped: false },
  { id: 6, name: "Руна Молнии", type: "Артефакт", rarity: "Эпический", color: "#A855F7", icon: "Zap", power: "+25% Крит. Удар", equipped: false },
];

const shopItems = [
  { id: 1, name: "Набор Богатыря", desc: "Снаряжение + 500 монет", price: "99 ₽", tag: "Хит продаж", tagColor: "#FF4E1A" },
  { id: 2, name: "Кристаллы x100", desc: "Премиальная валюта", price: "49 ₽", tag: "Выгодно", tagColor: "#F5C842" },
  { id: 3, name: "Свиток Героя", desc: "Призыв нового богатыря", price: "300 💎", tag: null, tagColor: "" },
  { id: 4, name: "Зелья x10", desc: "Восстановление здоровья", price: "150 💎", tag: "Скидка 30%", tagColor: "#22C55E" },
  { id: 5, name: "Сундук Артефактов", desc: "5 случайных артефактов", price: "500 💎", tag: null, tagColor: "" },
  { id: 6, name: "Боевой пропуск", desc: "Эксклюзивные награды", price: "199 ₽", tag: "Новинка", tagColor: "#A855F7" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedHero, setSelectedHero] = useState(heroes[0]);
  const [battlePhase, setBattlePhase] = useState<"idle" | "attack" | "combo">("idle");

  const triggerBattle = () => {
    setBattlePhase("attack");
    setTimeout(() => setBattlePhase("combo"), 600);
    setTimeout(() => setBattlePhase("idle"), 1400);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative select-none">
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ background: "linear-gradient(180deg, hsl(234 30% 8%) 80%, transparent)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F5C842, #C8981A)" }}
          >
            <span className="text-sm">⚔️</span>
          </div>
          <span className="font-heading font-bold text-lg tracking-wider gold-text">БОГАТЫРИ</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full rune-border">
            <span className="text-sm">💎</span>
            <span className="font-heading font-bold text-sm text-gold-DEFAULT" style={{ color: "#F5C842" }}>1,240</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full rune-border">
            <span className="text-sm">🪙</span>
            <span className="font-heading font-bold text-sm" style={{ color: "#F5C842" }}>8,420</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28 px-4">

        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="animate-fade-in space-y-5 pt-2">
            {/* Hero showcase */}
            <div className="game-card rune-border p-4 relative overflow-hidden" style={{ minHeight: 220 }}>
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: "radial-gradient(ellipse at 80% 20%, #F5C842 0%, transparent 60%)" }}
              />
              <div className="flex gap-4 relative z-10">
                <div className="relative flex-shrink-0">
                  <img
                    src={selectedHero.img}
                    alt={selectedHero.name}
                    className="w-28 h-36 object-cover rounded-xl"
                    style={{ boxShadow: `0 0 20px ${selectedHero.rarityColor}40` }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded text-xs font-heading font-bold"
                    style={{
                      background: selectedHero.rarityColor,
                      color: selectedHero.rarityColor === "#F5C842" ? "#0D0E1A" : "#fff",
                    }}
                  >
                    {selectedHero.rarity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body text-muted-foreground mb-0.5">{selectedHero.title}</p>
                  <h2 className="font-heading font-bold text-xl leading-tight gold-text">{selectedHero.name}</h2>
                  <div className="flex items-center gap-2 mt-1 mb-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-body"
                      style={{ background: "rgba(255,78,26,0.2)", color: "#FF7A4D" }}
                    >
                      {selectedHero.role}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">Ур. {selectedHero.level}</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { label: "HP", val: selectedHero.hp, color: "#22C55E" },
                      { label: "АТК", val: selectedHero.attack, color: "#FF4E1A" },
                      { label: "ЗЩТ", val: selectedHero.defense, color: "#3B82F6" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="text-xs font-heading w-7 text-muted-foreground">{s.label}</span>
                        <div className="stat-bar flex-1">
                          <div className="stat-bar-fill" style={{ width: `${s.val}%`, background: s.color }} />
                        </div>
                        <span className="text-xs font-heading font-bold w-6 text-right" style={{ color: s.color }}>
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-body">Боевая сила</span>
                  <span className="font-heading font-bold text-base gold-text">⚡ {selectedHero.power.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-body">Комбо</span>
                  {Array.from({ length: selectedHero.combo }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "linear-gradient(135deg, #F5C842, #C8981A)" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Battle button */}
            <button
              onClick={triggerBattle}
              className={`btn-ember w-full py-4 rounded-2xl text-xl font-heading tracking-widest transition-all duration-200 ${battlePhase === "attack" ? "scale-95" : battlePhase === "combo" ? "scale-105" : ""}`}
              style={{
                boxShadow:
                  battlePhase !== "idle"
                    ? "0 0 40px rgba(255,78,26,0.6)"
                    : "0 4px 20px rgba(255,78,26,0.3)",
              }}
            >
              {battlePhase === "idle" && "⚔️ В БОЙ"}
              {battlePhase === "attack" && "💥 АТАКА!"}
              {battlePhase === "combo" && "🔥 КОМБО!"}
            </button>

            {/* Skills */}
            <div>
              <h3 className="font-heading font-semibold text-sm tracking-wider text-muted-foreground uppercase mb-3">
                Навыки
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedHero.skills.map((skill, i) => (
                  <div key={i} className="game-card p-3 text-center cursor-pointer hover:border-gold/40 transition-all">
                    <div className="text-2xl mb-1">{i === 0 ? "⚔️" : i === 1 ? "🛡️" : "🔥"}</div>
                    <p className="text-xs font-body leading-tight text-foreground/80">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily quests */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-sm tracking-wider text-muted-foreground uppercase">
                  Ежедневные задания
                </h3>
                <span className="text-xs font-body" style={{ color: "#F5C842" }}>2/4</span>
              </div>
              <div className="space-y-2">
                {[
                  { task: "Выиграть 3 битвы", reward: "300💎", done: true },
                  { task: "Улучшить снаряжение", reward: "150💎", done: true },
                  { task: "Призвать героя", reward: "500💎", done: false },
                  { task: "Посетить магазин", reward: "50💎", done: false },
                ].map((q, i) => (
                  <div key={i} className="game-card flex items-center gap-3 px-4 py-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${q.done ? "bg-green-500" : "border border-border"}`}
                    >
                      {q.done && <Icon name="Check" size={12} className="text-white" />}
                    </div>
                    <span className={`font-body text-sm flex-1 ${q.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {q.task}
                    </span>
                    <span className="font-heading font-bold text-xs" style={{ color: "#F5C842" }}>{q.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HEROES TAB */}
        {activeTab === "heroes" && (
          <div className="animate-fade-in space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-2xl gold-text">Богатыри</h2>
              <span className="text-sm font-body text-muted-foreground">{heroes.length}/20 героев</span>
            </div>

            {/* Active squad */}
            <div className="game-card p-4 rune-border">
              <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Активный отряд</h3>
              <div className="flex gap-3">
                {heroes.filter((h) => h.active).map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => setSelectedHero(hero)}
                    className="flex-1 relative rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      border: selectedHero.id === hero.id ? `2px solid ${hero.rarityColor}` : "2px solid transparent",
                      boxShadow: selectedHero.id === hero.id ? `0 0 15px ${hero.rarityColor}50` : "none",
                    }}
                  >
                    <img src={hero.img} alt={hero.name} className="w-full h-24 object-cover" />
                    <div
                      className="absolute bottom-0 left-0 right-0 px-1.5 py-1"
                      style={{ background: "linear-gradient(0deg, rgba(13,14,26,0.95), transparent)" }}
                    >
                      <p className="font-heading text-xs font-bold truncate">{hero.name}</p>
                      <p className="font-body text-xs text-muted-foreground">Ур. {hero.level}</p>
                    </div>
                  </button>
                ))}
                <div className="flex-1 rounded-xl border-2 border-dashed border-border flex items-center justify-center h-24 cursor-pointer hover:border-gold/40 transition-colors">
                  <Icon name="Plus" size={20} className="text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* All heroes */}
            <div className="grid grid-cols-1 gap-3">
              {heroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => setSelectedHero(hero)}
                  className="game-card p-4 flex gap-4 text-left transition-all duration-200 w-full"
                  style={{
                    border: selectedHero.id === hero.id ? `1px solid ${hero.rarityColor}60` : undefined,
                    boxShadow: selectedHero.id === hero.id ? `0 0 20px ${hero.rarityColor}15` : undefined,
                  }}
                >
                  <img src={hero.img} alt={hero.name} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-heading font-bold text-base leading-tight">{hero.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{hero.title}</p>
                      </div>
                      <span
                        className="text-xs font-heading font-bold px-2 py-0.5 rounded ml-2"
                        style={{ background: hero.rarityColor + "20", color: hero.rarityColor }}
                      >
                        {hero.rarity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-body text-xs" style={{ color: "#FF7A4D" }}>{hero.role}</span>
                      <span className="font-body text-xs text-muted-foreground">Ур. {hero.level}</span>
                      <span className="font-heading text-xs font-bold" style={{ color: "#F5C842" }}>
                        ⚡ {hero.power.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {hero.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded font-body"
                          style={{
                            background: "rgba(245,200,66,0.08)",
                            color: "#F5C842",
                            border: "1px solid rgba(245,200,66,0.15)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === "inventory" && (
          <div className="animate-fade-in space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-2xl gold-text">Инвентарь</h2>
              <span className="text-sm font-body text-muted-foreground">{inventoryItems.length}/50</span>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Все", "Оружие", "Броня", "Артефакт", "Расходник"].map((f, i) => (
                <button
                  key={i}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-heading tracking-wide transition-all"
                  style={
                    i === 0
                      ? { background: "linear-gradient(135deg, #F5C842, #C8981A)", color: "#0D0E1A" }
                      : { background: "hsl(234 25% 12%)", color: "hsl(234 15% 55%)", border: "1px solid hsl(234 20% 20%)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Equipped */}
            <div>
              <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Надето</h3>
              <div className="grid grid-cols-2 gap-2">
                {inventoryItems.filter((it) => it.equipped).map((item) => (
                  <div key={item.id} className="game-card p-3 relative rune-border">
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500" />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: item.color + "20" }}
                    >
                      <Icon name={item.icon} size={20} style={{ color: item.color }} fallback="Package" />
                    </div>
                    <p className="font-heading font-bold text-sm leading-tight">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{item.type}</p>
                    <p className="font-heading text-xs font-bold mt-1" style={{ color: "#22C55E" }}>{item.power}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-divider" />

            {/* All items */}
            <div>
              <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Все предметы</h3>
              <div className="grid grid-cols-2 gap-2">
                {inventoryItems.filter((it) => !it.equipped).map((item) => (
                  <div key={item.id} className="game-card p-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: item.color + "15" }}
                    >
                      <Icon name={item.icon} size={20} style={{ color: item.color }} fallback="Package" />
                    </div>
                    <p className="font-heading font-bold text-sm leading-tight">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{item.type}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-heading text-xs font-bold" style={{ color: item.color }}>{item.rarity}</span>
                      <button className="btn-gold text-xs px-2 py-1 rounded">Надеть</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SHOP TAB */}
        {activeTab === "shop" && (
          <div className="animate-fade-in space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-2xl gold-text">Магазин</h2>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">💎</span>
                <span className="font-heading font-bold text-sm" style={{ color: "#F5C842" }}>1,240</span>
              </div>
            </div>

            {/* Featured banner */}
            <div
              className="game-card p-5 relative overflow-hidden rune-border"
              style={{ background: "linear-gradient(135deg, #1E1030, #2A1060)" }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20 flex items-center justify-center text-7xl">
                ⚔️
              </div>
              <div className="relative z-10">
                <span
                  className="text-xs font-heading tracking-widest uppercase px-2 py-0.5 rounded mb-2 inline-block"
                  style={{ background: "#FF4E1A", color: "#fff" }}
                >
                  Специальное предложение
                </span>
                <h3 className="font-heading font-bold text-xl gold-text mb-1">Набор Легенды</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">Легендарное снаряжение + 1000 💎</p>
                <button className="btn-gold px-6 py-2.5 rounded-xl text-sm">Купить за 199 ₽</button>
              </div>
            </div>

            {/* Shop grid */}
            <div className="grid grid-cols-2 gap-3">
              {shopItems.map((item) => (
                <div key={item.id} className="game-card p-4 relative overflow-hidden flex flex-col">
                  {item.tag && (
                    <div
                      className="absolute top-0 right-0 text-xs font-heading font-bold px-2 py-1 rounded-bl-xl"
                      style={{ background: item.tagColor, color: item.tagColor === "#F5C842" ? "#0D0E1A" : "#fff" }}
                    >
                      {item.tag}
                    </div>
                  )}
                  <div className="text-3xl mb-2">🎁</div>
                  <p className="font-heading font-bold text-sm leading-tight mb-1">{item.name}</p>
                  <p className="font-body text-xs text-muted-foreground flex-1">{item.desc}</p>
                  <button className="btn-gold mt-3 py-2 rounded-lg text-xs w-full">{item.price}</button>
                </div>
              ))}
            </div>

            {/* Daily rotation */}
            <div className="game-card p-3 flex items-center gap-3">
              <div className="text-2xl">🔄</div>
              <div className="flex-1">
                <p className="font-heading font-bold text-sm">Ежедневная ротация</p>
                <p className="font-body text-xs text-muted-foreground">Обновление через</p>
              </div>
              <span className="font-heading text-sm font-bold" style={{ color: "#FF4E1A" }}>11:42:30</span>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-3 pb-4 pt-1"
        style={{ background: "linear-gradient(0deg, hsl(234 30% 8%) 70%, transparent)" }}
      >
        <div
          className="flex items-center justify-around rounded-2xl px-2 py-2"
          style={{ background: "hsl(234 25% 11%)", border: "1px solid hsl(234 20% 20%)" }}
        >
          {(
            [
              { id: "home", icon: "Home", label: "Главная" },
              { id: "heroes", icon: "Users", label: "Герои" },
              { id: "inventory", icon: "Package", label: "Инвентарь" },
              { id: "shop", icon: "ShoppingBag", label: "Магазин" },
            ] as { id: Tab; icon: string; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item flex-1 relative ${activeTab === tab.id ? "active" : ""}`}
            >
              {activeTab === tab.id && (
                <div
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: "#F5C842" }}
                />
              )}
              <Icon name={tab.icon} size={20} fallback="Circle" />
              <span className="text-xs font-heading tracking-wide">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}