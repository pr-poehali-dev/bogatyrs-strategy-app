export interface Hero {
  id: number;
  name: string;
  title: string;
  role: string;
  description: string;
  img: string;
  rarityColor: string;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  specialSkill: string;
  specialIcon: string;
}

export interface PlayerHero extends Hero {
  hp: number;
  attack: number;
  defense: number;
  level: number;
  points: number; // накопленные баллы
}

export interface ARTask {
  id: number;
  markerCode: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  completed: boolean;
}

export type GameScreen =
  | "splash"
  | "hero-select"
  | "ar-tasks"
  | "upgrade"
  | "hero-card";
