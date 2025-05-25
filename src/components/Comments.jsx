import { useSelector } from "react-redux";
import CommentItem from './CommentItem';
import { BsFilterLeft } from "react-icons/bs";
import AddNewComment from "./AddNewComment";
import SimpleModal from "./common/SimpleModal";
import { useState } from "react";

const sortItems = ["Top comments", "Newest first"];
const Comments = () => {
    const [openSort, setOpenSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState(sortItems[0]);
    const comments = useSelector((state) => state.comments.value); // type `any` can be replaced with proper store type

    const handleSortSelect = (item) => {
        setSelectedSort(item);
        setOpenSort(false);
        console.log(`Sort selected: ${item}`);
        // Optional: dispatch sort logic here if needed
    };

    return (
        <div className='flex flex-col gap-1 mt-12'>
            <div className="flex gap-6 items-center">
                <h3 className="font-bold text-2xl">{comments.length} Comments</h3>
                <div className="flex gap-2 items-center relative">
                    <BsFilterLeft className="text-3xl cursor-pointer" onClick={() => setOpenSort(!openSort)} />
                    <p className="text-lg ">Sort By</p>
                    {openSort && (
                        <div className="absolute top-12 left-4">
                            <SimpleModal
                                items={sortItems}
                                onSelect={handleSortSelect}
                                onClose={() => setOpenSort(false)}
                                isOpen={openSort}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <img
                    src="/images/profile.jpg"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
                <AddNewComment />
            </div>

            {
                comments.length && comments.map((item) => <CommentItem
                    key={item.id}
                    userName={item.username}
                    comment={item.comment}
                    postedAt={item.postedAt}
                    likes={item.likes}
                />)
            }
        </div>
    )
}

export default Comments