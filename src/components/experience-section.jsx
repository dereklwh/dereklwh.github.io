import ExperienceCard from './experience-card.jsx'
import bpLogo from '../assets/blueprint-logo.svg';
import CanucksLogo from '../assets/canucks-logo.png'
import dwLogo from '../assets/dwave-logo.jpeg'
import MatchstickLogo from '../assets/matchstick-logo.jpeg'
import CorticoLogo from '../assets/cortico-logo.jpeg'

const ExperienceSection = () => {
  // TODO: fetch experiences form a json instead
    const experiences = [
        {
            src: CorticoLogo,
            company: 'Cortico Health',
            location: 'Vancouver, BC',
            title: 'Software Developer Intern',
            time: 'Jan 2026 - Present',
            desc: '- Product team'

        },
        {
            src: bpLogo,
            company: 'SFU Blueprint',
            location: 'Burnaby, BC',
            title: 'Software Developer',
            time: 'Feb 2024 – Present',
            desc:
              '- Built AI chatbot for MOSAIC (RAG + OpenAI) and full-stack admin portal with React/Tailwind/Firebase\n' +
              '- Designed REST APIs with Flask + Neo4j for real-time data sync\n' +
              '- Set up CI/CD with GitHub Actions, Docker, and Vercel'
          },
        {
          src: CanucksLogo,
          company: 'Canucks Sports and Entertainment',
          location: 'Vancouver, BC',
          title: 'Data Analyst',
          time: 'Sep 2024 – Apr 2025',
          desc:
            '- Automated post-game survey reporting (95% faster) and built DistilBERT model to classify fan feedback\n' +
            '- Delivered PowerBI dashboards and visualized insights\n' +
            '- Fulfilled 100+ data requests across marketing, sales, and corporate partnerships using SQL and pandas\n' +
            '- Built Microsoft Fabric ETL pipelines with Python + various APIs for streamlined data analysis tasks'
        },
        {
          src: dwLogo,
          company: 'D-Wave Quantum',
          location: 'Burnaby, BC',
          title: 'Business Analyst',
          time: 'Sep 2022 – Dec 2022',
          desc:
            '- Led Salesforce UAT using Postman and delivered stakeholder training\n' +
            '- Built and presented Power BI dashboards during product sprint meetings\n' +
            '- Standardized project intake process with new project charter template'
        },
        {
            src: MatchstickLogo,
            company: 'Matchstick Coffee Roasters',
            location: 'Vancouver, BC',
            title: 'Coffee Engineer (Barista)',
            time: 'May 2025 – Present',
            desc:
              '- Craft espresso and non-espresso beverages in high-volume cafe service\n' +
              '- Enhance customer experience through quality, speed, and hospitality'
          }
      ];
    return (
        <div className=''>
            <ExperienceCard experiences={experiences}/>
        </div>
    )
}

export default ExperienceSection;