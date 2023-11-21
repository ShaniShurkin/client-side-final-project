import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Progress from './Progress';
import Step1 from './PersonalProfile';
import Step2 from './PhysicalProfile';
import Step3 from './MenuSettings';
import Step4 from './FoodSettings';
import { useState, useEffect } from 'react';
import React from 'react';
//todo: Make sure the form is filled out automatically even if you don't click Next
export default function Signup() {
    const [user, setUser] = useState({});
    const [meals, setMeals] = useState(
        {
            "breakfast": { "calories": 0.2, "categories": [1, 2, 3], "he": "ארוחת בוקר", "en": "breakfast" },
            "snack": { "calories": 0.15, "categories": [2], "he": "חטיף", "en": "snack" },
            "lunch": { "calories": 0.2, "categories": [3, 2], "he": "ארוחת צהריים", "en": "lunch" },
            "dinner": { "calories": 0.2, "categories": [1, 3], "he": "ארוחת ערב", "en": "dinner" }
        }
    );
    useEffect(() => {
        console.log("has changed")
        console.log(user);
    }, [user])
    const updateUser = (data) => {
        console.log("origin")
        console.log(user);
        console.log("added")
        console.log(data)
        setUser((prevUser) => ({ ...prevUser, ...data }))
    };

    const resetUser = () => {
        setUser({});
    };
    return (
        <div>
            <Progress />
            <Routes> 
                <Route path="/" Component={(props) => (<Step1 {...props} user={user} updateUser={updateUser}/>)}/>
                <Route path="/physical-profile" Component={(props) => (<Step2 {...props} user={user} updateUser={updateUser}/>)}/>
                <Route path="/menu-settings" Component={(props) => (<Step3 {...props} meals={meals}/>)}/>
                <Route path="/food-settings" Component={(props) => (<Step4/>)}/>            
            </Routes>
        </div>
    );
}
