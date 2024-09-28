import { useEffect, useRef, useState } from "react"

const useScroll = (id:string) => {
    // const scrollPosition = useRef({ x: 0, y: 0 })
    const [scrollPosition,setScrollPosition] = useState({ x: 0, y: 0 })
    const scroll = () => {
        // scrollPosition.current = {
        //     x: window.scrollX,
        //     y: window.scrollY,
        //   };
        if(scrollX === 0 && scrollY === 0) {
            return
        }
        if(id) {
            return
        }
        setScrollPosition({ x: window.scrollX, y: window.scrollY,})
      
        // window.scrollTo(window.scrollX,window.scrollY)
        // console.log(window.scrollX,window.scrollY)
    }
    useEffect(()=> {
    
        // if(id) {
        //     return
        // }
        //window.scrollTo(scrollPosition.current.x,scrollPosition.current.y)
        //window.scrollTo(scrollPosition.x,scrollPosition.y)
        
        window.scrollTo(scrollPosition.x,scrollPosition.y)
        window.addEventListener("scroll",scroll)
        
        
        
        
        return ()=> {
            window.removeEventListener("scroll",scroll)
        }
       },[id])


    // useEffect(()=> {
       
       
    // },[id])   

}
export default useScroll