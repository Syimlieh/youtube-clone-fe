import { RxHamburgerMenu } from 'react-icons/rx'
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/slice/toggle.slice';
import { Link } from 'react-router-dom';

const Hamburger = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-5">
            <RxHamburgerMenu
                className='text-2xl cursor-pointer' onClick={() => dispatch(toggleSidebar())}
            />
            <Link to="/" className="hidden xsm:block">
                <img src="/images/logo.png" alt="YouTube Logo" className="h-6 w-auto" />
            </Link>
        </div>
    )
}

export default Hamburger