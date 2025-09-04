import ExperienceCard from './experience-card.jsx'
import bpLogo from '../assets/blueprint-logo.svg';
import CanucksLogo from '../assets/canucks-logo.png'
import dwLogo from '../assets/dwave-logo.jpeg'
import MatchstickLogo from '../assets/matchstick-logo.jpeg'

const ExperienceSection = () => {
    const experiences = [
        {src: bpLogo, company: 'SFU Blueprint', location: 'Burnaby, BC', title: 'Software Developer', time: 'Feb 2024 - Present', 
        desc: '- Working extensively with client to successfully fulfill requirements\n Doing else\nDoing else\nDoing else \nDoing else' },
        {src: CanucksLogo, company: 'Canucks Sports and Entertainment', location: 'Vancouver, BC', title: 'Data Analyst', time: 'Sep 2024 - Apr 2025', 
        desc: '- Working extensively with client to successfully fulfill requirements\n- Doing else' },  // Blueprint
        {src: dwLogo, company: 'D-Wave Quantum', location: 'Burnaby, BC', title: 'Business Analyst', time: 'Sep 2022 - Dec 2022', 
        desc: '- Working extensively with client to successfully fulfill requirements\n- Doing else' },  // Blueprint
        {src:  MatchstickLogo, company: 'Matchstick', location:'Vancouver, BC', title:'Barista', time:'May 2025 - Present', desc:'- Working extensively with client to successfully fulfill requirements'}, // Canucks
    //     {src: aaa, company: bbb, location:xxx, title:nnn, time:yyy, desc:zzz}, // D-Wave
    ]
    return (
        <div className=''>
            <ExperienceCard experiences={experiences}/>
            {/* <ExperienceCard />
            <ExperienceCard /> */}
        </div>
    )
}

export default ExperienceSection;