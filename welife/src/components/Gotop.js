import up from "../assets/up.png";
import "../components/Gotop.css";
const Gotop = () => {

    return ( <div className="gotop_wrapper">
                <img src={up} className="gotop_icon" onClick={()=>window.scrollTo(0,0)}></img>
            </div> 
    );
}
 
export default Gotop;