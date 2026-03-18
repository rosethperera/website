import { useEffect, useMemo, useState } from "react";

const projects = [
  {
    slug: "carbon-aware-ai-scheduler",
    label: "Software + Sustainability",
    title: "Carbon-Aware AI Scheduler",
    summary:
      "Built a Python-based scheduler that identifies lower-emission execution windows for AI workloads using live grid carbon-intensity forecasts and workload constraints.",
    lead:
      "A Python-based scheduler that uses live grid carbon-intensity forecasts and GPU energy estimates to recommend lower-emission execution windows for AI workloads.",
    overview:
      "This project explored how AI workloads can be scheduled more responsibly by considering when electricity on the grid is cleaner. The scheduler evaluates forecasted carbon intensity, runtime constraints, and deadlines to identify strong candidate windows for execution.",
    bullets: [
      "Fetched live carbon-intensity forecast data for candidate execution windows.",
      "Integrated NVIDIA GPU power profiling with nvidia-smi.",
      "Estimated energy usage and translated it into emissions-aware scheduling decisions.",
      "Produced ranked schedule alternatives and estimated emissions savings through a CLI workflow.",
    ],
    technologies:
      "Python, CLI tooling, forecast data integration, NVIDIA GPU profiling, emissions analysis",
    impact:
      "The project combines software engineering with sustainability by showing how infrastructure decisions can reduce emissions without ignoring practical constraints like runtime and deadlines.",
    dates: "Feb 2026 - Apr 2026",
  },
  {
    slug: "battery-telemetry",
    label: "Embedded Systems",
    title: "Battery Telemetry - State of Charge Tracking",
    summary:
      "Designed a 24V LiFePO4 telemetry system using ADC measurements, signal conditioning, real-time state-of-charge estimation, and Jetson logging.",
    lead:
      "A 24V LiFePO4 telemetry system built to measure battery voltage and current, estimate state of charge in real time, and stream data to an NVIDIA Jetson.",
    overview:
      "This project focused on making battery health and usage more visible through telemetry. It involved combining sensing hardware, signal conditioning, and software logic to track state of charge and detect battery swaps.",
    bullets: [
      "Measured battery voltage and current using ADCs and signal conditioning.",
      "Implemented real-time state-of-charge estimation logic.",
      "Added battery-swap detection for more reliable tracking behavior.",
      "Streamed telemetry over UART to an NVIDIA Jetson for logging and analysis.",
    ],
    technologies:
      "Embedded telemetry, ADCs, signal conditioning, UART communication, NVIDIA Jetson, battery monitoring",
    impact:
      "The project demonstrates a strong hardware-software connection: taking real measurements from a physical battery system and converting them into useful, trackable operating information.",
    dates: "Sep 2025 - May 2026",
  },
  {
    slug: "vex-competition-rover",
    label: "Robotics",
    title: "VEX Competition Rover",
    summary:
      "Led the design and build of a competition rover with conveyor intake and internal storage, refining reliability through iterative testing.",
    lead:
      "A competition rover project centered on mechanical design, build execution, and repeated testing to improve intake, storage, and reliability.",
    overview:
      "This rover was designed for VEX competition use and required balancing mechanism design, internal packaging, and consistent performance under match conditions.",
    bullets: [
      "Led design and build of the rover platform.",
      "Created a conveyor intake and internal storage mechanism.",
      "Improved reliability through iterative testing and redesign.",
      "Troubleshot issues throughout the season to keep the robot competitive.",
    ],
    technologies:
      "Robotics build and testing, mechanical iteration, prototyping, team coordination",
    impact:
      "The project reflects hands-on engineering problem solving: build something, test it, identify weaknesses, and improve it until it performs reliably in a competitive setting.",
    dates: "Aug 2024 - May 2025",
  },
];

