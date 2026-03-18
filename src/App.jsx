import { useEffect, useState } from "react";

const featuredProjects = [
  {
    slug: "carbon-aware-ai-scheduler",
    index: "01",
    title: "Carbon-Aware AI Scheduler",
    category: "Sustainable Infrastructure",
    summary:
      "A Python command-line project that fetches carbon-intensity forecasts from Electricity Maps, ranks lower-emission execution windows, and can estimate job energy from NVIDIA GPU power sampling before scheduling.",
    heroLabel: "Energy-aware computing",
    overview:
      "This project ranks lower-emission time windows for running an AI job by combining hourly carbon-intensity forecast data, optional deadline filtering, estimated job energy, and GPU power profiling. It can run end to end through a single runner script and uses forecast data for the US-MIDW-MISO grid region.",
    problem:
      "As AI systems scale, the energy and emissions behind compute matter more. Most scheduling decisions optimize only for speed or convenience, ignoring whether a workload could be run at a lower-emission time without breaking real constraints.",
    objective:
      "Build a practical workflow that can fetch live carbon forecasts, estimate emissions for candidate execution windows, and recommend lower-emission scheduling options without ignoring duration and deadline constraints.",
    role:
      "I built the Python CLI workflow, connected Electricity Maps forecast data, implemented emissions ranking logic, added optional deadline filtering, and integrated NVIDIA GPU power sampling through nvidia-smi to estimate job energy before scheduling.",
    stack: [
      "Python",
      "CLI tooling",
      "Electricity Maps API",
      "NVIDIA GPU profiling",
      "CSV forecast loading",
      "Scheduling logic",
    ],
    systemDesign: [
      "Fetch or load hourly carbon-intensity forecast data into a local CSV workflow.",
      "Estimate job energy either from manual input or GPU power sampling.",
      "Evaluate valid scheduling windows based on duration, deadline, and emissions impact.",
      "Rank top windows and report the emissions range between best and worst valid options.",
    ],
    process: [
      "Started by framing the decision problem around emissions and deadlines.",
      "Added data ingestion for forecasted grid carbon intensity.",
      "Connected energy estimation logic to the scheduling workflow.",
      "Iterated on ranking logic so output was useful, interpretable, and actionable.",
    ],
    challenges: [
      "Balancing real-world scheduling constraints with a sustainability objective.",
      "Turning raw energy and forecast information into decisions rather than just numbers.",
      "Keeping the workflow simple enough to explain clearly while still being technically meaningful.",
    ],
    results: [
      "Produced ranked schedule alternatives based on emissions-aware logic.",
      "Created a concrete example of how systems thinking can improve infrastructure decisions.",
      "Strengthened my interest in sustainable compute and future AI infrastructure engineering.",
    ],
    reflection:
      "If I continue this project, I would push it toward richer cost models, cleaner visualization, and deeper infrastructure assumptions around large-scale compute environments.",
    metrics: [
      "Forecast-driven scheduling for US-MIDW-MISO",
      "Manual energy input or NVIDIA GPU profiling",
      "Single runner script for end-to-end workflow",
    ],
    gallery: [
      "Placeholder for scheduler dashboard screenshot",
      "Placeholder for system architecture diagram",
      "Placeholder for forecast-versus-emissions graph",
    ],
    visual: "grid",
  },
  {
    slug: "battery-telemetry",
    index: "02",
    title: "Battery Telemetry System for Robotics",
    category: "Embedded Systems",
    summary:
      "An ESP32-based 24 V LiFePO4 battery monitoring system with current sensing, voltage-based state-of-charge estimation, battery swap detection, and real-time communication to a Jetson controller.",
    heroLabel: "Embedded telemetry",
    overview:
      "This project focused on making battery behavior easier to monitor in a robotics context. It combines ESP32-based sensing, current and voltage monitoring, state-of-charge estimation, battery swap detection, and real-time telemetry streaming to a Jetson controller for power management and safety.",
    problem:
      "Robotics systems depend heavily on reliable battery information, but raw voltage and current readings are not enough on their own. A better telemetry layer is needed to understand operating behavior and support smarter decisions.",
    objective:
      "Design a battery telemetry system that can measure voltage and current, estimate state of charge in real time, detect swaps, and stream usable information for logging and analysis.",
    role:
      "I contributed to the battery monitoring system design, current and voltage telemetry flow, state-of-charge estimation approach, battery swap detection logic, and real-time communication to the Jetson controller.",
    stack: [
      "Battery sensing",
      "ESP32",
      "ADCs",
      "Signal conditioning",
      "UART communication",
      "NVIDIA Jetson",
      "Embedded logic",
    ],
    systemDesign: [
      "Measure battery voltage and current through ADC-based sensing.",
      "Use an ESP32-based telemetry flow to process sensing data in real time.",
      "Process readings through signal conditioning and state estimation logic.",
      "Detect battery swap events for more reliable tracking behavior.",
      "Transmit telemetry data to an NVIDIA Jetson controller for logging, power management, and analysis.",
    ],
    process: [
      "Defined the telemetry goals around visibility, reliability, and real-time usefulness.",
      "Built the sensing and estimation flow around battery state tracking.",
      "Added swap detection and communication features to improve robustness.",
      "Refined the system around clearer telemetry output and operating insight.",
    ],
    challenges: [
      "Designing around noisy real-world measurement conditions.",
      "Estimating battery state in a way that stays useful over time.",
      "Making the telemetry meaningful for downstream robotics logging and analysis.",
    ],
    results: [
      "Built a telemetry concept that connects hardware sensing with useful operating data.",
      "Created a stronger embedded systems project with clear robotics relevance.",
      "Reinforced my interest in intelligent monitoring and engineering systems with measurable real-world impact.",
    ],
    reflection:
      "Next steps would include better visualization, longer-duration testing, and deeper validation against real battery behavior under varied operating loads.",
    metrics: [
      "ESP32-based 24 V LiFePO4 monitoring",
      "Real-time voltage/current telemetry",
      "Jetson communication for power management",
    ],
    gallery: [
      "Placeholder for battery telemetry hardware photo",
      "Placeholder for wiring or sensor diagram",
      "Placeholder for logged voltage/current graph",
    ],
    visual: "battery",
  },
  {
    slug: "vex-competition-rover",
    index: "03",
    title: "VEX Competition Rover",
    category: "Robotics",
    summary:
      "A competition rover build focused on mechanical design, conveyor intake, internal storage, and iterative reliability improvements through testing and redesign.",
    heroLabel: "Robotics systems",
    overview:
      "This project centered on designing and refining a rover platform for VEX competition. It required balancing mechanism design, packaging, control practicality, and repeatable performance under real match conditions.",
    problem:
      "Competition robots have to do more than just function once. They need mechanisms that perform repeatedly, survive iteration, and stay reliable under pressure.",
    objective:
      "Design and build a rover platform with effective intake and storage capabilities while improving reliability through repeated testing and redesign.",
    role:
      "I led design and build efforts, worked on the conveyor intake and storage mechanism, and contributed through iterative troubleshooting and improvement across the season.",
    stack: [
      "Mechanical prototyping",
      "Robotics build and testing",
      "Design iteration",
      "Competition systems thinking",
    ],
    systemDesign: [
      "Developed the rover platform around intake, internal storage, and practical reliability.",
      "Iterated on physical packaging and mechanism performance.",
      "Tested, identified failure points, and refined the build over time.",
      "Focused on competition-ready repeatability rather than one-off success.",
    ],
    process: [
      "Built early mechanisms and tested under realistic conditions.",
      "Observed weaknesses in intake, storage, and reliability.",
      "Adjusted the design through repeated redesign cycles.",
      "Refined toward stronger consistency across the season.",
    ],
    challenges: [
      "Translating a concept into a physical system that performs consistently.",
      "Managing the tradeoffs between packaging, mechanism function, and reliability.",
      "Improving the build fast enough to stay useful in a competition environment.",
    ],
    results: [
      "Delivered a rover design with a conveyor intake and internal storage mechanism.",
      "Improved reliability through iterative engineering rather than guesswork.",
      "Built experience in hands-on systems thinking, prototyping, and rapid testing.",
    ],
    reflection:
      "If I keep developing this kind of work, I want to push harder into instrumented robotics systems where hardware behavior and telemetry are tied together more directly.",
    metrics: [
      "Iterative redesign through real testing",
      "Mechanism-focused competition build",
      "Hands-on robotics systems experience",
    ],
    gallery: [
      "Placeholder for rover hero image",
      "Placeholder for intake or storage close-up",
      "Placeholder for testing or competition photo",
    ],
    visual: "rover",
  },
];

