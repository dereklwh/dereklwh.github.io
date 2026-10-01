import bpLogo from '../assets/blueprint-logo.svg';
import canucksLogo from '../assets/canucks-logo.png';
import dwLogo from '../assets/dwave-logo.jpeg';
import matchstickLogo from '../assets/matchstick-logo.jpeg';
import corticoLogo from '../assets/cortico-logo.jpeg';

// Ordered current roles first, then by most recent end date.
const experiences = [
  {
    logo: corticoLogo,
    company: 'Cortico Health',
    location: 'Vancouver, BC',
    title: 'Software Developer',
    time: 'Sep 2026 - Present',
    previous: { title: 'Software Developer Intern', time: 'Jan 2026 - Aug 2026' },
    current: true,
    stack: ['Django', 'JavaScript', 'Redis', 'Telnyx', 'Sentry', 'Product'],
    bullets: [
      'Shipped end-to-end features in a multi-tenant Django healthcare platform: fax invoicing (Telnyx API, PDF generation, webhooks), async CSV exports (Redis, threading), and automated patient feedback emails',
      'Delivered 20+ PRs across the full stack including bug fixes, frontend optimizations, cron jobs, data migrations, and EMR integration fixes (Oscar, Accuro)',
      'Added to CODEOWNERS within 7 weeks; conducted peer code reviews, triaged production errors via Sentry, and demoed features to cross-functional stakeholders',
    ],
  },
  {
    logo: bpLogo,
    company: 'SFU Blueprint',
    location: 'Burnaby, BC',
    title: 'Software Developer',
    time: 'Feb 2024 - Apr 2026',
    stack: ['React', 'Flask', 'Neo4j', 'OpenAI', 'Docker'],
    bullets: [
      'Built an AI chatbot for MOSAIC (RAG + OpenAI) and a full-stack admin portal with React/Tailwind/Firebase',
      'Designed REST APIs with Flask + Neo4j for real-time data sync',
      'Set up a CI/CD pipeline with GitHub Actions, Docker, Render, and Vercel',
    ],
  },
  {
    logo: matchstickLogo,
    company: 'Matchstick Coffee Roasters',
    location: 'Vancouver, BC',
    title: 'Coffee Engineer (Barista)',
    time: 'May 2025 - Mar 2026',
    stack: ['Espresso', 'Latte art', 'Hospitality'],
    bullets: [
      'Craft espresso and non-espresso beverages in high-volume cafe service',
      'Enhance customer experience through quality, speed, and hospitality',
    ],
  },
  {
    logo: canucksLogo,
    company: 'Canucks Sports and Entertainment',
    location: 'Vancouver, BC',
    title: 'Data Analyst',
    time: 'Sep 2024 - Apr 2025',
    stack: ['Python', 'pandas', 'SQL', 'Power BI', 'Data Visualization', 'Classification', 'Hugging Face', 'ETL Pipelines', 'Microsoft Fabric'],
    bullets: [
      'Automated post-game survey reporting (95% faster) and built an NLP pipeline with Hugging Face DistilBERT to classify 10,000+ fan survey responses',
      'Delivered Power BI dashboards and visualized insights',
      'Fulfilled 100+ data requests across marketing, sales, and corporate partnerships using SQL and pandas',
      'Built Microsoft Fabric ETL pipelines with Python + various APIs for streamlined data analysis tasks',
    ],
  },
  {
    logo: dwLogo,
    company: 'D-Wave Quantum',
    location: 'Burnaby, BC',
    title: 'Business Analyst',
    time: 'Sep 2022 - Dec 2022',
    stack: ['Salesforce', 'Postman', 'Power BI'],
    bullets: [
      'Led Salesforce UAT using Postman and delivered stakeholder training',
      'Built and presented Power BI dashboards during product sprint meetings',
      'Standardized the project intake process with a new project charter template',
    ],
  },
];

export default experiences;