const experience = [
  {
    dates: "May 2026 - Aug 2026",
    location: "Seattle, WA",
    title: "Software Development Engineer Intern - Amazon.com Services LLC",
    description:
      "Selected for the Amazon Future Engineer software development internship program, with internship placement at SEA24 in Seattle for Summer 2026.",
  },
  {
    dates: "Aug 2025 - Nov 2025",
    location: "Madison, WI",
    title: "Food Service Worker - University of Wisconsin-Madison Housing",
    description:
      "Supported high-volume dining operations through food preparation, customer service, and sanitation in a fast-paced campus environment.",
  },
  {
    dates: "Mar 2024 - Aug 2025",
    location: "Park Ridge, IL",
    title: "Deck Supervisor / Lifeguard - Goldfish Swim School",
    description:
      "Supervised pool deck operations and enforced safety procedures in a high-attendance facility while supporting a safe, organized environment.",
  },
  {
    dates: "Jun 2024 - Jun 2025",
    location: "Park Ridge, IL",
    title: "Lifeguard - Park Ridge Country Club",
    description:
      "Maintained swimmer safety and enforced pool regulations during daily operations, with consistent attention to risk prevention and response.",
  },
  {
    dates: "Nov 2021 - Sep 2023",
    location: "Colombo, Sri Lanka",
    title: "Volunteer Project Leader - Teens Who Care Sri Lanka",
    description:
      "Led student teams to raise funds and deliver supplies to rural schools during an economic crisis, coordinating people and resources around a meaningful mission.",
  },
];

function getRouteFromHash(hash) {
  const cleanHash = hash.replace(/^#/, "");
  if (!cleanHash || cleanHash === "/") return { type: "home", section: "" };
  if (cleanHash === "resume-page") return { type: "resume" };
  if (cleanHash.startsWith("project/")) return { type: "project", slug: cleanHash.slice("project/".length) };
  return { type: "home", section: cleanHash.replace(/^\//, "") };
}

function useHashRoute() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  });
}

