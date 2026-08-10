// Lightweight window metadata (title/icon/position/size) kept separate from
// the component registry so content windows can reference it without a
// circular import back to windowRegistry.jsx.
import { featuredProjects } from "../data/content";

const projectIcons = {
  amazon: "⚡",
  aeolus: "🌬️",
  "carbon-aware-ai-scheduler": "🌎",
  "eco-dispatch": "🔋",
  "battery-telemetry": "🔌",
};

const projectEntries = Object.fromEntries(
  featuredProjects.map((project, index) => [
    `project-${project.slug}`,
    {
      title: `${project.title} — Properties`,
      icon: projectIcons[project.slug] || "📁",
      width: 520,
      defaultX: 240 + index * 12,
      defaultY: 96 + index * 10,
      statusText: project.date,
    },
  ])
);

export const windowMeta = {
  about: {
    title: "ROSETH.exe - About Me",
    icon: "🖥️",
    width: 480,
    defaultX: 150,
    defaultY: 64,
    statusText: "Ready",
  },
  mybuilds: {
    title: "My Builds",
    icon: "📁",
    width: 430,
    defaultX: 520,
    defaultY: 120,
    statusText: "5 objects",
  },
  ...projectEntries,
  experience: {
    title: "Experience.doc - Work History",
    icon: "📄",
    width: 560,
    defaultX: 190,
    defaultY: 90,
    statusText: "7 entries",
  },
  resume: {
    title: "resume.pdf - Adobe Reader",
    icon: "📄",
    width: 620,
    defaultX: 170,
    defaultY: 60,
    statusText: "Ready",
  },
  contact: {
    title: "Contact Me - New Message",
    icon: "✉️",
    width: 420,
    defaultX: 400,
    defaultY: 160,
    statusText: "Ready",
  },
  skills: {
    title: "System Properties",
    icon: "⚙️",
    width: 480,
    defaultX: 260,
    defaultY: 100,
    statusText: "Ready",
  },
  awards: {
    title: "Awards.doc - Honors",
    icon: "🏆",
    width: 480,
    defaultX: 280,
    defaultY: 110,
    statusText: "4 awards",
  },
  mycomputer: {
    title: "My Computer",
    icon: "🖥️",
    width: 460,
    defaultX: 220,
    defaultY: 80,
    statusText: "6 drives",
  },
  recyclebin: {
    title: "Recycle Bin",
    icon: "🗑️",
    width: 400,
    defaultX: 300,
    defaultY: 140,
    statusText: "3 items",
  },
  tetris: {
    title: "Tetris.exe",
    icon: "🎮",
    width: 400,
    defaultX: 260,
    defaultY: 70,
    statusText: "Ready",
    menuItems: null,
  },
  pacman: {
    title: "Pac-Man.exe",
    icon: "🟡",
    width: 320,
    defaultX: 320,
    defaultY: 90,
    statusText: "Ready",
    menuItems: null,
  },
};
