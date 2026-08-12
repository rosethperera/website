import { featuredProjects } from "../data/content";
import { posts } from "../lib/posts";
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
import MinesweeperGame from "../games/MinesweeperGame";
import FakeBrowserWindow from "../windows/FakeBrowserWindow";
import MailComposerWindow from "../windows/MailComposerWindow";
import NotepadWindow from "../windows/NotepadWindow";
import WritingWindow from "../windows/WritingWindow";
import PostWindow from "../windows/PostWindow";
import DateTimeWindow from "../windows/DateTimeWindow";

const projectContent = Object.fromEntries(
  featuredProjects.map((project) => [
    `project-${project.slug}`,
    { ...windowMeta[`project-${project.slug}`], Content: ProjectWindow, contentProps: { slug: project.slug } },
  ])
);

const browserAndMailContent = {};
featuredProjects.forEach((project) => {
  browserAndMailContent[`browser-repo-${project.slug}`] = {
    ...windowMeta[`browser-repo-${project.slug}`],
    Content: FakeBrowserWindow,
    contentProps: { project, mode: "repo" },
  };
  browserAndMailContent[`browser-live-${project.slug}`] = {
    ...windowMeta[`browser-live-${project.slug}`],
    Content: FakeBrowserWindow,
    contentProps: { project, mode: "live" },
  };
  browserAndMailContent[`mail-${project.slug}`] = {
    ...windowMeta[`mail-${project.slug}`],
    Content: MailComposerWindow,
    contentProps: { project },
  };
  browserAndMailContent[`notepad-${project.slug}`] = {
    ...windowMeta[`notepad-${project.slug}`],
    Content: NotepadWindow,
    contentProps: { project },
  };
});

const postContent = Object.fromEntries(
  posts.map((post) => [
    `post-${post.slug}`,
    { ...windowMeta[`post-${post.slug}`], Content: PostWindow, contentProps: { slug: post.slug } },
  ])
);

export const windowRegistry = {
  datetime: { ...windowMeta.datetime, Content: DateTimeWindow },
  about: { ...windowMeta.about, Content: AboutWindow },
  mybuilds: { ...windowMeta.mybuilds, Content: MyBuildsWindow },
  ...projectContent,
  ...browserAndMailContent,
  writing: { ...windowMeta.writing, Content: WritingWindow },
  ...postContent,
  experience: { ...windowMeta.experience, Content: ExperienceWindow },
  resume: { ...windowMeta.resume, Content: ResumeWindow, menuItems: ["File", "View", "Help"] },
  contact: { ...windowMeta.contact, Content: ContactWindow, menuItems: ["File", "Edit", "Insert"] },
  skills: { ...windowMeta.skills, Content: SkillsWindow },
  awards: { ...windowMeta.awards, Content: AwardsWindow },
  mycomputer: { ...windowMeta.mycomputer, Content: MyComputerWindow },
  recyclebin: { ...windowMeta.recyclebin, Content: RecycleBinWindow },
  tetris: { ...windowMeta.tetris, Content: TetrisGame, menuItems: null },
  pacman: { ...windowMeta.pacman, Content: PacmanGame, menuItems: null },
  minesweeper: { ...windowMeta.minesweeper, Content: MinesweeperGame },
};
