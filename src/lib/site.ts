/* ------------------------------------------------------------------
   SITE CONFIG, edit these with your real details.
   TODO(camila): confirm name, socials, and CV link.
------------------------------------------------------------------- */
export const site = {
  name: "Camila Ruiz",
  role: "Senior Product Designer",
  tagline:
    "Senior product designer. I turn messy problems into clear interfaces that move metrics.",
  location: "Remote · GMT-5",
  email: "macarum.im@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/camilaruizux/" },
  ],
  cvHref: "/cv-camila-ruiz.pdf",
  // Animated Memoji (H.264 in a .mov container). Set to "" to see the design placeholder.
  avatar: "/avatar.mov",
  // Personality strip that scrolls in the marquee
  marquee: [
    "Product Design",
    "Design Systems",
    "UX Research",
    "Prototyping",
    "0→1",
    "B2B & B2C",
    "Interaction Design",
  ],
} as const;
