import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount, MdLogout, MdOutlineKeyboard, MdOutlineFeedback } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiShieldUserLine } from "react-icons/ri";
import { BsMoon, BsGlobe2 } from "react-icons/bs";
import { IoLanguageOutline, IoSettingsOutline } from "react-icons/io5";
import { TbShieldCog } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { SlArrowRight } from "react-icons/sl";

const profileItems = [
    {
        category: '',
        items: [
            {
                name: 'Google Account',
                filledIcon: <FaGoogle className="text-2xl" />,
                outlineIcon: <FaGoogle className="text-2xl" />,
                link: '/',
            },
            {
                name: 'Switch Account',
                filledIcon: <MdOutlineSwitchAccount className="text-2xl" />,
                outlineIcon: <MdOutlineSwitchAccount className="text-2xl" />,
                link: '/',
                child: true
            },
            {
                name: 'Signout',
                filledIcon: <MdLogout className="text-2xl" />,
                outlineIcon: <MdLogout className="text-2xl" />,
                link: '/',
            },
        ]
    },
    {
        category: '',
        items: [
            {
                name: 'Youtube Studio',
                filledIcon: <img src='/icons/youtube-studio.svg' alt='Youtub studio icons' className='h-6 w-6' />,
                outlineIcon: <img src='/icons/youtube-studio.svg' alt='Youtub studio icons' className='h-6 w-6' />,
                link: '/',
            },
            {
                name: 'Purchase and memberships',
                filledIcon: <RiMoneyDollarCircleLine className='text-3xl' />,
                outlineIcon: <RiMoneyDollarCircleLine className='text-3xl' />,
                link: '/',
            },
        ]
    },
    {
        category: '',
        items: [
            {
                name: 'Yout data in Youtube',
                filledIcon: <RiShieldUserLine className='text-2xl' />,
                outlineIcon: <RiShieldUserLine className='text-2xl' />,
                link: '/',
            },
            {
                name: 'Appearance: Device theme',
                filledIcon: <BsMoon className='text-xl' />,
                outlineIcon: <BsMoon className='text-xl' />,
                link: '/',
                child: true
            },
            {
                name: 'Language: English',
                filledIcon: <IoLanguageOutline className="text-2xl" />,
                outlineIcon: <IoLanguageOutline className="text-2xl" />,
                link: '/',
                child: true
            },
            {
                name: 'Restricted Mode: off',
                filledIcon: <TbShieldCog className='text-2xl' />,
                outlineIcon: <TbShieldCog className='text-2xl' />,
                link: '/',
                child: true
            },
            {
                name: 'Location: India',
                filledIcon: <BsGlobe2 className='text-2xl' />,
                outlineIcon: <BsGlobe2 className='text-2xl' />,
                link: '/',
                child: true
            },
            {
                name: 'Keyboard shortcuts',
                filledIcon: <MdOutlineKeyboard className='text-2xl' />,
                outlineIcon: <MdOutlineKeyboard className='text-2xl' />,
                link: '/liked-videos',
            }
        ],
    },
    {
        category: '',
        items: [
            {
                name: 'Settings',
                filledIcon: <IoSettingsOutline className="text-2xl" />,
                outlineIcon: <IoSettingsOutline className="text-2xl" />,
                link: '/',
            },
        ],
    },
    {
        category: '',
        items: [
            {
                name: 'Help',
                filledIcon: <BiHelpCircle className="text-2xl" />,
                outlineIcon: <BiHelpCircle className="text-2xl" />,
                link: '/',
            },
            {
                name: 'Send feedback',
                filledIcon: <MdOutlineFeedback className="text-2xl" />,
                outlineIcon: <MdOutlineFeedback className="text-2xl" />,
                link: '/shorts',
            },
        ]
    }
];

const ProfileModal = () => {
    const profile = useSelector(state => state.profile.value)
    const { firstName, lastName, channelName, channelId } = profile;

    return (
        <div className='absolute top-2 right-12 border-red-400 bg-white h-screen hidden md:flex flex-col gap-2 px-4 py-4 text-[#0f0f0f] w-auto z-30 shadow-2xl text-nowrap'>
            <div div className='px-3 h-16 flex gap-3' >
                <img
                    src="/images/profile.jpg"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
                <div>
                    <h3 className='text-lg leading-5'>{firstName + " " + lastName}</h3>
                    <h3 className='text-lg'>{channelId}</h3>
                    <Link to={`/channel/${channelId}`} >
                        <p className='text-blue-600 mt-2'>View your channel</p>
                    </Link>
                </div>
            </div>
            <hr className='border-gray-300 mt-6 my-2' />
            {
                profileItems.map((category, index) => (
                    <div key={index} className='flex flex-col'>
                        {category.items.map((item, index) => (
                            // active item are highlighted
                            <div key={index} className={`flex items-center justify-between py-2 p-3 hover:bg-gray-200 rounded-xl cursor-pointer gap-8`}>
                                <div className='flex gap-4'>
                                    {item.outlineIcon}
                                    <p className={`text-md`}>
                                        {item.name}
                                    </p>
                                </div>
                                {item.child && <SlArrowRight className="text-sm text-gray-700" />}
                            </div>
                        ))}
                        <hr className='border-gray-300 my-2' />
                    </div>

                ))
            }
        </div >
    )
}

export default ProfileModal