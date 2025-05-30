import { useState } from "react";
import { formatUploadAt, formatViews } from "../utils/formatter.utils";

const VideoDescription = ({
    views,
    channel,
    profile,
    subscriberCount,
    publishedAt,
    description,
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(prev => !prev);

    const maxLength = 200;
    const isLong = description.length > maxLength;
    const shortDescription = description.slice(0, maxLength);

    return (
        <div className="mt-4 p-4 bg-neutral-100 rounded-md text-sm">
            <div className="flex gap-4">
                <p className="text-base font-semibold text-black">{formatViews(views)} Views</p>
                <p className="text-base font-semibold text-black">{formatUploadAt(publishedAt)} ago</p>
            </div>
            {/* Description Section with Expand/Collapse */}
            <div className="mb-4">
                <p className="whitespace-pre-line">
                    {expanded || !isLong ? description : shortDescription + "..."}
                </p>
                <button
                    onClick={toggleExpanded}
                    className="text-blue-600 font-medium mt-2 cursor-pointer"
                >
                    {expanded ? "Show less" : "Show more"}
                </button>
            </div>

            {/* Channel Info - only when expanded */}
            {expanded && (
                <div className="flex items-start gap-4 mt-6">
                    <img
                        src={profile}
                        alt={channel}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-lg">{channel}</h4>
                                <p className="text-xs text-gray-600">
                                    {formatViews(subscriberCount)} subscribers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoDescription;