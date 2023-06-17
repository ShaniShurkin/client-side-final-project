import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeToEnglish, changeToHebrew } from "../redux/actions/changeLang";
import dictionary from "./dictionary";
export default function Header() {
    const dispatch = useDispatch();
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const userDetails = useSelector(state => state.userReducer)
    const [userName, setUserName] = useState("user")

    
    return (
        <>
        {userDetails.firstName !==""?<h2>{userDetails.firstName}</h2>:<h2>user</h2>}
           <Form.Group controlId="formBasicSelect">
                <Form.Label>{dictionary.language[lang]}</Form.Label>
                <Form.Control
                    as="select"
                    onChange={e => {
                       lang==="en"? dispatch(changeToHebrew()):dispatch(changeToEnglish());
                    }}
                >
                    <option value="english">{dictionary.english[lang]}</option>
                    <option value="hebrew">{dictionary.hebrew[lang]}</option>
                </Form.Control>
            </Form.Group>
        </>
    )


}