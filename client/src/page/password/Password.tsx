"use client"
import Navbar from "@/components/navbar/Navbar"
import "./password.scss"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import usePut from "@/hooks/usePut"
import Loader from "@/components/loader/Loader"
import { api } from "@/enums/api"
const Password = () => {
    const router = useRouter()
    const [data,setData ]= useState({
        currentPassword:"",
        newPassword:"",
        rePassword:""
    })
    const {loading,message,put} = usePut(api.editPassword)
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(data)
    }
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    return (
        <>
        <Navbar/>
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