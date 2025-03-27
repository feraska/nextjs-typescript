"use client"
import Navbar from "@/components/navbar/Navbar"
import "./profile.scss"
import Vheader from "@/components/vheader/Vheader"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Loading from "@/components/loading/Loading"
import { useRouter } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import { HiOutlineMail } from "react-icons/hi"
import { CiEdit } from "react-icons/ci"
import Image from "next/image"
import avatar from "../../assets/avatar.png"
import { ChangeEvent, FormEvent, useState } from "react"
import User from "@/interfaces/user"
import { editUser } from "@/redux/slices/user"
const Profile = () => {
    const login = useAppSelector((state)=>state.user.login)//login redux
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    const router = useRouter()//router
    let user = useAppSelector((state)=>state.user.user)//user
    
    const dispatch = useAppDispatch()//dispatch redux
    const [img,setImg] = useState("")
    useGlobal()
    //if initial page 
    if(login === 2) {
        
        return<Loading/>
    }
    //if not be user(login false)
    if(login === 0) {
        router.push("/login")
        return
    }
    const clickCancel = () => {
        router.push("/")
    }
    const changeImage = (e:ChangeEvent<HTMLInputElement>) => {
        
        if(!e.target.files) {
            return
        }
        
        const file = e.target.files[0]
        const url = URL.createObjectURL(file); // Create a temporary URL
        setImg(url)
        
        
}

    const handlerChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(!user) {
            return
        }
        user = {...user,[e.target.name]:e.target.value}
       // setTempUser({...tempUser,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        if(!user) {
            return
        }
        const obj = {
            img: {
                public_id:"",
                url:img
            }
        }
        user = {...user,...obj}
        dispatch(editUser(user))
    }

    return (
        <>
        <Navbar/>
        {hum&&<Vheader/>}
        <div className="profile">
            <div className="box">
                <h1>Edit Profile</h1>
                <div className="email">
                    <HiOutlineMail className="icon" />
                    <div className="right">
                    <label>Email</label>
                    <label>{user?.email}</label>
                    </div>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div className="image">
                        <input type="file" id="file" onChange={changeImage}/>
                        <label htmlFor="file">
                        <div className="edit">
                        <CiEdit className="icon" />
                        </div>
                        </label>
                        <Image alt="" src={img || user?.img?.url || avatar} width={100} height={100}/>
                        
                        </div>
                    <div className="inputs">
                    <label>First Name</label>
                    <input type="text" onChange={handlerChange} name="firstName" defaultValue={user?.firstName}/>
                    </div>
                    <div className="inputs">
                    <label>Last Name</label>
                    <input type="text" onChange={handlerChange} name="lastName" defaultValue={user?.lastName}/>
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={clickCancel}>Cancel</button>
                </form>
            </div>
        </div>
        </>
    )

}
export default Profile