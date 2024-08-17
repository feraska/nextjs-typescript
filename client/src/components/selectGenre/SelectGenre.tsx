import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./selectGenre.scss"
const SelectGenre:React.FC<{setGenre:unknown}> = ({setGenre}) => {
    const {state} = useContext(AuthContext)
    return(
        <div className="genre">
            <select name="" id="" onChange={(event: ChangeEvent<HTMLSelectElement>)=>setGenre(event.target.value)}>
                <option value={"type"} disabled hidden selected> type</option>
                {state.genre.map((genre,i)=>(
                    <option key={i} value={genre.id}>{genre.name}</option>
                ))}
                </select>
            </div>
    )
}
export default SelectGenre