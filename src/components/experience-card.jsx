import { LuLeaf } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ExperienceCard({experiences}) {
    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.2}
        }
    }

    const leftItem = {hidden: { y:50, opacity:0},
                        visible: { y:0, opacity: 1, transition: {duration: 0.5, ease: "easeOut", staggerChildren: 0.5}}
                    }

    const rightItem = {hidden: { x:50, opacity:0},
                        visible: {x:0, opacity: 1, transition: {duration: 0.5, ease: "easeOut", staggerChildren: 0.5}}
                    }

    return (
        <div className='relative'>
            <div className='absolute md:justify-self-center border-dashed self-start border-l-2 border-[#92ACA0] h-full'/>
            <div className='flex flex-col md:w-2/3 mx-auto mb-4'>
                {experiences.map((experience, index) => (
                    <motion.div key={index} 
                    className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-stretch gap-10 gap-y-6 mb-4"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount:0.1}}
                    >
                        <motion.div
                        variants={leftItem}
                        className='hidden min-w-0 md:flex flex-col items-center mt-8'
                        > 
                            <img
                            src={experience.src}
                            className='h-25 w-25 object-cover mb-6'
                            />
                            <p className='font-bold text-sm mb-2 items-center justify-self-center'>{experience.company}</p>
                            <p className='text-xs text-[#92ACA0]'>{experience.location}</p>
                        </motion.div>
                        {/* middle line */}
                        <motion.div 
                            variants={rightItem}
                            className="relative flex items-center">
                            {/* Line */}
                            {/* <div className="h-full border-l-2 border-dashed border-[#92ACA0]"></div> */}
                            {/* Leaf in center */}
                            <LuLeaf className="absolute left-1/2 transform -translate-x-1/2 text-white bg-[#92ACA0] p-1 rounded-full" size={20} />
                        </motion.div>
                        <motion.div
                        variants={rightItem}
                        className='flex flex-col min-w-0 text-xs px-2 pl-4 justify-center whitespace-normal dark:text-[#e8f0ee]'>
                            <p className='font-bold text-black dark:text-[#e8f0ee] mb-2'>{experience.title}</p>
                            <p className='mb-4 text-xs'>{experience.time}</p>
                            <ul className='list-disc list-inside'>
                                {experience.desc.split("\n").map((item, i) => (
                                    <li key={i}>{item.replace(/^- /, "")}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
};
