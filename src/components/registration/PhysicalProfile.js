// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button, Form } from "react-bootstrap";
import dictionary from "../dictionary";
// import { enterDetailsForDiet } from "../../redux/actions/addDetailsToUser";
// import { urlClient } from "../../endpoints";

import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

//change age to born date
const PhysicalProfile = React.memo((props) => {
    const naviget = useNavigate()
    const { user } = props;
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            age: user.age,
            activityLevel: user.activityLevel
        }
    });
    const onSubmit = (data) => {
        // const data = new FormData(e.target);
        // const user = Object.fromEntries(data.entries());
        props.updateUser(data)
        naviget('/signup/menu-settings');
    };

    const changeValue = (data) => {
        props.updateUser(data)
    };

    const dispatch = useDispatch();
    const lang = (useSelector(state => state.langReducer)).langShortName;
    // const userDetails = useSelector(state => state.userReducer)
    // const [selected, setSelected] = useState({ gender: "" });
    // const { gender } = selected;
    // const handleChange = e => {
    //     e.persist();
    //     setSelected(prevState => ({
    //         ...prevState,
    //         gender: e.target.value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let data = {
    //         gender: e.target.formBasicGender.value == "Male" ? 1 : 2,
    //         weight: e.target.formBasicWeight.value,
    //         height: e.target.formBasicHeight.value,
    //         age: e.target.formBasicAge.value,
    //         activityLevel: e.target.formBasicActivityLevel.value,
    //     };

    //     dispatch(enterDetailsForDiet({ ...data}));

    //     data = {
    //         ...convertKeysToUppercase(data),
    //         FirstName: userDetails.firstName,
    //         LastName: userDetails.lastName,
    //         Password: userDetails.password,
    //         EmailAddress: userDetails.emailAddress,
    //     };
    //     fetch(`${urlClient}add`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json())
    //         .then(code => dispatch(enterDetailsForDiet({code:code})))
    //         .catch(error => console.error(error));
    // }

    // function convertKeysToUppercase(obj) {
    //     const newObj = {};
    //     Object.keys(obj).forEach(key => {
    //       const newKey = key.charAt(0).toUpperCase() + key.slice(1);
    //       Object.defineProperty(newObj, newKey, {
    //         value: obj[key],
    //         enumerable: true,
    //         configurable: true
    //       });
    //     });
    //     return newObj;
    //   }

    return (
        <>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6 offset-md-3">
                    <Form.Group controlId="formBasicGender">
                        <Form.Label>{dictionary.gender[lang]}</Form.Label>
                        <Form.Check
                            name="gender"
                            value="Male"
                            type="radio"
                            aria-label="radio 1"
                            label={dictionary.male[lang]}
                            {...register('gender', {
                                required: dictionary.genderdRequired[lang]
                            })}
                            className={`${errors.gender ? 'input-error' : ''}`}
                        />
                        <Form.Check
                            name="gender"
                            value="Female"
                            type="radio"
                            aria-label="radio 2"
                            label={dictionary.female[lang]}
                            {...register('gender', {
                                required: dictionary.genderdRequired[lang]
                            })}
                            className={`${errors.gender ? 'input-error' : ''}`}
                        />
                        {errors.gender && (
                            <p className="errorMsg">{errors.gender.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicWeight">
                        <Form.Label>{dictionary.weight[lang]}</Form.Label>
                        <Form.Control
                            type="number"
                            // min="20"
                            // max="400" 
                            {...register('weight', {
                                required: dictionary.weightdRequired[lang],
                                pattern: {
                                    value: /^(?:[2-9][0-9]|[1-3][0-9]{2}|400)$/,
                                    message: dictionary.enterValidWeight[lang]
                                }
                            })}
                            className={`${errors.weight ? 'input-error' : ''}`} />
                        {errors.weight && (
                            <p className="errorMsg">{errors.weight.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicHeight">
                        <Form.Label>{dictionary.height[lang]}</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('height', {
                                required: dictionary.heightRequired[lang],
                                pattern: {
                                    value: /^(?:[5-9][0-9]|1[0-9]{2}|2[0-3][0-9]|240)$/,
                                    message: dictionary.enterValidHeight[lang]
                                }
                            })}
                            className={`${errors.weight ? 'input-error' : ''}`} />
                        {errors.height && (
                            <p className="errorMsg">{errors.height.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>{dictionary.age[lang]}</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('age', {
                                required: dictionary.ageRequired[lang],
                                pattern: {
                                    value: /^[1-9][0-9]$|^(100)$/,
                                    message: dictionary.enterValidAge[lang]
                                }
                            })}
                            className={`${errors.weight ? 'input-error' : ''}`} />
                        {errors.age && (
                            <p className="errorMsg">{errors.age.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicActivityLevel">
                        <Form.Label>{dictionary.activityLevel[lang]}</Form.Label>
                        <Form.Control as="select" defaultValue="2" {...register('activityLevel')}>
                            <option value="1">{dictionary.sedentary[lang]}</option>
                            <option value="2">{dictionary.moderate[lang]}</option>
                            <option value="3">{dictionary.active[lang]}</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {dictionary.next[lang]}
                    </Button>
                </div>
            </Form>
        </>
        // <>
        //     <Form onSubmit={handleSubmit} style={{ margin: "10vh 30vw", width: "40vw" }} dir={dictionary.dir[lang]}>
        //         <Form.Group controlId="formBasicGender">
        //             <Form.Label>{dictionary.gender[lang]}</Form.Label>
        //             <Form.Check
        //                 value="Male"
        //                 type="radio"
        //                 aria-label="radio 1"
        //                 label={dictionary.male[lang]}
        //                 onChange={handleChange}
        //                 checked={gender === "Male"}
        //             />
        //             <Form.Check
        //                 value="Female"
        //                 type="radio"
        //                 aria-label="radio 2"
        //                 label={dictionary.female[lang]}
        //                 onChange={handleChange}
        //                 checked={gender === "Female"}
        //             />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicWeight">
        //             <Form.Label>{dictionary.weight[lang]}</Form.Label>
        //             <Form.Control type="number" min="20" max="400" required />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicHeight">
        //             <Form.Label>{dictionary.height[lang]}</Form.Label>
        //             <Form.Control type="number" min="50" max="240" required />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicAge">
        //             <Form.Label>{dictionary.age[lang]}</Form.Label>
        //             <Form.Control type="number" min="10" max="100" required />
        //         </Form.Group>
        //         <Form.Group controlId="formBasicActivityLevel">
        //             <Form.Label>{dictionary.activityLevel[lang]}</Form.Label>
        //             <Form.Control as="select" defaultValue={"2"} >
        //                 <option value="1">{dictionary.sedentary[lang]}</option>
        //                 <option value="2">{dictionary.moderate[lang]}</option>
        //                 <option value="3">{dictionary.active[lang]}</option>
        //             </Form.Control>
        //         </Form.Group>
        //         <Button /*disabled={!password.isConfirmed || !password.isValid}*/ variant="primary" type="submit">
        //             {dictionary.signup[lang]}
        //         </Button>
        //     </Form>
        // </>
    )
});

export default PhysicalProfile;  