import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dictionary from "./dictionary";


export default function HomePage() {
    const navigate = useNavigate();
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const userDetails = useSelector(state => state.userReducer)
    console.log(userDetails);
    const checkMenu = () => {
       if(userDetails.code == 0){
           console.log("Please Signin/Login before")
        }
       else
        {
            navigate("/menu")
        }

        
    }
 
    return (
        <>
            <h1>home page</h1>
            <Button onClick={() => navigate("/signup")}>{dictionary.signup[lang]}</Button>
            <br></br>
            <Button onClick={() => navigate("/signin")}>{dictionary.signin[lang]}</Button>
            <br></br>
            <Button onClick={() => navigate("/signout")}>{dictionary.signout[lang]}</Button>
            <br></br>
            <Button onClick={checkMenu}>{dictionary.menu[lang]}</Button>
            <br></br>
            <Button onClick={()=>navigate("/menu-settings")}>{dictionary.menuSettings[lang]}</Button>
        </>
    )


}