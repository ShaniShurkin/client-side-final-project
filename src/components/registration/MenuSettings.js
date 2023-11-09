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
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const [meals, setMeals] = useState({});
    const [categories, setCategories] = useState({});
    useEffect(() => {
        setMeals({
            "breakfast": { "calories": 0.2, "categories": [1, 2, 3], "he": "ארוחת בוקר", "en": "breakfast" },
            "snack": { "calories": 0.15, "categories": [2], "he": "חטיף", "en": "snack" },
            "lunch": { "calories": 0.2, "categories": [3, 2], "he": "ארוחת צהריים", "en": "lunch" },
            "dinner": { "calories": 0.2, "categories": [1, 3], "he": "ארוחת ערב", "en": "dinner" }
        });
        setCategories({
            1: "Shani", 2: "Tamar", 3: "Tamar and Shani😁"
        })
    }, [])


    const title = "title"
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        setEditing(false);
        // save newTitle to database or parent component state
    };

    const handleCancelClick = () => {
        setEditing(false);
        // setNewTitle(title);
    };
    const f = (code) => {
        fetch(urlMenu + `meals/${code}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => { setMeals(data); console.log(meals); })
            .catch(error => console.error(error))
    }
    return (
        <>
            <div>
                {editing ? (
                    <div>
                        <input type="text" value={newTitle} onChange={handleTitleChange} />
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </div>
                ) : (
                    <div>
                        <h1>{newTitle}</h1>
                        <Button onClick={handleEditClick}>Edit</Button>
                    </div>
                )}
            </div>
            <h1>{dictionary.dailyMealStructure[lang]}</h1>
            <Form>
                {Object.keys(meals).map(name => (
                    <div  style={{width:"30vw", margin: "auto auto"}}>
                        <Form.Group controlId={name}>
                            <Form.Label >{dictionary.mealName[lang]}</Form.Label>
                            <Form.Control defaultValue={meals[name][lang]} />
                        </Form.Group>
                        <Form.Group controlId={`${meals[name]} calories`}>
                            <Form.Label >{dictionary.DailyCaloriePercentage[lang]}</Form.Label>
                            <Form.Control defaultValue={`${meals[name]["calories"] * 100}%`}/>
                        </Form.Group>
                        <div className="categories">
                        <Form.Label>{`${dictionary.categories[lang]}:`}</Form.Label>
                            {meals[name]["categories"].map((cat) => (
                                <Form.Group controlId={`${meals[name]} categories ${cat}`}>
                                    <p>{categories[cat]}</p>
                                </Form.Group>
                            ))}
                        </div>
                        <br/>
                    </div>
                ))}
            </Form>
        </>

    );
});


export default MenuSettings;