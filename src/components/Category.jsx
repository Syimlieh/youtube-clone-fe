import React, { useRef, useState } from 'react'
import CategoryItem from './CategoryItem'
import { CATEGORIES } from '../utils/constants/category'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from 'react-redux';

const Category = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const scrollRef = useRef(null);
    const toggle = useSelector((state) => state.toggle.sidebar);


    // function to handle click category for active item
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    }

    // for hide and show left arrow
    const checkScrollPosition = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        setShowLeftArrow(scrollLeft > 0); // show arrow if scrolled right at least once
    };

    // function for handle both left and right scroll
    const handleScroll = (direction) => {
        let scroolDistance = 400;

        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'right' ? scroolDistance : -scroolDistance,
                behavior: 'smooth',
            });
        }
    };

    return (
        // right-0 is for stretching to the right and width with calc will create a proper width for the arrow to properly attacheed accordingly.
        <div className={`fixed top-16 ${!toggle ? "left-0 md:left-20 w-full md:w-[calc(100%-5rem)]" : "left-0 md:left-64 w-full md:w-[calc(100%-16rem)]"} right-0 pl-7 bg-white h-14 flex items-center z-20`}>
            {
                // arrow to scrool to left and only visible if scrool right at least once 
                showLeftArrow &&
                <span className='absolute left-0 top-3 rounded-full bg-white w-8 h-8 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100'
                    onClick={() => handleScroll('left')}
                >
                    <MdOutlineKeyboardArrowLeft className='text-2xl' />
                </span>
            }
            <div className='flex gap-4 items-center overflow-x-auto hide-scrollbar scroll-smooth'
                ref={scrollRef}
                onScroll={checkScrollPosition}
            >
                {
                    CATEGORIES.map((category) => (
                        <CategoryItem
                            key={category.value}
                            name={category.name}
                            active={activeCategory}
                            updateActive={handleCategoryClick}
                        />
                    ))
                }
            </div>
            {/* arrow to scroll to right  */}
            <span className='absolute top-2.7 right-0 rounded-full bg-white w-8 h-8 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100'
                onClick={() => handleScroll('right')}
            >
                <MdOutlineKeyboardArrowRight className='text-2xl' />
            </span>
        </div>
    )
}

export default Category;