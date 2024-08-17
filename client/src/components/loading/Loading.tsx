import "./loading.scss"
import loading from "../../assets/loading.gif"
import Image from "next/image";
const Loading = () => {
    return (
      <div className="loading">
        <Image alt="" width={100} height={100} src={loading.src}/>
        </div>
    )
}

export default Loading;