export interface User {
    email:string,
    firstName:string,
    lastName:string,
    _id:string,
    list:Array<number>,
    likes:Array<number>,
    unread:number 
}
export default User