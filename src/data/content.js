// Central content data for the site. Extends the data shapes that used to
// live inline in App.jsx (featuredProjects / experiences / awards / skillGroups).

export const profile = {
  name: "Roseth Perera",
  tagline: "Electrical Engineering Student at UW-Madison",
  email: "rosethbinuwara@gmail.com",
  linkedin: "https://www.linkedin.com/in/roseth-perera",
  linkedinLabel: "linkedin.com/in/roseth-perera",
  github: "https://github.com/rosethperera",
  githubLabel: "github.com/rosethperera",
  resumePath: "./Roseth-Perera-Resume.pdf?v=2026",
};

export const aboutText = [
  "I'm Roseth Perera, an Electrical Engineering student at UW–Madison (minor in Engineering for Energy Sustainability), building toward a career at the intersection of energy, infrastructure, and intelligent systems — with a long-term focus on reducing carbon emissions and designing more sustainable, data-center-scale technology.",
  "I grew up in Sri Lanka, where I saw more clearly than most people that power and infrastructure are not invisible background systems — when access is unstable, it changes how people live, learn, and move forward. That perspective shaped how I think about engineering: not just building new technology, but building systems that are resilient, efficient, and responsible about the energy they require.",
  "I just wrapped a Summer 2026 Software Development Engineer internship at Amazon, where I shipped a production conversational AI assistant end-to-end and was rated “raises the bar” by both my manager and mentor. I'm currently building Aeolus, an AI trip-planning app grounded in live authoritative data, and contributing to Wisconsin Robotics and Engineers Without Borders.",
];

// Professional / technical experience, most recent first.
export const experiences = [
  {
    slug: "amazon-internship",
    title: "Software Development Engineer Intern",
    org: "Amazon · Amazon Future Engineer Program",
    location: "Seattle, WA",
    date: "May 2026 – Aug 2026",
    summary:
      "Shipped a production conversational AI assistant for an internal enterprise compliance platform as end-to-end feature owner — an agent on AWS Bedrock AgentCore Runtime with retrieval-augmented generation and live data-search tools.",
    bullets: [
      "Shipped a production conversational AI assistant for an internal enterprise compliance platform as end-to-end feature owner: an agent on AWS Bedrock AgentCore Runtime with retrieval-augmented generation (RAG) and live data-search tools.",
      "Engineered a fail-closed anti-hallucination design (Bedrock Guardrails grounding, refusal-first system prompt, prompt-injection hardening) so the assistant cites authoritative sources or declines — never fabricates.",
      "Drove the search data-layer decision with first-hand latency measurement: benchmarked candidate backends against a hard p90 budget, rejected a data-warehouse design on evidence, and landed a serverless architecture roughly 10–20x cheaper.",
      "Built the live control-search feature in Java (relevance and fuzzy matching, nested dependency queries) plus a change-stream sync pipeline keeping the index continuously fresh, with deploy-time bootstrap and historical backfill.",
      "Debugged distributed systems from primary evidence: independently root-caused a multi-fault production outage spanning IAM permissions, stream parsing, and deploy versioning across the streaming chat path.",
      "Rated “raises the bar” by both manager and mentor in official evaluations.",
      "Delivered across a three-language, six-package codebase (Python, Java, TypeScript CDK) with high unit-test coverage and green CI/CD throughout.",
    ],
    stack: [
      "AWS Bedrock AgentCore",
      "Bedrock Knowledge Bases",
      "Bedrock Guardrails",
      "Lambda",
      "DynamoDB",
      "OpenSearch",
      "CDK",
      "IAM",
      "Java",
      "Python",
      "TypeScript",
    ],
    highlight: "raises-the-bar",
  },
  {
    slug: "wisconsin-robotics",
    title: "Electrical Team Member",
    org: "Wisconsin Robotics",
    date: "Aug 2025 – Present",
    summary:
      "Developing battery monitoring, telemetry, and power-awareness systems connecting embedded sensing with real robotics operations.",
    bullets: [
      "Developing battery monitoring, telemetry, and power-awareness systems connecting embedded sensing with real robotics operations.",
    ],
    stack: ["Embedded systems", "Battery telemetry", "ESP32"],
  },
  {
    slug: "ewb-uganda",
    title: "Design Team Member, Uganda Project",
    org: "Engineers Without Borders — UW-Madison",
    date: "Jan 2026 – Present",
    summary:
      "Contributing to engineering work connecting infrastructure thinking with reliability, access, and real-world impact.",
    bullets: [
      "Contributing to engineering work connecting infrastructure thinking with reliability, access, and real-world impact.",
    ],
    stack: ["Infrastructure design", "Systems thinking"],
  },
  {
    slug: "goldfish-swim-school",
    title: "Deck Supervisor / Lifeguard",
    org: "Goldfish Swim School",
    location: "Park Ridge, IL",
    date: "Mar 2024 – Aug 2025",
    summary: "Supervised lifeguard staff and daily deck operations, owning safety enforcement and shift coordination.",
    bullets: ["Supervised lifeguard staff and daily deck operations, owning safety enforcement and shift coordination."],
    stack: [],
  },
  {
    slug: "park-ridge-country-club",
    title: "Lifeguard",
    org: "Park Ridge Country Club",
    date: "Jun 2024 – Jun 2025",
    summary: "Maintained safety standards and responded quickly in critical, safety-focused situations.",
    bullets: ["Maintained safety standards and responded quickly in critical, safety-focused situations."],
    stack: [],
  },
  {
    slug: "uw-housing-food-service",
    title: "Food Service Worker",
    org: "UW-Madison Housing",
    date: "Aug 2025 – Sep 2025",
    summary: "Supported high-volume campus dining operations, building consistency and operational discipline.",
    bullets: ["Supported high-volume campus dining operations, building consistency and operational discipline."],
    stack: [],
  },
  {
    slug: "teens-who-care-sri-lanka",
    title: "Volunteer Project Leader",
    org: "Teens Who Care Sri Lanka",
    location: "Colombo, Sri Lanka",
    date: "Nov 2021 – Sep 2023",
    summary:
      "Led student teams raising funds and delivering school supplies to rural schools during Sri Lanka's economic crisis.",
    bullets: [
      "Led student teams raising funds and delivering school supplies to rural schools during Sri Lanka's economic crisis.",
    ],
    stack: [],
  },
];

