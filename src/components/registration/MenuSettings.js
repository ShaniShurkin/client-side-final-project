import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { urlMenu } from "../../endpoints";
import dictionary from "../dictionary";
import { useForm } from 'react-hook-form';
import { Form, Button, ListGroup, Alert, Modal } from 'react-bootstrap';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';
import React from "react";

const MenuSettings = React.memo((props) => {
    const navigate = useNavigate();
    const [meals, setMeals] = useState({ ...props.meals })
    const { register, handleSubmit, getValues, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            meals: meals
        }
    });
    const onSubmit = (e) => {
        props.updateMeals(meals)
        navigate('/signup/food-settings');
    };
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const [categories, setCategories] = useState({});
    useEffect(() => {
        setCategories({
            1: "Shani", 2: "Tamar", 3: "Tamar and Shani😁", 4: "Shachar", 5: "Shurkin"
        })
        if (!verifyDailyCalorieCount()) {
            setError('meals', {
                type: 'meals',
                message: dictionary.caloriesErrorMsg[lang],
            })
        }
    }, [])

    const title = "title";
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
        return calories == 1
    }

    const changeCalories = (e, name) => {
        let value = Number(e.target.value) / 100
        setMeals(meals, meals[name]["calories"] = value)
        if (!verifyDailyCalorieCount()) {
            setError('meals', {
                type: 'meals',
                message: dictionary.caloriesErrorMsg[lang],
            })
        }
        else {
            clearErrors('meals')
        }
    }
    const changeMealName = (e, name) => {
        let value = e.target.value
        setMeals(meals, meals[name][lang] = value)
    }
    function handleRemove(name, category) {
        if (meals[name].categories.length == 1) {
            //TODO: handle this error
            console.log("You can't remove last item")
            return
        }
        const updatedMeal = { ...meals[name], categories: meals[name].categories.filter(cat => cat !== category) };
        let copiedMeals = { ...meals }
        copiedMeals[name] = updatedMeal
        setMeals({ ...copiedMeals });
        console.log(meals)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleAdd(name) {
    }

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
                            <Form.Control defaultValue={meals[name][lang]} onChange={(e) => changeMealName(e, name)} />
                        </Form.Group>
                        <Form.Group controlId={`${meals[name]} calories`}>
                            <Form.Label> <b>{dictionary.DailyCaloriePercentage[lang]}</b></Form.Label>
                            <Form.Control type="number" min={0} max={100} defaultValue={meals[name]["calories"] * 100} onChange={(e) => changeCalories(e, name)} />
                        </Form.Group>
                        <div className="categories">
                            <Form.Label>
                                <span><b>{`${dictionary.categories[lang]}:`}</b></span>
                                <Button onClick={handleShow}>+</Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {
                                            // categories.map((key, value)=>{
                                            //     <Form.Check // prettier-ignore
                                            //     type='checkbox'
                                            //     label={value}
                                            // />
                                            // })
                                        }
                                       
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form.Label>
                            {meals[name]["categories"].map((cat) => (
                                <ListGroup controlId={`${meals[name]} categories ${cat}`}>
                                    <ListGroup.Item>
                                        <span>{categories[cat]}</span>
                                        <Button type="button" onClick={() => handleRemove(name, cat)}>-</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                        </div>
                        <br />
                    </div>
                ))}
                {errors.meals && (
                    <p className="errorMsg">{errors.meals.message}</p>
                )}
                <Button variant="primary" type="submit">
                    {dictionary.next[lang]}
                </Button>
            </Form>

        </>

    );
});


export default MenuSettings;