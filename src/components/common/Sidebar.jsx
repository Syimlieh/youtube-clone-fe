import React from 'react';
import { useSelector } from 'react-redux';
import SidebarColapsed from './SidebarColapsed';
import SidebarExtend from './SidebarExtend';

const Sidebar = () => {
    const toggle = useSelector((state) => state.toggle.sidebar);

    return (
        <>
            {
                !toggle ? <SidebarColapsed /> : <SidebarExtend />
            }
        </>
    )
};

export default Sidebar;