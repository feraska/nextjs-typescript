import Image from "next/image";
import background from "../../assets/login.jpg"
import "./backgroundImage.scss"
const BackgroundImage = () => {
    return (
        <div className="image">
        <Image width={100} height={100} src={background.src} alt="background" />
        </div>
    )
}

export default BackgroundImage;

    
