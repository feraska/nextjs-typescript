"use client"
import Navbar from "@/components/navbar/Navbar"
import "./password.scss"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import usePut from "@/hooks/usePut"
import Loader from "@/components/loader/Loader"
import { api } from "@/enums/api"
import useGlobal from "@/hooks/useGloabal"
import { useAppSelector } from "@/redux/hooks"
import Loading from "@/components/loading/Loading"
import Vheader from "@/components/vheader/Vheader"
const Password = () => {
    const router = useRouter()
    useGlobal()
    const login = useAppSelector((state)=>state.user.login)
    const [data,setData ]= useState({
        currentPassword:"",
        newPassword:"",
        rePassword:""
    })
    const {loading,message,put} = usePut(api.editPassword)//edit password
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await put(data)
    }
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    //loading
    if(login === 2) {
        return<Loading/>
    }
     //if not be user(login false)
     if(login === 0) {
        router.push("/login")
        return
    }

    return (
        <>
        <Navbar/>
        {hum&&<Vheader/>}
        <div className="password">
            <div className="box">
                <h1>Change password</h1>
                <form onSubmit={handleSubmit}>
                    <input type="password" onChange={changeHandler} name="currentPassword" placeholder="Current Password"/>
                    <input type="password" onChange={changeHandler} name="newPassword" placeholder="New Password"/>
                    <input type="password" onChange={changeHandler} name="rePassword" placeholder="Re-enter new password"/>
                    {loading?<Loader/>:
                    <div className="buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={()=>router.push("/")}>Cancel</button>
                    </div>
                    }
                    <label>{message}</label>
                </form>
            </div>
        </div>
        </>
    )
}
export default Password