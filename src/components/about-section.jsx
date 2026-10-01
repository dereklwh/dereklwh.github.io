import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPython, FaReact, FaJava, FaJs, FaGitAlt, FaDatabase, FaMicrosoft, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiDjango, SiFlask, SiCplusplus, SiTypescript, SiScikitlearn, SiTailwindcss, SiNeo4J, SiPandas, SiKotlin } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { IoDocumentText } from 'react-icons/io5';
import coffeeImage from '../assets/coffee.jpg?w=1200&format=webp';
import canucksTeamPhoto from '../assets/canucks-bi-team.jpg?w=1200&format=webp';
import blueprintTeamPhoto from '../assets/blueprint.jpg?w=1200&format=webp';
import GalleryCarousel from './GalleryCarousel';
import { contacts } from '../data/contacts.js';

const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', icon: <FaPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'SQL', icon: <FaDatabase /> },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React.js', icon: <FaReact /> },
      { name: 'Django', icon: <SiDjango /> },
      { name: 'Flask', icon: <SiFlask /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    label: 'Data & Tools',
    skills: [
      { name: 'pandas', icon: <SiPandas /> },
      { name: 'scikit-learn', icon: <SiScikitlearn /> },
      { name: 'Neo4j', icon: <SiNeo4J /> },
      { name: 'Power BI', icon: <FaMicrosoft /> },
      { name: 'Git', icon: <FaGitAlt /> },
    ],
  },
];

const galleryImages = [
  { src: coffeeImage, caption: 'Where I learned to make a cortado under pressure.' },
  { src: canucksTeamPhoto, caption: 'Turning business data into stories with the Canucks BI team.' },
  { src: blueprintTeamPhoto, caption: 'Shipping software that matters, with people who care.' },
];

const contactIcons = {
  LinkedIn: <FaLinkedin />,
  GitHub: <FaGithub />,
  Instagram: <FaInstagram />,
  Email: <HiOutlineMail />,
  Resume: <IoDocumentText />,
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const Card = ({ className = '', delay = 0, children }) => (
  <motion.div {...reveal} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} className={`card ${className}`}>
    {children}
  </motion.div>
);

const CardTitle = ({ children, sub }) => (
  <div className="mb-4">
    <h3 className="font-display text-3xl">{children}</h3>
    {sub && <p className="mt-1 text-sm text-sage-deep dark:text-sage">{sub}</p>}
  </div>
);

const AboutSection = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
    <Card className="p-6 md:col-span-2">
      <CardTitle>I'm Excited About...</CardTitle>
      <ul className="space-y-2 text-sm leading-relaxed">
        {[
          'Data Analytics and Visualization',
          'Building Web Applications',
          'Social Impact through Technology',
          'Documenting my life through journaling',
          'Continuous learning and growth, especially through failure',
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-sage">→</span>
            {item}
          </li>
        ))}
        <li className="flex gap-2">
          <span className="text-sage">→</span>
          <span>
            <a
              href="https://www.goodreads.com/review/list/182676242-derek?shelf=read"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sage-deep underline decoration-sage/40 underline-offset-4 hover:text-ink dark:text-sage dark:hover:text-fog"
            >
              Books
            </a>
            , Coffee, and my Cat{' '}
            <span className="group relative cursor-help font-semibold text-sage-deep dark:text-sage" tabIndex={0}>
              芝麻
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus:opacity-100 dark:bg-forest">
                zhi &bull; ma (Sesame)
              </span>
            </span>
          </span>
        </li>
      </ul>
    </Card>

    <Card className="p-6 md:col-span-4" delay={0.08}>
      <CardTitle sub="Languages, frameworks, and tools I've worked with">Skills I've Picked Up</CardTitle>
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="eyebrow mb-2">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 rounded-full border border-ink/10 bg-mist/60 px-3 py-1.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-sage hover:bg-sage hover:text-white dark:border-fog/10 dark:bg-forest-line"
                >
                  <span className="text-sm">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>

    <Card className="overflow-hidden md:col-span-3" delay={0.04}>
      <div className="p-6 pb-4">
        <CardTitle sub="Moments that shape how I collaborate, think, and build.">Life Outside Code</CardTitle>
      </div>
      <GalleryCarousel images={galleryImages} />
      <div className="p-6 pt-4">
        <Link to="/gallery" className="btn-ghost">
          View Full Gallery →
        </Link>
      </div>
    </Card>

    <Card className="p-6 md:col-span-3" delay={0.12}>
      <CardTitle sub="(and check out my resume)">Let's Connect!</CardTitle>
      <ul className="divide-y divide-ink/10 dark:divide-fog/10">
        {contacts.map((contact) => (
          <li key={contact.name}>
            <a
              href={contact.href}
              target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-2 py-3 transition-colors hover:text-sage-deep dark:hover:text-sage"
            >
              <span className="text-lg text-sage">{contactIcons[contact.name]}</span>
              {contact.name}
              <span className="ml-auto font-mono text-xs opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

export default AboutSection;
