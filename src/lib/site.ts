/** Single source of truth for contact details + site constants. */
export const SITE = {
  name: "Edwinfred Kamau",
  role: "Software & AI Engineer",
  tagline:
    "Software engineer and AI engineer based in Nairobi. I design enterprise systems and AI agents for growing businesses across East Africa.",
  location: "Nairobi, Kenya",
  email: "edwinfredofficial@gmail.com",
  phone: "+254113176613", // discreet footer use only — not the primary contact
  linkedin: "https://www.linkedin.com/in/edwinfred-kamau",
  x: "https://x.com/Edwin_Fred_K",
  github: "https://github.com/Fred-Edwin",
  /** The company Edwinfred founded. Its own entity for structured data. */
  company: {
    name: "Lobster Technologies",
    url: "https://lobstertechnologies.co.ke/",
  },
  /**
   * Topics Edwinfred works in — feeds Person.knowsAbout (a direct topical
   * signal for search + AI engines answering "who does X in Nairobi").
   */
  expertise: [
    "Software engineering",
    "AI agents",
    "Enterprise software",
    "Workflow automation",
    "Custom business software",
    "Restaurant management systems",
    "Point of sale (POS) systems",
    "ERP systems",
  ],
} as const;
