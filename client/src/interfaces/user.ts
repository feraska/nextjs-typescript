export interface User {
    email:string,
    firstName:string,
    lastName:string,
    _id:string,
    list:Array<number>,
    likes:Array<number>,
    unread:number,
    img:img,
    isAdmin:boolean 
}
interface img {
    public_id:string,
    url:string
}
export default User