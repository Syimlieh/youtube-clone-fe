import { useDispatch, useSelector } from "react-redux";
import CommentItem from './CommentItem';
import { BsFilterLeft } from "react-icons/bs";
import AddNewComment from "./AddNewComment";
import SimpleModal from "./common/SimpleModal";
import { useState } from "react";
import { VIDEO_COMMENT_URL } from "../services/api/url.service";
import useApiRequest from "../hooks/useGetQuery";
import { setComments } from "../store/slice/comment.slice";
import { API_BASE_URL } from "../lib/axios";
import { useEffect } from "react";

const sortItems = ["Top comments", "Newest first"];
const Comments = () => {
    const dispatch = useDispatch();
    const [openSort, setOpenSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState(sortItems[0]);
    const selectedVideo = useSelector((state) => state.videos.selected);
    const comments = useSelector((state) => state.comments.value);
    const user = useSelector((state) => state.profile.value);

    const videoId = selectedVideo?._id;

    const URL = videoId ? API_BASE_URL + VIDEO_COMMENT_URL.replace(':id', videoId) : null;
    const { data, error } = useApiRequest(URL);

    useEffect(() => {

        if (data && data.data) {
            dispatch(setComments(data.data));
        }
    }, [data, error, dispatch, selectedVideo?._id]);

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
                    src={user ? user?.profileFile?.url : '/images/default-avatar.jpg'}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
                <AddNewComment />
            </div>

            {
                comments.map((item) => <CommentItem
                    key={item._id}
                    commentId={item._id}
                    userName={item?.userDetails?.channelId}
                    comment={item.comment}
                    profileFile={item?.userDetails?.profileFile}
                    postedAt={item.createdAt}
                    likes={item.likes}
                    dislikes={item.dislikes}
                    replyCount={item.replyCount}
                />)
            }
        </div>
    )
}

export default Comments