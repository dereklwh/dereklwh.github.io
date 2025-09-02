import { FaGithub } from 'react-icons/fa'
import fluentU from '../assets/projects/fluentU.png'
import dcc from '../assets/projects/game_project.png'

const ProjectsSection = () => {

    const project = [

    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 content-stretch gap-8'>
            <div className='flex-col items-center border-1 border-transparent hover:border-gray-200 shadow-md rounded-md'>
                <div className='group relative w-full mb-2'>
                    <img src={dcc} className='object-cover w-full h-64 group-hover:blur-sm group-hover:scale-97 transition-transform duration-300'/>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black/40" />
                        <p className="relative z-10 px-4 py-2 text-center text-white text-sm md:text-base">
                            blah blah blah
                        </p>
                    </div>
                </div>
                
                {/* description */}
                <div className='pl-4 pb-4'>
                    <p className='text-base mb-2 font-bold'>TESTING PROJ 1</p>
                    <p className='text-sm mb-2 text-[#92ACA0]'>January 2024</p>
                    <div className='flex items-center text-sm'>
                        <span>view proj</span>
                        <FaGithub className='ml-2'/>
                    </div>
                </div>

            </div>
            <div className='flex-col items-center border-1 border-transparent transition-500 hover:border-gray-200 shadow-md rounded-md'>
                <div className='group relative w-full mb-2'>
                <img src={fluentU} className='object-cover w-full h-64 group-hover:blur-sm group-hover:scale-97 transition-transform duration-300'/>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black/40" />
                        <p className="relative z-10 px-4 py-2 text-center text-white text-sm md:text-base">
                            blah blah blah
                        </p>
                    </div>
                </div>
                
                {/* description */}
                <div className='pl-4 pb-4'>
                    <p className='text-base mb-2 font-bold'>TESTING PROJECT</p>
                    <p className='text-sm mb-2 text-[#92ACA0]'>January 2024</p>
                    <div className='flex items-center text-sm'>
                        <span>view proj</span>
                        <FaGithub className='ml-2'/>
                    </div>
                </div>

            </div>
            <div className='flex-col items-center border-1 border-transparent transition-500 hover:border-gray-200 shadow-md rounded-md'>
                <div className='group relative w-full mb-2'>
                <img src={fluentU} className='object-cover w-full h-64 group-hover:blur-sm group-hover:scale-97 transition-transform duration-300'/>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black/40" />
                        <p className="relative z-10 px-4 py-2 text-center text-white text-sm md:text-base">
                            blah blah blah
                        </p>
                    </div>
                </div>
                
                {/* description */}
                <div className='pl-4 pb-4'>
                    <p className='text-base mb-2 font-bold'>TESTING PROJECT</p>
                    <p className='text-sm mb-2 text-[#92ACA0]'>January 2024</p>
                    <div className='flex items-center text-sm'>
                        <span>view proj</span>
                        <FaGithub className='ml-2'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProjectsSection