import {
  Layout,
  Navigation,
  CreditCard,
  Type,
  ListTodo,
  Columns,
  Square,
  BarChart3,
  MessageSquare,
  CircleHelp,
  Mail,
  PanelTop,
  KanbanSquare,
} from "lucide-react";

export const templates = [
  {
    title: "Modern Navbar",
    slug: "modern-navbar",
    description:
      "Design a premium floating navigation bar for a modern AI or SaaS product website using semantic theme tokens, refined glassmorphism, and a clearly premium visual hierarchy. The navbar should feel like a real production-ready component, not a generic header. Include a compact but memorable brand area on the left with a symbol and product name, a centered or balanced navigation group with 4 to 5 links, subtle active states, animated hover underlines, and a right-aligned area containing a small secondary action plus one strong primary CTA button. Add extra polish with a slim announcement badge, tasteful separators, layered border treatment, soft shadow depth, backdrop blur, and a slightly elevated floating container that remains sticky on scroll. Use realistic labels such as Product, Solutions, Pricing, Resources, and Contact instead of placeholder text. On mobile, convert the layout into a polished slide-over navigation panel with a menu trigger, grouped links, CTA area, and clean spacing that feels intentionally designed. Make sure the component has excellent alignment, elegant spacing, visible hover and focus states, and a consistent premium feel across desktop and mobile.",
    icon: Navigation,
  },
  {
    title: "Pricing Section",
    slug: "pricing-section",
    description:
      "Create a high-conversion pricing section for a polished SaaS product with a strong section introduction and three highly detailed pricing cards for Starter, Pro, and Enterprise. Begin with an eyebrow label, a bold headline, a short value-focused paragraph, and a segmented monthly versus yearly billing toggle with a visible savings message. Each pricing card should include a plan name, short audience description, prominent price, billing cycle note, feature checklist with Lucide icons, a well-styled CTA button, and a short supporting line below the button explaining trial length or onboarding expectations. The Pro plan must be the visual focal point using stronger depth, a highlighted badge like Most Popular, richer border treatment, elevated layering, and more visual weight than the other two cards. Use realistic SaaS feature copy such as advanced analytics, workflow automation, custom roles, API access, priority support, audit logs, and SSO. Add subtle micro-interactions, refined spacing, balanced typography, and premium card surfaces so the section feels trustworthy and expensive. Under the cards, include a compact trust strip with customer logos, uptime metrics, user count, or satisfaction stats. The layout must remain highly readable and visually balanced on mobile, with clean card stacking and preserved hierarchy.",
    icon: CreditCard,
  },
  {
    title: "Hero Component",
    slug: "hero-section",
    description:
      "Design a world-class landing page hero section for a premium SaaS or AI platform with immediate product clarity, strong conversion intent, and a visually striking but usable layout. The left side should contain a small eyebrow badge, a powerful multi-line headline, a supporting paragraph that explains the value proposition in a believable way, and two calls to action such as Start Free Trial and Book Demo. Add a trust row below with customer logos, review rating, active user count, or deployment metrics to create credibility. On the right side, build a sophisticated visual composition using a layered dashboard preview, floating stat cards, chart panels, task modules, or an abstract product mockup that feels realistic and dimensional. Use atmospheric background lighting, soft radial gradients derived from theme variables, layered glass surfaces, meaningful shadows, and high-end spacing to make the hero feel premium. The component should include realistic product copy, strong hierarchy between headline and support text, well-balanced button styling, and subtle motion or hover cues that make the screen feel alive. Ensure the hero collapses elegantly on mobile with the content stacked in a logical order and with the CTAs still clearly visible above the fold.",
    icon: Layout,
  },
  {
    title: "Feature Grid",
    slug: "feature-grid",
    description:
      "Create a premium feature grid section for a modern software product with a clear introduction area and a responsive grid of six richly detailed feature cards. Start with an eyebrow label, a compelling headline, and concise supporting copy that sets up the product value before the grid begins. Each feature card should include a Lucide icon, a clear feature title, a short explanation focused on user benefit, and one extra supporting detail such as a metric, a tag, a short bullet, or a mini caption. Avoid generic filler content and instead use realistic feature ideas such as real-time collaboration, intelligent automation, team permissions, audit trails, custom dashboards, and integrations. The cards should feel premium through balanced padding, refined borders, layered surfaces, subtle hover elevation, icon treatments, and excellent typography rhythm. Make one or two cards visually larger or more emphasized in a bento-style composition so the layout does not feel repetitive. The section should feel polished, strategic, and production-ready, with strong visual hierarchy, neat alignment, and clean responsive behavior across desktop, tablet, and mobile.",
    icon: Columns,
  },
  {
    title: "Dashboard Sidebar",
    slug: "dashboard-sidebar",
    description:
      "Design a premium dashboard sidebar for a real product management or analytics application with a layout that feels production-ready and visually cohesive. Include a brand area at the top, a workspace or organization switcher, multiple grouped navigation sections, clear active item styling, notification indicators, optional badge counts, and a well-designed user profile area near the bottom with avatar, role, and account actions. Add secondary utility links such as settings, billing, support, or documentation so the sidebar feels complete and realistic. The visual design should use semantic theme tokens, layered backgrounds, soft separators, refined borders, and strong spacing so the sidebar feels elegant without becoming visually noisy. Icons should align cleanly with labels, hover and focus states should be obvious, and the active state should feel premium rather than default. Consider collapsible behavior, compact mode, or contextual highlights for selected items. Also handle the mobile experience by transforming the sidebar into a polished drawer or bottom navigation pattern that still preserves hierarchy and usability on small screens.",
    icon: ListTodo,
  },
  {
    title: "Auth Forms",
    slug: "auth-forms",
    description:
      "Create a premium authentication interface with a split-screen or balanced card layout that feels secure, modern, and ready for production use. One side should include a fully detailed sign-in or sign-up form with a heading, a short support paragraph, clearly labeled inputs, helper text where useful, a password field with a visibility toggle, a remember-me or terms row, and a strong primary submit button. Add secondary social authentication buttons with icons, a divider with meaningful label text, and footer links for forgot password, create account, or legal acknowledgments. The opposite side should act as a branded visual panel that communicates trust and product value through an abstract illustration, testimonial, security reassurance, key metrics, or a small product preview. Use refined spacing, layered surfaces, subtle depth, strong input states, clear accessibility-minded focus styling, and believable copy so the experience feels polished instead of template-like. Make sure the overall composition remains clean and conversion-focused on desktop while collapsing gracefully into a strong single-column mobile layout.",
    icon: Square,
  },
  {
    title: "Content Card",
    slug: "content-card",
    description:
      "Design a high-quality content card component that could be used for editorial articles, featured products, media highlights, case studies, or learning resources, and make it feel versatile but visually distinctive. The card should include a strong image or media area, a category or status badge, a compelling title, a short supporting description, and a footer area with realistic metadata such as author, publish date, reading time, engagement numbers, or action buttons. Add optional premium details such as avatar stacks, bookmark or save action, progress indicator, tag chips, or a subtle hover reveal depending on the type of content. The component should use excellent spacing, clear hierarchy, refined borders, layered depth, elegant hover behavior, and realistic text rather than placeholder lorem ipsum. Make the media treatment feel intentional, the typography crisp, and the interactions tactile but controlled. The final component should look reusable, polished, and production-ready in both desktop and mobile contexts.",
    icon: Type,
  },
  {
    title: "Analytics Stats",
    slug: "analytics-stats",
    description:
      "Create a premium analytics stats section for a SaaS dashboard with four to six KPI cards that feel clean, data-rich, and executive-ready. Include a strong section heading or compact dashboard header, a date-range control or filter row, and cards showing realistic metrics such as revenue, conversion rate, active users, retention, or pipeline growth. Each stat card should include a title, large metric value, trend indicator, comparison period, and a small sparkline, bar strip, or progress cue where appropriate. Use refined spacing, strong numeric hierarchy, semantic status styling, subtle depth, and excellent alignment so the metrics are easy to scan. Add one larger featured card or chart summary tile to create visual rhythm and make the section feel more strategic than a simple row of boxes. Ensure the layout is responsive and remains readable on smaller screens without losing the sense of hierarchy or polish.",
    icon: BarChart3,
  },
  {
    title: "Testimonials",
    slug: "testimonials-section",
    description:
      "Design a premium testimonials section for a modern product landing page with a strong intro, believable social proof, and visually rich customer quotes. Include a section label, a clear headline, supporting copy, and then a responsive layout of testimonial cards or an editorial-style quote composition. Each testimonial should include a realistic customer quote, full name, role, company, and an avatar or visual identity marker, plus optional details like star rating, company logo, or key result achieved. Make the cards feel high-end with excellent typography, balanced line lengths, subtle depth, layered surfaces, and thoughtful spacing. Use realistic B2B or startup-style language rather than generic praise. Add one standout featured testimonial or proof metric to create hierarchy and ensure the full section feels polished, trustworthy, and responsive across devices.",
    icon: MessageSquare,
  },
  {
    title: "FAQ Accordion",
    slug: "faq-accordion",
    description:
      "Create a polished FAQ section with a premium accordion layout that answers realistic product, pricing, onboarding, or security questions. Include a strong section introduction with an eyebrow label, clear headline, and short support paragraph. Then add a set of well-written accordion items with meaningful questions and concise but useful answers. Make the accordion interactions feel refined with clean dividers, strong spacing, obvious expand and collapse affordances, smooth transitions, and accessible focus states. Include optional secondary content such as a support CTA, contact link, documentation hint, or trust note about response times. The design should feel elegant rather than generic, with careful hierarchy, premium surfaces, and responsive behavior that keeps the section readable on mobile.",
    icon: CircleHelp,
  },
  {
    title: "Contact Section",
    slug: "contact-section",
    description:
      "Design a premium contact section for a business or SaaS website that combines a polished inquiry form with helpful business context. Include a strong section heading, short supporting text, and a two-column layout where one side contains a realistic contact form and the other side presents contact methods, office information, response expectations, or a short trust statement. The form should include labeled inputs, a textarea, a reason-for-contact selector, and a clear primary submit action with supportive microcopy. Add useful details such as response time, support email, phone number, or availability windows. The visual treatment should feel calm, trustworthy, and production-ready with excellent spacing, meaningful hierarchy, subtle depth, and fully responsive behavior across desktop and mobile.",
    icon: Mail,
  },
  {
    title: "Dashboard Header",
    slug: "dashboard-header",
    description:
      "Create a premium dashboard top header for a product, admin, or analytics application with a clear balance of navigation, context, and actions. Include a page title area with breadcrumb or workspace context, a search field, optional quick filters, notification control, profile menu trigger, and one or two high-priority action buttons. Add small but important details such as date range display, command hint, status badge, or environment switcher so the component feels realistic and fully designed. The layout should have excellent alignment, a strong spacing rhythm, refined surfaces, and clear interactive states. Ensure the header scales well between large desktop views and compact tablet or mobile layouts while preserving usability and visual clarity.",
    icon: PanelTop,
  },
  {
    title: "Kanban Board",
    slug: "kanban-board",
    description:
      "Design a polished kanban board component for a project management or workflow application with multiple task columns, realistic task cards, and premium interaction details. Include a clear board header with title, filters, team avatars, and an action button, followed by three to five columns such as Backlog, In Progress, Review, and Done. Each column should contain realistic task cards with title, priority, tags, due date, assignee avatar, and progress cues where relevant. Use clear visual hierarchy, balanced spacing, neat card surfaces, subtle drag-and-drop affordance styling, and color usage derived from semantic theme tokens. The board should feel like a serious product interface rather than a basic demo. Ensure the layout remains understandable on smaller screens through stacked columns, horizontal scroll, or a responsive adaptation that still feels intentional.",
    icon: KanbanSquare,
  },
];
