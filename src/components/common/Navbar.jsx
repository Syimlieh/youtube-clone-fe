import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/slice/toggle.slice';

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav className="h-16 flex justify-between items-center px-7">
            {/* Logo and Menu */}
            <div className="flex items-center gap-5 min-w-[180px]">
                <RxHamburgerMenu
                    className='text-2xl cursor-pointer' onClick={() => dispatch(toggleSidebar())}
                />
                <img src="/images/logo.png" alt="YouTube Logo" className="h-6 w-auto" />
            </div>

            {/* Search */}
            <div className="flex items-center flex-1 justify-center max-w-xl">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 border inset-shadow-sm border-gray-300 rounded-l-full outline-none focus:border-blue-500 text-lg"
                    />
                    <button className="px-4 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 cursor-pointer">
                        <CiSearch className='text-xl' />
                    </button>
                </div>
            </div>

            {/* profile and Notification  */}
            <div className="flex items-center gap-4 min-w-[150px] justify-end">
                <div className='flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 cursor-pointer hover:bg-gray-200'>
                    <GoPlus className='text-3xl' />
                    <button className='cursor-pointer'>Create</button>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <IoIosNotificationsOutline className='text-3xl cursor-pointer' />
                </button>
                <img
                    src="/images/profile.jpg"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
            </div>
        </nav>
    )
}

export default Navbar