import React, { ReactNode } from "react"
import "./tooltip.scss"
type Props = {
    children: ReactNode,
    text:string
  }
/**
 * 
 * @param children children component inside the tooltip
 * @param text tooltip text 
 * @returns tooltip component
 */
const Tooltip:React.FC<Props> = ({children,text}) => {
    return(
        <div className="tooltip">
            {children}
        <span className="tooltiptext">{text}</span>
        </div>
    )
}
export default Tooltip