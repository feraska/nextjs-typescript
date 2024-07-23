

import "./vheader.scss"
import { data } from "../navbar/data"
import Link from "next/link"

const Vheader = () => {
   
    
    
    return(
        <div className="v-nav" >
           
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path}>
                    {value.text}
                    </Link>
             
            ))}
               
        </div>
    )
}
export default Vheader