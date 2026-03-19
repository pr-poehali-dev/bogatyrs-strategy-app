import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Splash from "./pages/Splash";
import HeroSelect from "./pages/HeroSelect";
import ARTasks from "./pages/ARTasks";
import Upgrade from "./pages/Upgrade";
import HeroCard from "./pages/HeroCard";

import { Hero, PlayerHero, GameScreen } from "./types/game";

const queryClient = new QueryClient();

function buildPlayer(hero: Hero): PlayerHero {
  return {
    ...hero,
    hp:      hero.baseHp,
    attack:  hero.baseAttack,
    defense: hero.baseDefense,
    level:   1,
    points:  0,
  };
}

const App = () => {
  const [screen, setScreen]     = useState<GameScreen>("splash");
  const [player, setPlayer]     = useState<PlayerHero | null>(null);

  const handleSplashEnter  = () => setScreen("hero-select");
  const handleHeroSelected = (hero: Hero) => { setPlayer(buildPlayer(hero)); setScreen("ar-tasks"); };
  const handleTasksDone    = (p: PlayerHero) => { setPlayer(p); setScreen("upgrade"); };
  const handleUpgradeDone  = (p: PlayerHero) => { setPlayer(p); setScreen("hero-card"); };
  const handleRestart      = () => { setPlayer(null); setScreen("splash"); };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {screen === "splash" && (
          <Splash onEnter={handleSplashEnter} />
        )}
        {screen === "hero-select" && (
          <HeroSelect onSelect={handleHeroSelected} />
        )}
        {screen === "ar-tasks" && player && (
          <ARTasks hero={player} onComplete={handleTasksDone} />
        )}
        {screen === "upgrade" && player && (
          <Upgrade hero={player} onFinish={handleUpgradeDone} />
        )}
        {screen === "hero-card" && player && (
          <HeroCard hero={player} onRestart={handleRestart} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
