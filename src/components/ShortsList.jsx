import { SiYoutubeshorts } from "react-icons/si";
import ShortsCard from "./ShortsCard";
import { useSelector } from "react-redux";
import useWindowWidth from "../hooks/useWindowWidth";

const ShortsList = () => {
    // getting details from store
    const videos = useSelector((state) => state.videos.shorts);
    const toggle = useSelector((state) => state.toggle.sidebar);

    // getting width using custom width
    const width = useWindowWidth();

    // this will tell us how many videos count we will be showing
    const getVisibleCount = () => {
        if (width >= 1180) return 5;
        if (width >= 977) return 4;
        if (width >= 655) return 3;
        if (width >= 420) return 2;
        return 1;
    };

    // filter the videos based on getvisible count
    const visibleVideos = videos?.slice(0, getVisibleCount());

    return (
        <div className={`relative top-38 ${!toggle ? "md:ml-22" : "md:ml-68"}`}>
            <span className="text-xl font-bold flex gap-4 px-3">
                <SiYoutubeshorts className="text-2xl text-red-500" />
                <h2> Shorts</h2>
            </span>
        <div className={`flex gap-3 md:gap-4 mt-6`}>
            {
                visibleVideos.length && visibleVideos.map((item) => (
                    <ShortsCard
                        key={item.id}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        duration={item.duration}
                        views={item.views}
                        publishedAt={item.publishedAt}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ShortsList