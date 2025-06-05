import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    shorts: [
        {
            id: 1,
            title: "How  Engineers Can Build PERMANENT Job Security in 2025",
            description: "Description for Video 1",
            thumbnail: "https://i.ytimg.com/vi/Ndz3PYADcvA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDGEGJ_dxEQj8jz68y0-wb_GVNg4g",
            url: "https://www.youtube.com/watch?v=Ndz3PYADcvA",
            profile: "https://yt3.ggpht.com/0wMhEQe-e_FLwpQgUjDa82CbWVH6IplMb2Z8-JC_ysJ4aIy0d4cLzdd2omFnxEzPoe31ICio=s68-c-k-c0x00ffffff-no-rj",
            channel: "Channel 1",
            views: 1000,
            likes: 100,
            duration: "10:00",
            publishedAt: "2025-05-10",
        },
        {
            id: 2,
            title: "Ka Kong Bertina Kam Donkam Khuslai Ban Ïoh Pyndep PhD | Mang U CM 1.35 Lak Na CMSG",
            description: "Description for Video 2",
            thumbnail: "https://i.ytimg.com/vi/bGnRoVFwUeE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF2Kp2YFNuCp2eRdpMRUs1pbTAag",
            url: "https://www.youtube.com/watch?v=bGnRoVFwUeE",
            profile: "https://yt3.ggpht.com/uzqjVPREImGM9v8N63I6sgpByD7WfVTBR6e4UKPrhEXLXGBB9dzOWHeLd30Ip2o4JQ96P22Tp2o=s68-c-k-c0x00ffffff-no-rj",
            channel: "Channel 2",
            views: 24000000,
            likes: 200,
            duration: "20:00",
            publishedAt: "2023-02-01",
        },
        {
            id: 3,
            title: "200W Camping Power Station 192Wh Power Bank 60000mAh LiFePo4",
            description: "Description for Video 3",
            thumbnail: "https://i.ytimg.com/vi/X3yATXAWL_g/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBDEpQpfSZda3ysTuYJYdatZ1wcRQ",
            url: "https://www.youtube.com/watch?v=X3yATXAWL_g",
            profile: "https://yt3.ggpht.com/0CuJkUiY3A3XobJeYDDSeZInfMUyW2o01cw5PZn1gRN9y33D_pFW_i0CysAbaNMPv28a0FQ2=s68-c-k-c0x00ffffff-no-rj",
            channel: "Channel 3",
            views: 3000,
            likes: 300,
            duration: "30:00",
            publishedAt: "2023-03-01",
        },
        {
            id: 4,
            title: "The Beginner's Guide to Clean Architecture",
            description: "Description for Video 4",
            thumbnail: "https://i.ytimg.com/vi/TQdLgzVk2T8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC383Mm6ytkTCIhNNt3yPRn-sVWIg",
            url: "https://www.youtube.com/watch?v=TQdLgzVk2T8",
            profile: "https://yt3.ggpht.com/E_K5727J3QuOP20WbsepnNRkiyb8CFdj2xu_WCA7NL717A356D2VpPGjH_n6BXPtumyKuEFvjA=s68-c-k-c0x00ffffff-no-rj",
            channel: "Channel 4",
            views: 4000,
            likes: 400,
            duration: "40:00",
            publishedAt: "2023-04-01",
        },
        {
            id: 5,
            title: "𝙿𝚊𝚠𝚗𝚊𝚖 𝚔𝚒 𝚔𝚑𝚢𝚗𝚗𝚊𝚑 𝚋𝚊 𝚛𝚠𝚊𝚒 𝚁𝚒 𝚕𝚞𝚖 𝚋𝚊𝚍 𝚟𝚊𝚗𝚍𝚎 𝚖𝚊𝚝𝚊𝚛𝚊𝚖  𝙷𝚊 𝚔𝚢𝚕𝚕𝚎𝚗𝚐 𝚔𝚊 𝚙𝚢𝚛𝚝𝚑𝚎𝚒",
            description: "Description for Video 5",
            thumbnail: "https://i.ytimg.com/vi/rl5mkbx9yNU/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGEEgZSg4MA8=&rs=AOn4CLAdVMWBOMocZWoKyrNq0Y2d-v0WBw",
            url: "https://www.youtube.com/watch?v=rl5mkbx9yNU",
            profile: "https://yt3.ggpht.com/ZP7yv6nmEtYFpdry-04aUdz72-jQWH8wwkfXpQKNUEKVp4Dml6wV380Sb4N96XYNVvl1vwEMSQ=s68-c-k-c0x00ffffff-no-rj",
            channel: "Channel 5",
            views: 5000,
            likes: 500,
            duration: "50:00",
            publishedAt: "2023-05-01",
        },
    ]
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        addVideos: (state, action) => {
            state.items = action.payload;
        },
    }
});

// selector function
export const selectVideoById = (state, id) =>
    state.videos.items.find(item => item.videoId === id);

export const selectChannel = (state, id) =>
    state.videos.items.find(item => item.channelId === id);

export const selectVideoCountByChannel = (state, channelId) =>
    state.videos.items.filter(video => video.channelId === channelId).length;

// exporting reducers function
export const { addVideos } = videoSlice.actions;

export default videoSlice.reducer;