const quickHighlights = [
  "UW-Madison",
  "Electrical Engineering",
  "Amazon Future Engineer",
  "Wisconsin Robotics",
  "Engineers Without Borders",
];

const skills = [
  {
    title: "Electrical / Hardware",
    items: [
      "Circuit analysis",
      "Sensors and measurement",
      "Breadboarding and prototyping",
      "Embedded interfacing",
      "Battery and power monitoring",
    ],
  },
  {
    title: "Software / Programming",
    items: ["Python", "Java", "MATLAB", "Git / GitHub", "CLI workflows"],
  },
  {
    title: "Engineering Tools",
    items: [
      "NVIDIA Jetson",
      "ADC-based data acquisition",
      "Fusion 360",
      "Instrumentation and testing workflows",
      "Technical documentation",
    ],
  },
  {
    title: "Technical Interests",
    items: [
      "Sustainable AI infrastructure",
      "Energy systems",
      "Data center engineering",
      "Embedded telemetry",
      "Robotics",
    ],
  },
];

const experience = [
  {
    title: "Design Team Member, Uganda Project",
    org: "Engineers Without Borders UW-Madison",
    date: "Jan 2026 - Present",
    bullets: [
      "Contributing on the design side of a project focused on real-world engineering needs.",
      "Building experience in collaborative engineering work with broader infrastructure relevance.",
    ],
  },
  {
    title: "Food Service Worker",
    org: "University of Wisconsin-Madison Housing",
    date: "Aug 2025 - Nov 2025",
    bullets: [
      "Supported high-volume dining operations in a fast-paced campus environment.",
      "Built consistency, reliability, and day-to-day operational discipline in a demanding setting.",
    ],
  },
  {
    title: "Deck Supervisor / Lifeguard",
    org: "Goldfish Swim School",
    date: "Mar 2024 - Aug 2025",
    bullets: [
      "Supervised pool deck operations and enforced safety procedures in a high-attendance environment.",
      "Strengthened leadership, responsibility, and quick decision-making under real-time pressure.",
    ],
  },
  {
    title: "Lifeguard",
    org: "Park Ridge Country Club",
    date: "Jun 2024 - Jun 2025",
    bullets: [
      "Maintained swimmer safety and operating standards during daily pool operations.",
      "Developed composure, accountability, and situational awareness in a safety-critical role.",
    ],
  },
  {
    title: "Electrical Team Member",
    org: "University of Wisconsin-Madison",
    date: "Aug 2025 - Present",
    bullets: [
      "Developed an ESP32-based 24 V LiFePO4 battery monitoring system with current sensing and voltage-based state-of-charge estimation.",
      "Implemented battery swap detection and real-time communication to a Jetson controller for power management and safety.",
    ],
  },
  {
    title: "Volunteer Project Leader",
    org: "Teens Who Care Sri Lanka",
    date: "2021 - 2023",
    bullets: [
      "Led student teams coordinating fundraising and support for rural schools during an economic crisis.",
      "Built leadership experience through logistics, communication, and mission-driven execution.",
    ],
  },
];

