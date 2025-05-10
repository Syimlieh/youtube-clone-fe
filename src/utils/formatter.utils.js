export function formatUploadAt(time) {
    const now = new Date().getTime();
    const toFormat = new Date(time).getTime();
    const diff = now - toFormat;

    // calculating the format for time
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);

    let result = "";

    //  appending the created at format with
    if (seconds < 60) {
        result = `${seconds}s`;
    } else if (minutes < 60) {
        result = `${minutes}min`;
    } else if (hours < 24) {
        result = `${hours}h`;
    } else if (days < 365) {
        result = `${days}d`;
    } else {
        result = `${years}y`;
    }

    return result;
}

// function  to format the views count
export function formatViews(views) {
    let result;
    
    // showing all million above as M
    if (views >= 10000000000) {
        result = `${(views / 10000000000).toFixed(1)}B`
    } else if (views >= 1000000) {
        result = `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        result = `${(views / 1_000).toFixed(1)}k`;
    } else {
        result = `${views}`;
    }
    return result;
}