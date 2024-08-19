import React, { ReactNode, ReactPortal } from "react"
import "./tooltip.scss"
type Props = {
    children: ReactNode,
    text:string
  }
const Tooltip:React.FC<Props> = ({children,text}) => {
    return(
        <div className="tooltip">
            {children}
        <span className="tooltiptext">{text}</span>
        </div>
    )
}
export default Tooltip