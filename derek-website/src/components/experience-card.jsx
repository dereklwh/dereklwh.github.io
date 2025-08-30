export default function ExperienceCard({experiences}) {

    return (
        <div className='px-6 py-4 bg-white shadow-lg rounded-lg'>
            {experiences.map((experience, index) => (
                <div key={index} className="flex items-center justify-center gap-10">
                    <div className='flex flex-col items-center'> 
                        <img
                        src={experience.src}
                        className='h-20 w-full'
                        />
                        <p className='font-bold text-base'>{experience.company}</p>
                        <p className='text-sm text-[#92ACA0]'>{experience.location}</p>
                    </div>
                    <div className='flex flex-col text-sm items-center'>
                        <p>{experience.title}</p>
                        <p>{experience.time}</p>
                        <p>{experience.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};
