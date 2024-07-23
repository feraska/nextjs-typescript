import background from "../../assets/login.jpg"
import "./backgroundImage.scss"
const BackgroundImage = () => {
    return (
        <div className="image">
        <img src={background.src} alt="background" />
        </div>
    )
}

export default BackgroundImage;

    
