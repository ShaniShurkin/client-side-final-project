// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Form } from "react-bootstrap";
// import dictionary from "../dictionary";
// import { enterDetailsForDiet } from "../../redux/actions/addDetailsToUser";
// import { urlClient } from "../../endpoints";

import { useNavigate } from 'react-router-dom';

//change age to born date
export default function PhysicalProfile() {

    // const dispatch = useDispatch();
    // const lang = (useSelector(state => state.langReducer)).langShortName;
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
        <div>
            Second Step Form
        </div>
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
}