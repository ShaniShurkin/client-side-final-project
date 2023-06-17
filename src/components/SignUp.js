import { useState } from 'react';
import dictionary from './dictionary';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { enterDetailsForDiet, enterGeneralDetails } from '../redux/actions/addDetailsToUser';



export default function SignUp() {
  const lang = (useSelector(state => state.langReducer)).langShortName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:5038/api/Client/";

  const [response, setResponse] = useState(null);
  const [isExists, setIsExists] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      firstName: e.target.formBasicFirstName.value,
      lastName: e.target.formBasicLastName.value,
      emailAddress: e.target.formBasicEmail.value,
      password: e.target.formBasicPassword.value,
    }
    checkIfUserExists(data.emailAddress)
      .then((res) => {
        if (!res) {
          setIsExists(false)
          //dispatch(enterGeneralDetails({...data}));
          dispatch(enterDetailsForDiet({...data}));
          navigate(`/details`);
        }
        else {
          setIsExists(true);
        }
      }
      )
      .catch(
        /////printing to user
        error => {
          console.error(error)
          console.log("problem")
        });

  }
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const [password, setPassword] = useState({ password: "", isValid: true, isConfirmed: true });
  const checkPassword = (e) => {
    const pass = e.target.value;
    if (pass.match(/[a-z]/g) && pass.match(
      /[A-Z]/g) && pass.match(
        /[0-9]/g) && pass.match(
          /[^a-zA-Z\d]/g) && pass.length >= 8) {
      setPassword((prevState) => ({ ...prevState, isValid: true, password: pass }));
    }
    else {
      setPassword((prevState) => ({ ...prevState, isValid: false }));
    }
  }
  const confirmPassword = (e) => {
    const pass = e.target.value;
    if (pass === password.password) {
      setPassword((prevState) => ({ ...prevState, isConfirmed: true }));
    }
    else {
      setPassword((prevState) => ({ ...prevState, isConfirmed: false }));
    }
  }
  const checkIfUserExists = async (emailAddress) => {
    return fetch(url + `get/${emailAddress}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          ////////////
          console.log(1);
          throw new Error("problem")
        }
        else if (response.statusText == "No Content") {
          console.log(2);
          return false;
        }
        else {
          setResponse(response.json());
          console.log(3);
          return true;
        }
      })
      .catch(error => {
        console.log(4);
        console.error(error);
        return error;
      });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ margin: "10vh 30vw", width: "40vw" }}>
        <div>{isExists && <p>{dictionary.userExists[lang]}. </p>}
          <a href="/signin">{dictionary.signin[lang]}</a></div>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>{dictionary.firstName[lang]}</Form.Label>
          <Form.Control type="text" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>{dictionary.lastName[lang]}</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label>{dictionary.fullName[lang]}</Form.Label>
          <Form.Control type="text" required />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{dictionary.email[lang]}</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{dictionary.password[lang]}</Form.Label>
          <Form.Control type="password" required onChange={checkPassword} />
          {!password.isValid && <p style={{ color: "red", fontSize: "12px" }}>{dictionary.strongPassword[lang]}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>{dictionary.confirmPassword[lang]}</Form.Label>
          <Form.Control type="password" required onChange={confirmPassword} />
          {!password.isConfirmed && <p style={{ color: "red", fontSize: "12px" }}>{dictionary.notConfirmedPassword[lang]}</p>}
        </Form.Group>
        <Button disabled={!password.isConfirmed || !password.isValid} variant="primary" type="submit">
          {dictionary.signup[lang]}
        </Button>
      </Form>
      {/* doesnt work now */}
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </>

  );
}

