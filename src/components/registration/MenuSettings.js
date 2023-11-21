import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { urlMenu } from "../../endpoints";
import dictionary from "../dictionary";
import { useForm } from 'react-hook-form';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';
import React from "react";

const MenuSettings = React.memo((props) => {
    const naviget = useNavigate()
    const { register, handleSubmit, getValues, errors } = useForm({});
    const onSubmit = (data) => {
        if (verifyDailyCalorieCount() == false) {

        }
        props.updateMenu(data)
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

    const title = "title";
    const [show, setShow] = useState(true);
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
    const verifyDailyCalorieCount = () => {
        let calories = 0;
        for (let meal in meals) {
            calories += meals[meal]["calories"];
        }
        if (calories == 1) {
            return true;
        }
        return false //"Divide your calorie count correctly"
    }

    const changeCalories = (e, name) => {
        let value = Number(e.target.value) / 100
        setMeals(meals, meals[name]["calories"] = value)
    }
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(meals).map(name => (
                    <div style={{ width: "30vw", margin: "auto auto" }}>
                        <Form.Group controlId={name}>
                            <Form.Label><b>{dictionary.mealName[lang]}</b></Form.Label>
                            <Form.Control defaultValue={meals[name][lang]} />
                        </Form.Group>
                        <Form.Group controlId={`${meals[name]} calories`}>
                            <Form.Label> <b>{dictionary.DailyCaloriePercentage[lang]}</b></Form.Label>
                            <Form.Control type="number" min={0} max={100} defaultValue={meals[name]["calories"] * 100} onChange={(e) => changeCalories(e, name)} />
                        </Form.Group>
                        <div className="categories">
                            <Form.Label><b>{`${dictionary.categories[lang]}:`}</b></Form.Label>
                            {meals[name]["categories"].map((cat) => (
                                <ListGroup controlId={`${meals[name]} categories ${cat}`}>
                                    <ListGroup.Item>{categories[cat]}</ListGroup.Item>
                                </ListGroup>
                            ))}
                        </div>
                        <br />
                    </div>
                ))}
                <Button>add meal</Button>
                <Button variant="primary" type="submit">
                    {dictionary.next[lang]}
                </Button>
            </Form>
            <Alert show={show} variant="success">
                <Alert.Heading>My Alert</Alert.Heading>
                <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                    lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                    fermentum.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me
                    </Button>
                </div>
            </Alert>
        </>

    );
});


export default MenuSettings;