import { featuredProjects } from "../data/content";
import { windowMeta } from "./windowMeta";
import AboutWindow from "../windows/AboutWindow";
import MyBuildsWindow from "../windows/MyBuildsWindow";
import ProjectWindow from "../windows/ProjectWindow";
import ExperienceWindow from "../windows/ExperienceWindow";
import ResumeWindow from "../windows/ResumeWindow";
import ContactWindow from "../windows/ContactWindow";
import SkillsWindow from "../windows/SkillsWindow";
import AwardsWindow from "../windows/AwardsWindow";
import MyComputerWindow from "../windows/MyComputerWindow";
import RecycleBinWindow from "../windows/RecycleBinWindow";
import TetrisGame from "../games/TetrisGame";
import PacmanGame from "../games/PacmanGame";

const projectContent = Object.fromEntries(
  featuredProjects.map((project) => [
    `project-${project.slug}`,
    { ...windowMeta[`project-${project.slug}`], Content: ProjectWindow, contentProps: { slug: project.slug } },
  ])
);

export const windowRegistry = {
  about: { ...windowMeta.about, Content: AboutWindow },
  mybuilds: { ...windowMeta.mybuilds, Content: MyBuildsWindow },
  ...projectContent,
  experience: { ...windowMeta.experience, Content: ExperienceWindow },
  resume: { ...windowMeta.resume, Content: ResumeWindow, menuItems: ["File", "View", "Help"] },
  contact: { ...windowMeta.contact, Content: ContactWindow, menuItems: ["File", "Edit", "Insert"] },
  skills: { ...windowMeta.skills, Content: SkillsWindow },
  awards: { ...windowMeta.awards, Content: AwardsWindow },
  mycomputer: { ...windowMeta.mycomputer, Content: MyComputerWindow },
  recyclebin: { ...windowMeta.recyclebin, Content: RecycleBinWindow },
  tetris: { ...windowMeta.tetris, Content: TetrisGame, menuItems: null },
  pacman: { ...windowMeta.pacman, Content: PacmanGame, menuItems: null },
};
