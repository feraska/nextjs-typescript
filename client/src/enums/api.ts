export enum api {
    url = "https://nextjs-typescript.onrender.com",
    mainServer = `${url}/api`,
    loginMainServer = `${mainServer}/auth/login`,
    registerMainServer = `${mainServer}/auth/register`,
    logoutMainServer = `${mainServer}/auth/logout`,
    findUser = `${mainServer}/user/find`,
    addToList = `${mainServer}/user/addToList`,
    removeFromList = `${mainServer}/user/removeFromList`,
    like = `${mainServer}/user/like`,
    dislike = `${mainServer}/user/dislike`,
    getNotification = `${mainServer}/notification/getNotification`,
    addNotification = `${mainServer}/notification/addNotification`

}