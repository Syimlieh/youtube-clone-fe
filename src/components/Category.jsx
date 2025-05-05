import React, { useRef, useState } from 'react'
import CategoryItem from './CategoryItem'
import { CATEGORIES } from '../utils/constants/category'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Category = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const scrollRef = useRef(null);

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
        <div className='relative h-14 flex items-center px-4'>
            {
                showLeftArrow &&
                <span className='absolute left-0 top-0 rounded-full bg-white w-8 h-8 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100'
                    onClick={() => handleScroll('left')}
                >
                    <MdOutlineKeyboardArrowLeft className='text-2xl' />
                </span>
            }
            <div className='flex gap-4 items-center overflow-x-auto hide-scrollbar'
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
            <span className='absolute right-0 top-0 rounded-full bg-white w-8 h-8 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100'
                onClick={() => handleScroll('right')}
            >
                <MdOutlineKeyboardArrowRight className='text-2xl' />
            </span>
        </div>
    )
}

export default Category;