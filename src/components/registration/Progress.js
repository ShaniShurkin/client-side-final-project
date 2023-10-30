import React from 'react';
import withRouter from './withRouter'
import { Link } from 'react-router-dom';
// const Progress = () => {
//   return (
//     <React.Fragment>
//       <div className="steps">
//         <div className="step">
//           <div>1</div>
//           <div>Step 1</div>
//         </div>
//         <div className="step">
//           <div>2</div>
//           <div>Step 2</div>
//         </div>
//         <div className="step">
//           <div>3</div>
//           <div>Step 3</div>
//         </div>
//         <div className="step">
//           <div>4</div>
//           <div>Step 4</div>
//         </div>
//       </div>
//     </React.Fragment>
//   );

// };


const Progress = ({ location: { pathname } }) => {
  const first = '/signup/';
  const second = '/signup/pysical-profile';
  const third = '/signup/menu-settings';
  const fourth = '/signup/food-settings';
  const isFirstStep = pathname === first;
  const isSecondStep = pathname === second;
  const isThirdStep = pathname === third;
  const isFourthStep = pathname === fourth;

  return (
    <React.Fragment>
      <div className="steps">
        <div className={`${isFirstStep ? 'step active' : 'step'}`}>
          <div> {isSecondStep || isThirdStep || isFourthStep ? (
            <Link to={first}>1</Link>
          ) : (
            '1'
          )}</div>
          <div>
            Step 1
          </div>
        </div>
        <div className={`${isSecondStep ? 'step active' : 'step'}`}>
          <div>{isThirdStep || isFourthStep ? <Link to={second}>2</Link> : '2'}</div>
          <div>Step 2</div>
        </div>
        <div className={`${isThirdStep ? 'step active' : 'step'}`}>
          <div>{isFourthStep ? <Link to={third}>3</Link> : '3'}</div>
          <div>Step 3</div>
        </div>
        <div className={`${isFourthStep ? 'step active' : 'step'}`}>
          <div>4</div>
          <div>Step 4</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(Progress);

