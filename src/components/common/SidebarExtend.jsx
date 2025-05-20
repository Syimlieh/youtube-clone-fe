import React, { useState } from 'react';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdSubscriptions, MdOutlinePlaylistPlay, MdOutlineSmartDisplay } from "react-icons/md";
import { RiHistoryFill, RiGraduationCapFill, RiGraduationCapLine } from "react-icons/ri";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { GoChevronRight } from "react-icons/go";
import Hamburger from './Hamburger';

// so for extended sidebar we are creating a section of sidebar seperated by category.
const sidebarItems = [
    {
        category: '',
        items: [
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
        ]
    },
    {
        category: 'You',
        items: [
            {
                name: 'History',
                filledIcon: <RiHistoryFill className='text-2xl' />,
                outlineIcon: <RiHistoryFill className='text-2xl' />,
                link: '/history',
            },
            {
                name: 'Playlists',
                filledIcon: <MdOutlinePlaylistPlay className='text-3xl' />,
                outlineIcon: <MdOutlinePlaylistPlay className='text-3xl' />,
                link: '/playlists',
            },
            {
                // Your videos
                name: 'Your Videos',
                filledIcon: <MdOutlineSmartDisplay className="text-2xl" />,
                outlineIcon: <MdOutlineSmartDisplay className="text-2xl" />,
                link: '/your-videos',
            },
            {
                // Watch later
                name: 'Watch Later',
                filledIcon: <RiGraduationCapFill className='text-2xl' />,
                outlineIcon: <RiGraduationCapLine className='text-2xl' />,
                link: '/watch-later',
            },
            {
                // Liked videos
                name: 'Liked Videos',
                filledIcon: <BiSolidLike className='text-2xl' />,
                outlineIcon: <BiLike className='text-2xl' />,
                link: '/liked-videos',
            }
        ]
    },
    {
        category: 'Subscriptions',
        items: [
            // TODO: will add this laster dynamically
        ]
    }
];

const SidebarExtend = () => {
    const [isActive, setIsActive] = useState("Home"); // setting default active item to Home
    const handleActive = (value) => {
        setIsActive(value);
    };
    return (
        <div className='bg-white h-screen fixed top-0 left-0 hidden md:flex flex-col gap-2 px-4 text-[#0f0f0f] w-64 shrink-0 z-20'>
            <div className='px-3 h-16 flex justify-between items-center'>
                <Hamburger />
            </div>
            {sidebarItems.map((category, index) => (
                <div key={index} className='flex flex-col'>
                    {/* If category exist then only we display it  */}
                    {category.category &&
                        <span className='flex p-2 gap-2 items-center'>
                            <h2 className='text-lg text-gray-80 font-semibold'>{category.category}</h2>
                            <GoChevronRight className="text-xl" />
                        </span>}

                    {category.items.map((item, index) => (
                        // active item are highlighted
                        <div key={index} className={`flex items-center justify-start gap-8 p-3 hover:bg-gray-200 rounded-xl cursor-pointer ${isActive === item.name ? "bg-gray-100" : ""}`} onClick={() => handleActive(item.name)}>
                            {
                                isActive === item.name ? item.filledIcon : item.outlineIcon
                            }

                            <p className={`text-md  ${isActive === item.name ? "font-bold" : "font-medium"}`}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                    <hr className='border-gray-300 my-2' />
                </div>

            ))}
        </div>
    )
}

export default SidebarExtend