function useScrollToSection(section) {
  useEffect(() => {
    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(section);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [section]);
}

function App() {
  const route = useHashRoute();
  useReveal();

  if (route.type === "resume") {
    return <ResumePage />;
  }

  if (route.type === "project") {
    const project = projects.find((item) => item.slug === route.slug);
    return <ProjectPage project={project} />;
  }

  return <HomePage section={route.section} />;
}

function Header({ interior = false }) {
  const links = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#resume", label: "Resume" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <header className="topbar">
      <a className="brand" href={interior ? "#" : "#hero"}>
        <span className="brand-mark">RP</span>
        <span className="brand-text">Roseth Perera</span>
      </a>
      <nav className="nav">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HomePage({ section }) {
  useScrollToSection(section);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero section" id="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Electrical Engineering Student</p>
            <h1>Engineering practical systems with a builder&apos;s mindset and a clear sense of impact.</h1>
            <p className="hero-text">
              I&apos;m Roseth Perera, an Electrical Engineering student at the University
              of Wisconsin-Madison with hands-on experience across software, battery
              telemetry, robotics, and energy-aware systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://www.linkedin.com/in/roseth-perera" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="button button-secondary" href="https://github.com/rosethperera" target="_blank" rel="noreferrer">GitHub</a>
              <a className="button button-secondary" href="#resume">Resume</a>
              <a className="button button-secondary" href="mailto:rosethbinuwara@gmail.com">Email</a>
            </div>
          </div>

          <aside className="hero-panel reveal">
            <div className="hero-card">
              <p className="card-label">Current Focus</p>
              <h2>Software, energy systems, and robotics projects grounded in real-world constraints.</h2>
              <ul className="highlights">
                <li>Incoming Software Development Engineer Intern at Amazon for Summer 2026</li>
                <li>Electrical Engineering B.S. with an energy sustainability minor</li>
                <li>Projects spanning carbon-aware scheduling, battery telemetry, and robotics</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="section" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">About</p>
            <h2>Technical depth, hands-on execution, and steady follow-through.</h2>
          </div>
          <div className="about-grid">
            <div className="panel reveal">
              <p>
                I&apos;m currently studying Electrical Engineering at the University of
                Wisconsin-Madison, along with a minor in Engineering for Energy
                Sustainability. My coursework includes programming, computer engineering,
                physics, calculus, and introductory electrical engineering.
              </p>
            </div>
            <div className="panel reveal">
              <p>
                I like building systems that connect software with hardware, especially
                when they involve measurement, optimization, or physical devices. That
                has led me to work on battery telemetry, emissions-aware scheduling, and
                competitive robotics.
              </p>
            </div>
            <div className="panel reveal">
              <p>
                Beyond technical work, I bring leadership experience from lifeguarding,
                volunteer work, and student activities. I care about being dependable,
                learning quickly, and contributing well on a team.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading reveal">
            <p className="eyebrow">Projects</p>
            <h2>Each project opens into its own page with deeper technical detail.</h2>
          </div>
          <div className="cards-grid">
            {projects.map((project) => (
              <a className="card reveal card-link" key={project.slug} href={`#project/${project.slug}`}>
                <p className="card-label">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="card-cta">View project details</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>Experience spanning software, operations, safety, and leadership.</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item reveal" key={`${item.title}-${item.dates}`}>
                <div className="timeline-meta">
                  <span>{item.dates}</span>
                  <span>{item.location}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading reveal">
            <p className="eyebrow">Skills</p>
            <h2>Technical foundations backed by hands-on project and leadership experience.</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-group reveal">
              <h3>Programming</h3>
              <ul>
                <li>Java</li>
                <li>Python</li>
                <li>CLI Workflows</li>
                <li>Data Handling</li>
              </ul>
            </div>
            <div className="skill-group reveal">
              <h3>Tools</h3>
              <ul>
                <li>MATLAB</li>
                <li>Fusion 360</li>
                <li>Microsoft Office</li>
                <li>NVIDIA Jetson / GPU Tooling</li>
              </ul>
            </div>
            <div className="skill-group reveal">
              <h3>Technical & Languages</h3>
              <ul>
                <li>CAD Design, Prototyping, Soldering, PCB Fundamentals</li>
                <li>Robotics Build & Testing</li>
                <li>English, Sinhala</li>
                <li>Tamil (Elementary)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="resume">
          <div className="resume-banner reveal">
            <div>
              <p className="eyebrow">Resume</p>
              <h2>See the resume online or open the original PDF.</h2>
              <p>
                The site includes a web version for quick reading and the uploaded PDF
                for a familiar resume format.
              </p>
            </div>
            <div className="stacked-actions">
              <a className="button button-primary" href="#resume-page">View Resume Page</a>
              <a className="button button-secondary" href="./Roseth-Perera-Resume.pdf" target="_blank" rel="noreferrer">Open PDF Resume</a>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-heading reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s connect about internships, engineering opportunities, or projects.</h2>
          </div>
          <div className="contact-panel reveal">
            <p>
              Reach me by email or connect through LinkedIn and GitHub. I&apos;m especially
              interested in software, embedded systems, robotics, and sustainability-focused engineering work.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:rosethbinuwara@gmail.com">rosethbinuwara@gmail.com</a>
              <a className="button button-secondary" href="https://www.linkedin.com/in/roseth-perera" target="_blank" rel="noreferrer">Message on LinkedIn</a>
              <a className="button button-secondary" href="https://github.com/rosethperera" target="_blank" rel="noreferrer">GitHub Profile</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="resume-page-wrapper">
      <main className="resume-page">
        <header className="resume-header">
          <div>
            <p className="eyebrow">Resume</p>
            <h1 className="resume-title">Roseth Perera</h1>
            <p>
              Electrical Engineering student with interests in software, embedded systems,
              robotics, and energy-aware engineering.
            </p>
          </div>
          <div>
            <p>(815) 582-0961</p>
            <p>rosethbinuwara@gmail.com</p>
            <p>linkedin.com/in/roseth-perera</p>
            <p>github.com/rosethperera</p>
          </div>
        </header>

        <section className="resume-block">
          <h2>Professional Summary</h2>
          <p>
            Electrical Engineering student at the University of Wisconsin-Madison with
            hands-on experience in software development, battery telemetry, robotics, and
            energy-focused systems. Brings a practical builder mindset, strong follow-through,
            and leadership experience across technical and service roles.
          </p>
        </section>

        <section className="resume-block">
          <h2>Education</h2>
          <article className="resume-item">
            <div className="resume-item-header">
              <h3>University of Wisconsin-Madison</h3>
              <p>Aug 2025 - May 2029</p>
            </div>
            <p>B.S. Electrical Engineering, Minor in Engineering for Energy Sustainability</p>
            <p>
              Relevant Coursework: CS 200 (Programming I), ECE 252 (Intro to Computer
              Engineering), Physics 201, AP Physics C, AP Calculus BC, ECE 210 (Intro to
              Electrical Engineering)
            </p>
          </article>
        </section>

        <section className="resume-block">
          <h2>Experience</h2>
          {experience.map((item) => (
            <article className="resume-item" key={`${item.title}-${item.dates}`}>
              <div className="resume-item-header">
                <h3>{item.title}</h3>
                <p>{item.dates}</p>
              </div>
              <ul className="resume-list">
                <li>{item.description}</li>
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-block">
          <h2>Projects</h2>
          {projects.map((project) => (
            <article className="resume-item" key={project.slug}>
              <div className="resume-item-header">
                <h3>{project.title}</h3>
                <p>{project.dates}</p>
              </div>
              <ul className="resume-list">
                {project.bullets.slice(0, 3).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-block">
          <h2>Skills</h2>
          <p>Programming: Java, Python</p>
          <p>Tools: MATLAB, Fusion 360, Microsoft Office</p>
          <p>Technical: CAD Design, Prototyping, Robotics Build & Testing, Soldering, PCB Fundamentals</p>
          <p>Languages: English (Fluent), Sinhala (Fluent), Tamil (Elementary)</p>
        </section>

        <section className="resume-block">
          <h2>Activities</h2>
          <p>
            Wisconsin Robotics (Electrical Team) - Member, Engineers Without Borders -
            Member, Robotics Team (High School) - Captain, Varsity Water Polo (High School) -
            Captain, Math Team (High School) - Captain
          </p>
        </section>

        <div className="resume-actions">
          <a className="button button-primary" href="#">Back to Portfolio</a>
          <a className="button button-secondary" href="./Roseth-Perera-Resume.pdf" target="_blank" rel="noreferrer">Open PDF</a>
          <button className="button button-secondary" type="button" onClick={() => window.print()}>Print Resume</button>
        </div>
      </main>
    </div>
  );
}

function ProjectPage({ project }) {
  if (!project) {
    return (
      <div className="site-shell project-page">
        <Header interior />
        <section className="section">
          <h1>Project not found.</h1>
          <div className="hero-actions">
            <a className="button button-primary" href="#">Back home</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="site-shell project-page">
      <Header interior />
      <main>
        <section className="section">
          <p className="eyebrow">Project Detail</p>
          <h1 className="project-title">{project.title}</h1>
          <p className="project-lead">{project.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Back to Projects</a>
            <a className="button button-secondary" href="https://github.com/rosethperera" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <section className="section project-grid">
          <article className="panel">
            <p className="card-label">Overview</p>
            <p>{project.overview}</p>
          </article>
          <article className="panel">
            <p className="card-label">Key Work</p>
            <ul className="project-list">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
          <article className="panel">
            <p className="card-label">Technologies</p>
            <p>{project.technologies}</p>
          </article>
          <article className="panel">
            <p className="card-label">Why It Matters</p>
            <p>{project.impact}</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