const timeline = [
  {
    title: "Sri Lanka to the U.S.",
    text:
      "Carried resilience, adaptability, and a wider perspective into my education and engineering goals.",
  },
  {
    title: "High School Robotics + Leadership",
    text:
      "Started building confidence through team leadership, competition, and hands-on technical work.",
  },
  {
    title: "UW-Madison Electrical Engineering",
    text:
      "Building a stronger foundation in circuits, systems, programming, and engineering problem solving.",
  },
  {
    title: "Amazon Future Engineer Scholarship",
    text:
      "A meaningful milestone that reinforced my long-term commitment to engineering and technical growth.",
  },
  {
    title: "Long-Term Direction",
    text:
      "Sustainable AI infrastructure, energy-aware systems, embedded monitoring, and future data center engineering.",
  },
];

const currentInterests = [
  "Sustainable data centers",
  "Energy-aware systems",
  "Embedded telemetry",
  "Infrastructure engineering",
  "Robotics reliability",
];

const principles = [
  "Efficiency",
  "Reliability",
  "Systems thinking",
  "Measurable impact",
  "Clarity",
];

function getRouteFromHash(hash) {
  const cleanHash = hash.replace(/^#/, "");
  if (!cleanHash || cleanHash === "/") return { type: "home", section: "" };
  if (cleanHash === "resume-page") return { type: "resume" };
  if (cleanHash.startsWith("project/")) {
    return { type: "project", slug: cleanHash.slice("project/".length) };
  }
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

function useReveal(deps) {
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
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [deps]);
}

function useScrollToSection(section) {
  useEffect(() => {
    if (!section) return;
    const target = document.getElementById(section);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [section]);
}

function App() {
  const route = useHashRoute();
  useReveal(`${route.type}:${route.section ?? ""}:${route.slug ?? ""}`);

  if (route.type === "resume") return <ResumePage />;
  if (route.type === "project") {
    const project = featuredProjects.find((item) => item.slug === route.slug);
    return <ProjectPage project={project} />;
  }

  return <HomePage section={route.section} />;
}

function Header({ interior = false }) {
  const links = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="topbar">
      <a className="brand" href="#hero">
        <span className="brand-mark" />
        <span className="brand-copy">
          <strong>Roseth Perera</strong>
          <span>Electrical Engineering Portfolio</span>
        </span>
      </a>
      <nav className="nav" aria-label="Primary">
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
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <Header />
      <main>
        <section className="hero section" id="hero">
          <div className="hero-panel reveal">
            <p className="eyebrow">Future electrical engineer</p>
            <h1>Roseth Perera</h1>
            <h2 className="hero-title">Electrical Engineering Student at UW-Madison</h2>
            <p className="hero-text">
              Focused on energy systems, sustainable infrastructure, and the future of
              low-carbon computing.
            </p>
            <p className="hero-subtext">
              I&apos;m interested in the electrical systems behind large-scale technology,
              especially where energy, infrastructure, and sustainability intersect. My
              long-term goal is to help build computing systems that continue to scale
              without ignoring their environmental cost.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Projects
              </a>
              <a className="button button-secondary" href="#resume-page">
                View Resume
              </a>
              <a
                className="button button-secondary"
                href="https://www.linkedin.com/in/roseth-perera"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/rosethperera"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="button button-secondary" href="mailto:rosethbinuwara@gmail.com">
                Contact
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-grid-pattern" aria-hidden="true" />
            <div className="hero-visual-card">
              <span>Engineering direction</span>
              <p>Sustainable AI infrastructure</p>
            </div>
            <div className="hero-visual-card">
              <span>Core modes</span>
              <p>Energy systems, embedded telemetry, robotics</p>
            </div>
            <div className="hero-visual-card">
              <span>Long-term goal</span>
              <p>Large-scale, efficient, resilient technical systems</p>
            </div>
          </div>
        </section>

        <section className="credibility-strip reveal" aria-label="Highlights">
          {quickHighlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="section" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">My Story</p>
            <h2>The systems behind growth are what matter most to me.</h2>
          </div>
          <div className="two-column-grid">
            <article className="content-card reveal">
              <p>
                I&apos;m Roseth Perera, an Electrical Engineering student at the
                University of Wisconsin-Madison with interests in energy systems,
                sustainable infrastructure, robotics, and embedded technologies. My
                long-term goal is to work on the systems behind large-scale computing,
                especially data centers and electrical infrastructure, with a focus on
                reducing carbon impact and improving efficiency.
              </p>
            </article>
            <article className="content-card reveal">
              <p>
                Coming from Sri Lanka shaped the way I think about power and
                infrastructure. It gave me an early awareness that electricity is not
                something everyone experiences with the same level of stability or
                abundance. That perspective still shapes the kind of engineering problems
                I care about: systems that are resilient, efficient, and designed with
                long-term impact in mind.
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="direction">
          <div className="section-heading reveal">
            <p className="eyebrow">Engineering the Balance</p>
            <h2>Between technological growth and environmental responsibility.</h2>
          </div>
          <div className="mission-panel reveal">
            <p>
              I&apos;m interested in the future of technology not only in terms of what it
              can do, but in terms of what it requires. As computing continues to scale,
              especially in AI and large digital infrastructure, the systems behind it
              become just as important as the software running on top of it: power,
              cooling, energy use, and operational efficiency.
            </p>
            <p>
              That is where I see my direction. I want to work on the balance between
              continued technological growth and a more responsible environmental
              footprint by helping build infrastructure that is more efficient,
              lower-carbon, and designed with real physical constraints in mind.
            </p>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected Work</p>
            <h2>Projects across sustainable compute, telemetry, and robotics.</h2>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <a className="project-card reveal" key={project.slug} href={`#project/${project.slug}`}>
                <div className="project-card-top">
                  <span className="project-index">{project.index}</span>
                  <span className="project-tag">{project.category}</span>
                </div>
                <ProjectVisual type={project.visual} />
                <div className="project-copy">
                  <p className="card-label">{project.heroLabel}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-metrics">
                  {project.metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading reveal">
            <p className="eyebrow">Skills</p>
            <h2>Technical foundations, tools, and areas of interest.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <article className="content-card reveal" key={group.title}>
                <p className="card-label">{group.title}</p>
                <ul className="list-grid">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>Work, leadership, and engineering involvement.</h2>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article className="experience-card reveal" key={`${item.title}-${item.date}`}>
                <div className="experience-meta">
                  <p className="card-label">{item.org}</p>
                  <span>{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <ul className="list-grid">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="journey">
          <div className="section-heading reveal">
            <p className="eyebrow">Journey</p>
            <h2>The path shaping what I want to build next.</h2>
          </div>
          <div className="timeline-grid">
            {timeline.map((item) => (
              <article className="timeline-card reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="exploring">
          <div className="section-heading reveal">
            <p className="eyebrow">Current Focus</p>
            <h2>Areas I&apos;m actively building toward.</h2>
          </div>
          <div className="interest-layout">
            <div className="interest-grid reveal">
              {currentInterests.map((item) => (
                <article className="interest-pill" key={item}>
                  {item}
                </article>
              ))}
            </div>
            <article className="content-card reveal">
              <p className="card-label">Engineering Principles</p>
              <div className="principle-row">
                {principles.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="resume">
          <div className="resume-banner reveal">
            <div>
              <p className="eyebrow">Resume</p>
              <h2>Resume</h2>
              <p>
                The resume can be viewed inside the site and downloaded separately when
                you want the PDF version.
              </p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#resume-page">
                Resume Page
              </a>
              <a
                className="button button-secondary"
                href="./Roseth-Perera-Resume.pdf"
                download
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="contact-panel reveal">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Open to opportunities and conversations around energy, infrastructure, and systems.</h2>
              <p>
                I&apos;m especially interested in engineering roles connected to embedded
                systems, energy systems, sustainable infrastructure, robotics, and
                intelligent monitoring.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:rosethbinuwara@gmail.com">rosethbinuwara@gmail.com</a>
              <a href="https://www.linkedin.com/in/roseth-perera" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/rosethperera" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <footer className="footer reveal">
          <p>Roseth Perera</p>
          <div>
            <a href="mailto:rosethbinuwara@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/roseth-perera" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/rosethperera" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <span>Built with intention around engineering, sustainability, and systems thinking.</span>
        </footer>
      </main>
    </div>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-base" />
      {type === "grid" && (
        <>
          <div className="server server-a" />
          <div className="server server-b" />
          <div className="server server-c" />
          <div className="energy-arc" />
        </>
      )}
      {type === "battery" && (
        <>
          <div className="battery-pack" />
          <div className="battery-cap" />
          <div className="telemetry-chip" />
          <div className="signal-line" />
        </>
      )}
      {type === "rover" && (
        <>
          <div className="rover-body" />
          <div className="rover-top" />
          <div className="wheel wheel-1" />
          <div className="wheel wheel-2" />
          <div className="wheel wheel-3" />
          <div className="wheel wheel-4" />
        </>
      )}
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
            <a className="resume-home-link" href="#hero">
              <h1 className="resume-title">Roseth Perera</h1>
            </a>
            <p>
              Electrical Engineering student focused on sustainable infrastructure,
              embedded systems, robotics, and energy-aware engineering.
            </p>
          </div>
          <div className="resume-header-copy">
            <p>University of Wisconsin-Madison</p>
            <p>rosethbinuwara@gmail.com</p>
            <p>linkedin.com/in/roseth-perera</p>
            <p>github.com/rosethperera</p>
          </div>
        </header>

        <section className="resume-block">
          <h2>Summary</h2>
          <p>
            Electrical Engineering student at UW-Madison focused on the balance between
            technological growth and environmental responsibility, with long-term
            interests in sustainable infrastructure, energy systems, embedded
            technologies, robotics, and the future of computing infrastructure.
          </p>
        </section>

        <section className="resume-block">
          <h2>Resume Viewer</h2>
          <div className="resume-viewer-shell">
            <object
              className="resume-viewer"
              data="./Roseth-Perera-Resume.pdf"
              type="application/pdf"
            >
              <iframe
                className="resume-viewer"
                src="./Roseth-Perera-Resume.pdf"
                title="Roseth Perera Resume PDF"
              />
            </object>
          </div>
        </section>

        <div className="resume-actions">
          <a className="button button-primary" href="#hero">
            Back to Portfolio
          </a>
          <a
            className="button button-secondary"
            href="./Roseth-Perera-Resume.pdf"
            download
          >
            Download PDF
          </a>
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
            <a className="button button-primary" href="#">
              Back home
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="site-shell project-page">
      <Header interior />
      <main>
        <section className="section project-page-hero">
          <div className="project-page-copy">
            <p className="eyebrow">{project.category}</p>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-lead">{project.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Back to Projects
              </a>
              <a className="button button-secondary" href="mailto:rosethbinuwara@gmail.com">
                Contact
              </a>
            </div>
          </div>
          <ProjectVisual type={project.visual} />
        </section>

        <section className="section project-detail-grid">
          <DetailCard title="Overview" content={project.overview} />
          <DetailCard title="Problem" content={project.problem} />
          <DetailCard title="Objective" content={project.objective} />
          <DetailCard title="My Role" content={project.role} />
          <ListCard title="Technical Stack" items={project.stack} />
          <ListCard title="System Design" items={project.systemDesign} />
          <ListCard title="Process" items={project.process} />
          <ListCard title="Challenges" items={project.challenges} />
          <ListCard title="Results" items={project.results} />
          <ListCard title="Gallery" items={project.gallery} />
          <DetailCard title="Reflection" content={project.reflection} />
        </section>
      </main>
    </div>
  );
}

function DetailCard({ title, content }) {
  return (
    <article className="content-card">
      <p className="card-label">{title}</p>
      <p>{content}</p>
    </article>
  );
}

function ListCard({ title, items }) {
  return (
    <article className="content-card">
      <p className="card-label">{title}</p>
      <ul className="list-grid">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default App;
