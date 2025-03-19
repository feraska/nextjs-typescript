import { useEffect,  useState } from "react"
/**
 * 
 * @param id if in modal position
 */
const useScroll = (id:string) => {
    const [scrollPosition,setScrollPosition] = useState({ x: 0, y: 0 })//scroll position
    // set scroll position
    const scroll = () => {
        if(scrollX === 0 && scrollY === 0) {
            return
        }
        if(id) {
            return
        }
        setScrollPosition({ x: window.scrollX, y: window.scrollY,})
      
    }
    useEffect(()=> {
        //scroll to sroll position
        window.scrollTo(scrollPosition.x,scrollPosition.y)
        window.addEventListener("scroll",scroll)
        
        
        
        
        return ()=> {
            window.removeEventListener("scroll",scroll)
        }
       },[id])



}
export default useScroll