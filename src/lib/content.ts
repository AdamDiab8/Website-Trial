// All homepage copy, sourced from website info/websiteinfo.md.
// Kept in one place so the section components can import the same data.
//
// Every link points at the real nokia.com page for that topic. Where Nokia's
// exact deep URL isn't certain, the link falls back to the closest real
// section so it still lands in the right place on nokia.com.

const N = "https://www.nokia.com";

export const brand = {
  name: "Nokia",
  tagline: "Advancing connectivity for the AI supercycle",
  oneLiner:
    "As a technology leader across mobile, fixed and cloud networks, Nokia's solutions enable a more productive, sustainable and inclusive world.",
  home: N,
};

export const utilityNav: { label: string; href: string }[] = [
  { label: "More from Nokia", href: `${N}/about-us/` },
  { label: "Worldwide (English)", href: `${N}/` },
];

export type MegaLink = { label: string; href: string };
export type MegaColumn = { heading?: string; links: MegaLink[] };
export type MegaTile = {
  title: string;
  blurb: string;
  image: string;
  href: string;
};
export type MegaMenu = {
  label: string;
  href: string;
  columns: MegaColumn[];
  tiles: MegaTile[];
};

// Top-level nav + mega-menu contents, from websiteinfo.md section ①.
// Tile images come from /public/images/menu/ (the "Photo 2" set).
export const megaMenus: MegaMenu[] = [
  {
    label: "Solutions",
    href: `${N}/networks/`,
    columns: [
      {
        heading: "Explore by focus area",
        links: [
          { label: "Data center networking", href: `${N}/data-center-networks/` },
          { label: "Automation & security", href: `${N}/security-portfolio/` },
          { label: "Defense", href: `${N}/defense/` },
          { label: "Energy", href: `${N}/industries/energy/` },
          { label: "Enterprise campus", href: `${N}/industries/enterprise/` },
          { label: "Public sector", href: `${N}/industries/public-sector/` },
          { label: "Transportation", href: `${N}/industries/transportation/` },
          { label: "Fixed access", href: `${N}/fixed-networks/` },
          { label: "Mobile access", href: `${N}/mobile-networks/` },
          { label: "Transport", href: `${N}/ip-optical-networks/` },
        ],
      },
      {
        heading: "Explore our solution areas",
        links: [
          { label: "Autonomous networks", href: `${N}/autonomous-networks/` },
          { label: "Broadband access", href: `${N}/fixed-networks/` },
          { label: "Core networks", href: `${N}/core-networks/` },
          { label: "Data center networks", href: `${N}/data-center-networks/` },
          { label: "IP networks", href: `${N}/ip-networks/` },
          {
            label: "Microwave transport",
            href: `${N}/mobile-networks/microwave-radio/`,
          },
          { label: "Multimedia technologies", href: `${N}/networks/` },
          { label: "Network APIs", href: `${N}/network-as-code/` },
          { label: "Network security", href: `${N}/security-portfolio/` },
          { label: "Optical networks", href: `${N}/optical-networks/` },
          {
            label: "Radio access networks",
            href: `${N}/mobile-networks/radio-access-networks/`,
          },
        ],
      },
    ],
    tiles: [
      {
        title: "AI and cloud providers",
        blurb: "Scale faster with advanced optical and IP connectivity.",
        image: "/images/menu/menu-ai-cloud.jpeg",
        href: `${N}/industries/ai/`,
      },
      {
        title: "Mission-critical enterprises",
        blurb: "Operate securely with high-performance connectivity.",
        image: "/images/menu/menu-industries.jpg",
        href: `${N}/industries/`,
      },
      {
        title: "Telecommunication providers",
        blurb: "Evolve networks to seize the opportunities of AI, securely.",
        image: "/images/menu/menu-telecom.jpg",
        href: `${N}/telecommunication-providers/`,
      },
    ],
  },
  {
    label: "Insights and innovation",
    href: `${N}/thought-leadership/`,
    columns: [
      {
        links: [
          { label: "Insights", href: `${N}/thought-leadership/` },
          { label: "Blog", href: `${N}/blog/` },
          { label: "Bell Labs", href: `${N}/bell-labs/` },
          { label: "Standardization", href: `${N}/about-us/standardization/` },
          { label: "Technical Advisory Board", href: `${N}/bell-labs/` },
        ],
      },
    ],
    tiles: [
      {
        title: "Nokia Bell Labs",
        blurb: "Inventing the future of technology for humanity.",
        image: "/images/menu/menu-belllabs.jpg",
        href: `${N}/bell-labs/`,
      },
      {
        title: "Blog",
        blurb: "Perspectives from Nokia's technology experts.",
        image: "/images/menu/menu-blog.jpg",
        href: `${N}/blog/`,
      },
      {
        title: "Standardization",
        blurb: "Shaping the open standards behind global networks.",
        image: "/images/menu/menu-standardization.jpg",
        href: `${N}/about-us/standardization/`,
      },
    ],
  },
  {
    label: "Partner with us",
    href: `${N}/partners/`,
    columns: [
      {
        links: [
          { label: "Nokia partners", href: `${N}/partners/` },
          { label: "Innovate with Nokia", href: `${N}/partners/` },
          {
            label: "Patent licensing",
            href: `${N}/about-us/nokia-technologies/`,
          },
          { label: "NGP Capital", href: "https://www.ngpcap.com/" },
        ],
      },
    ],
    tiles: [
      {
        title: "Nokia partners",
        blurb: "Find a partner or join our partner program.",
        image: "/images/menu/menu-partners.jpg",
        href: `${N}/partners/`,
      },
      {
        title: "Innovate with Nokia",
        blurb: "Co-create on our platforms, labs and network APIs.",
        image: "/images/menu/menu-innovate.jpeg",
        href: `${N}/network-as-code/`,
      },
      {
        title: "Patent licensing",
        blurb: "License Nokia's foundational technology patents.",
        image: "/images/menu/menu-patents.jpeg",
        href: `${N}/about-us/nokia-technologies/`,
      },
    ],
  },
  {
    label: "We are Nokia",
    href: `${N}/about-us/`,
    columns: [
      {
        links: [
          { label: "About Nokia", href: `${N}/about-us/` },
          { label: "Careers", href: `${N}/about-us/careers/` },
          { label: "Events", href: `${N}/about-us/events/` },
          { label: "Investors", href: `${N}/about-us/investors/` },
          {
            label: "Leadership & governance",
            href: `${N}/about-us/leadership-and-governance/`,
          },
          { label: "Newsroom", href: `${N}/newsroom/` },
          { label: "Sustainability", href: `${N}/about-us/sustainability/` },
          {
            label: "Responsible business",
            href: `${N}/about-us/sustainability/`,
          },
        ],
      },
    ],
    tiles: [
      {
        title: "Newsroom",
        blurb: "The latest Nokia news and press releases.",
        image: "/images/menu/menu-newsroom.jpg",
        href: `${N}/newsroom/`,
      },
      {
        title: "Careers",
        blurb: "Build the technology that connects the world.",
        image: "/images/menu/menu-careers.jpg",
        href: `${N}/about-us/careers/`,
      },
      {
        title: "Events",
        blurb: "Meet Nokia at events around the world.",
        image: "/images/menu/menu-industries.jpg",
        href: `${N}/about-us/events/`,
      },
    ],
  },
];

export type HeroSlide = {
  id: string;
  tabLabel: string;
  headline: string;
  cta: string;
  ctaHref: string;
  media: { type: "video" | "image"; src: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "ai-ran",
    tabLabel: "AI-RAN Summer launch",
    headline:
      "Nokia defines the next era of radio with the industry's first AI-native RAN platform",
    cta: "Watch our Summer launch",
    ctaHref: `${N}/mobile-networks/radio-access-networks/`,
    media: { type: "video", src: "/videos/hero-ran.mp4" },
  },
  {
    id: "data-center",
    tabLabel: "Modern data center networks",
    headline: "Modern data centers that supercharge AI",
    cta: "Discover the critical role of the network",
    ctaHref: `${N}/data-center-networks/`,
    media: { type: "video", src: "/videos/hero-datacenter.mp4" },
  },
  {
    id: "autonomous",
    tabLabel: "Autonomous Networks",
    headline: "Autonomous Networks",
    cta: "Explore networks that sense, think, act",
    ctaHref: `${N}/autonomous-networks/`,
    media: { type: "image", src: "/images/hero-autonomous.jpg" },
  },
  {
    id: "broadband",
    tabLabel: "Broadband access networks",
    headline: "Broadband access networks",
    cta: "See our broadband services",
    ctaHref: `${N}/fixed-networks/`,
    media: { type: "video", src: "/videos/hero-broadband.mp4" },
  },
];

