import React, { useState } from 'react';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";

// using this constant here only as in this example we are not using this anywhere else
const sidebarItems = [
    {
        name: 'Home',
        filledIcon: <AiFillHome className="text-2xl" />,
        outlineIcon: <AiOutlineHome className="text-2xl" />,
        link: '/',
    },
    {
        name: 'Shorts',
        filledIcon: <SiYoutubeshorts className="text-2xl" />,
        outlineIcon: <img src='/images/shorts_outline.png' alt='shorts image' className='h-6 w-6' />,
        link: '/shorts',
    },
    {
        name: 'Subscriptions',
        filledIcon: <MdSubscriptions className="text-2xl" />,
        outlineIcon: <MdOutlineSubscriptions className="text-2xl" />,
        link: '/subscriptions',
    },
    {
        name: 'You',
        filledIcon: <img src='/images/user_fill.png' alt='you image' className='h-6 w-6' />,
        outlineIcon: <img src='/images/user_outline.png' alt='you image' className='h-6 w-6' />,
        link: '/you',
    },
];

const SidebarColapsed = () => {
    const [isActive, setIsActive] = useState(0);

    const handleActive = (value) => {
        setIsActive(value);
    };

    return (
        // Both sidebar is set as fixed
        <div className='fixed top-16 left-0 w-20 hidden md:flex flex-col gap-4 bg-transparent text-[#0f0f0f] px-1 py-2'>
            {
                sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center flex-col justify-center h-18 hover:bg-gray-200 w-full cursor-pointer rounded-xl gap-2 `}
                        onClick={() => handleActive(index)}
                    >
                        {isActive === index ? item.filledIcon : item.outlineIcon}
                        <p className='text-tiny'>{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SidebarColapsed;