export const featuredProjects = [
  {
    slug: "amazon",
    drive: "C:",
    category: "AI / Cloud — Amazon Internship",
    title: "Compliance IQ — Enterprise AI Assistant",
    date: "May 2026 – Aug 2026",
    repoUrl: null,
    repoStatus: "private", // Amazon internal code — no public repo
    liveUrl: null,
    liveStatus: "none", // internal enterprise tool, nothing public to visit
    impact:
      "A production conversational AI assistant for an internal enterprise compliance platform, shipped end-to-end as sole feature owner and rated “raises the bar” by both manager and mentor.",
    summary:
      "An agent on AWS Bedrock AgentCore Runtime with retrieval-augmented generation and live data-search tools, engineered so it cites authoritative sources or declines to answer — never fabricates.",
    role:
      "I owned the feature end-to-end: the Bedrock AgentCore agent, the RAG grounding and guardrails design, the Java-based live control-search feature, the change-stream sync pipeline, and production incident response.",
    stack: [
      "AWS Bedrock AgentCore",
      "Bedrock Knowledge Bases",
      "Bedrock Guardrails",
      "Lambda",
      "DynamoDB",
      "OpenSearch",
      "CDK",
      "IAM",
      "Java",
      "Python",
      "TypeScript",
    ],
    systemDesign: [
      "Agent on AWS Bedrock AgentCore Runtime with retrieval-augmented generation (RAG) and live data-search tools.",
      "Fail-closed anti-hallucination design: Bedrock Guardrails grounding, refusal-first system prompt, prompt-injection hardening.",
      "Serverless search data layer chosen from first-hand p90 latency benchmarking against a hard budget, rejecting a data-warehouse design on evidence — roughly 10–20x cheaper.",
      "Live control-search feature in Java with relevance and fuzzy matching plus nested dependency queries.",
      "Change-stream sync pipeline keeping the search index continuously fresh, with deploy-time bootstrap and historical backfill.",
    ],
    challenges: [
      "Preventing hallucination in a compliance-sensitive assistant without making it useless — balancing grounding against refusal rate.",
      "Choosing a search backend under a hard p90 latency budget when the obvious data-warehouse design didn't meet it.",
      "Root-causing a multi-fault production outage spanning IAM permissions, stream parsing, and deploy versioning across the streaming chat path.",
    ],
    results: [
      "Rated “raises the bar” by both manager and mentor in official evaluations — Amazon's highest individual-contributor performance signal.",
      "Landed a serverless search architecture roughly 10–20x cheaper than the data-warehouse alternative, chosen on measured evidence.",
      "Delivered across a three-language, six-package codebase (Python, Java, TypeScript CDK) with high unit-test coverage and green CI/CD throughout.",
      "Independently root-caused and resolved a multi-fault production outage.",
    ],
    reflection:
      "This was my first time owning a production AI feature end-to-end under real compliance stakes. The biggest lesson was that trustworthy AI systems are mostly an engineering problem — grounding, refusal behavior, and data freshness matter more than model choice.",
    metrics: [
      "End-to-end feature owner",
      "“Raises the bar” — manager & mentor",
      "~10–20x cheaper search architecture",
      "3 languages, 6 packages, high test coverage",
      "Solo root-cause of multi-fault outage",
    ],
  },
  {
    slug: "aeolus",
    drive: "D:",
    category: "AI / Full-stack",
    title: "Aeolus — AI Outdoor Trip Planning",
    date: "Jun 2026 – Present",
    repoUrl: null,
    repoStatus: "pending", // awaiting real repo URL
    liveUrl: null,
    liveStatus: "pending", // awaiting confirmation of a public live deployment
    impact:
      "A full-stack AI trip-planning app that grounds every recommendation in live authoritative data — not model guesswork — through tool-calling into government weather and park APIs.",
    summary:
      "Named for the Greek god of winds, Aeolus plans outdoor trips on Azure OpenAI with tool-calling into the National Weather Service and National Park Service APIs, a citations and data-freshness system tracing every answer to a timestamped source, and a persistent memory layer that personalizes planning across sessions.",
    role:
      "I'm architecting the full stack: the Azure OpenAI tool-calling layer, the NWS/NPS API integrations, the citations and data-freshness tracking system, and the Supabase/Postgres persistent memory layer.",
    stack: [
      "Azure OpenAI",
      "Microsoft Foundry",
      "Next.js",
      "Supabase / Postgres",
      "National Weather Service API",
      "National Park Service API",
    ],
    systemDesign: [
      "Tool-calling into the National Weather Service and National Park Service APIs so every recommendation is grounded in live, authoritative data.",
      "Citations and data-freshness system tracing each answer back to a timestamped source.",
      "Structured persistent memory layer on Supabase/Postgres that personalizes trip planning across sessions.",
      "Next.js full-stack app served on Azure OpenAI / Microsoft Foundry.",
    ],
    challenges: [
      "Keeping every recommendation traceable to a live source instead of letting the model fill gaps with plausible-sounding guesses.",
      "Designing a memory schema that personalizes planning without becoming stale or contradicting fresh data.",
      "Coordinating multiple external government APIs with different freshness and reliability characteristics.",
    ],
    results: [
      "Working citations system that traces each answer to a timestamped authoritative source.",
      "Persistent memory layer personalizing recommendations across sessions.",
    ],
    reflection:
      "Aeolus is my sharpest expression yet of the principle from Compliance IQ: an AI system is only as trustworthy as its grounding. Next steps are broadening the data-source set and tightening the memory layer's personalization signal.",
    metrics: [
      "Live NWS + NPS tool-calling",
      "Timestamped source citations",
      "Cross-session persistent memory",
      "Full-stack Next.js on Azure OpenAI",
    ],
  },
  {
    slug: "carbon-aware-ai-scheduler",
    drive: "E:",
    category: "Energy data and software",
    title: "Carbon-Aware AI Scheduler",
    date: "Feb 2026 – Apr 2026",
    repoUrl: null,
    repoStatus: "pending", // awaiting real repo URL
    liveUrl: null,
    liveStatus: "none", // CLI tool — nothing to deploy/visit
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
    drive: "F:",
    category: "Sustainable infrastructure",
    title: "EcoDispatch",
    date: "2025",
    repoUrl: null,
    repoStatus: "pending", // awaiting real repo URL
    liveUrl: null,
    liveStatus: "pending", // awaiting confirmation of a public live deployment (Streamlit dashboard?)
    impact:
      "A Python simulation prototype for exploring how data centers can coordinate grid electricity, on-site solar, battery storage, and flexible workloads to study carbon and cost tradeoffs.",
    summary:
      "EcoDispatch models solar, battery, grid, and flexible demand in a scenario-analysis workflow with a Streamlit dashboard. The current version is best described as a transparent prototype for comparing dispatch strategies, stress-test scenarios, and cost-versus-carbon tradeoffs rather than a production control system.",
    role:
      "I built the simulation workflow, implemented battery and solar models, added dispatch strategy logic and rolling-horizon behavior, built the Streamlit dashboard, and connected the project to prototype Arduino and Raspberry Pi monitoring flows.",
    stack: ["Python", "SciPy", "Pandas", "Streamlit", "Optimization", "Physics Models", "Arduino", "Raspberry Pi"],
    systemDesign: [
      "Time-series simulation balancing carbon, electricity cost, and battery usage across multiple dispatch strategies",
      "Rolling-horizon battery charging and discharging logic with explicit load-served accounting",
      "Flexible workload shifting experiments for low-carbon scheduling scenarios",
      "Physics-based solar generation and battery state-of-charge models with configurable system parameters",
      "Interactive Streamlit dashboard for scenario setup, strategy comparison, and explanation of results",
      "Prototype hardware hooks for Arduino battery telemetry and Raspberry Pi relay control concepts",
    ],
    challenges: [
      "Implementing simplified physics-inspired models for solar generation and battery degradation that are useful for simulation",
      "Developing multi-objective optimization algorithms that effectively balance competing goals (carbon vs. cost vs. reliability)",
      "Creating an intuitive user interface that makes complex energy trade-offs understandable to non-experts",
      "Integrating time-series data from multiple APIs (carbon intensity, weather, electricity prices) with proper error handling",
      "Ensuring numerical stability in optimization algorithms while maintaining computational efficiency",
    ],
    results: [
      "Built a working simulation platform that compares five dispatch strategies on a shared demand profile",
      "Added scenario presets so strategy differences are easier to inspect under realistic, stress-test, solar-rich, and volatile-market conditions",
      "Made comparisons auditable by reporting load served and unmet demand directly in the dashboard",
      "Integrated optional real weather plus optional Electricity Maps carbon and price inputs with synthetic fallback",
      "Added automated tests for the simulation and data-integration paths",
      "Established a prototype path from software simulation to hardware-monitoring demos",
    ],
    reflection:
      "The project is strongest as a transparent engineering prototype: it makes tradeoffs visible and testable without pretending the control logic is deployment-ready. The next honest steps would be better battery energy provenance tracking, stronger demand modeling, and a fuller multi-period optimization formulation.",
    metrics: [
      "5 dispatch strategies compared",
      "4 scenario profiles for clearer comparisons",
      "10 unit tests currently passing",
      "Interactive Streamlit dashboard",
      "Optional Open-Meteo and Electricity Maps inputs",
      "Arduino and Raspberry Pi prototype integration paths",
    ],
    gallery: [
      { src: "/demo_dispatch.png", alt: "EcoDispatch energy dispatch chart", caption: "Energy dispatch timeline — how demand routes between grid, solar, and battery over the day." },
      { src: "/demo_strategy_emissions.png", alt: "EcoDispatch strategy emissions comparison chart", caption: "Strategy comparison across baseline, carbon-first, cost-first, balanced, and optimized runs." },
      { src: "/demo_operating_profile.png", alt: "EcoDispatch operating profile chart", caption: "Operating conditions — demand vs. solar availability vs. grid carbon intensity." },
      { src: "/demo_battery_soc.png", alt: "EcoDispatch battery state of charge chart", caption: "Battery state of charge — how stored energy is preserved, discharged, and used." },
    ],
  },
  {
    slug: "battery-telemetry",
    drive: "G:",
    category: "Embedded systems",
    title: "Battery Telemetry for Robotics",
    date: "Sep 2025 – May 2026",
    repoUrl: null,
    repoStatus: "pending", // awaiting real repo URL
    liveUrl: null,
    liveStatus: "none", // embedded firmware — nothing to deploy/visit
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

export const awards = [
  {
    title: "Amazon Future Engineer Scholarship",
    date: "May 2025",
    text: "Issued by Amazon and associated with Maine East High School. Awarded for academic excellence, leadership, and commitment to computer science and STEM, with $40,000 in college scholarship support and a paid Amazon internship pathway.",
  },
  {
    title: "Park Ridge Rotary Make a Difference Scholarship",
    date: "Apr 2025",
    text: "Issued by the Park Ridge Rotary Club and associated with Maine East High School. Awarded the club's top scholarship amount of $1,250 in recognition of empathy, leadership, work ethic, and community impact.",
  },
  {
    title: "Sadie Rose Argus Scholarship",
    date: "Apr 2025",
    text: "Issued by the Des Plaines Community Foundation and associated with Maine East High School. Awarded a $1,500 scholarship recognizing social service, community involvement, and academic achievement in the Des Plaines area.",
  },
  {
    title: "Illinois State Scholar",
    date: "Mar 2025",
    text: "Issued by the Illinois Student Assistance Commission and associated with Maine East High School. Recognized as an Illinois State Scholar for strong academic achievement.",
  },
];

export const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "Java", "TypeScript", "C/C++", "JavaScript"],
  },
  {
    title: "Cloud & AI",
    items: [
      "AWS Bedrock (AgentCore, Knowledge Bases, Guardrails)",
      "Lambda",
      "DynamoDB",
      "OpenSearch",
      "CDK",
      "IAM",
      "Azure OpenAI",
      "RAG",
      "Agentic AI",
      "Tool-calling",
      "Prompt engineering",
      "Embeddings",
    ],
  },
  {
    title: "Engineering",
    items: ["Embedded systems", "Battery telemetry", "Instrumentation", "Prototyping", "Systems thinking"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "CI/CD", "Linux", "REST APIs", "Supabase/Postgres", "Arduino IDE", "CAD", "MATLAB"],
  },
];

export const education = {
  school: "University of Wisconsin–Madison",
  degree: "B.S. Electrical Engineering, Minor in Engineering for Energy Sustainability",
  expected: "Expected May 2029",
  coursework: ["CS 200 — Programming I", "ECE 252 — Computer Engineering", "ECE 210 — Electrical Engineering"],
};
