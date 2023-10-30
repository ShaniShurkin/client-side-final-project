import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Progress from './Progress';
import Step1 from './PersonalProfile';
import Step2 from './PhysicalProfile';
import Step3 from './MenuSettings';
import Step4 from './FoodSettings';
export default function Signup() {

    return (
        <div>
            <Progress />
            <Routes>
                <Route exact path="/" element={<Step1 />} />
                <Route path="/pysical-profile" element={<Step2 />} />
                <Route exact path="/menu-settings" element={<Step3 />} />
                <Route exact path="/food-settings" element={<Step4 />} />
            </Routes>
        </div>
    );
}
