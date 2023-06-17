import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import dictionary from "./dictionary";
import { urlClient } from "../endpoints";
import { enterDetailsForDiet } from "../redux/actions/addDetailsToUser";
export default function SignIn() {
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const userDetails = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    useEffect(() => {

    },
        [user])
    const handleSubmit = (e) => {
        e.preventDefault()
        checkDetails(e.target.formBasicEmail.value)
            .then(_ => {
                console.log(user.hasOwnProperty("code"))
                if (user.hasOwnProperty("code"))
                    console.log("1", user.password == e.target.formBasicPassword.value)
                if (user.password == e.target.formBasicPassword.value) {
                    console.log("hiii")
                    dispatch({ ...enterDetailsForDiet({ ...user }) });
                    return true;
                }
                return false;

            });
       
    }
    const checkDetails = async (email, password) => {
        return fetch(urlClient + `get/${email}`, {
            method: 'GET'
        })
            .then(response => {
                if (response.statusText == "No Content") {
                    return false;
                }
                else {
                    return response.json();
                }
            })
            .then(
                (data) => { console.log(data); setUser({ ...data }); }
            )
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Form onSubmit={handleSubmit} style={{ margin: "10vh 30vw", width: "40vw" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{dictionary.email[lang]}</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{dictionary.password[lang]}</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                    {dictionary.signin[lang]}
                </Button>
                <br></br>
                <a href="/signup">{dictionary.signup[lang]}</a>
            </Form>
        </>
    )
}