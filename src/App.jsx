import { useEffect, useState } from "react";

const featuredProjects = [
  {
    slug: "carbon-aware-ai-scheduler",
    category: "Energy data and software",
    title: "Carbon-Aware AI Scheduler",
    impact:
      "A Python scheduling workflow that ranks lower-emission execution windows for compute jobs instead of treating timing as a neutral decision.",
    summary:
      "Built around Electricity Maps forecast data for US-MIDW-MISO, the tool pulls carbon-intensity forecasts, applies deadline-aware ranking, and estimates job energy through either manual input or NVIDIA GPU power sampling.",
    role:
      "I built the Python CLI workflow, connected forecast data, implemented the emissions-ranking logic, added deadline filtering, and integrated NVIDIA GPU power sampling through nvidia-smi.",
    stack: ["Python", "Electricity Maps API", "pandas", "nvidia-smi", "CLI workflow"],
    systemDesign: [
      "Fetch or load hourly carbon-intensity forecast data into a local CSV workflow.",
      "Estimate job energy either from manual input or GPU power sampling.",
      "Evaluate valid scheduling windows based on duration, deadline, and emissions impact.",
      "Rank top windows and report the spread between best and worst valid options.",
    ],
    challenges: [
      "Balancing real scheduling constraints with a sustainability objective.",
      "Turning raw forecast and energy data into a usable decision workflow.",
      "Keeping the tool simple enough to explain clearly while still being technically meaningful.",
    ],
    results: [
      "Produced ranked scheduling alternatives based on emissions-aware logic.",
      "Created a concrete example of how systems thinking can improve infrastructure decisions.",
      "Strengthened my interest in sustainable compute and future AI infrastructure engineering.",
    ],
    reflection:
      "Next steps would include richer cost models, better visualization, and deeper assumptions around large-scale compute infrastructure.",
    metrics: [
      "Forecast-driven scheduling for US-MIDW-MISO",
      "Manual energy input or NVIDIA GPU profiling",
      "Single runner script for end-to-end workflow",
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

function EcoDispatchShowcase({ project }) {
  const overviewStats = [
    { value: "5", label: "Dispatch modes", detail: "Baseline, carbon-first, cost-first, balanced, and rolling-horizon optimized." },
    { value: "4", label: "Scenario presets", detail: "Realistic, stress test, solar rich, and volatile market runs reveal different operating conditions." },
    { value: "100%", label: "Load coverage shown", detail: "Comparisons now report served load and unmet demand explicitly so no strategy gets a fake win." },
    { value: "1 UI", label: "Tradeoff controls", detail: "The dashboard exposes balanced cost-vs-carbon weights and explains what each mode actually does." },
  ];

  const workflowSteps = [
    {
      title: "Read system conditions",
      text: "Load hourly demand, weather-driven solar availability, carbon intensity, and electricity price signals for each timestep.",
    },
    {
      title: "Plan across time",
      text: "Use strategy-specific charging and discharging behavior so the battery can react to upcoming dirty or expensive hours instead of only the present moment.",
    },
    {
      title: "Shift flexible workloads",
      text: "Move non-urgent compute toward cleaner windows while keeping total modeled demand coverage visible in the results.",
    },
    {
      title: "Compare honest outcomes",
      text: "Show emissions, cost, peak grid, renewable share, load served, and unmet demand so each strategy can be judged on the same basis.",
    },
  ];

  const strategyCards = [
    {
      title: "Carbon-first",
      body:
        "Charges during cleaner hours, discharges during dirtier ones, and shifts some flexible load away from high-carbon periods. This mode is about emissions first, even if cost is not optimal.",
    },
    {
      title: "Cost-first",
      body:
        "Charges during cheaper hours and discharges during more expensive ones. It behaves more like a tariff-arbitrage strategy than a decarbonization strategy.",
    },
    {
      title: "Balanced",
      body:
        "Uses a visible carbon-vs-cost weighting in the dashboard, so the tradeoff is no longer hidden inside the code. Moving the slider changes the behavior directly.",
    },
    {
      title: "Optimized",
      body:
        "Now uses a short rolling-horizon view instead of a purely single-hour decision. It is still a prototype, but it can preserve battery energy for future opportunities instead of reacting myopically.",
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
              <strong>Strategy engine</strong>
              <span>Rolling horizon</span>
              <span>Battery charging</span>
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
            The updated prototype is framed as a scenario-analysis tool, not a magical production optimizer. The point
            is to make dispatch tradeoffs legible, comparable, and honest enough to inspect.
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
        {strategyCards.map((card) => (
          <article className="section-panel project-context-card" key={card.title}>
            <p className="eyebrow">Strategy Logic</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="content-section project-media-gallery">
        <div className="section-heading project-media-heading">
          <p className="eyebrow">Project Media</p>
          <h2>A fuller look at what the simulator actually does.</h2>
          <p>
            These visuals cover dispatch behavior, strategy comparison, operating conditions, and battery state so the
            page explains the full workflow instead of selling a single headline metric.
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
              <span>Compares baseline, carbon-first, cost-first, balanced, and optimized runs using the same demand basis.</span>
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
          <p className="eyebrow">Prototype Framing</p>
          <h2>Designed as a realistic simulator with a path toward real controls.</h2>
          <p>
            EcoDispatch is best presented as a transparent simulation and scenario-analysis platform. The hardware side
            shows how the ideas could connect to battery telemetry and relay control later, but the current value is in
            making the strategy tradeoffs inspectable rather than pretending the system is deployment-ready.
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
