import ExperienceCard from './experience-card.jsx'
import bpLogo from '../assets/blueprint-logo.svg';
import CanucksLogo from '../assets/canucks-logo.png'
import dwLogo from '../assets/dwave-logo.jpeg'

const ExperienceSection = () => {
    const experiences = [
        {src: bpLogo, company: 'SFU Blueprint', location: 'Burnaby, BC', title: 'Software Developer', time: 'Feb 2024-Present', 
        desc: '- Working extensively with client to successfully fulfill requirements\n- Doing else' },
        {src: CanucksLogo, company: 'SFU Blueprint', location: 'Burnaby, BC', title: 'Software Developer', time: 'Feb 2024-Present', 
        desc: '- Working extensively with client to successfully fulfill requirements\n- Doing else' },  // Blueprint
        {src: dwLogo, company: 'SFU Blueprint', location: 'Burnaby, BC', title: 'Software Developer', time: 'Feb 2024-Present', 
        desc: '- Working extensively with client to successfully fulfill requirements\n- Doing else' }  // Blueprint
    //     {src: aaa, company: bbb, location:xxx, title:nnn, time:yyy, desc:zzz}, // Canucks
    //     {src: aaa, company: bbb, location:xxx, title:nnn, time:yyy, desc:zzz}, // D-Wave
    ]
    return (
        <div className='flex flex-col gap-3'>
            <ExperienceCard experiences={experiences}/>
            {/* <ExperienceCard />
            <ExperienceCard /> */}
        </div>
    )
}

export default ExperienceSection;