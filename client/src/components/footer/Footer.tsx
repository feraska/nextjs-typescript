import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import "./footer.scss"
import { data } from "./data"
const Footer = () => {
    return (
        <footer >
            <div className="social-media">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            </div>
            {/* <ul>
                {data.map((text,i)=>(
                    <li key={i}>{text}</li>
                ))}
            </ul> */}
        </footer>
    )
}
export default Footer