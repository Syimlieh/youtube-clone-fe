import { useSelector } from 'react-redux';
import VideoView from '../components/VideoView'
import Navbar from '../components/common/Navbar'
import SidebarExtend from '../components/common/SidebarExtend';

const VideoDetails = () => {
  const toggle = useSelector((state) => state.toggle.sidebar);

  return (
    <>
      <Navbar />
      {toggle && <SidebarExtend />}
      <VideoView />
    </>
  )
}

export default VideoDetails