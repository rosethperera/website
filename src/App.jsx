import { useEffect, useState } from "react";

const featuredProjects = [
  {
    slug: "carbon-aware-ai-scheduler",
    category: "Energy data and software",
    title: "Carbon-Aware AI Scheduler",
    impact:
      "A forecast-driven scheduling workflow that shows AI jobs do not have to run the moment they are queued; by ranking cleaner execution windows, it turns workload timing into a practical emissions lever.",
    summary:
      "Built around Electricity Maps carbon-intensity forecasts for US-MIDW-MISO, the workflow estimates job energy from manual input or NVIDIA GPU sampling, filters windows by duration and deadline, and surfaces the cleanest valid run times with quantified emissions deltas.",
    role:
      "I built the Python CLI workflow, connected forecast data, implemented the emissions-ranking logic, added deadline-aware filtering, and integrated NVIDIA GPU power sampling through nvidia-smi so the scheduling decision could start from observed workload behavior.",
    stack: ["Python", "Electricity Maps API", "pandas", "nvidia-smi", "CLI workflow"],
    systemDesign: [
      "Fetch or refresh hourly carbon-intensity forecast data for the target grid region and store it locally as CSV.",
      "Estimate job energy either from a manual kWh input or from sampled NVIDIA GPU power draw.",
      "Enumerate every valid execution window that fits the requested duration and deadline.",
      "Calculate average carbon intensity and total emissions for each candidate window, then rank the cleanest options.",
    ],
    challenges: [
      "Balancing real scheduling constraints such as deadlines and fixed-duration jobs with a sustainability objective.",
      "Turning raw forecast and GPU telemetry data into a scheduling recommendation that is easy to trust.",
      "Keeping the workflow lightweight and explainable while still feeling like a real systems decision tool.",
    ],
    results: [
      "Built an end-to-end CLI flow that fetches forecasts, estimates energy, ranks windows, and prints the cleanest valid schedules.",
      "Demonstrated that the sample 2.5 kWh, 2-hour job can vary by 29.4% emissions depending on when it runs.",
      "Created a concrete infrastructure example of carbon-aware computing rather than a purely conceptual sustainability idea.",
    ],
    reflection:
      "Next steps would include multi-region support, command-level workload profiling, cost-aware tradeoffs, and exportable outputs for automation or orchestration layers.",
    metrics: [
      "25 forecast hours scored per run",
      "29.4% emissions spread across valid 2-hour windows",
      "Manual input or NVIDIA GPU profiling for energy",
    ],
  },
  {
    slug: "eco-dispatch",
    category: "Sustainable infrastructure",
    title: "EcoDispatch",
    impact:
      "A comprehensive energy optimization platform that transforms data centers from energy consumers into sustainability leaders, achieving 15-35% carbon emission reductions while maintaining operational reliability and controlling costs.",
    summary:
      "EcoDispatch intelligently manages solar power, battery storage, and grid electricity combined with smart workload shifting to minimize data center carbon footprints. The platform uses multi-objective optimization algorithms to balance emissions, costs, and system constraints, featuring a real-time interactive dashboard, physics-based battery and solar models, and hardware integration capabilities.",
    role:
      "I designed the complete system architecture, implemented physics-based models for solar generation and battery degradation, developed multi-objective optimization algorithms using SciPy, built the interactive Streamlit dashboard, and integrated hardware monitoring with Arduino and Raspberry Pi for end-to-end validation.",
    stack: ["Python", "SciPy", "Pandas", "Streamlit", "Optimization", "Physics Models", "Arduino", "Raspberry Pi"],
    systemDesign: [
      "Multi-objective optimization balancing carbon emissions, electricity costs, and battery degradation",
      "Real-time energy dispatch routing solar, battery, and grid power based on carbon intensity forecasts",
      "Workload shifting algorithms that identify flexible compute jobs and move them to low-carbon hours",
      "Physics-based models for solar PV generation with weather effects and battery state-of-charge estimation",
      "Interactive web dashboard for parameter adjustment and real-time strategy comparison",
      "Hardware integration with Arduino battery monitoring and Raspberry Pi data collection",
    ],
    challenges: [
      "Implementing realistic physics models for solar generation and battery degradation that match real-world behavior",
      "Developing multi-objective optimization algorithms that effectively balance competing goals (carbon vs. cost vs. reliability)",
      "Creating an intuitive user interface that makes complex energy trade-offs understandable to non-experts",
      "Integrating time-series data from multiple APIs (carbon intensity, weather, electricity prices) with proper error handling",
      "Ensuring numerical stability in optimization algorithms while maintaining computational efficiency",
    ],
    results: [
      "Achieved 27% carbon emission reduction and 21% cost savings in simulation benchmarks",
      "Successfully shifted 1,800 kWh of flexible workloads to optimal low-carbon time windows",
      "Increased renewable energy utilization from 13% to 40% through intelligent dispatch",
      "Built a production-ready system with 98% test coverage and comprehensive documentation",
      "Created an interactive dashboard that enables real-time exploration of energy optimization strategies",
      "Demonstrated end-to-end capability from physics simulation to hardware integration",
    ],
    reflection:
      "The project successfully bridges the gap between theoretical optimization and practical deployment. Future enhancements could include machine learning for demand forecasting, multi-region optimization, and real-world data center partnerships for validation. The modular architecture makes it extensible for additional energy sources and optimization objectives.",
    metrics: [
      "27% carbon emission reduction demonstrated",
      "21% electricity cost savings achieved",
      "40% renewable energy utilization (3x baseline)",
      "1,800 kWh flexible workload shifting capability",
      "98% test coverage with 42 passing tests",
      "Real-time interactive dashboard deployment",
    ],
  },
  {
    slug: "battery-telemetry",
    category: "Embedded systems",
    title: "Battery Telemetry for Robotics",
    impact:
      "An ESP32-based monitoring system for a 24 V LiFePO4 battery pack designed around visibility, safety, and practical power management.",
    summary:
      "The system tracks voltage and current, supports voltage-based state-of-charge estimation, detects battery swaps, and streams telemetry to a Jetson controller for logging and decision-making.",
    role:
      "I contributed to the battery monitoring flow, current and voltage telemetry, state-of-charge estimation, battery swap detection logic, and real-time communication to the Jetson controller.",
    stack: ["ESP32", "UART", "Jetson", "LiFePO4", "ADC sensing", "Embedded telemetry"],
    systemDesign: [
      "Measure battery voltage and current through ADC-based sensing.",
      "Process readings through ESP32 telemetry logic in real time.",
      "Estimate state of charge and detect battery swap events.",
      "Transmit telemetry to a Jetson controller for logging and power-awareness decisions.",
    ],
    challenges: [
      "Designing around noisy real-world measurement conditions.",
      "Estimating battery state in a way that stays useful over time.",
      "Making telemetry meaningful for downstream robotics analysis.",
    ],
    results: [
      "Built a stronger embedded systems project with clear robotics relevance.",
      "Connected hardware sensing with useful operating data rather than raw numbers alone.",
      "Reinforced my interest in intelligent monitoring and engineering systems with measurable real-world impact.",
    ],
    reflection:
      "I would extend this with longer-duration testing, better visualization, and tighter validation against real battery behavior under load.",
    metrics: [
      "ESP32-based 24 V LiFePO4 monitoring",
      "Real-time voltage/current telemetry",
      "Jetson communication for power management",
    ],
  },
];

const highlights = [
  "UW-Madison Electrical Engineering",
  "Wisconsin Robotics",
  "Engineers Without Borders",
];

const experiences = [
  {
    title: "Electrical Team Member",
    org: "Wisconsin Robotics",
    date: "Aug 2025 - Present",
    text:
      "Developing battery monitoring, telemetry, and power-awareness systems that connect embedded sensing with real robotics operations.",
  },
  {
    title: "Design Team Member, Uganda Project",
    org: "Engineers Without Borders UW-Madison",
    date: "Jan 2026 - Present",
    text:
      "Contributing to engineering work that connects infrastructure thinking with broader questions of reliability, access, and real-world impact.",
  },
  {
    title: "Amazon Future Engineer Scholar",
    org: "Amazon",
    date: "2025",
    text:
      "Recognized for academic performance, leadership, and long-term potential in engineering and technology.",
  },
];

const professionalExperience = [
  {
    title: "Incoming Software Development Engineer Intern",
    org: "Amazon",
    date: "Summer 2026",
    text:
      "Joining Amazon as a Software Development Engineer Intern, adding software experience to a broader engineering path centered on systems, infrastructure, and long-term technical growth.",
  },
  {
    title: "Food Service Worker",
    org: "University of Wisconsin-Madison Housing",
    date: "Aug 2025 - Sep 2025",
    text:
      "Supported high-volume campus dining operations in a fast-paced environment, building consistency, reliability, and day-to-day operational discipline.",
  },
  {
    title: "Swim Instructor / Head Coach / Lifeguard",
    org: "Goldfish Swim School",
    date: "Mar 2024 - Aug 2025",
    text:
      "Led pool deck operations, taught swim lessons across different learning needs, and built leadership under real-time responsibility and safety pressure.",
  },
  {
    title: "Lifeguard",
    org: "Park Ridge Country Club",
    date: "Jun 2024 - Jun 2025",
    text:
      "Maintained safety standards, responded quickly in critical situations, and strengthened communication and accountability in a safety-focused environment.",
  },
  {
    title: "Volunteer Project Leader",
    org: "Teens Who Care Sri Lanka",
    date: "2021 - 2023",
    text:
      "Led student efforts supporting rural schools during an economic crisis, coordinating logistics, communication, and mission-driven project execution.",
  },
];

