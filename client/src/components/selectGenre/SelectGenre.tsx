import React from "react"
import "./selectGenre.scss"
import { useAppSelector } from "@/redux/hooks"
import { useRouter, useSearchParams } from "next/navigation"
/**
 * 
 * @param setGenre set genere user select such as action,drama 
 * @returns 
 */
const SelectGenre:React.FC<{setGenre:(name:string)=>void}> = ({setGenre}) => {
    const genre = useAppSelector((state)=>state.genre.genre)//genre list
    const router = useRouter()//router
    const serach = useSearchParams()//query sring
    /**
     * 
     * @param e check if all select all genre  or spicific genre query string
     * @returns void
     */
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
            <div className="box">
            <label>Select Genre</label>
            <select name="" id="" onChange={handleChange} defaultValue={serach.get("g")??""}>
                <option value={"all"} > All</option>
                {genre?.map((genre,i)=>(
                    <option key={i} value={genre.id}>{genre.name}</option>
                ))}
                </select>
                </div>
            </div>
    )
}
export default SelectGenre