import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//components
import Header from './components/Header';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Details from './components/registration/PhysicalProfile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Menu from './components/Menu';
//styles
import "./styles/menu.css";
import MenuSettings from './components/registration/MenuSettings';
import Signup from './components/registration/Signup';
import Step1 from './components/registration/PersonalProfile';
import Step2 from './components/registration/PhysicalProfile';
import Step3 from './components/registration/MenuSettings';
import Step4 from './components/registration/FoodSettings';


function App() {

  // const MyComponent = () => {
  //   const [data, setData] = useState(null);

  //   useEffect(() => {

  //     const fetchData = async () => {
  //       try {

  //         const response = await axios.get(/*urlFoodGetAll*/"http://localhost:5038/api/Food/");
  //         setData(response.data);
  //         console.log(response);
  //         console.log(data);
  //       } catch (error) {
  //         console.error('GET request failed', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  // }
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header></Header>
        <Routes>
          <Route exact path='/' element={
            <HomePage />
          }></Route>
          {/* <Route exact path='/signup' element={
            <GoogleOAuthProvider clientId="160032418862-8oovjq0ab2dgkojd1bll2s8du62p4oo4.apps.googleusercontent.com"><SignUp /> </GoogleOAuthProvider>
          }></Route> */}
          <Route path="/signup/*" element={<Signup/>} />
          
          <Route exact path='/signin' element={<SignIn/>}></Route>
          <Route exact path='/signout' element={<SignOut />}></Route>
          <Route exact path='/details' element={<Details />}></Route>
          <Route exact path='/menu' element={<Menu />}></Route>
          <Route exact path='/menu-settings' element={<MenuSettings />}></Route>
          {/* 
          <Route exact path="/signup" component={Signup} />
          <Route path="/signup/step1" component={Step1} />
          <Route path="/signup/step2" component={Step2} />
          <Route path="/signup/step3" component={Step3} />
          <Route path="/signup/step4" component={Step4} /> */}
          {/* <div className="container"> */}
         
          {/* <Route exact path="/signup" component={Step2} />
              <Route exact path="/signup" component={Step3} />
              <Route exact path="/signup" component={Step4} /> */}
          {/* </div> */}
        </Routes>
      </BrowserRouter >
    </Provider >
  );
}

export default App;
