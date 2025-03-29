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
import { editUser } from "@/redux/slices/user"
import { api } from "@/enums/api"

import useEditProfile from "@/hooks/useEditProfile"
import Loader from "@/components/loader/Loader"
const Profile = () => {
    const login = useAppSelector((state)=>state.user.login)//login redux
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    const router = useRouter()//router
    let user = useAppSelector((state)=>state.user.user)//user
    
    const dispatch = useAppDispatch()//dispatch redux
    const [img,setImg] = useState("")
    const [file,setFile] = useState<File>()
    const {post:upload,data,error,loading} = useEditProfile(api.editProfile)
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
        if(!file) {
            return
        }
        const url = URL.createObjectURL(file); // Create a temporary URL
        setImg(url)
        setFile(file)
        
}

    const handlerChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(!user) {
            return
        }
        user = {...user,[e.target.name]:e.target.value}
       // setTempUser({...tempUser,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        if(!user ) {
            return
        }
       
        const obj = {
            img: {
                public_id:"",
                url:img
            }
        }
        if(img)
        user = {...user,...obj}
        dispatch(editUser(user))
        
        try {
            await upload(file??null,user)
            router.push("/")
            
            
        }
        catch(e) {
            console.log(e as Error)
        }
        
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
                        <input type="file" id="file" onChange={changeImage} accept="image/png, image/gif, image/jpeg"/>
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
                    {loading?<Loader/>:
                    <>
                    <button type="submit">Save</button>
                    <button type="button" onClick={clickCancel}>Cancel</button>
                    </>
                    }
                    {error&&<p>Errror to edit profile</p>}
                </form>
            </div>
        </div>
        </>
    )

}
export default Profile