

import "./vheader.scss"
import { data } from "../navbar/data"
import Link from "next/link"
import { getHum } from "@/redux/slices/user"
import { useAppDispatch } from "@/redux/hooks"
import { usePathname } from "next/navigation"

const Vheader = () => {
    const dispatch = useAppDispatch()//dispatch redux
    const pathname = usePathname()//page pathname
    /**
         * navbar mobile
         */
        const clickHum = () => {
            dispatch(getHum())
        }
    
    return(
        <header className="v-nav" >
            <nav>
           <ul>
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path} onClick={clickHum} className={value.path === pathname?"active":""}>
                    <li key={i}>{value.text}</li>
                    </Link>
             
            ))}
            </ul>
        </nav>
        </header>
    )
}
export default Vheader