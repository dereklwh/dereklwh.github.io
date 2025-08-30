import { LuLeaf } from "react-icons/lu";

export default function ExperienceCard({experiences}) {

    return (
        <div className='px-6 py-4 bg-white shadow-lg rounded-lg'>
            {experiences.map((experience, index) => (
                <div key={index} className="grid grid-cols-[1fr_auto_1fr] items-stretch mx-auto gap-10">
                    <div className='flex flex-col items-center mt-8'> 
                        <img
                        src={experience.src}
                        className='h-25 w-25 object-cover mb-6'
                        />
                        <p className='font-bold text-sm mb-2'>{experience.company}</p>
                        <p className='text-xs text-[#92ACA0]'>{experience.location}</p>
                    </div>
                    {/* middle line */}
                    <div className="relative flex items-center">
                        {/* Line */}
                        <div className="h-full border-l-2 border-dashed border-green-600"></div>
                        {/* Leaf in center */}
                        <LuLeaf className="absolute left-1/2 transform -translate-x-1/2 text-green-600 bg-white p-1 rounded-full" size={20} />
                    </div>
                    <div className='flex flex-col text-sm items-center px-2 justify-center whitespace-normal'>
                        <p>{experience.title}</p>
                        <p>{experience.time}</p>
                        <p>{experience.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};
