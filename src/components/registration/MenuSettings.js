import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { urlMenu } from "../../endpoints";
import dictionary from "../dictionary";
import { useForm } from 'react-hook-form';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';
import React from "react";
import Categories from "./Categories";

const MenuSettings = React.memo((props) => {
    const navigate = useNavigate();
    const [meals, setMeals] = useState({ ...props.meals })
    const [currentMeal, setCurrentMeal] = useState(null)
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
    useEffect(() => {
        console.log(meals)
    }, [meals])

    // const title = "title";
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
    function handleRemoveCat(name, category) {
        const updatedMeal = { ...meals[name], categories: meals[name].categories.filter(cat => cat !== category) };
        let copiedMeals = { ...meals }
        copiedMeals[name] = updatedMeal
        setMeals({ ...copiedMeals });
        console.log(meals)
    }

    const handleClose = () => setCurrentMeal(null);
    const handleShow = (name) => {
        setCurrentMeal(name)
    }
    function findCheckedCats(name) {
        const checkedCheckboxes = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.name.includes(name) && checkbox.checked) {
                let cname = checkbox.name
                // Extract category id from checkbox name
                checkedCheckboxes.push(Number(cname.substring(cname.lastIndexOf("_") + 1)));
            }
        });
        return checkedCheckboxes
    }
    function handleSaveCat(name) {
        const checkedCategories = findCheckedCats(name)
        const updatedMeal = { ...meals[name], categories: [...checkedCategories] };
        let copiedMeals = { ...meals }
        copiedMeals[name] = updatedMeal
        setMeals({ ...copiedMeals });
        handleClose()
    }
    function handleAddMeal(e) {
        let mealName = `meal${Object.keys(meals).length + 1}`;
        let initialMeal = {}
        initialMeal[mealName] = { en: "", he: "", categories: [], calories: 0, inProcess: true }
        setMeals({ ...meals, ...initialMeal })
    }
    function isMealValid(name) {
        if (!(name in meals)) {
            return false
        }
        const neededKeys = ['en', 'he', 'categories', 'calories']
        // validate that all required keys are in meal
        if (neededKeys.every(key => Object.keys(meals[name]).includes(key)) == false) {
            console.log("includes")
            return false;
        }
        console.log("checking catgories")
        if (meals[name].categories.length == 0) {
            console.log("length")
            return false;
        }
        const names = [meals[name]["en"], meals[name]["he"]]
        console.log("checking name")
        if (!(names.some(str => str.length > 0))) {
            console.log("names")
            return false;
        }
        return true
    }
    function saveMeal(name){
        let copiedMeals = {...meals};
        delete copiedMeals[name]["inProcess"];
        setMeals({...copiedMeals});
    }

    return (
        <>
            {/* <div>
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
            </div> */}
            <h1>{dictionary.dailyMealStructure[lang]}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(meals).map(name => (
                    <div key={`meal_${name}`} style={{ width: "30vw", margin: "5vh 5vw", padding: "2vw", borderStyle: "solid", borderWidth: "3px", borderColor: "lightgray" }}>
                        <Form.Group controlId={name}>
                            <Form.Label><b>{dictionary.mealName[lang]}</b></Form.Label>
                            <Form.Control defaultValue={meals[name][lang]} onChange={(e) => changeMealName(e, name)} />
                        </Form.Group>
                        <Form.Group controlId={`${meals[name]} calories`}>
                            <Form.Label> <b>{dictionary.DailyCaloriePercentage[lang]}</b></Form.Label>
                            <Form.Control type="number" min={5} max={100} defaultValue={meals[name]["calories"] * 100} onChange={(e) => changeCalories(e, name)} />
                        </Form.Group>
                        <div className="categories">
                            <Form.Label>
                                <span><b>{`${dictionary.categories[lang]}:`}</b></span>
                                {!("inProcess" in meals[name]) ? <Button onClick={() => handleShow(name)}>+</Button> : null}
                            </Form.Label>
                            {!("inProcess" in meals[name]) ?
                                <div>
                                    {currentMeal && currentMeal == name ?
                                        <Categories
                                            key={name}
                                            categoriesLst={categories}
                                            currentMeal={{ name: name, ...meals[currentMeal] }}
                                            close={handleClose}
                                            save={handleSaveCat} />
                                        : null}
                                    {meals[name]["categories"].map((cat) => (
                                        <ListGroup key={`${meals[name]}_categories_${cat}`}>
                                            <ListGroup.Item>
                                                <span>{categories[cat]}</span>
                                                <Button type="button" onClick={() => handleRemoveCat(name, cat)} disabled={meals[name].categories.length == 1}>-</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))}
                                </div> :
                                <div>
                                    {
                                        Object.keys(categories).map((id) => (
                                            <div key={`${name}_cat_${id}`} >
                                                <Form.Check
                                                    name={`${name}_cat_${id}`}
                                                    type='checkbox'
                                                    label={categories[id]}
                                                    onChange={() => handleSaveCat(name)}
                                                />
                                            </div>
                                        ))
                                    }
                                    <Button disabled={isMealValid(name) == false} onClick={() => saveMeal(name)}>{dictionary.save[lang]}</Button>
                                </div>}
                            {/* TODO: put this nessage in dictionary */}
                            {meals[name].categories.length < 2 && <p style={{ color: "yellow" }}>At least one of the categories must be selected</p>}
                        </div>
                        <br />
                    </div>
                ))}
                {console.log(meals[Object.keys(meals).pop()])}
                <Button variant="primary" onClick={handleAddMeal} disabled={"inProcess" in meals[Object.keys(meals).pop()]}>
                 {/* disabled={"inProcess" in meals[Object.keys(meals).pop()]}> */}
                    {dictionary.addMeal[lang]}
                </Button>
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