

import "./vheader.scss"
import { data } from "../navbar/data"
import Link from "next/link"
import { getHum } from "@/redux/slices/user"
import { useAppDispatch } from "@/redux/hooks"

const Vheader = () => {
    const dispatch = useAppDispatch()//dispatch redux
    /**
         * navbar mobile
         */
        const clickHum = () => {
            dispatch(getHum())
        }
    
    return(
        <div className="v-nav" >
           
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path} onClick={clickHum}>
                    {value.text}
                    </Link>
             
            ))}
               
        </div>
    )
}
export default Vheader