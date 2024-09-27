import { useEffect, useRef } from "react"

const useScroll = (id:string) => {
    const scrollPosition = useRef({ x: 0, y: 0 })
    const scroll = () => {
        scrollPosition.current = {
            x: window.scrollX,
            y: window.scrollY,
          };
    }
    useEffect(()=> {
    
        if(id) {
            return
        }
        window.addEventListener("scroll",scroll)
        window.scrollTo(scrollPosition.current.x,scrollPosition.current.y)
        
        
        
        return ()=> {
            window.removeEventListener("scroll",scroll)
        }
       },[id])
}
export default useScroll