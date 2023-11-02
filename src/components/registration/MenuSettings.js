import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { urlMenu } from "../../endpoints";
import dictionary from "../dictionary";
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from "react";

const MenuSettings = React.memo((props) => {
    const naviget = useNavigate()
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        naviget('/signup/food-settings');
    };
    // const lang = (useSelector(state => state.langReducer)).langShortName;
    // const [meals, setMeals] = useState({});
    // useEffect(() => {
    //     setMeals({
    //         "breakfast": { "calories": 0.2, "categories": [1, 2], "he": "ארוחת בוקר", "en": "breakfast" },
    //         "snack": { "calories": 0.15, "categories": [1, 2], "he": "חטיף", "en": "snack" },
    //         "lunch": { "calories": 0.2, "categories": [1, 2], "he": "ארוחת צהריים", "en": "lunch" },
    //         "dinner": { "calories": 0.2, "categories": [1, 2], "he": "ארוחת ערב", "en": "dinner" }
    //     })
    // }, [])
    // const title = "title"
    // const [editing, setEditing] = useState(false);
    // const [newTitle, setNewTitle] = useState(title);

    // const handleTitleChange = (event) => {
    //     setNewTitle(event.target.value);
    // };

    // const handleEditClick = () => {
    //     setEditing(true);
    // };

    // const handleSaveClick = () => {
    //     setEditing(false);
    //     // save newTitle to database or parent component state
    // };

    // const handleCancelClick = () => {
    //     setEditing(false);
    //     // setNewTitle(title);
    // };
    // const f = (code) => {
    //     fetch(urlMenu + `meals/${code}`, {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(data => { setMeals(data); console.log(meals); })
    //         .catch(error => console.error(error))
    // }
    return (
        <>
            <div>
                Third Step Form
            </div>
            <Form className="input-form" onSubmit={onSubmit}>
                <div className="col-md-6 offset-md-3">
                    <Form.Group controlId="Phone_number">
                        <Form.Label>Phone numbere</Form.Label>
                        <Form.Control
                            type="number"
                            name="Phone_number"
                            placeholder="Enter your phone number"
                            autoComplete="off"
                        // ref={register({
                        //   required: 'First name is required.',
                        //   pattern: {
                        //     value: /^[a-zA-Z]+$/,
                        //     message: 'First name should contain only characters.'
                        //   }
                        // })}
                        // className={`${errors.first_name ? 'input-error' : ''}`}
                        />
                        {/* {errors.first_name && (
              <p className="errorMsg">{errors.first_name.message}</p>
            )} */}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </>
        //     <div>
        //   {editing ? (
        //     <div>
        //       <input type="text" value={newTitle} onChange={handleTitleChange} />
        //       <button onClick={handleSaveClick}>Save</button>
        //       <button onClick={handleCancelClick}>Cancel</button>
        //     </div>
        //   ) : (
        //     <div>
        //       <h1>{newTitle}</h1>
        //       <button onClick={handleEditClick}>Edit</button>
        //     </div>
        //   )}
        // </div>
        // <>
        //     <h1>{dictionary.dailyMealStructure[lang]}</h1>
        //     <Form>
        //     {Object.keys(meals).map(name => (
        //                         <Form.Group controlId={name}>
        //                             {/* <Form.Label >{meals[name][lang]}</Form.Label> */}
        //                             <Form.Control defaultValue={meals[name][lang]}/>
        //                         </Form.Group>
        //                     ))}
        //     </Form>
        // </>

    );
});


export default MenuSettings;