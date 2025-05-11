
const CategoryItem = ({ name, active, updateActive }) => {
    return (
        <button className={`h-8.5 flex items-center justify-center text-mg font-semibold  rounded-lg  transition-all duration-200 ease-in-out ${active === name ? 'bg-gray-950 text-gray-200 hover:bg-gray-950' : "bg-gray-100 text-gray-700 hover:bg-gray-200"} px-4 cursor-pointer whitespace-nowrap`}
            // call function to update active category
            onClick={() => updateActive(name)}
        >
            {name}
        </button>
    )
};

export default CategoryItem;