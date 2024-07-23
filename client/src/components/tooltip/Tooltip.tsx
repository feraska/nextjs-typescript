import React from "react"
import "./tooltip.scss"
interface Props {
    children: React.ReactNode;
  }
const Tooltip:React.FC<{children:Props,text:string}> = ({children,text}) => {
    return(
        <div className="tooltip">
            {children}
        <span className="tooltiptext">{text}</span>
        </div>
    )
}
export default Tooltip