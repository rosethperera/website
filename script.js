const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!nav || !navToggle) {
      return;
    }

    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});
