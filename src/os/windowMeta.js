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
      title: `${project.title} - Properties`,
      icon: projectIcons[project.slug] || "📁",
      width: 560,
      minWidth: 440,
      minHeight: 360,
      defaultX: 240 + index * 12,
      defaultY: 96 + index * 10,
      statusText: project.date,
      menuItems: [
        { label: "File", targetId: `browser-repo-${project.slug}` },
        { label: "Edit", targetId: `notepad-${project.slug}` },
        { label: "View", targetId: `browser-live-${project.slug}` },
        { label: "Help", targetId: `mail-${project.slug}` },
      ],
    },
  ])
);

// Fake-browser windows (File → repo, View → live deployment) and the fake
// mail composer (Help), one pair/one entry per project.
const browserAndMailEntries = {};
featuredProjects.forEach((project, index) => {
  browserAndMailEntries[`browser-repo-${project.slug}`] = {
    title: `${project.title} - Repository`,
    icon: "🐙",
    width: 640,
    height: 480,
    minWidth: 420,
    minHeight: 340,
    defaultX: 200 + index * 16,
    defaultY: 80 + index * 12,
    statusText: "Done",
    menuItems: null,
  };
  browserAndMailEntries[`browser-live-${project.slug}`] = {
    title: `${project.title} - Live Site`,
    icon: "🌐",
    width: 640,
    height: 480,
    minWidth: 420,
    minHeight: 340,
    defaultX: 220 + index * 16,
    defaultY: 90 + index * 12,
    statusText: "Done",
    menuItems: null,
  };
  browserAndMailEntries[`mail-${project.slug}`] = {
    title: `New Message - ${project.title}`,
    icon: "✉️",
    width: 480,
    minWidth: 380,
    minHeight: 340,
    defaultX: 260 + index * 16,
    defaultY: 100 + index * 12,
    statusText: "Ready",
    menuItems: ["File", "Edit", "Insert", "Format"],
  };
  browserAndMailEntries[`notepad-${project.slug}`] = {
    title: `${project.title} - Notepad`,
    icon: "🗒️",
    width: 460,
    minWidth: 360,
    minHeight: 340,
    defaultX: 240 + index * 16,
    defaultY: 110 + index * 12,
    statusText: "Public notes",
    menuItems: ["File", "Edit", "Format", "View", "Help"],
  };
});

export const windowMeta = {
  about: {
    title: "ROSETH.exe - About Me",
    icon: "🖥️",
    width: 540,
    minWidth: 400,
    minHeight: 320,
    defaultX: 150,
    defaultY: 64,
    statusText: "Ready",
  },
  mybuilds: {
    title: "My Builds",
    icon: "📁",
    width: 480,
    minWidth: 360,
    minHeight: 280,
    defaultX: 520,
    defaultY: 120,
    statusText: "5 objects",
  },
  ...projectEntries,
  ...browserAndMailEntries,
  experience: {
    title: "Experience.doc - Work History",
    icon: "📄",
    width: 620,
    minWidth: 440,
    minHeight: 360,
    defaultX: 190,
    defaultY: 90,
    statusText: "7 entries",
  },
  resume: {
    title: "resume.pdf - Adobe Reader",
    icon: "📄",
    width: 680,
    minWidth: 460,
    minHeight: 420,
    defaultX: 170,
    defaultY: 60,
    statusText: "Ready",
  },
  contact: {
    title: "Contact Me - New Message",
    icon: "✉️",
    width: 470,
    minWidth: 380,
    minHeight: 320,
    defaultX: 400,
    defaultY: 160,
    statusText: "Ready",
  },
  skills: {
    title: "System Properties",
    icon: "⚙️",
    width: 540,
    minWidth: 400,
    minHeight: 340,
    defaultX: 260,
    defaultY: 100,
    statusText: "Ready",
  },
  awards: {
    title: "Awards.doc - Honors",
    icon: "🏆",
    width: 540,
    minWidth: 400,
    minHeight: 340,
    defaultX: 280,
    defaultY: 110,
    statusText: "4 awards",
  },
  mycomputer: {
    title: "My Computer",
    icon: "🖥️",
    width: 510,
    minWidth: 360,
    minHeight: 300,
    defaultX: 220,
    defaultY: 80,
    statusText: "6 drives",
  },
  recyclebin: {
    title: "Recycle Bin",
    icon: "🗑️",
    width: 440,
    minWidth: 360,
    minHeight: 280,
    defaultX: 300,
    defaultY: 140,
    statusText: "3 items",
  },
  tetris: {
    title: "Tetris.exe",
    icon: "🎮",
    width: 460,
    height: 620,
    minWidth: 440,
    minHeight: 560,
    defaultX: 260,
    defaultY: 70,
    statusText: "Ready",
    menuItems: null,
    openMaximized: true,
  },
  pacman: {
    title: "Pac-Man.exe",
    icon: "🟡",
    width: 360,
    height: 560,
    minWidth: 300,
    minHeight: 420,
    defaultX: 320,
    defaultY: 90,
    statusText: "Ready",
    menuItems: null,
    openMaximized: true,
  },
};