export type Segment = {
  title: string;
  frontLine: string;
  back: string;
  cta: string;
  href: string;
  image: string;
};

export const segments: Segment[] = [
  {
    title: "AI and cloud providers",
    frontLine: "Scale faster with advanced optical and IP connectivity.",
    back: "Scale the interconnection and operations of your network infrastructure with advanced optical, IP and datacenter switching technologies.",
    cta: "Discover solutions",
    href: `${N}/industries/ai/`,
    image: "/images/segments/seg-ai-cloud.jpg",
  },
  {
    title: "Telecommunication providers",
    frontLine: "High performance, secure connectivity for the AI era.",
    back: "Evolving networks to deliver high performance, secure connectivity ready to seize the opportunities of AI across mobile, fixed and transport.",
    cta: "Discover solutions",
    href: `${N}/telecommunication-providers/`,
    image: "/images/segments/seg-telecom.jpg",
  },
  {
    title: "Mission-critical enterprises",
    frontLine: "Operate securely with high-performance connectivity.",
    back: "Secure, high-performance private networking for industry, transport, energy and the public sector — connectivity you can rely on.",
    cta: "Discover solutions",
    href: `${N}/industries/`,
    image: "/images/segments/seg-mission-critical.jpg",
  },
];

export type BusinessCard = {
  title: string;
  blurb: string;
  href: string;
  image: string;
};

export const businessCards: BusinessCard[] = [
  {
    title: "The future of telecom",
    blurb:
      "Learn from today's telecom leaders shaping next-gen networks and cloud.",
    href: `${N}/thought-leadership/`,
    image: "/images/cards/card-future-telecom.jpg",
  },
  {
    title: "Artificial intelligence",
    blurb:
      "Build AI-powered networks that meet the demands of AI applications.",
    href: `${N}/industries/ai/`,
    image: "/images/cards/card-ai.jpg",
  },
  {
    title: "Autonomous Networks Suite",
    blurb: "Autonomous networks built for the AI era.",
    href: `${N}/autonomous-networks/`,
    image: "/images/cards/card-autonomous-suite.jpg",
  },
  {
    title: "MantaRay SMO",
    blurb:
      "AI-powered Service Management and Orchestration for Autonomous RAN.",
    href: `${N}/mobile-networks/`,
    image: "/images/cards/card-mantaray.jpg",
  },
  {
    title: "anyRAN",
    blurb:
      "The widest choice of strategic options for the RAN evolution of mobile network operators and enterprises.",
    href: `${N}/mobile-networks/anyran/`,
    image: "/images/cards/card-anyran.jpg",
  },
];

export type Insight = {
  title: string;
  kind: "Article" | "Blog" | "Video";
  href: string;
  image: string;
};

export const insights: Insight[] = [
  {
    title:
      "Why Digital Air Traffic Management Depends on the Communications Network Beneath It",
    kind: "Article",
    href: `${N}/thought-leadership/articles/`,
    image: "/images/insights/insight-atm.jpg",
  },
  {
    title:
      "Why does AI-ready healthcare depend on deterministic, resilient, secure optical network infrastructure?",
    kind: "Blog",
    href: `${N}/blog/`,
    image: "/images/insights/insight-healthcare.jpeg",
  },
  {
    title:
      "Faster, safer broadband for Saudi Arabia: Inside ACES's Nokia-powered network",
    kind: "Video",
    href: "https://www.youtube.com/user/nokia",
    image: "/images/insights/insight-aces.jpg",
  },
];

export const insightSubLinks: { label: string; href: string }[] = [
  { label: "More insights", href: `${N}/thought-leadership/` },
  { label: "More from our blog", href: `${N}/blog/` },
  { label: "More customer successes", href: `${N}/thought-leadership/` },
];

export type NewsItem = { date: string; title: string; href: string };

const NEWSROOM = `${N}/newsroom/`;

export const news: NewsItem[] = [
  {
    date: "3 Sep 2026",
    title:
      "Nokia and BeeHealthy bring network-based verification to digital healthcare",
    href: NEWSROOM,
  },
  {
    date: "1 Sep 2026",
    title:
      "Nokia opens new R&D center in Saudi Arabia for AI-powered network automation",
    href: NEWSROOM,
  },
  {
    date: "18 Aug 2026",
    title:
      "Nokia ranked No. 1 for mobile core portfolio competitiveness (Omdia 2026)",
    href: NEWSROOM,
  },
  {
    date: "6 Aug 2026",
    title: "Indosat, Ooredoo, Nokia & NVIDIA launch Zankore",
    href: NEWSROOM,
  },
  {
    date: "23 Jul 2026",
    title: "Recast comparative financial information",
    href: `${N}/about-us/investors/`,
  },
  {
    date: "23 Jul 2026",
    title: "Nokia Corporation Report for Q2 & H1 2026",
    href: `${N}/about-us/investors/`,
  },
];

export const newsroomHref = NEWSROOM;

export type FooterLink = { label: string; href: string };

export const footer: {
  columns: { title: string; links: FooterLink[] }[];
  support: FooterLink[];
  social: FooterLink[];
  legal: { label: string; href?: string }[];
  consumerNote: { text: string; cta: string; href: string };
  newsletter: { label: string; href: string };
} = {
  columns: [
    {
      title: "Solutions for",
      links: [
        { label: "AI and cloud providers", href: `${N}/industries/ai/` },
        { label: "Mission critical enterprises", href: `${N}/industries/` },
        {
          label: "Telecommunication providers",
          href: `${N}/telecommunication-providers/`,
        },
      ],
    },
    {
      title: "Insights",
      links: [
        { label: "Blog", href: `${N}/blog/` },
        { label: "Learning at Nokia", href: `${N}/about-us/careers/` },
        { label: "Nokia Bell Labs", href: `${N}/bell-labs/` },
        { label: "Technology explained", href: `${N}/thought-leadership/` },
        { label: "Standardization", href: `${N}/about-us/standardization/` },
        { label: "Webinars", href: `${N}/thought-leadership/` },
      ],
    },
    {
      title: "We are Nokia",
      links: [
        { label: "Newsroom", href: `${N}/newsroom/` },
        { label: "Careers", href: `${N}/about-us/careers/` },
        { label: "Investors", href: `${N}/about-us/investors/` },
        { label: "Sustainability", href: `${N}/about-us/sustainability/` },
        { label: "Customer success", href: `${N}/thought-leadership/` },
      ],
    },
  ],
  support: [
    { label: "Contact us", href: `${N}/about-us/contact-us/` },
    { label: "Extranet access", href: `${N}/about-us/contact-us/` },
    { label: "Find a partner", href: `${N}/partners/` },
    { label: "Support", href: `${N}/networks/support/` },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/nokia/" },
    { label: "YouTube", href: "https://www.youtube.com/user/nokia" },
    { label: "X", href: "https://x.com/nokia" },
    { label: "Facebook", href: "https://www.facebook.com/nokia/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nokia" },
  ],
  legal: [
    { label: "©2026 Nokia all rights reserved" },
    { label: "Cookies", href: `${N}/cookie-policy/` },
    { label: "Privacy notice", href: `${N}/privacy/` },
    { label: "Terms of use", href: `${N}/terms-of-use/` },
    { label: "Inclusive terminology", href: `${N}/about-us/` },
    {
      label: "Modern slavery statement",
      href: `${N}/about-us/sustainability/`,
    },
  ],
  consumerNote: {
    text: "Looking for Nokia licensed products support?",
    cta: "Explore consumer devices",
    href: `${N}/phones/`,
  },
  newsletter: {
    label: "Subscribe for our latest news",
    href: `${N}/newsroom/`,
  },
};
