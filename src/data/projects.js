import fluentU from '../assets/projects/FluentU.png?w=1200&format=webp';
import dcc from '../assets/projects/game_project.png?w=1200&format=webp';
import crosswatch from '../assets/projects/crosswatch.png?w=1200&format=webp';
import website from '../assets/projects/website.png?w=1200&format=webp';
import assistiveKeyboard from '../assets/projects/assistive_keyboard.png?w=1200&format=webp';
import nhlTravelAnalysis from '../assets/projects/hockey_photo.jpg?w=1200&format=webp';
import hospitalBot from '../assets/projects/hospital_bot.png?w=1200&format=webp';
import adminPage from '../assets/projects/admin_page_login.png?w=1200&format=webp';
import chatbot from '../assets/projects/chatbot2.png?w=1200&format=webp';
import canucksWrapped from '../assets/projects/wrapped.png?w=1200&format=webp';
import stormhacks from '../assets/projects/pomi_stormhacks.png?w=1200&format=webp';
import socketProgramming from '../assets/projects/rdt_protocol.png?w=1200&format=webp';
import jdanalytics from '../assets/projects/jdanalytics.png?w=1200&format=webp';
import studytype from '../assets/projects/studytype.png?w=1200&format=webp';
import customshell from '../assets/projects/customshell.png?w=1200&format=webp';

