import {
  Layout,
  Navigation,
  CreditCard,
  Type,
  ListTodo,
  Columns,
  Square,
} from "lucide-react";

export const templates = [
  {
    title: "Modern Navbar",
    slug: "modern-navbar",
    description:
      "Design a floating, high-design navigation bar with Glassmorphism 2.0 (bg-white/10, backdrop-blur-3xl). Include animated underlines for links and a 'Prestige' call-to-action button with a shadow glow. Must be mobile-responsive with a sleek slide-over menu.",
    icon: Navigation,
  },
  {
    title: "Pricing Section",
    slug: "pricing-section",
    description:
      "Create a high-fidelity pricing table with 3 cards using 'rounded-[3rem]'. The 'Pro' card should feature an elevated 3D shadow and gradient border. Include a glassmorphic monthly/yearly toggle and checkmark lists using Lucide icons.",
    icon: CreditCard,
  },
  {
    title: "Hero Component",
    slug: "hero-section",
    description:
      "Stunning hero area with 'font-black' gradient headings and 'Atmospheric Depth' using blurred background circles. Include dual 'Glow Buttons' and a large floating 3D-style abstract element with deep shadows.",
    icon: Layout,
  },
  {
    title: "Feature Grid",
    slug: "feature-grid",
    description:
      "Design an interactive 3-column grid where each card uses 'bg-white/5' and 'backdrop-blur-xl'. Features should have glowing Lucide icons and a 'Prestige' hover state. Ensure perfect responsive reflow for mobile.",
    icon: Columns,
  },
  {
    title: "Dashboard Sidebar",
    slug: "dashboard-sidebar",
    description:
      "Professional collapsible vertical sidebar with glassmorphic background, active states with neon indicators, user profile section, and categorized navigation using sleek Lucide icons.",
    icon: ListTodo,
  },
  {
    title: "Auth Forms",
    slug: "auth-forms",
    description:
      "Create a 'rounded-[3.5rem]' Bento-style auth card. Split between a form side with glassmorphic inputs and a visual side with a gradient background and floating 3D icon. Include social auth buttons with hover-lift effects.",
    icon: Square,
  },
  {
    title: "Content Card",
    slug: "content-card",
    description:
      "Versatile Bento-style card with a 'rounded-[2rem]' image area and metadata footer. Use 'font-bold tracking-tight' for titles and apply a 'hover:scale-[1.02]' transition with deep layered 3D shadows.",
    icon: Type,
  },
];
