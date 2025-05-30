import Channel from '../components/Channel'
import Navbar from '../components/common/Navbar'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';

const ChannelProfile = () => {
    const { channelId } = useParams();

    return (
        <>
            <Navbar />
            <Sidebar />
            <Channel channelId={channelId} />
        </>
    )
}

export default ChannelProfile