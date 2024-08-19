import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./selectGenre.scss"
const SelectGenre:React.FC<{setGenre:(name:string)=>void}> = ({setGenre}) => {
    const {state} = useContext(AuthContext)
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "all") {
            setGenre("")
            return
        }
        setGenre(e.target.value)
    }
    return(
        <div className="genre">
            <select name="" id="" onChange={handleChange}>
                <option value={"all"} > All</option>
                {state?.genre?.map((genre,i)=>(
                    <option key={i} value={genre.id}>{genre.name}</option>
                ))}
                </select>
            </div>
    )
}
export default SelectGenre