const awards = [
  {
    title: "Amazon Future Engineer Scholarship",
    date: "May 2025",
    text:
      "Awarded for academic excellence, leadership, and commitment to STEM, including long-term scholarship support and an Amazon internship pathway.",
  },
  {
    title: "Park Ridge Rotary Make a Difference Scholarship",
    date: "Apr 2025",
    text:
      "Recognized for leadership, empathy, work ethic, and community impact.",
  },
];

const skillGroups = [
  {
    title: "Engineering",
    items: ["Embedded systems", "Battery telemetry", "Instrumentation", "Prototyping", "Systems thinking"],
  },
  {
    title: "Programming",
    items: ["Python", "Java", "C/C++", "JavaScript", "Data workflows"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Arduino IDE", "APIs", "CAD", "Technical documentation"],
  },
  {
    title: "Focus Areas",
    items: ["Energy systems", "Sustainable infrastructure", "Robotics", "AI/data center operations", "Low-carbon computing"],
  },
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

function Header() {
  const links = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#vision", label: "Vision" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#hero">
        <span className="brand-mark" />
        <span className="brand-copy">
          <strong>Roseth Perera</strong>
          <span>Electrical Engineering Portfolio</span>
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary">
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
      <div className="background-grid" aria-hidden="true" />
      <div className="background-glow background-glow-one" aria-hidden="true" />
      <div className="background-glow background-glow-two" aria-hidden="true" />
      <Header />

      <main id="hero">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <p className="eyebrow">Building toward sustainable computing infrastructure</p>
            <h1>Roseth Perera</h1>
            <p className="hero-role">Electrical Engineering Student at UW-Madison</p>
            <p className="hero-summary">
              I&apos;m building toward a career at the intersection of energy,
              infrastructure, and intelligent systems, with a long-term focus on
              reducing carbon emissions and designing more sustainable
              data-center-scale technology.
            </p>

            <div className="hero-actions">
              <a className="action-chip action-chip-primary" href="#projects">
                Projects
              </a>
              <a className="action-chip" href="#resume-page">
                Resume
              </a>
              <a
                className="action-chip"
                href="https://www.linkedin.com/in/roseth-perera"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="action-chip"
                href="https://github.com/rosethperera"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="action-chip" href="mailto:rosethbinuwara@gmail.com">
                Contact
              </a>
            </div>

            <div className="hero-metrics">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-wave-field" aria-hidden="true" />
            <div className="orbital-shell" aria-hidden="true">
              <div className="orbital-ring orbital-ring-large" />
              <div className="orbital-ring orbital-ring-medium" />
              <div className="orbital-ring orbital-ring-small" />
              <div className="orbital-core">
                <span className="core-line core-line-left" />
                <span className="core-line core-line-right" />
              </div>
              <div className="orbit-node orbit-node-one" />
              <div className="orbit-node orbit-node-two" />
            </div>

            <div className="portrait-card">
              <img
                className="portrait-image"
                src="./1740278787950.jpg"
                alt="Portrait of Roseth Perera"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "grid";
                }}
              />
              <div className="portrait-fallback" aria-label="Portrait placeholder">
                <span>RP</span>
              </div>
              <div className="portrait-caption">
                <p className="eyebrow">Portrait</p>
                <p>Electrical Engineering student at UW-Madison.</p>
              </div>
            </div>

            <div className="hero-aside-card">
              <p className="eyebrow">Direction</p>
              <p>
                Electrical engineering, energy systems, and sustainable
                infrastructure for the next generation of computing.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section two-column" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">About</p>
            <h2>Background and direction.</h2>
          </div>
          <div className="section-panel story-panel reveal">
            <p>
              I grew up in Sri Lanka, where I saw more clearly than most people
              that power and infrastructure are not invisible background systems.
              When access is unstable, it changes how people live, learn, and
              move forward.
            </p>
            <p>
              That perspective shaped the way I think about engineering. I am
              interested not only in building new technology, but in building
              systems that are resilient, efficient, and responsible about the
              energy they require.
            </p>
            <p>
              At UW-Madison, I&apos;m exploring the intersection of electrical
              engineering, embedded systems, robotics, and computing
              infrastructure. Long term, I want to work on the balance between
              technological growth and environmental responsibility.
            </p>
          </div>
        </section>

        <section className="content-section" id="projects">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected Projects</p>
            <h2>Selected engineering projects.</h2>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <a className="project-card reveal" key={project.slug} href={`#project/${project.slug}`}>
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>{project.slug.toUpperCase()}</span>
                </div>
                <ProjectScene slug={project.slug} />
                <h3>{project.title}</h3>
                <p className="project-impact">{project.impact}</p>
                <p>{project.summary}</p>
                <ul className="tag-list">
                  {project.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section two-column" id="experience">
          <div className="section-heading reveal">
            <p className="eyebrow">Technical Experience</p>
            <h2>Technical roles and engineering involvement.</h2>
          </div>
          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-card reveal" key={`${item.title}-${item.date}`}>
                <div className="experience-meta">
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                </div>
                <p className="experience-org">{item.org}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section two-column" id="professional-experience">
          <div className="section-heading reveal">
            <p className="eyebrow">Professional Experience</p>
            <h2>Leadership, responsibility, and work experience outside core technical roles.</h2>
          </div>
          <div className="experience-list">
            {professionalExperience.map((item) => (
              <article className="experience-card reveal" key={`${item.title}-${item.date}`}>
                <div className="experience-meta">
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                </div>
                <p className="experience-org">{item.org}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section vision-section" id="vision">
          <div className="section-heading reveal">
            <p className="eyebrow">What I&apos;m Building Toward</p>
            <h2>Long-term technical direction.</h2>
          </div>
          <div className="section-panel vision-panel reveal">
            <p>
              I&apos;m especially interested in the infrastructure behind modern
              computing: power systems, energy optimization, embedded sensing,
              and large-scale technical operations.
            </p>
            <p>
              As AI and data-intensive systems continue to grow, the electrical
              and environmental demands behind them become harder to ignore. That
              is the challenge I want to move toward: helping build systems that
              are higher-performing, lower-carbon, and designed with a stronger
              awareness of long-term impact.
            </p>
          </div>
        </section>

        <section className="content-section" id="skills">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected Skills</p>
            <h2>Technical skills and focus areas.</h2>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card reveal" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="awards">
          <div className="section-heading reveal">
            <p className="eyebrow">Honors and Awards</p>
            <h2>Scholarships and academic recognition.</h2>
          </div>
          <div className="experience-list">
            {awards.map((item) => (
              <article className="experience-card reveal" key={item.title}>
                <div className="experience-meta">
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="resume">
          <div className="section-panel contact-panel reveal">
            <div>
              <p className="eyebrow">Resume</p>
              <h2>View the full resume inside the site or download the PDF directly.</h2>
            </div>
            <div className="hero-actions">
              <a className="action-chip action-chip-primary" href="#resume-page">
                Resume Page
              </a>
              <a className="action-chip" href="./Roseth-Perera-Resume.pdf" download>
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-heading reveal">
            <p className="eyebrow">Contact</p>
            <h2>Contact and links.</h2>
          </div>
          <div className="section-panel contact-panel reveal">
            <p>
              Interested in engineering, energy systems, sustainable
              infrastructure, or technical collaboration? I&apos;d love to connect.
            </p>
            <div className="contact-grid">
              <a href="mailto:rosethbinuwara@gmail.com">rosethbinuwara@gmail.com</a>
              <a href="https://www.linkedin.com/in/roseth-perera" target="_blank" rel="noreferrer">
                linkedin.com/in/roseth-perera
              </a>
              <a href="https://github.com/rosethperera" target="_blank" rel="noreferrer">
                github.com/rosethperera
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProjectScene({ slug }) {
  return (
    <div className={`project-scene project-scene-${slug}`} aria-hidden="true">
      {slug === "carbon-aware-ai-scheduler" && (
        <>
          <span className="scene-floor" />
          <span className="scene-server server-one" />
          <span className="scene-server server-two" />
          <span className="scene-server server-three" />
          <span className="scene-ring" />
        </>
      )}
      {slug === "battery-telemetry" && (
        <>
          <span className="scene-floor" />
          <span className="scene-battery" />
          <span className="scene-battery-cap" />
          <span className="scene-chip" />
          <span className="scene-wire" />
        </>
      )}
      {slug === "eco-dispatch" && (
        <>
          <span className="scene-floor" />
          <span className="scene-server server-one" />
          <span className="scene-server server-three" />
          <span className="scene-chip" />
          <span className="scene-wire" />
          <span className="scene-ring" />
        </>
      )}
    </div>
  );
}

function ResumePage() {
  return (
    <div className="site-shell resume-page-wrapper">
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
          <div className="resume-viewer-shell">
            <iframe
              className="resume-viewer"
              src="./Roseth-Perera-Resume.pdf#view=FitH"
              title="Roseth Perera Resume PDF"
            />
          </div>
        </section>

        <div className="resume-actions">
          <a className="action-chip action-chip-primary" href="#hero">
            Back to Portfolio
          </a>
          <a className="action-chip" href="./Roseth-Perera-Resume.pdf" download>
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
      <div className="site-shell">
        <Header />
        <section className="content-section">
          <h1>Project not found.</h1>
          <div className="hero-actions">
            <a className="action-chip action-chip-primary" href="#hero">
              Back home
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <div className="background-glow background-glow-one" aria-hidden="true" />
      <div className="background-glow background-glow-two" aria-hidden="true" />
      <Header />
      <main>
        <section className="content-section project-page-hero">
          <div className="section-panel">
            <p className="eyebrow">{project.category}</p>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-impact">{project.impact}</p>
            <p>{project.summary}</p>
            <div className="hero-actions">
              <a className="action-chip action-chip-primary" href="#projects">
                Back to Projects
              </a>
              <a className="action-chip" href="mailto:rosethbinuwara@gmail.com">
                Contact
              </a>
            </div>
          </div>
        </section>

        {project.slug === "carbon-aware-ai-scheduler" && <CarbonAwareSchedulerShowcase project={project} />}
        {project.slug === "eco-dispatch" && <EcoDispatchShowcase project={project} />}

        <section className="project-detail-grid content-section">
          <DetailCard title="My Role" content={project.role} />
          <ListCard title="Technical Stack" items={project.stack} />
          <ListCard title="System Design" items={project.systemDesign} />
          <ListCard title="Challenges" items={project.challenges} />
          <ListCard title="Results" items={project.results} />
          <DetailCard title="Reflection" content={project.reflection} />
        </section>
      </main>
    </div>
  );
}

function DetailCard({ title, content }) {
  return (
    <article className="section-panel">
      <p className="eyebrow">{title}</p>
      <p>{content}</p>
    </article>
  );
}

function ListCard({ title, items }) {
  return (
    <article className="section-panel">
      <p className="eyebrow">{title}</p>
      <ul className="list-grid">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function CarbonAwareSchedulerShowcase({ project }) {
  const overviewStats = [
    {
      value: "25",
      label: "Forecast hours ranked",
      detail: "The sample workflow scores 25 hourly MISO forecast rows pulled into the project CSV.",
    },
    {
      value: "29.4%",
      label: "Potential CO2 reduction",
      detail: "Best versus worst valid 2-hour window for the README's 2.5 kWh example workload.",
    },
    {
      value: "274",
      label: "gCO2/kWh swing",
      detail: "The sample forecast ranges from 383 to 657 gCO2/kWh, so timing meaningfully changes impact.",
    },
    {
      value: "28",
      label: "GPU samples logged",
      detail: "nvidia-smi power readings can be converted into job energy before the scheduler ranks windows.",
    },
  ];

  const workflowSteps = [
    {
      title: "Collect grid conditions",
      text: "Fetch or load hourly carbon-intensity forecasts for the target grid zone instead of assuming the grid looks the same all day.",
    },
    {
      title: "Estimate job energy",
      text: "Use a known kWh value or derive one from NVIDIA GPU power sampling so the scheduler works from workload behavior, not a guess.",
    },
    {
      title: "Filter valid windows",
      text: "Enumerate all start times that satisfy the requested duration and any deadline constraint, then discard infeasible options.",
    },
    {
      title: "Rank emissions impact",
      text: "Compute emissions for every candidate window, sort the cleanest options first, and report the spread between best and worst valid choices.",
    },
  ];

  const problemCards = [
    {
      title: "The problem",
      body:
        "Most AI jobs run as soon as compute is available, even though the carbon intensity of electricity changes hour by hour. That means two identical workloads can carry very different emissions simply because they start at different times.",
    },
    {
      title: "Why this project matters",
      body:
        "This is a small but realistic example of sustainable infrastructure thinking: it does not ask teams to stop computing, it asks whether flexible jobs can run when the grid is cleaner. That framing is useful for recruiters, platform engineers, and anyone thinking about the future of AI infrastructure.",
    },
  ];

  const sourceCards = [
    {
      title: "Inputs and data sources",
      items: [
        "Electricity Maps forecast data for the US-MIDW-MISO region.",
        "A local carbon forecast CSV used as the scheduler's immediate data source.",
        "Manual job energy input for quick comparisons.",
        "NVIDIA GPU power logs sampled through nvidia-smi when measured energy is preferred.",
      ],
    },
    {
      title: "Scheduling logic",
      items: [
        "Treat each forecast row as one hour of available execution time.",
        "Slide a window across the forecast horizon for the requested duration.",
        "Compute average carbon intensity and total emissions for every valid window.",
        "Sort candidate windows by total emissions and expose the best options first.",
      ],
    },
    {
      title: "Emissions impact",
      items: [
        "For the sample 2.5 kWh, 2-hour job, the cleanest valid window emits 1092.50 gCO2.",
        "The worst valid window for that same job emits 1547.50 gCO2.",
        "That creates a 455.00 gCO2 spread, or about 29.4% lower emissions in the best case.",
        "Longer durations still show meaningful gains, with 17.8% to 20.7% spreads in the sample data.",
      ],
    },
  ];

  return (
    <>
      <section className="content-section project-overview-strip">
        <div className="metric-grid">
          {overviewStats.map((stat) => (
            <article className="metric-card" key={stat.label}>
              <p className="metric-value">{stat.value}</p>
              <p className="metric-label">{stat.label}</p>
              <p className="metric-detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section project-story-grid">
        <div className="section-panel system-visual-panel">
          <p className="eyebrow">How It Works</p>
          <h2>System flow from forecast data to ranked run times.</h2>
          <div className="system-flow">
            <div className="system-node">
              <strong>Inputs</strong>
              <span>Grid forecast</span>
              <span>Job duration</span>
              <span>Deadline</span>
              <span>Energy estimate</span>
            </div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-node">
              <strong>Scheduler</strong>
              <span>Window scan</span>
              <span>Deadline filter</span>
              <span>Emissions math</span>
            </div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-node">
              <strong>Outputs</strong>
              <span>Best start times</span>
              <span>CO2 comparison</span>
              <span>Cleaner execution</span>
            </div>
          </div>
          <p className="system-visual-copy">
            The key idea is simple but useful: treat start time as an optimization decision, not as a fixed assumption.
            This project packages that idea into a CLI workflow that is easy to explain and easy to extend.
          </p>
        </div>

        <div className="workflow-grid">
          {workflowSteps.map((step) => (
            <article className="section-panel workflow-card" key={step.title}>
              <p className="eyebrow">Step</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section project-context-grid">
        {problemCards.map((card) => (
          <article className="section-panel project-context-card" key={card.title}>
            <p className="eyebrow">Context</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
        {sourceCards.map((card) => (
          <article className="section-panel project-context-card" key={card.title}>
            <p className="eyebrow">Deep Dive</p>
            <h3>{card.title}</h3>
            <ul className="list-grid">
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="content-section project-media-gallery">
        <div className="section-heading project-media-heading">
          <p className="eyebrow">Project Media</p>
          <h2>Visuals generated from the real project data.</h2>
          <p>
            Instead of decorative screenshots, this gallery pulls directly from the scheduler repository's forecast and
            GPU power logs to show what the workflow is actually reasoning about.
          </p>
        </div>
        <div className="media-grid media-grid-rich">
          <figure className="media-card media-card-wide">
            <div className="media-frame">
              <img src="/scheduler_forecast_timeline.svg" alt="Carbon forecast timeline for US-MIDW-MISO showing cleanest and dirtiest hours." />
            </div>
            <figcaption>
              <strong>Forecast timeline</strong>
              <span>The sample MISO forecast swings by 274 gCO2/kWh, which is why job timing can materially change emissions.</span>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-frame">
              <img src="/scheduler_ranked_windows.svg" alt="Ranked schedule windows for a 2.5 kilowatt-hour two-hour job." />
            </div>
            <figcaption>
              <strong>Ranked windows</strong>
              <span>The scheduler compares every valid start time and surfaces the lowest-emissions options first.</span>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-frame">
              <img src="/scheduler_duration_comparison.svg" alt="Comparison of best and worst emissions for jobs lasting two, three, and four hours." />
            </div>
            <figcaption>
              <strong>Duration sensitivity</strong>
              <span>Even when jobs run longer, the timing decision still creates a meaningful emissions spread.</span>
            </figcaption>
          </figure>
          <figure className="media-card media-card-wide">
            <div className="media-frame">
              <img src="/scheduler_gpu_profile.svg" alt="GPU power profile showing sampled power draw and total estimated energy." />
            </div>
            <figcaption>
              <strong>Measured energy input</strong>
              <span>GPU profiling gives the scheduler a path from raw hardware telemetry to a job-energy estimate and then to a cleaner schedule recommendation.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="content-section project-hardware-grid">
        <article className="section-panel hardware-card">
          <p className="eyebrow">Why It Lands</p>
          <h2>A simple tool with a credible infrastructure story.</h2>
          <p>
            For recruiters, this page shows a clear throughline from sustainability idea to working software. For
            technical readers, it demonstrates real data handling, constraint-aware ranking, CLI ergonomics, and a
            clean path toward larger orchestration systems.
          </p>
          <ul className="list-grid">
            <li>The workflow is explainable: every ranked slot can be traced back to forecast rows and emissions math.</li>
            <li>It is practical: the deadline filter keeps the recommendation grounded in real scheduling constraints.</li>
            <li>It is extensible: region selection, cost modeling, and automated job execution can be layered on top.</li>
          </ul>
        </article>
        <article className="section-panel">
          <p className="eyebrow">Key Capabilities</p>
          <ul className="list-grid">
            {project.metrics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}

function EcoDispatchShowcase({ project }) {
  const overviewStats = [
    { value: "27%", label: "Emissions reduction", detail: "Best optimized run vs. baseline grid-heavy dispatch." },
    { value: "21%", label: "Cost savings", detail: "Lower energy cost by shifting when and how power is used." },
    { value: "40%", label: "Renewables utilized", detail: "Solar and battery cover a much larger share of daily demand." },
    { value: "1,800 kWh", label: "Flexible load shifted", detail: "Batchable compute moves into cleaner operating windows." },
  ];

  const workflowSteps = [
    {
      title: "Read system conditions",
      text: "Load demand, solar availability, carbon intensity, and electricity price signals for each hour.",
    },
    {
      title: "Score dispatch options",
      text: "Compare grid, solar, and battery choices while respecting battery power, SOC, and reliability limits.",
    },
    {
      title: "Shift flexible workloads",
      text: "Move non-urgent compute toward lower-carbon hours instead of treating demand as fixed.",
    },
    {
      title: "Execute and monitor",
      text: "Expose decisions through the dashboard and connect to Arduino and Raspberry Pi hardware for validation.",
    },
  ];

  return (
    <>
      <section className="content-section project-overview-strip">
        <div className="metric-grid">
          {overviewStats.map((stat) => (
            <article className="metric-card" key={stat.label}>
              <p className="metric-value">{stat.value}</p>
              <p className="metric-label">{stat.label}</p>
              <p className="metric-detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section project-story-grid">
        <div className="section-panel system-visual-panel">
          <p className="eyebrow">System Flow</p>
          <h2>How EcoDispatch makes each decision.</h2>
          <div className="system-flow">
            <div className="system-node">
              <strong>Inputs</strong>
              <span>Demand</span>
              <span>Solar</span>
              <span>Carbon</span>
              <span>Price</span>
            </div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-node">
              <strong>Optimizer</strong>
              <span>SciPy strategies</span>
              <span>Battery limits</span>
              <span>Shiftable load</span>
            </div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-node">
              <strong>Outputs</strong>
              <span>Dispatch plan</span>
              <span>Lower cost</span>
              <span>Lower carbon</span>
            </div>
          </div>
          <p className="system-visual-copy">
            The project ties together time-series data, optimization logic, and physical constraints instead of
            treating sustainability as a separate reporting layer.
          </p>
        </div>

        <div className="workflow-grid">
          {workflowSteps.map((step) => (
            <article className="section-panel workflow-card" key={step.title}>
              <p className="eyebrow">Step</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section project-media-gallery">
        <div className="section-heading project-media-heading">
          <p className="eyebrow">Project Media</p>
          <h2>A fuller look at what the platform actually does.</h2>
          <p>
            These visuals cover system inputs, optimization outcomes, and battery behavior so the page explains the
            whole workflow instead of only showing one chart.
          </p>
        </div>
        <div className="media-grid media-grid-rich">
          <figure className="media-card media-card-wide">
            <div className="media-frame">
              <img src="/demo_dispatch.png" alt="EcoDispatch energy dispatch chart" />
            </div>
            <figcaption>
              <strong>Energy dispatch timeline</strong>
              <span>Shows how the system routes demand between grid, solar, and battery over the day.</span>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-frame">
              <img src="/demo_strategy_emissions.png" alt="EcoDispatch strategy emissions comparison chart" />
            </div>
            <figcaption>
              <strong>Strategy comparison</strong>
              <span>Compares emissions across baseline, carbon-min, cost-min, balanced, and optimized modes.</span>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-frame">
              <img src="/demo_operating_profile.png" alt="EcoDispatch operating profile chart" />
            </div>
            <figcaption>
              <strong>Operating conditions</strong>
              <span>Maps the demand curve against solar availability and grid carbon intensity.</span>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-frame">
              <img src="/demo_battery_soc.png" alt="EcoDispatch battery state of charge chart" />
            </div>
            <figcaption>
              <strong>Battery state of charge</strong>
              <span>Tracks how stored energy is preserved, discharged, and used as part of the optimization.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="content-section project-hardware-grid">
        <article className="section-panel hardware-card">
          <p className="eyebrow">Hardware Validation</p>
          <h2>Simulation was designed with a path to real controls.</h2>
          <p>
            The hardware side connects Arduino-based battery telemetry with Raspberry Pi relay control so EcoDispatch
            can move beyond a pure software demo.
          </p>
          <ul className="list-grid">
            <li>Arduino monitors voltage, current, temperature, and state of charge.</li>
            <li>Raspberry Pi receives battery data and can execute relay-based control logic.</li>
            <li>Safety checks enforce SOC, voltage, and temperature limits before actions are taken.</li>
          </ul>
        </article>
        <article className="section-panel">
          <p className="eyebrow">Key Capabilities</p>
          <ul className="list-grid">
            {project.metrics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}

export default App;
