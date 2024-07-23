import "./loading.scss"
import loading from "../../assets/loading.gif"
const Loading = () => {
    return (
      <div className="loading">
        <img src={loading.src}/>
        </div>
    )
}

export default Loading;