// `featured` projects get the large cards at the top of the section.
// `impact` lines only restate numbers already in the description.
const projects = [
  {
    slug: 'canucks-wrapped',
    src: canucksWrapped,
    name: 'Canucks Wrapped',
    year: '2025',
    featured: true,
    impact: '140k+ records · 20k+ fans',
    desc: 'Built and led the data pipeline powering Canucks Wrapped. Processed 140k+ fan attendance records with Python and NHL API to generate personalized season recaps for 20k+ unique fans.',
    stack: ['Python', 'NHL API'],
    tags: ['data'],
  },
  {
    slug: 'mosaic-chatbot',
    src: chatbot,
    name: 'MOSAIC Chatbot',
    year: '2024',
    featured: true,
    impact: 'Top 4 · SFU CS Diversity Award',
    desc: 'Developed an AI chatbot with SFU Blueprint for MOSAIC that improves accessibility for newcomers with real-time program guidance. Built with Flask, Neo4j, and OpenAI models, and recognized as a Top 4 finalist in the SFU CS Diversity Award.',
    stack: ['Flask', 'Neo4j', 'OpenAI'],
    tags: ['ai', 'full-stack'],
  },
  {
    slug: 'jdanalytics',
    src: jdanalytics,
    name: 'jdanalytics',
    year: '2026',
    featured: true,
    status: 'In development',
    impact: 'Daily automated data updates',
    desc: 'Developed a full-stack hockey analytics platform featuring elegant data visualizations and advanced statistical modeling. Implements automated daily cron jobs for real-time data updates. Built with ReactJS, TailwindCSS, Flask, and PostgreSQL.',
    url: 'https://github.com/dereklwh/jdanalytics',
    stack: ['React', 'Flask', 'PostgreSQL'],
    tags: ['full-stack', 'data'],
  },
  {
    slug: 'custom-shell',
    src: customshell,
    name: 'Custom Shell',
    year: '2026',
    desc: 'Built a Unix shell in C using Linux system calls (fork, exec, waitpid, signal). Implemented process management, background execution, command history, internal commands, and SIGINT handling. Developed with CMake, ensuring robust error handling and zero memory leaks through proper resource management.',
    stack: ['C', 'Linux', 'CMake'],
    tags: ['systems'],
  },
  {
    slug: 'studytype',
    src: studytype,
    name: 'StudyType',
    year: '2026',
    desc: 'An AI-enhanced typing game designed to improve studying efficiency through gamification. Co-developed using Claude Code to explore AI-assisted development workflows. Built with TypeScript and JavaScript.',
    url: 'https://github.com/dereklwh/study-type',
    stack: ['TypeScript', 'JavaScript'],
    tags: ['ai', 'web'],
  },
  {
    slug: 'socket-programming',
    src: socketProgramming,
    name: 'Socket Programming Projects',
    year: '2025',
    desc: 'Designed and implemented two protocols from scratch using sockets in Python: HTTP with a proxy server, and a Reliable Data Transfer (RDT) protocol with pipelining, Go-Back-N retransmission, flow control, and AIMD congestion control.',
    url: 'https://github.com/dereklwh/371-mp-web-socket',
    stack: ['Python', 'Sockets'],
    tags: ['systems'],
  },
  {
    slug: 'pomi',
    src: stormhacks,
    name: 'Pomi',
    year: '2025',
    desc: 'As a part of StormHacks 2025, developed Pomi, a Pomodoro Pet that uses computer vision to track your focus. Built using NextJS, SQLite3, Flask, and MediaPipe.',
    url: 'https://github.com/braydenmsue/cacheroyale-pomodoro',
    stack: ['Next.js', 'Flask', 'MediaPipe'],
    tags: ['full-stack', 'hackathon'],
  },
  {
    slug: 'personal-website',
    src: website,
    name: 'Personal Website',
    year: '2025',
    desc: 'This website right here! CI/CD pipeline implemented for seamless updates.',
    url: 'https://github.com/dereklwh/dereklwh.github.io',
    stack: ['React', 'Vite', 'Tailwind'],
    tags: ['web'],
  },
  {
    slug: 'mosaic-admin-portal',
    src: adminPage,
    name: 'MOSAIC Admin Portal',
    year: '2025',
    desc: "Developed a content management portal enabling MOSAIC to edit and maintain program data referenced by the chatbot's Neo4j graph database. Built with React, TypeScript, and Flask, featuring user authentication and custom APIs for seamless updates.",
    stack: ['React', 'TypeScript', 'Flask'],
    tags: ['full-stack'],
  },
  {
    slug: 'ai-assistive-keyboard',
    src: assistiveKeyboard,
    name: 'AI Assistive Keyboard',
    year: '2025',
    desc: 'Developed an assistive keyboard aimed to help patients with communication disabilities. Uses an NLP interface that facilitates common language interactions, eye tracking, and speech recognition. Built using ReactJS, TailwindCSS, and Python.',
    url: 'https://github.com/sfu-cmpt340/2025_1_project_18?tab=readme-ov-file#project-overview',
    stack: ['React', 'Python', 'NLP'],
    tags: ['ai', 'web'],
  },
  {
    slug: 'nhl-travel-analysis',
    src: nhlTravelAnalysis,
    name: 'NHL Travel Analysis',
    year: '2025',
    desc: 'Built a modular Python data pipeline to process over 10,000 rows of NHL schedule and geospatial data to analyze team performance during travel. Produced findings in a report with visualizations.',
    url: 'https://github.com/dereklwh/nhl-travel-analysis/blob/main/project-report.pdf',
    stack: ['Python', 'pandas'],
    tags: ['data'],
  },
  {
    slug: 'crosswatch',
    src: crosswatch,
    name: 'CrossWatch',
    year: '2024',
    desc: 'A movie sharing platform that allows users to create and share watchlists. Built for the ProduHacks hackathon using the MERN stack, Material UI, and the MovieDB API.',
    url: 'https://github.com/jeffre-h/CrossWatch',
    stack: ['MongoDB', 'Express', 'React', 'Node'],
    tags: ['full-stack', 'hackathon'],
  },
  {
    slug: 'fluentu',
    src: fluentU,
    name: 'FluentU',
    year: '2023',
    desc: 'An interactive language learning app with quizzes and customizable flashcards powered by Google Cloud Translation API. Developed in Kotlin.',
    url: 'https://github.com/dereklwh/FluentU',
    stack: ['Kotlin', 'Android'],
    tags: ['mobile'],
  },
  {
    slug: 'dead-city-chronicles',
    src: dcc,
    name: 'Dead City Chronicles',
    year: '2023',
    desc: 'An engaging 2D maze game where players navigate through intricate mazes while avoiding smart zombies. Developed using Java and OOP principles. Unit tests implemented using JUnit.',
    url: 'https://github.com/dereklwh/DeadCityChronicles',
    stack: ['Java', 'JUnit'],
    tags: ['games'],
  },
  {
    slug: 'hospital-bot',
    src: hospitalBot,
    name: 'Hospital Bot',
    year: '2022',
    desc: 'SMS-based chatbot that recommends nearest hospitals to users based on their location. Live up-to-date hospital wait times are scraped using BeautifulSoup and Selenium. Developed using Python, Twilio, Google Maps API and deployed on Heroku.',
    url: 'https://github.com/jeffre-h/HospitalBot',
    stack: ['Python', 'Twilio', 'Selenium'],
    tags: ['web', 'ai'],
  },
];

export default projects;
