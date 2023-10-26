import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
                <Route path="/signup/step1" component={Step1} />
                <Route path="/signup/step2" component={Step2} />
                <Route path="/signup/step3" component={Step3} />
                <Route path="/signup/step4" component={Step4} />
                <Route path="/signup" component={Step1} />
            </Routes>
        </div>
    );
}
