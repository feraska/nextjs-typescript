import { useEffect,  useState } from "react"

const useScroll = (id:string) => {
    const [scrollPosition,setScrollPosition] = useState({ x: 0, y: 0 })
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
    
        
        window.scrollTo(scrollPosition.x,scrollPosition.y)
        window.addEventListener("scroll",scroll)
        
        
        
        
        return ()=> {
            window.removeEventListener("scroll",scroll)
        }
       },[id])



}
export default useScroll