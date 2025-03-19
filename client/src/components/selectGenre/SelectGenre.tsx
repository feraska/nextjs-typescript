import React from "react"
import "./selectGenre.scss"
import { useAppSelector } from "@/redux/hooks"
import { useRouter, useSearchParams } from "next/navigation"

const SelectGenre:React.FC<{setGenre:(name:string)=>void}> = ({setGenre}) => {
    const genre = useAppSelector((state)=>state.genre.genre)
    const router = useRouter()
    const serach = useSearchParams()
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "all") {
            setGenre("")
            router.push("?g")
            return
        }
        setGenre(e.target.value)
        router.push(`?g=${e.target.value}`)
    }
    return(
        <div className="genre">
            <select name="" id="" onChange={handleChange} defaultValue={serach.get("g")??""}>
                <option value={"all"} > All</option>
                {genre?.map((genre,i)=>(
                    <option key={i} value={genre.id}>{genre.name}</option>
                ))}
                </select>
            </div>
    )
}
export default SelectGenre