import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { enterDetailsForDiet, enterGeneralDetails } from '../../redux/actions/addDetailsToUser';
import dictionary from '../../components/dictionary';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
const PersonalProfile = React.memo((props) => {


  const lang = (useSelector(state => state.langReducer)).langShortName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:5038/api/Client/";

  const [response, setResponse] = useState(null);
  const [isExists, setIsExists] = useState(false);

  const { user } = props;
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      cpassword: user.cpassword
    }
  });
  const onSubmit = (data) => {
    props.updateUser(data)
    navigate('/signup/physical-profile');
  };

  const changeValue = (data) => {
    props.updateUser(data)
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const data = {
  //     firstName: e.target.formBasicFirstName.value,
  //     lastName: e.target.formBasicLastName.value,
  //     emailAddress: e.target.formBasicEmail.value,
  //     password: e.target.formBasicPassword.value,
  //   }
  //   checkIfUserExists(data.emailAddress)
  //     .then((res) => {
  //       if (!res) {
  //         setIsExists(false)
  //         //dispatch(enterGeneralDetails({...data}));
  //         dispatch(enterDetailsForDiet({...data}));
  //         navigate(`/details`);
  //       }
  //       else {
  //         setIsExists(true);
  //       }
  //     }
  //     )
  //     .catch(
  //       /////printing to user
  //       error => {
  //         console.error(error)
  //         console.log("problem")
  //       });

  // }
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  // const checkIfUserExists = async (emailAddress) => {
  //   return fetch(url + `get/${emailAddress}`, {
  //     method: 'GET'
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         ////////////
  //         console.log(1);
  //         throw new Error("problem")
  //       }
  //       else if (response.statusText == "No Content") {
  //         console.log(2);
  //         return false;
  //       }
  //       else {
  //         setResponse(response.json());
  //         console.log(3);
  //         return true;
  //       }
  //     })
  //     .catch(error => {
  //       console.log(4);
  //       console.error(error);
  //       return error;
  //     });
  // }
  const validateConfirmPassword = (value) => {
    console.log(value);
    const password = getValues("password");
    console.log(password)
    if (value !== password) {
      return 'Passwords do not match.';
    }
    return true;
  };
  return (
    <>
      <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 offset-md-3">
          <Form.Group controlId="first_name">
            <Form.Label>{dictionary.firstName[lang]}</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              {...register('first_name', {
                required: 'First name is required.'
                // , pattern: {
                //   value: /^[^\d\W_]+$/,
                //   message: 'First name should contain only characters.'
                // }
              })}
              className={`${errors.first_name ? 'input-error' : ''}`}
            />
            {errors.first_name && (
              <p className="errorMsg">{errors.first_name.message}</p>
            )}
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>{dictionary.lastName[lang]}</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              autoComplete="off"
              {...register('last_name', {
                required: 'Last name is required.'
                // , pattern: {
                //   value: /^[^\d\W_]+$/,
                //   message: 'Last name should contain only characters.'
                // }
              })}
              className={`${errors.last_name ? 'input-error' : ''}`}
            />
            {errors.last_name && (
              <p className="errorMsg">{errors.last_name.message}</p>
            )}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>{dictionary.email[lang]}</Form.Label>
            <Form.Control
              {...register('email', {
                required: 'Email is required.',
                type: 'email', pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: 'Enter a valid email address.'
                }
              })}
              className={`${errors.email ? 'input-error' : ''}`} />
            {errors.email && (
              <p className="errorMsg">{errors.email.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{dictionary.password[lang]}</Form.Label>
            <Form.Control
              type='password'
              {...register('password', {
                required: 'Password is required.',
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
                //   message: dictionary.strongPassword[lang]
                //}
              })}
              className={`${errors.password ? 'input-error' : ''}`} />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>{dictionary.confirmPassword[lang]}</Form.Label>
            <Form.Control
              type='password'
              {...register('cpassword', {
                required: 'Password validation is required.',
                validate: validateConfirmPassword
              })}
              className={`${errors.cpassword ? 'input-error' : ''}`}
            />
            {errors.cpassword && (
              <p className="errorMsg">{dictionary.notConfirmedPassword[lang]}</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </>
    //   {/* doesnt work now */}
    //   <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    // </>
  );
});

export default PersonalProfile

