const url = process.env.NEXT_PUBLIC_API_URL 
const mainServer = `${url}/api`
export const api = {  
   
    loginMainServer : `${mainServer}/auth/login`,
    registerMainServer : `${mainServer}/auth/register`,
    logoutMainServer : `${mainServer}/auth/logout`,
    findUser : `${mainServer}/user/find`,
    addToList : `${mainServer}/user/addToList`,
    removeFromList : `${mainServer}/user/removeFromList`,
    like : `${mainServer}/user/like`,
    dislike : `${mainServer}/user/dislike`,
    getNotification : `${mainServer}/notification/getNotification`,
    addNotification : `${mainServer}/notification/addNotification`,
    incUnread : `${mainServer}/user/incUnread`,
    emptyUnread : `${mainServer}/user/emptyUnread`,
    editPassword : `${mainServer}/user/editPassword`,
    editProfile : `${mainServer}/user/editProfile`,
    sendEmail : `${mainServer}/user/sendEmail`,
    validateCode : `${mainServer}/user/validateCode`,
    forgotPassword : `${mainServer}/user/forgotPassword`,
}