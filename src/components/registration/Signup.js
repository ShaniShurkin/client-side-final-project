import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Progress from './Progress';
import Step1 from './PersonalProfile';
import Step2 from './PhysicalProfile';
import Step3 from './MenuSettings';
import Step4 from './FoodSettings';
import { useState } from 'react';
import React from 'react';
export default function Signup() {
    const [user, setUser] = useState({});

    const updateUser = (data) => {
        setUser((prevUser) => ({ ...prevUser, ...data }));
    };

    const resetUser = () => {
        setUser({});
    };
    // const step1_bla_bla = React.memo(Step1)

    return (
        <div>
            <Progress />
            <Routes>
                //לחקור איך משתמשים בuse memo במקום ב render שלא מציג את הקומפוננטה
                {/* <Route path="/" element={step1_bla_bla}></Route>
                <Route path="/pysical-profile" element={<Step2 />}></Route>
                <Route path="/menu-settings" element={<Step3 />}></Route> */}

                <Route
                    render={(props) => (
                        <Step1 {...props} user={user} updateUser={updateUser} />
                    )}
                    path="/"
                    exact={true}
                />
                <Route
                    render={(props) => (
                        <Step2 {...props} user={user} updateUser={updateUser} />
                    )}
                    path="/pysical-profile"
                    exact={true}
                />
                <Route
                    render={(props) => (
                        <Step3 {...props} user={user} updateUser={updateUser} />
                    )}
                    path="/menu-settings"
                    exact={true}
                />
                <Route
                    render={(props) => (
                        <Step4 {...props} user={user} updateUser={updateUser} />
                    )}
                    path="/food-settings"
                    exact={true}
                />
            </Routes>
        </div>
    );
}
