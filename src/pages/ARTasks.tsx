import { useState, useRef } from "react";
import { PlayerHero, ARTask } from "@/types/game";
import { AR_TASKS } from "@/data/heroes";
import Icon from "@/components/ui/icon";

interface ARTasksProps {
  hero: PlayerHero;
  onComplete: (hero: PlayerHero) => void;
}

const C = {
  moss:   "#4ade80",
  rune:   "#86efac",
  forest: "#16a34a",
  muted:  "rgba(134,239,172,0.4)",
};

export default function ARTasks({ hero, onComplete }: ARTasksProps) {
  const [tasks, setTasks] = useState<ARTask[]>(AR_TASKS.map(t => ({ ...t })));
  const [inputCode, setInputCode] = useState("");
  const [activeTask, setActiveTask] = useState<ARTask | null>(null);
  const [scanning, setScanning] = useState(false);
  const [successAnim, setSuccessAnim] = useState<number | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.reward, 0);
  const allDone = tasks.every(t => t.completed);
  const completedCount = tasks.filter(t => t.completed).length;

  const handleScanCode = () => {
    setError("");
    const code = inputCode.trim().toUpperCase();
    const found = tasks.find(t => t.markerCode === code);

    if (!found) {
      setError("Метка не распознана. Проверь код и попробуй снова.");
      return;
    }
    if (found.completed) {
      setError("Это задание уже выполнено.");
      return;
    }

    setScanning(true);
    setActiveTask(found);

    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === found.id ? { ...t, completed: true } : t));
      setSuccessAnim(found.id);
      setScanning(false);
      setInputCode("");
      setTimeout(() => setSuccessAnim(null), 1500);
    }, 1200);
  };

  const handleFinish = () => {
    onComplete({ ...hero, points: hero.points + totalPoints });
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col max-w-md mx-auto overflow-hidden"
      style={{ background: "hsl(150 40% 5%)" }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.05) 0%, transparent 60%)" }} />

      {/* Header */}
      <div className="relative z-10 pt-10 px-5 pb-3">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: C.muted }}>
          AR · Возрождение
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl gold-text">Задания Сказания</h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Найди метки и введи код
            </p>
          </div>
          {/* Hero mini */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl rune-border">
            <img src={hero.img} alt={hero.name} className="w-8 h-10 object-cover rounded-lg" />
            <div>
              <p className="font-heading text-xs font-bold leading-tight" style={{ color: hero.rarityColor }}>{hero.name.split(" ")[0]}</p>
              <p className="font-body text-xs" style={{ color: C.moss }}>Ур. {hero.level}</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs font-body mb-1">
            <span style={{ color: C.muted }}>Прогресс: {completedCount}/{tasks.length}</span>
            <span className="font-heading font-bold" style={{ color: C.moss }}>✦ {totalPoints} баллов</span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(74,222,128,0.1)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(completedCount / tasks.length) * 100}%`, background: `linear-gradient(90deg, ${C.forest}, ${C.moss})`, boxShadow: `0 0 8px ${C.moss}60` }} />
          </div>
        </div>
      </div>

      {/* Scanner input */}
      <div className="relative z-10 px-5 mb-3">
        <div className="game-card p-3 rune-border">
          <p className="font-heading text-xs tracking-widest uppercase mb-2" style={{ color: C.muted }}>
            Введи код с метки
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={inputCode}
              onChange={e => { setInputCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleScanCode()}
              placeholder="AR-001"
              maxLength={6}
              className="flex-1 px-3 py-2.5 rounded-xl font-heading font-bold text-sm tracking-widest outline-none transition-all"
              style={{
                background: "rgba(74,222,128,0.05)",
                border: `1px solid ${error ? "#ef4444" : "rgba(74,222,128,0.2)"}`,
                color: C.moss,
                caretColor: C.moss,
              }}
            />
            <button onClick={handleScanCode}
              disabled={scanning || !inputCode}
              className="px-4 py-2.5 rounded-xl font-heading font-bold text-sm tracking-wider transition-all"
              style={{
                background: scanning ? "rgba(74,222,128,0.1)" : `linear-gradient(135deg, ${C.forest}, #14532d)`,
                color: scanning ? C.muted : "#dcfce7",
                border: `1px solid ${C.moss}40`,
                opacity: !inputCode ? 0.4 : 1,
              }}>
              {scanning ? (
                <span className="flex items-center gap-1">
                  <Icon name="Loader" size={14} className="animate-spin" />
                </span>
              ) : "Ввести"}
            </button>
          </div>
          {error && <p className="text-xs font-body mt-1.5" style={{ color: "#f87171" }}>{error}</p>}
          {scanning && activeTask && (
            <p className="text-xs font-body mt-1.5 animate-fade-in" style={{ color: C.moss }}>
              ✦ Распознаю метку «{activeTask.title}»...
            </p>
          )}
        </div>
      </div>

      {/* Task list */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 space-y-2 pb-4">
        {tasks.map((task) => (
          <div key={task.id}
            className="game-card p-4 transition-all duration-500"
            style={{
              border: successAnim === task.id
                ? `1px solid ${C.moss}80`
                : task.completed
                ? `1px solid rgba(74,222,128,0.2)`
                : "1px solid rgba(74,222,128,0.08)",
              boxShadow: successAnim === task.id ? `0 0 20px ${C.moss}30` : "none",
              opacity: task.completed ? 0.7 : 1,
            }}>
            <div className="flex items-center gap-3">
              {/* Status icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: task.completed ? `${C.forest}40` : "rgba(74,222,128,0.06)", border: `1px solid ${task.completed ? C.moss + "40" : "rgba(74,222,128,0.1)"}` }}>
                {task.completed ? "✅" : task.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-heading font-bold text-sm ${task.completed ? "line-through" : ""}`}
                    style={{ color: task.completed ? C.muted : "hsl(140 60% 90%)" }}>
                    {task.title}
                  </p>
                  <span className="font-body text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(74,222,128,0.07)", color: C.muted, border: "1px solid rgba(74,222,128,0.1)" }}>
                    {task.markerCode}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {task.description}
                </p>
              </div>
              {/* Reward */}
              <div className="flex-shrink-0 text-right">
                <p className="font-heading font-bold text-base" style={{ color: task.completed ? C.muted : C.moss }}>
                  +{task.reward}
                </p>
                <p className="font-body text-xs text-muted-foreground">баллов</p>
              </div>
            </div>
            {successAnim === task.id && (
              <div className="mt-2 text-center animate-fade-in">
                <p className="font-heading text-sm font-bold" style={{ color: C.moss }}>
                  ✦ Задание выполнено! +{task.reward} баллов
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="relative z-10 px-5 pb-10 pt-2 flex-shrink-0">
        {allDone ? (
          <button onClick={handleFinish}
            className="w-full py-4 rounded-2xl font-heading tracking-widest text-base font-bold animate-fade-in"
            style={{
              background: `linear-gradient(135deg, ${C.forest}, ${C.moss})`,
              color: "#052e16",
              boxShadow: `0 0 30px ${C.moss}30`,
            }}>
            Прокачать богатыря → {totalPoints} баллов
          </button>
        ) : (
          <div className="text-center">
            <p className="font-body text-xs" style={{ color: C.muted }}>
              Выполни все задания чтобы прокачать богатыря
            </p>
            <p className="font-heading text-sm font-bold mt-1" style={{ color: C.moss }}>
              Осталось: {tasks.length - completedCount} задания
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
