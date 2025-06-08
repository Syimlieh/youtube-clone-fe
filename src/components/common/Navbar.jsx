import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Hamburger from './Hamburger';
import ProfileModal from './ProfileModal';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [activeSmSearch, setActiveSmSearch] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.profile.value);

    const handleToggleProfileModal = () => {
        setProfileModal(!profileModal);
    };

    return (
        <nav className="fixed top-0 l-0 h-16 flex justify-between items-center gap-4 px-5 md:px-7 w-full bg-white z-30">
            {/* Logo and Menu */}
            {
                // we either display the navbar or just the search bar based on click 
                !activeSmSearch ?
                    <>
                        <div className='min-w-[180px] flex-1'>
                            <Hamburger />
                        </div>
                        {/* Search: taking more space*/}
                        <div className="flex items-center justify-end sm:justify-center flex-1 lg:flex-2 w-full">
                            <div className="hidden w-9/10 sm:flex">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full px-4 py-2 border inset-shadow-sm border-gray-300 rounded-l-full outline-none focus:border-blue-500 text-lg"
                                />
                                <button className="px-4 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 cursor-pointer">
                                    <CiSearch className='text-xl' />
                                </button>
                            </div>
                            <CiSearch className='text-2xl sm:hidden mr-4 cursor-pointer' onClick={() => setActiveSmSearch(!activeSmSearch)} />
                        </div>

                        {/* profile and Notification  */}
                        <div className="relative hidden tiny:flex items-center gap-1 lg:gap-4 justify-end flex-1">

                            <div className='flex items-center gap-2 bg-gray-100 rounded-full px-2 md:px-4 py-1.5 cursor-pointer hover:bg-gray-200'>
                                <GoPlus className='text-3xl' />
                                <button className='cursor-pointer'>Create</button>
                            </div>
                            <button className="hidden xsm:block p-2 rounded-full hover:bg-gray-100">
                                <IoIosNotificationsOutline className='text-3xl cursor-pointer' />
                            </button>
                            {
                                user ? <img
                                    src={user?.profileFile?.url || '/images/default-avatar.jpg'}
                                    alt="User Avatar"
                                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                    onClick={handleToggleProfileModal}
                                /> : <button
                                    onClick={() => navigate('/auth/login')}
                                    className="bg-blue-300/20 text-blue-900 flex gap-2 items-center rounded-full px-4 py-2 text-sm whitespace-nowrap cursor-pointer hover:bg-blue-300/30 transition-all duration-200 font-semibold"
                                >
                                    <HiOutlineUserCircle className='text-2xl' />
                                    Sign In
                                </button>
                            }

                            {profileModal && <ProfileModal />}

                        </div>
                    </> :
                    <>
                        {/* showing only search input  */}
                        <IoMdArrowBack className='text-3xl mr-16 cursor-pointer' onClick={() => setActiveSmSearch(false)} />
                        <div className='w-full flex'>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-9/10 px-4 py-2 border inset-shadow-sm border-gray-300 rounded-l-full outline-none focus:border-blue-500 text-lg h-11.5"
                            />
                            <button className="px-4 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 cursor-pointer h-11.5">
                                <CiSearch className='text-xl' />
                            </button>
                        </div>
                    </>
            }
        </nav>
    )
}

export default Navbar